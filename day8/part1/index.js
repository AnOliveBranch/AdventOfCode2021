const fs = require('fs');

let count = 0;

fs.readFileSync('../input', 'utf8').split('\n').forEach(line => {
    if (line.length === 0) {
        return;
    }
    let second = line.split('|')[1];
    second.split(' ').forEach(segment => {
        if (segment.length === 2 || segment.length === 4 || segment.length === 3 || segment.length === 7) {
            count++;
        }
    });
});

console.log(count);