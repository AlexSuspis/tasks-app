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

            // console.log(draggedTaskPosition);
            // console.log(droppedOnTaskPosition);



            //we are interested in determining if the task that was dropped on will be included
            //in the shift operation we will perform in order to insert the task dragged by the user.

            //we are interested in finding the Y middle coordinate of the task that was dropped on.
            const taskHeight = taskThatWasDroppedOn.clientHeight;
            const dropEventYCoordinate = e.clientY;
            const taskLeftHandCornerYCoordinate = taskThatWasDroppedOn.offsetTop;
            const middleYCoordinate = taskLeftHandCornerYCoordinate + (taskHeight / 2)
            // console.log(middleYCoordinate);


            //down shift if draggedTaskPos > droppedOnTaskPos
            let isDownShift = false;
            if (draggedTaskPosition > droppedOnTaskPosition) {
                isDownShift = true;
            }

            let wasDroppedInTopHalfOfContainer = false;
            if (dropEventYCoordinate < middleYCoordinate) {
                console.log("above!")
                wasDroppedInTopHalfOfContainer = true
            }
            else console.log("below!");


            //if "above" and it's a down shift, we include the task that was dropped on in the slice. (is it the upper or lower bound?)
            //if "above" and it's an up shift, we don't include it.

            //if "below" and it's an up shift, we include it
            //if "below" and it's a down shift, we exclude it


            //determine bounds for array slice
            let lowerBound = 0;
            let upperBound = 0;
            if (isDownShift) {
                console.log("it's a down shift")
                lowerBound = droppedOnTaskPosition;
                upperBound = draggedTaskPosition;
                if (wasDroppedInTopHalfOfContainer) {
                    //we include droppedOnTaskPosition in slice
                    console.log("include droppedOnTask in shift")
                }
            } else if (!isDownShift) {
                console.log("it's an up shift")
                if (!wasDroppedInTopHalfOfContainer) {
                    //we include droppedOnTaskPosition in slice
                    console.log("include droppedOnTask in shift")
                }
                lowerBound = draggedTaskPosition;
                upperBound = droppedOnTaskPosition;
            }
            // // console.log(`taskDraggedByUserPos is ${draggedTaskPosition} and droppedOnTaskPosition is ${droppedOnTaskPosition}`);
            // // console.log(`lower bound is ${lowerBound} and upperBound is ${upperBound}`);


            // //decide if it is an up or down shift
            // //if lowerBound === draggedTaskPos, it's an up shift
            // //else if upperBound === draggedTaskPos, it's a down shift

            // //up shift: add 1 to all tasks between lower and upper bound
            // //down shift: subtract 1
            // //decide if we include droppedOnTaskPosition in upper/lower bound


            // const tasks = document.querySelectorAll("#task");
            // const container = document.querySelector("#container");
            // //convert into array so we can apply the filter method
            // const tasksArray = Array.from(container.children);

            // //SHIFT




            //shift positions of all tasks between task1 and task 2
            //Decide direction of shift (up or down)
            //decide on what part of task2 task1 landed.
            //get all tasks between task1 and task2, and update their positions
            //if(task1.pos > task2.pos) it's a down shift for all tasks in between
            //task 1 and task 2
            //else it's an up shift
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