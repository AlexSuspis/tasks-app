// findAncestorElementWithId = (startElement, targetId) => {

//     let ancestor = startElement.parentElement;
//     do {
//         if (ancestor.getAttribute("id") === targetId) {
//             return ancestor;
//         }
//     } while ((ancestor = ancestor.parentElement) !== null);

//     return null;
// }
// swapTaskPositions = (task1, task2) => {
//     console.log("swap task positions event");
//     // console.log(task1, task2);
// }
const dragAndDropEvents = {
    dragStart: (e) => {
        console.log('drag start');
        const task = findAncestorElementWithId(e.target, "task");
        const taskId = task.getAttribute('data-task_id');
        e.dataTransfer.setData("text/plain", taskId);
        console.log(taskId);
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
        console.log(taskId);

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

// const dragHandles = document.querySelectorAll('.myDragHandle');
// dragHandles.forEach(handle => wireDragStartEvent(handle));

//wire dragand drop events
    //wire container events (drop)
    //and drag start event (currently on handles)


// const taskContainers = document.querySelectorAll("#taskContainer");
// taskContainers.forEach(container => {
//     wireContainerEvents(container)
//     wireCRUDEvents(container)
// });

