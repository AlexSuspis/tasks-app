findAncestorElementWithId = (startElement, targetId) => {

    let ancestor = startElement.parentElement;
    do {
        if (ancestor.getAttribute("id") === targetId) {
            return ancestor;
        }
    } while ((ancestor = ancestor.parentElement) !== null);

    return null;
}
swapTaskPositions = (task1, task2) => {
    console.log("swap task positions");
}

const dragHandles = document.querySelectorAll('.myDragHandle');
dragHandles.forEach(handle => handle.addEventListener('dragstart', dragStart));

function dragStart(e) {
    const task = findAncestorElementWithId(e.target, "task");
    const taskId = task.getAttribute('data-task_id');
    e.dataTransfer.setData("text/plain", taskId);
}

const taskContainers = document.querySelectorAll(".taskContainer");
taskContainers.forEach(div => {
    div.addEventListener('dragenter', dragEnter);
    div.addEventListener('dragover', dragOver);
    div.addEventListener('dragleave', dragLeave);
    div.addEventListener('drop', drop);
});



function dragEnter(e) {
    // console.log('dragenter');
    //preventDefault() so we make the div a valid drop target
    e.preventDefault();
}
function dragOver(e) {
    // console.log('dragover');
    //preventDefault() so we make the div a valid drop target
    e.preventDefault();
}
function dragLeave(e) {
    // console.log('dragleave');
}
function drop(e) {
    //to stop redirecting bug
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');

    // const draggedTask = document.querySelector(`data-task_id[${taskId}]`);
    const tasks = document.querySelectorAll("#task");
    let draggedTask;
    for (let task of tasks) {
        if (task.getAttribute("data-task_id") === taskId) {
            draggedTask = task;
        }
    }
    const targetTask = findAncestorElementWithId(e.target, "task");

    if (targetTask != draggedTask) {
        swapTaskPositions(draggedTask, targetTask);
    }
}