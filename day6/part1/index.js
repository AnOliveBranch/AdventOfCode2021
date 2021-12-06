const fs = require('fs');

let allFish = [];

fs.readFileSync('../input', 'utf8').split(',').forEach(entry => {
    allFish.push(parseInt(entry.trim()));
});

for (let i = 0; i < 80; i++) {
    allFish = newDay(allFish);
}

console.log(allFish.length);

function newDay(allFish) {
    let newFish = [];
    allFish.forEach(function(fish) {
        if (fish === 0) {
            newFish.push(6);
            newFish.push(8);
        } else {
            newFish.push(fish - 1);
        }
    });
    return newFish;
}