const fs = require('fs');

let horizontal = 0;
let vertical = 0;
let aim = 0;
fs.readFileSync('../input', 'utf8').split('\n').forEach(function(line) {
    if (line.indexOf('forward') != -1) {
        let distance = parseInt(line.substring(line.indexOf('forward') + 8));
        horizontal += distance;
        vertical += (distance * aim);
    } else if (line.indexOf('down') != -1) {
        aim += parseInt(line.substring(line.indexOf('down') + 5));
    } else if (line.indexOf('up') != -1) {
        aim -= parseInt(line.substring(line.indexOf('up') + 3));
    }
});
console.log(horizontal * vertical);