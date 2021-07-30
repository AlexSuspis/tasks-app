wireEvents = (task) => {
    toggleElementVisibility = (el) => {
        if (el.style.display === 'inline') {
            el.style.display = 'none';
        } else {
            el.style.display = 'inline';
        }
    }
    toggleOptionsMenu = (e) => {
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

    task.querySelector("#optionsIcon").addEventListener('click', toggleOptionsMenu);
    task.querySelector("#taskButton").addEventListener('click', taskCompleted);
    task.querySelector("#taskTextInput").addEventListener('change', taskTextChangedEvent);
    task.querySelector("#deleteTaskIcon").addEventListener('click', taskDeleted);
    task.querySelector("#newTaskIcon").addEventListener('click', createNewTask);
}

//EVENT: Task is created
const newTaskTextInput = document.querySelector('#newTaskDiv input');
createNewTask = (e) => {
    if (e.target !== "") {
        createTaskComponent = (taskId, text) => {

            const taskDiv = document.createElement("div");
            taskDiv.setAttribute("id", "task");
            taskDiv.setAttribute("data-task_id", taskId);

            const taskComponent = document.querySelector("#clone-new-task");
            const newTaskComponent = taskComponent.cloneNode(true);
            newTaskComponent.querySelector('input').value = text;

            taskDiv.append(newTaskComponent);

            return taskDiv;
        }
        const text = e.target.value;
        axios.post('/task', { text })
            .then((res) => {
                const taskId = res.data

                const newTask = createTaskComponent(taskId, text);

                wireEvents(newTask);

                document.querySelector("#container").append(newTask);

                //reset text input for new task
                newTaskTextInput.value = "";
                newTaskTextInput.placeholder = "Add another item";
            })
            .catch((err) => {
                console.log(err)
            });
    }
}
newTaskTextInput.addEventListener('change', createNewTask);


const tasks = document.querySelectorAll("#task");
tasks.forEach(task => wireEvents(task));


