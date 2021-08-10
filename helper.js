function quickSortTasks(arr) {
    if (arr.length == 1 || arr.length == 0) {
        return arr;
    }
    else if (arr.length == 2) {
        if (arr[0].position <= arr[1].position) return arr;
        else {
            let sortedArr = [arr[1], arr[0]];
            return sortedArr;
        }
    }

    randomIndex = Math.floor(Math.random() * arr.length);

    const pivot = arr[randomIndex].position;

    let L = [];
    let R = [];
    let X = [];

    arr.forEach(task => {
        if (task.position < pivot) L.push(task);
        else if (task.position > pivot) R.push(task);
        else if (task.position == pivot) X.push(task);
    });

    let sortedL = quickSortTasks(L);
    let sortedR = quickSortTasks(R);

    let sortedArr = sortedL.concat(X, sortedR);

    return sortedArr;
}

// console.log(quickSort([5, 4, 3, 2, 1, 7, -1, -5, 15, 3]));


module.exports = quickSortTasks;