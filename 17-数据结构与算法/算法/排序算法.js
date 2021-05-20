const arr = [4, 2, 6, 1, 7, 8, 0];

// 冒泡排序
// 平均时间复杂度O(n²) 最好O(n) 最坏O(n²) 空间复杂度O(1)
function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}
// console.log(bubbleSort(arr));

// 选择排序
// 平均时间复杂度O(n²) 最好O(n²) 最坏O(n²) 空间复杂度O(1)
function selectionSort(array){
    let minindex,temp;
    for (let i = 0; i < array.length - 1; i++) {
        minindex = i;
        for (let j = i + 1; j < array.length; j++) {
            if(array[j] < array[minindex]){
                minindex = j;
            }
        }
        temp = array[i];
        array[i] = array[minindex];
        array[minindex] = temp;
    }
    return array;
}

// console.log(selectionSort(arr));

// 插入排序
// 平均时间复杂度O(n²) 最好O(n) 最坏O(n²) 空间复杂度O(1)
function insertionSort(array){
    let temp,preIndex;
    for (let i = 1; i < array.length; i++) {
        temp = array[i],preIndex = i - 1;
        while (preIndex >= 0 && array[preIndex] > temp) {
            array[preIndex + 1] = array[preIndex]
            preIndex--;
        }
        array[preIndex + 1] = temp
    }
    return array
}
// console.log(insertionSort(arr));

// 快速排序
// 平均时间复杂度O(nlogn) 最好O(nlogn) 最坏O(n²) 空间复杂度O(nlogn)
function quickSort(array){
    if(array.length <=1) return array
    let pivotIndex = Math.floor(array.length / 2),
    pivot = array.splice(pivotIndex,1)[0];
    let left = [],right = [];

    for (const v of array) {
        v < pivot ? left.push(v) : right.push(v);
    }
    return quickSort(left).concat([pivot],quickSort(right));
}

console.log(quickSort(arr));