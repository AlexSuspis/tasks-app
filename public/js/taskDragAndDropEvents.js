const dragAndDropEvents = {
    dragStart: (e) => {
        const task = findAncestorElementWithId(e.target, "task");
        const taskId = task.getAttribute('data-task_id');
        e.dataTransfer.setData("text/plain", taskId);
    },
    dragEnter: (e) => {
        //preventDefault() so we make the div a valid drop target
        e.preventDefault();
    },
    dragOver: (e) => {
        //preventDefault() so we make the div a valid drop target
        e.preventDefault();
    },
    dragLeave: (e) => { },
    drop: (e) => {
        swapTaskPositions = (task1, task2) => {
            console.log("swap task positions event");
            console.log(task1, task2);
        }

        //to stop redirecting bug
        e.preventDefault();

        const taskId = e.dataTransfer.getData('text/plain');

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
}

wireDragStartEvent = (taskContainer) => {
    const handle = taskContainer.querySelector(".myDragHandle");
    handle.addEventListener('dragstart', dragAndDropEvents.dragStart);
}

wireContainerEvents = (taskContainer) => {
    taskContainer.addEventListener('dragenter', dragAndDropEvents.dragEnter);
    taskContainer.addEventListener('dragover', dragAndDropEvents.dragOver);
    taskContainer.addEventListener('dragleave', dragAndDropEvents.dragLeave);
    taskContainer.addEventListener('drop', dragAndDropEvents.drop);
}

wireDragAndDropEvents = (taskContainer) => {
    wireDragStartEvent(taskContainer);
    wireContainerEvents(taskContainer);
}