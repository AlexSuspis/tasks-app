wireEvents = (task) => {
    toggleElementVisibility = (el) => {
        if (el.style.display === 'inline') {
            el.style.display = 'none';
        } else {
            el.style.display = 'inline';
        }
    }
    taskOptionsToggled = (e) => {
        const overlayMenu = e.target.nextElementSibling;
        toggleElementVisibility(overlayMenu);
    }
    taskTextChangedEvent = (e) => {
        alert('task text changed');
    }
    taskCompleted = (e) => {
        alert('task completed event!');
    }
    taskDeleted = (e) => {
        alert('task deleted event');
    }

    task.querySelector("#optionsIcon").addEventListener('click', taskOptionsToggled);
    task.querySelector("#taskButton").addEventListener('click', taskCompleted);
    task.querySelector("#taskTextInput").addEventListener('change', taskTextChangedEvent);
    task.querySelector("#deleteTaskIcon").addEventListener('click', taskDeleted);
    task.querySelector("#newTaskIcon").addEventListener('click', createNewTask);
}

//EVENT: Task is created
const textInputForNewTask = document.querySelector('#newTaskDiv input');
createNewTask = (e) => {
    if (e.target !== "") {
        createTaskDiv = (taskId, text) => {

            const taskDiv = document.createElement("div");
            taskDiv.setAttribute("id", "task");
            taskDiv.setAttribute("data-task_id", taskId);

            const task = document.querySelector("#clone-new-task");
            const newTask = task.cloneNode(true);
            newTask.querySelector('input').value = text;

            taskDiv.append(newTask);

            return taskDiv;
        }
        const text = e.target.value;
        axios.post('/task', { text })
            .then((res) => {
                const taskId = res.data

                const newTask = createTaskDiv(taskId, text);

                wireEvents(newTask);

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
textInputForNewTask.addEventListener('change', createNewTask);

const tasks = document.querySelectorAll("#task");
tasks.forEach(task => wireEvents(task));


