const fs = require('fs');

let text = fs.readFileSync('../input', 'utf8');
let draws = text.split('\n')[0].split(',');

let boards = [];
let tempBoard = [];
text.split('\n').forEach(function(line) {
    let arr = line.split(' ');
    if (arr[0].includes(',')) {
        return;
    }
    if (arr.length === 1) {
        if (tempBoard.length > 0) {
            boards.push(tempBoard);
        }
        tempBoard = [];
        return;
    }
    let stripped = stripBlank(arr);
    tempBoard.push(stripped);
});

if (tempBoard.length > 0) {
    boards.push(tempBoard);
}
console.log(boards.length);

let count = 0;
draws.forEach(function(draw) {
    let toRemove = [];
    boards.forEach(function(board, index, array) {
        let modified = inputToBoard(board, draw);
        array[index] = modified;
        let score = calculateScore(modified, draw);
        if (score !== null) {
            count++;
            console.log(count);
            console.log(score);
            toRemove.push(index);
        }
    });
    toRemove.forEach(function(item, index) {
        let remove = item - index;
        boards.splice(remove, 1);
    });
});

function inputToBoard(board, input) {
    let boardCopy = [];
    for (let i = 0; i < board.length; i++) {
        let newArr = [];
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == input) {
                newArr.push('X');
            } else {
                newArr.push(board[i][j]);
            }
        }
        boardCopy.push(newArr);
    }
    return boardCopy;
}

function calculateScore(board, num) {
    let win = true;
    for (let i = 0; i < board.length; i++) {
        win = true;
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] != 'X') {
                win = false;
            }
        }
        if (win) {
            break;
        }
    }

    if (!win) {
        for (let j = 0; j < board[0].length; j++) {
            win = true;
            for (let i = 0; i < board.length; i++) {
                if (board[i][j] != 'X') {
                    win = false;
                }
            }
            if (win) {
                break;
            }
        }
    }

    if (win) {
        return sumBoard(board) * parseInt(num);
    } else {
        return null;
    }
}

function sumBoard(board) {
    let sum = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] != 'X') {
                sum += parseInt(board[i][j]);
            }
        }
    }
    return sum;
}

function stripBlank(arr) {
    let newArr = [];
    arr.forEach(function(item) {
        if (item != '') {
            newArr.push(item);
        }
    });
    return newArr;
}