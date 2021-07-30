//TASK CRUD EVENTS
//CREATE
//POST
//PATCH
//DELETE
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

//EVENT: Task is created
const newTaskTextInput = document.querySelector('#newTaskDiv input');
newTaskCreated = (e) => {
    if (e.target !== "") {
        createNewTask = (taskId, text) => {

            const taskDiv = document.createElement("div");
            taskDiv.setAttribute("id", "task");
            taskDiv.setAttribute("data-task_id", taskId);

            const taskComponent = document.querySelector("#clone-new-task");
            const newTaskComponent = taskComponent.cloneNode(true);
            newTaskComponent.querySelector('input').value = text;

            taskDiv.append(newTaskComponent);

            return taskDiv;
        }
        wireEvents = (newTask) => {
            newTask.querySelector("#optionsIcon").addEventListener('click', toggleOptionsMenu);
            newTask.querySelector("#taskButton").addEventListener('click', taskCompleted);
            newTask.querySelector("#taskTextInput").addEventListener('change', taskTextChangedEvent);
        }
        const text = e.target.value;
        axios.post('/task', { text })
            .then((res) => {
                const taskId = res.data

                const newTask = createNewTask(taskId, text);

                //WIRE EVENTS
                //wire button of new task div with task completed event
                //wire input with text change event
                //wire optionIcon
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
newTaskTextInput.addEventListener('change', newTaskCreated);




//EVENT: Task options icon is clicked
//Expand task options (Click on options icon)
const optionIcons = document.querySelectorAll("#optionsIcon");
for (let icon of optionIcons) {
    icon.addEventListener('click', toggleOptionsMenu);
}

const toggleElementVisibility = (el) => {
    if (el.style.display === 'inline') {
        el.style.display = 'none';
    } else {
        el.style.display = 'inline';
    }
}


//EVENT: Task’s text is modified
//Trigger: A change in input element is detected. Only then 
//is the AXIOS request sent.
const textInputs = document.querySelectorAll('#task input');
for (let textInput of textInputs) {
    textInput.addEventListener('change', taskTextChangedEvent)
}

//EVENT: Task’s colour is changed
//Trigger: Colour pallette pops up when colour icon is clicked in 
//expanded OverlayMenu. When a colour is successfully saved, PATCH request sent.


//EVENT: Task has been completed
//Trigger: Circular button in task's object has been clicked

const taskButtons = document.querySelectorAll('#task #taskButton');
for (let button of taskButtons) {
    button.addEventListener('click', taskCompleted)
}


//EVENT: Subtask has been completed

const subtaskButtons = document.querySelectorAll('#task #subtaskButton');
for (let button of subtaskButtons) {
    button.addEventListener('click', function () {
        alert('subtask completed event!')
    })
}

//EVENT: Label is added to task
// const labelIcons = document.querySelectorAll('');


//EVENT: Subtask has been created
//Trigger: Subtask icon in OverlayMenu is clicked.


//EVENT: Task’s order is changed
// click and drag

//EVENT: Task has been deleted
//Trigger: Trash icon in task's overlay menu is clicked

