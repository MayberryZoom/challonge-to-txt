//  check if connected to internet
require('dns').lookup('www.google.com', (err) => {
    if (err && err.code == "ENOTFOUND") {
        console.log('Please connect to the internet!');
    }
    else {
        // for GET requests
        const axios = require('axios');
        // for saving files
        const fs = require('fs');
        // for cmd input
        const readline = require('readline');
        // config file (used for new settings, each
        // variable is individually pulled later on)
        let config = require('./config.json');

        // construct interface for cmd input
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // simply list the settings from the
        // config file (must pass it as a param)
        const genSettings = (obj) => {
            return `Tournament - ${obj.tournament}\nAPI Key - ${obj.api_key}\nDisplay Count - ${obj.displayCount}\nRefresh Rate - ${obj.refresh}`
        }

        // parse challonge tourney link into api URL
        const parseLink = (link) => {
            const matches = link.match(/(?:https:\/\/)?(\w+)?\.?challonge\.com\/(\w+)/);
            return matches[1] ? matches[1] + '-' + matches[2] : matches[2];
        }

        // sort matches by dates
        const dateSort = (arr) => {
            return arr.sort((a,b) => {
                return new Date(a.match.completed_at) - new Date(b.match.completed_at);
            })
        };

        // ask the series of questions for
        // each of the config's properties
        const getNewSettings = (callback) => {
            let newSettings = config;
            rl.question('\nWhat is the tournament\'s link? ', (tournamentN => {
                if (tournamentN !== 'pass') newSettings.tournament = tournamentN;
                rl.question('What is the API key? ', (api_keyN => {
                    if (api_keyN !== 'pass') newSettings.api_key = api_keyN;
                    rl.question('How many sets should be displayed? ', (displayCountN => {
                        if (displayCountN !== 'pass') newSettings.displayCount = parseInt(displayCountN);
                        rl.question('In minutes, how often should the sets update? ', (refreshN => {
                            if (refreshN !== 'pass') newSettings.refresh = parseInt(refreshN);
                            rl.question(`\nYour new settings are:\n\n${genSettings(newSettings)}\n\nAre these okay?\n`, (answer => {
                                if (['no', 'n'].includes(answer)) {
                                    console.log("\nLet's try again.")
                                    getNewSettings();
                                }
                                else callback(newSettings);
                            }));
                        }));
                    }));
                }));
            }));
        }

        // execute the final step (make api requests and update
        // after the refresh rate), thrown in a function so it can
        // be executed easily within the switch statement below
        const final = () => {
            const { api_key, displayCount, tournament, refresh } = require('./config.json');
            const options = {
                params: {
                    api_key: api_key
                }
            }

            // functions calls itself after each timeout
            const process = () => {
                axios.get(`https://api.challonge.com/v1/tournaments/${parseLink(tournament)}/matches.json`, options)
                .then(res => {
                    fs.writeFile('./matches.json', JSON.stringify(res.data), 'utf8', (err) => {
                        if (err) throw err;
                        console.log('Matches Saved!');
                        axios.get(`https://api.challonge.com/v1/tournaments/${parseLink(tournament)}/participants.json`, options)
                        .then(res => {
                            fs.writeFile('./participants.json', JSON.stringify(res.data), 'utf8', (err) => {
                                if (err) throw err;
                                console.log('Participants Saved!');
                                const matches = dateSort(require('./matches.json'));
                                const participants = require('./participants.json');
                                let recent = matches.filter(m => m.match.completed_at !== null).slice(displayCount * -1);
                                let results = recent.map(m => `(Round ${m.match.round > 0 ? 'W' + m.match.round : 'L' + Math.abs(m.match.round)}) ${participants.find(p => p.participant.id === m.match.winner_id).participant.display_name} beats ${participants.find(p => p.participant.id === m.match.loser_id).participant.display_name} ${m.match.winner_id === m.match.player1_id ? m.match.scores_csv : m.match.scores_csv.split('-').reverse().join('-')}`);
                                fs.writeFile('./results.txt', results.join('\n'), 'utf8', err => {
                                    if (err) console.log(err);
                                    console.log('Updated results.txt!');
                                });
                            });
                        });
                    });
                });
                setTimeout(process, refresh * 60000);
            }
            console.log('\nStarting...\n');
            process();
        };

        // ask to use the previous settings
        rl.question(`Current Options:\n\n${genSettings(config)}\n\nUse these settings? (To reset to defaults, type 'default')\n`, (answer) => {
            switch (answer) {
                // continue with original settings
                case 'y':
                case 'yes':
                    console.log("\nLet's get started!");
                    final();
                    break;

                // get new settings
                case 'n':
                case 'no':
                    console.log(`\nLet's set your new settings. To use the old settings for any of the following, type "pass".`);
                    getNewSettings(newSettings => {
                        fs.writeFile('./config.json', JSON.stringify(newSettings), 'utf8', (err) => {
                            if (err) throw err;
                            console.log("\nSettings saved successfully. Let's get started!");
                            final();
                        });
                    });
                    break;

                // reset to defaults
                case 'default':
                    fs.writeFile('./config.json', JSON.stringify(require('./default.json')), 'utf8', (err) => {
                        if (err) throw err;
                        console.log("\nSettings saved successfully. Let's get started!");
                        final();
                    });
                    break;

                // I'm too lazy to set this up properly so just
                // shut down the program if not yes/no/default
                default:
                    console.log('Invalid answer.');
                    rl.close();
                    break;
            }
        });
    }
});
