const fs = require('fs');

let allCrabs = [];

fs.readFileSync('../input', 'utf8').split(',').forEach(function (crab) {
    allCrabs.push(parseInt(crab));
});

let leastFuel = 0;

for (let i = Math.min(...allCrabs); i <= Math.max(...allCrabs); i++) {
    let fuel = calculateFuel(allCrabs, i);
    if (fuel < leastFuel || leastFuel === 0) {
        leastFuel = fuel;
    }
}

console.log(leastFuel);

function calculateFuel(crabs, position) {
    let fuel = 0;
    crabs.forEach(function (crab) {
        fuel += Math.abs(crab - position);
    });
    return fuel;
}