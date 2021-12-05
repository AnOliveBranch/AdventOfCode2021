const fs = require('fs');

let horizontal = [];
let vertical = [];
let lines = [];

fs.readFileSync('../input', 'utf8').split('\n').forEach(function(line) {
    let coords = line.split(' -> ');
    if (coords.length !== 2) {
        return;
    }
    let x1 = coords[0].split(',')[0];
    let y1 = coords[0].split(',')[1];
    let x2 = coords[1].split(',')[0];
    let y2 = coords[1].split(',')[1];
    if (x1 == x2) {
        vertical.push(coords);
        lines.push(coords);
    } else if (y1 == y2) {
        horizontal.push(coords);
        lines.push(coords);
    }
});

let map = [];
let temp = [];

for (let i = 0; i < 1000; i++) {
    temp = [];
    for (let j = 0; j < 1000; j++) {
        temp.push('.');
    }
    map.push(temp);
}

horizontal.forEach(function(coords) {
    let x1 = parseInt(coords[0].split(',')[0]);
    let x2 = parseInt(coords[1].split(',')[0]);
    let y = parseInt(coords[0].split(',')[1]);
    let bounds = ([x1, x2]).sort(function(a, b) {
        return a - b;
    });

    for (let i = bounds[0]; i <= bounds[1]; i++) {
        if (map[y][i] == '.') {
            map[y][i] = '1';
        } else {
            map[y][i] = (parseInt(map[y][i]) + 1).toString();
        }
    }
});

vertical.forEach(function(coords) {
    let y1 = parseInt(coords[0].split(',')[1]);
    let y2 = parseInt(coords[1].split(',')[1]);
    let x = parseInt(coords[0].split(',')[0]);
    let bounds = ([y1, y2]).sort(function(a, b) {
        return a - b;
    });

    for (let i = bounds[0]; i <= bounds[1]; i++) {
        if (map[i][x] == '.') {
            map[i][x] = '1';
        } else {
            map[i][x] = (parseInt(map[i][x]) + 1).toString();
        }
    }
});

let count = 0;
map.forEach(function(arr) {
    arr.forEach(function(item) {
        if (!(item == '.' || item == '1')) {
            count++;
        }
    });
});

console.log(count);