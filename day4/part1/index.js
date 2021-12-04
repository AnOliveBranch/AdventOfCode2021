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

let hasWon = false;
draws.forEach(function(draw) {
    if (!hasWon) {
        boards.forEach(function(board, index, array) {
            let score = calculateScore(board, draw);
            if (score !== null) {
                hasWon = true;
                console.log(board, draw);
                console.log(score);
            }
            array[index] = inputToBoard(board, draw);
        });
    }
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
            if (!(board[i][j] == num || board[i][j] == 'X')) {
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
                if (!(board[i][j] == num || board[i][j] == 'X')) {
                    win = false;
                }
            }
            if (win) {
                break;
            }
        }
    }

    if (win) {
        return sumBoard(board, num) * parseInt(num);
    } else {
        return null;
    }
}

function sumBoard(board, num) {
    let sum = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (!(board[i][j] == num || board[i][j] == 'X')) {
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