const fs = require('fs');

let allFish = new Map();

fs.readFileSync('../input', 'utf8').split(',').forEach(entry => {
    let timerCount = allFish.get(parseInt(entry)) || 0;
    allFish.set(parseInt(entry), timerCount + 1);
});

for (let i = 0; i < 256; i++) {
    allFish = newDay(allFish);
}

console.log(mapSize(allFish));

function newDay(allFish) {
    let newFish = new Map();
    for (let [key, value] of allFish) {
        if (key === 0) {
            newFish.set(6, (newFish.get(6) + value) || value);
            newFish.set(8, value);
        } else {
            newFish.set(key - 1, (newFish.get(key - 1) + value) || value);
        }
    }
    return newFish;
}

function mapSize(map) {
    let size = 0;
    for (let [key, value] of map) {
        size += value;
    }
    return size;
}