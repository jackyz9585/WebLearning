function flatten1(array) {
    let res = [];
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            res = res.concat(flatten1(array[i]))
        } else {
            res.push(array[i])
        }
    }
    return res;
}

function flatten2(array) {
    return array.toString().split(',').map(e => +e);
}

function flatten3(array) {
    return array.reduce((a, b) => { return a.concat(Array.isArray(b) ? flatten3(b) : b) }, [])
}

function flatten4(array) {
    while (array.some(e => Array.isArray(e))) {
        array = [].concat(...array);
    }
    return array;
}

let arr = [1, 2, 3, [6, 5, 4, [7, 6, 5], 8], 9, 0];

console.log(flatten1(arr));
console.log(flatten2(arr));
console.log(flatten3(arr));
console.log(flatten4(arr));
