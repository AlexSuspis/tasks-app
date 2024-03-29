const CRUDevents = {
    taskOptionsToggled: (e) => {
        const overlayMenu = e.target.nextElementSibling;
        toggleElementVisibility(overlayMenu);
    },
    taskTextChangedEvent: (e) => {
        const taskContainer = findAncestorElementWithId(e.target, "taskContainer");
        const task = taskContainer.querySelector("#task");

        const taskId = task.getAttribute("data-task_id");
        const newText = e.target.value;

        axios.patch(`/task/${taskId}/text`, { newText })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    },
    taskCompleted: (e) => {
        alert('task completed event!');
    },
    taskDeleted: (e) => {

        const taskContainer = findAncestorElementWithId(e.target, "taskContainer");
        const taskId = taskContainer.querySelector("#task").getAttribute("data-task_id");

        //remove from database
        axios.delete(`/task/${taskId}`)
            .then(() => {
                console.log(`Removed task with id '${taskId}' from database\n`);
            })
            .catch(err => {
                console.log("Error occurred in axios DELETE request", err);
            })

        //remove from DOM
        taskContainer.remove();
    }
}
wireCRUDEvents = (taskContainer) => {
    const task = taskContainer.querySelector("#task");

    task.querySelector("#optionsIcon").addEventListener('click', CRUDevents.taskOptionsToggled);
    task.querySelector("#taskButton").addEventListener('click', CRUDevents.taskCompleted);
    task.querySelector("#taskTextInput").addEventListener('change', CRUDevents.taskTextChangedEvent);
    task.querySelector("#deleteTaskIcon").addEventListener('click', CRUDevents.taskDeleted);

    //paused for the time being because it breaks. it created a new task with no text.
    // task.querySelector("#newTaskIcon").addEventListener('click', createNewTask);
}

//EVENT Task is created
const textInputForNewTask = document.querySelector('#newTaskDiv input');
newTaskCreated = (e) => {
    if (e.target !== "") {
        createTaskContainer = (taskId, text) => {

            //if first task, there are no other tasks to clone!
            const anyTaskContainer = document.querySelector("#taskContainer");
            const newTaskContainer = anyTaskContainer.cloneNode(true);
            const newTask = newTaskContainer.querySelector('#task');
            newTask.setAttribute("id", "task");
            newTask.setAttribute("data-task_id", taskId);
            newTask.querySelector('input').value = text;

            return newTaskContainer;
        }
        newTaskPosition = () => {
            return document.querySelectorAll("#task").length + 1;
        }

        const text = e.target.value;
        const position = newTaskPosition();
        console.log(position, "debug");

        axios.post('/task', { text, position })
            .then((res) => {
                const taskId = res.data

                const newTaskContainer = createTaskContainer(taskId, text);

                wireCRUDEvents(newTaskContainer);
                wireDragAndDropEvents(newTaskContainer);

                document.querySelector("#container").append(newTaskContainer);

                //reset new task text input
                textInputForNewTask.value = "";
                textInputForNewTask.placeholder = "Add another item";
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
textInputForNewTask.addEventListener('change', newTaskCreated);