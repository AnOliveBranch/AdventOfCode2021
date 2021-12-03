const fs = require('fs');

let oxygen = [];
let co2 = [];
fs.readFileSync('../input', 'utf8').split('\n').forEach(function(line) {
    let arr = line.split('');
    oxygen.push(arr);
    co2.push(arr);
});

let zeroCount = 0;
let oneCount = 0;

for (let i = 0; i < 12; i++) {
    oxygen.forEach(function(arr) {
        if (arr[i] === '0') {
            zeroCount++;
        } else {
            oneCount++;
        }
    });

    if (zeroCount > oneCount) {
        oxygen = oxygen.filter(arr => arr[i] === '0');
    } else {
        oxygen = oxygen.filter(arr => arr[i] === '1');
    }

    zeroCount = 0;
    oneCount = 0;

    if (co2.length === 1) {
        continue;
    }

    co2.forEach(function(arr) {
        if (arr[i] === '0') {
            zeroCount++;
        } else {
            oneCount++;
        }
    });

    if (zeroCount <= oneCount) {
        co2 = co2.filter(arr => arr[i] === '0');
    } else {
        co2 = co2.filter(arr => arr[i] === '1');
    }

    zeroCount = 0;
    oneCount = 0;
}
let oxygenString = oxygen.join().replaceAll(',', '');
let co2String = co2.join().replaceAll(',', '');
console.log(parseInt(oxygenString, 2) * parseInt(co2String, 2));