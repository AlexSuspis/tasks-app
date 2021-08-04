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
    // console.log(task1, task2);
}

wireDragStartEvent = (handle) => {
    function dragStart(e) {
        console.log('drag start');
        const task = findAncestorElementWithId(e.target, "task");
        const taskId = task.getAttribute('data-task_id');
        e.dataTransfer.setData("text/plain", taskId);
    }
    handle.addEventListener('dragstart', dragStart);
}

wireContainerEvents = (container) => {
    function dragEnter(e) {
        //preventDefault() so we make the div a valid drop target
        e.preventDefault();
    }
    function dragOver(e) {
        //preventDefault() so we make the div a valid drop target
        e.preventDefault();
    }
    function dragLeave(e) { }
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
    container.addEventListener('dragenter', dragEnter);
    container.addEventListener('dragover', dragOver);
    container.addEventListener('dragleave', dragLeave);
    container.addEventListener('drop', drop);
}

const dragHandles = document.querySelectorAll('.myDragHandle');
dragHandles.forEach(handle => wireDragStartEvent(handle));


const taskContainers = document.querySelectorAll("#taskContainer");
taskContainers.forEach(container => wireContainerEvents(container));


