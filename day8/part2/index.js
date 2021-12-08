const fs = require('fs');

let allEncoded = [];

fs.readFileSync('../input', 'utf8').split('\n').forEach(line => {
    if (line.length === 0) {
        return;
    }
    allEncoded.push(line);
});

let sum = 0;
allEncoded.forEach(line => {
    let first = line.split('|')[0].trim();
    let second = line.split('|')[1].trim();
    let decoded = decode(first);
    let translated = translate(second, decoded);
    sum += translated;
});

console.log(sum);

/*
    Translate numbers into array index

    Take this example:
    acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab

    Because of unique lengths:
    "ab" is 1 (length of 2)
    "dab" is 7 (length of 3)
    "eafb" is 4 (length of 4)
    "acedgfb" is 8 (length of 7)

    3 numbers have a length of 6: 0, 6, and 9
    One each is "cefabd", "cdfgeb", and "cagedb"

    3 numbers have a length of 5: 2, 3, and 5
    One each is "cdfbe", "gcdfa", and "fbcad"

    7 has one segment not also in 1, the top
    Since 7 has "d" and 1 does not, we know that the top (shown as 0 in the diagram below) is "d"

    Between "a" and "b", one is 2 and the other is 5 (based on the 1)
    Between "e" and "f", one is 1 and the other is 3 (based on the 4)

    Now let's go to the numbers of length 5: 2, 3, and 5
    "g" is only in one of them, and 2 is the only number of those 3 with segment 4, so "g" is 4
    All 3 of those share the 0, 3, and 6 in the diagram below
    "cdfbe", "gcdfa", and "fbcad" all share "c", "d", and "f"
    We already know that "d" is 0
    So between "c" and "f" one is 3 and one is 6
    We also know that "f" is in 4, so "f" must be 3
    This forces "e" to be 1
    This also forces "c" to be 6

    So far, here's what we know
    "d" is 0
    "e" is 1
    "f" is 3
    "g" is 4
    "c" is 6

    Now that we know "f" is 3, we can look at numbers with length 6
    Number 6 is missing segment 2 but has 5, while 9 has both
    Between "a" and "b", one is 2 and the other is 5 (based on the 1)
    "cdfgeb" is missing "a", making it 6
    This means "a" is 2 and "b" is 5

    0000
   1    2
   1    2
    3333
   4    5
   4    5
    6666

    Let's shorten the process to only steps
    1) Find sections with length 2 and 3
    2) The segment in section length 3 but not length 2 is 0
    3) Find the 3 sections with length 5
    4) Find the 3 common segments between the 3 sections
    5) Remove the segment for 0
    6) Find the section with length 4
    7) Of the remaining 2 segments, the one that is also present in section length 4 is 3, the other is 6
    8) The remaining section present in section length 4 but not length 2 is 1
    9) Find the 3 sections with length 6
    10) Find the section missing one of the segments present in section length 2
    11) The present segment from above is 5
    12) The segment not present is 2
    13) The remaining segment not filled is 4

*/

decode('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab');

function decode(input) {
    let letters = ['', '', '', '', '', '', ''];
    let two = '';
    let three = '';
    let four = '';
    let five = [];
    let six = [];
    input.split(' ').forEach(segment => {
        if (segment.length === 2) {
            two = segment;
        } else if (segment.length === 3) {
            three = segment;
        } else if (segment.length === 4) {
            four = segment;
        }else if (segment.length === 5) {
            five.push(segment);
        } else if (segment.length === 6) {
            six.push(segment);
        }
    });
    letters[0] = three.replace(two[0], '').replace(two[1], '');

    let fiveCommon = [];
    five[0].split('').forEach(letter => {
        if (five[1].includes(letter) && five[2].includes(letter) && letter != letters[0]) {
            fiveCommon.push(letter);
        }
    });
    four.split('').forEach(letter => {
        if (fiveCommon.includes(letter)) {
            letters[3] = letter;
            fiveCommon.splice(fiveCommon.indexOf(letter), 1);
        }
    });
    letters[6] = fiveCommon[0];
    letters[1] = four.replace(two[0], '').replace(two[1], '').replace(letters[3], '');
    six.forEach(segment => {
        if (!(segment.includes(two[0]) && segment.includes(two[1]))) {
            if (segment.includes(two[0])) {
                letters[5] = two[0];
            } else {
                letters[5] = two[1];
            }
        }
    });
    letters[2] = two.replace(letters[5], '');

    if (!letters.includes('a')) {
        letters[4] = 'a';
    } else if (!letters.includes('b')) {
        letters[4] = 'b';
    } else if (!letters.includes('c')) {
        letters[4] = 'c';
    } else if (!letters.includes('d')) {
        letters[4] = 'd';
    } else if (!letters.includes('e')) {
        letters[4] = 'e';
    } else if (!letters.includes('f')) {
        letters[4] = 'f';
    } else if (!letters.includes('g')) {
        letters[4] = 'g';
    }

    return letters;
}

function translate(input, letters) {
    let result = '';
    input.split(' ').forEach(section => {
        result += translateSingle(section, letters);
    });
    return parseInt(result);
}

function translateSingle(section, letters) {
    let numbers = '';
    section.split('').forEach(letter => {
        numbers += letters.indexOf(letter);
    });
    numbers = numbers.split('').sort().join('');

    if (numbers === '012456') {
        return 0;
    } else if (numbers === '25') {
        return 1;
    } else if (numbers === '02346') {
        return 2;
    } else if (numbers === '02356') {
        return 3;
    } else if (numbers === '1235') {
        return 4;
    } else if (numbers === '01356') {
        return 5;
    } else if (numbers === '013456') {
        return 6;
    } else if (numbers === '025') {
        return 7;
    } else if (numbers === '0123456') {
        return 8;
    } else if (numbers === '012356') {
        return 9;
    } else {
        return null;
    }
}