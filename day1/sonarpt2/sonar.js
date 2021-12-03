const fs = require('fs');

let count = 0;
let last3 = [null, null, null];
fs.readFileSync('input', 'utf8').split('\n').forEach(function(line) {
    let current3 = [last3[1], last3[2], parseInt(line)];
    if (sum(last3) !== null && sum(current3) !== null) {
        if (sum(current3) > sum(last3)) {
            count++;
        }
    }
    last3 = current3;
});
console.log(count);

function sum(arr) {
    let count = 0;
    arr.forEach(function(item) {
        if (item !== null && !isNaN(item) && count !== null) {
            count += item;
        } else {
            count = null;
            return;
        }
    });
    return count;
}