//EVENT: Task is created
const newTaskTextInput = document.querySelector('#newTaskDiv input');
newTaskTextInput.addEventListener('change', function (e) {
    if (e.target !== "") {
        const text = e.target.value;
        axios.post('/task', { text })
            .then((res) => {
                const taskId = res.data

                const taskDiv = createTaskDiv(taskId, text);

                //WIRE EVENTS
                //wire button of new task div with task completed event
                //wire input with text change event



                document.querySelector("#container").append(taskDiv);

                //reset text input for new task
                newTaskTextInput.value = "";
                newTaskTextInput.placeholder = "Add another item";
            })
            .catch((err) => {
                alert(err)
            });
    }
});

createTaskDiv = (taskId, text) => {
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("id", "task");
    taskDiv.setAttribute("data-task_id", taskId);
    console.log(taskDiv);

    const taskComponent = document.querySelector("#clone-new-task");
    const newTaskComponent = taskComponent.cloneNode(true);
    newTaskComponent.querySelector('input').value = text;

    taskDiv.append(newTaskComponent);

    return taskDiv;
}

wireNewTaskComponentEvents = (taskDiv) => {

}

//EVENT: Task options icon is clicked
//Expand task options (Click on options icon)
optionsIconClickEventListener = (e) => {
    const overlayMenu = e.target.nextElementSibling;
    toggleElementVisibility(overlayMenu);
}
const optionIcons = document.querySelectorAll("#optionsIcon");
for (let icon of optionIcons) {
    icon.addEventListener('click', optionsIconClickEventListener);
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
    textInput.addEventListener('change', function (e) {
        console.log(e.target.parentElement.getAttribute('data-task_id'));
        //     console.log(e.target.value)
        //     axios.patch('/task/2/text', { newText: e.target.value })
        //         .then(function (res) {
        //             console.log(res);
        //         })
        //         .catch(function (err) {
        //             console.log(err);
        //         })

        // });
    }
    )
}

//EVENT: Task’s colour is changed
//Trigger: Colour pallette pops up when colour icon is clicked in 
//expanded OverlayMenu. When a colour is successfully saved, PATCH request sent.


//EVENT: Task has been completed
//Trigger: Circular button in task's object has been clicked

const taskButtons = document.querySelectorAll('#task #taskButton');
for (let button of taskButtons) {
    button.addEventListener('click', function () {
        alert('task completed event!')
    })
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

