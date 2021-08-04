const events = {
    taskOptionsToggled: (e) => {
        const overlayMenu = e.target.nextElementSibling;
        toggleElementVisibility(overlayMenu);
    },
    taskTextChangedEvent: (e) => {
        alert('task text changed');
    },
    taskCompleted: (e) => {
        alert('task completed event!');
    },
    taskDeleted: (e) => {

        //remove from database

        const taskContainer = findAncestorElementWithId(e.target, "taskContainer");
        const taskId = taskContainer.querySelector("#task").getAttribute("data-task_id");

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

    task.querySelector("#optionsIcon").addEventListener('click', events.taskOptionsToggled);
    task.querySelector("#taskButton").addEventListener('click', events.taskCompleted);
    task.querySelector("#taskTextInput").addEventListener('change', events.taskTextChangedEvent);
    task.querySelector("#deleteTaskIcon").addEventListener('click', events.taskDeleted);

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

                const newTask = createTaskContainer(taskId, text);

                wireCRUDEvents(newTask);
                //need to wire drag and drop events too!

                document.querySelector("#container").append(newTask);

                //reset text input for new task
                textInputForNewTask.value = "";
                textInputForNewTask.placeholder = "Add another item";
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
textInputForNewTask.addEventListener('change', newTaskCreated);


// const taskContainers = document.querySelectorAll("#taskContainer");
// taskContainers.forEach(taskContainer => wireCRUDEvents(taskContainer));

