const fs = require('fs');

let count = 0;
let previous = null;
fs.readFileSync('input', 'utf8').split('\n').forEach(function(line) {
    let current = parseInt(line);
    if (previous !== null) {
        if (current > previous) {
            count++;
        }
    }
    previous = current;
});
console.log(count);