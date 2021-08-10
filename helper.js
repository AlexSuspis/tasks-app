quickSort = (arr) => {
    if (arr.length == 1 || arr.length == 0) {
        return arr;
    }
    else if (arr.length == 2) {
        if (arr[0] <= arr[1]) return arr;
        else {
            let sortedArr = [arr[1], arr[0]];
            return sortedArr;
        }
    }

    randomIndex = Math.floor(Math.random() * arr.length);

    const pivot = arr[randomIndex];

    let L = [];
    let R = [];
    let X = [];

    arr.forEach(num => {
        if (num < pivot) L.push(num);
        else if (num > pivot) R.push(num);
        else if (num == pivot) X.push(num);
    })

    let sortedL = quickSort(L);
    let sortedR = quickSort(R);

    let sortedArr = sortedL.concat(X, sortedR);

    return sortedArr;
}

// console.log(quickSort([5, 4, 3, 2, 1, 7, -1, -5, 15, 3]));


module.exports.quickSort;