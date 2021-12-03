const fs = require('fs');

let horizontal = 0;
let vertical = 0;
fs.readFileSync('../input', 'utf8').split('\n').forEach(function(line) {
    if (line.indexOf('forward') != -1) {
        horizontal += parseInt(line.substring(line.indexOf('forward') + 8));
    } else if (line.indexOf('down') != -1) {
        vertical += parseInt(line.substring(line.indexOf('down') + 5));
    } else if (line.indexOf('up') != -1) {
        vertical -= parseInt(line.substring(line.indexOf('up') + 3));
    }
});
console.log(horizontal * vertical);