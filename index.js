const axios = require('axios');
const fs = require('fs');

const { options, displayCount, tournament, refresh } = require('./config.json');

console.log('Starting...');
axios.get('https://api.challonge.com/v1/tournaments/isacord-singles1/matches.json', options)
.then(res => {
    fs.writeFile('./matches.json', JSON.stringify(res.data), 'utf8', (err) => {
        if (err) throw err;
        console.log('Matches Saved!');
        axios.get('https://api.challonge.com/v1/tournaments/isacord-singles1/participants.json', options)
        .then(res => {
            fs.writeFile('./participants.json', JSON.stringify(res.data), 'utf8', (err) => {
                if (err) throw err;
                console.log('Participants Saved!');
                const matches = require('./matches.json');
                const participants = require('./participants.json');
                let recent = matches.slice(count * -1);
                let results = recent.map(m => `(Round ${m.match.round > 0 ? 'W' + m.match.round : 'L' + Math.abs(m.match.round)}) ${participants.find(p => p.participant.id === m.match.winner_id).participant.display_name} beats ${participants.find(p => p.participant.id === m.match.loser_id).participant.display_name} ${m.match.winner_id === m.match.player1_id ? m.match.scores_csv : m.match.scores_csv.split('-').reverse().join('-')}`);
                fs.writeFile('./results.txt', results.join('\n'), 'utf8', err => {
                    if (err) console.log(err);
                    console.log('Updated results.txt!');
                    console.log('Done!');
                });
            });
        });
    });
});
