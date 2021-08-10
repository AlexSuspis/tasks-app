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
    drop: (e, el) => {
        swapTaskPositions = (taskDraggedByUser, taskThatWasDroppedOn) => {
            //get position from task1 (task that was dragged by user)
            const draggedTaskPosition = taskDraggedByUser.getAttribute("data-position");
            //get position from task2 (task that is getting it's place "stolen")
            const droppedOnTaskPosition = taskThatWasDroppedOn.getAttribute("data-position");

            //we are interested in determining if the task that was dropped on will be included
            //in the shift operation we will perform in order to insert the task dragged by the user.

            //we are interested in finding the Y middle coordinate of the task that was dropped on.
            const taskHeight = taskThatWasDroppedOn.clientHeight;
            const dropEventYCoordinate = e.clientY;
            const taskLeftHandCornerYCoordinate = taskThatWasDroppedOn.offsetTop;
            const middleYCoordinate = taskLeftHandCornerYCoordinate + (taskHeight / 2)

            const container = document.querySelector("#container");
            //convert into array so we can apply the filter method
            const draggedTaskContainer = findAncestorElementWithId(taskDraggedByUser, "taskContainer");

            const shiftDroppedOnTask = dropEventYCoordinate < middleYCoordinate;

            if (shiftDroppedOnTask) { //shift droppedOnTask
                // console.log("above!")
                taskDraggedByUser.setAttribute("data-position", droppedOnTaskPosition);

                container.insertBefore(draggedTaskContainer, container.children[droppedOnTaskPosition - 1]);

            } else { //do not shift droppedOnTask
                // console.log("below!");
                container.insertBefore(draggedTaskContainer, container.children[droppedOnTaskPosition]);
            }

            //update task positions in DOM and database
            const tasks = Array.from(container.querySelectorAll("#task"));
            tasks.forEach((task, index) => {
                const newPosition = index + 1
                task.setAttribute("data-position", newPosition);
                axios.patch(`/task/${task.getAttribute("data-task_id")}/position`, { newPosition })
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });


        }

        //to stop redirecting bug
        e.preventDefault();

        // console.log(e.dataTransfer);
        const taskId = e.dataTransfer.getData('text/plain');

        const tasks = document.querySelectorAll("#task");
        let draggedTask;
        for (let task of tasks) {
            if (task.getAttribute("data-task_id") === taskId) {
                draggedTask = task;
            }
        }
        const targetContainer = findAncestorElementWithId(e.target, "taskContainer");

        const targetTask = targetContainer.querySelector("#task");
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