const fs = require('fs');

let nums = [];

fs.readFileSync('../input', 'utf8').split('\n').forEach(line => {
    nums.push(line.split('').map(x => parseInt(x)));
});

let sum = 0;

for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
        if (checkSides(nums, i, j)) {
            sum += (nums[i][j] + 1);
        }
    }
}

console.log(sum);

function checkSides(nums, i, j) {
    if (nums[i - 1] !== undefined) {
        if (nums[i][j] >= nums[i - 1][j]) {
            return false;
        }
    }
    if (nums[i + 1] !== undefined) {
        if (nums[i][j] >= nums[i + 1][j]) {
            return false;
        }
    }
    if (nums[i][j - 1] !== undefined) {
        if (nums[i][j] >= nums[i][j - 1]) {
            return false;
        }
    }
    if (nums[i][j + 1] !== undefined) {
        if (nums[i][j] >= nums[i][j + 1]) {
            return false;
        }
    }
    return true;
}