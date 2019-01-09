let fs = require('fs');
let xml2js = require('xml2js');

let count = 0;
fs.watch('./challonge.xml', (event, filename) => {
    count++;
    fs.readFile('./challonge.xml', 'utf-8', (err, data) => {
        if (err) throw err;
        if (count%2 === 0) {
            xml2js.parseString(data, {explicitRoot: false}, (err, result) => {
                if (err) throw err;
                let challonge = JSON.parse(JSON.stringify(result));
                let results = challonge.results[0].item;
                console.log(filename + ' updated! Writing to results.txt...');
                fs.writeFileSync('./results.txt', results.join('\n'), err => { if (err) console.log(err) });
            });
        }
    });
});
