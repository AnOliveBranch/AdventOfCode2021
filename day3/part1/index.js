const fs = require('fs');

let bitmap = [];
fs.readFileSync('../input', 'utf8').split('\n').forEach(function(line) {
    bitmap.push(line.split(''));
});

let zeroCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let oneCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

bitmap.forEach(function(arr) {
    arr.forEach(function(item, index) {
        if (item === '0') {
            zeroCount[index]++;
        } else {
            oneCount[index]++;
        }
    });
});

let gamma = '';
let epsilon = '';

zeroCount.forEach(function(item, index) {
    if (item >= oneCount[index]) {
        gamma += '0';
        epsilon += '1';
    } else {
        gamma += '1';
        epsilon += '0';
    }
});

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));