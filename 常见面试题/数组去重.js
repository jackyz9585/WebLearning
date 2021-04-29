function unique(array) {
    let arr = []
    for (let i = 0; i < array.length; i++) {
        // 双层循环forEach array[i] === arr[element]
        if (arr.indexOf(array[i]) === -1) {
            arr.push(array[i]);
        }
    }
    return arr;
}


function unique1(array) {
    return Array.from(new Set(array));
}

function unique2(array) {
    let obj = {};
    array.forEach(e => {
        obj['0'+ e] = 1;
    });
    return Object.keys(obj).map(e => { return +e });
}


const arr = [1, 2, 3, 3, 3, 4, 4, 5, 6, 7, 7, 8, 9, 9, 0,10];
console.log(unique(arr));
console.log(unique1(arr));
console.log(unique2(arr));
