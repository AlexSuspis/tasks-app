const newTaskTextInput = document.querySelector('#newTaskDiv input');
console.log(newTaskTextInput)

//EVENT: User adds or deletes input. We want to toggle looks between 'newTask' and 'Task'
//---------IMPLEMENTING LATER, TOO MUCH WORK NOW---------
// newTaskTextInput.addEventListener('input', function (e) {
//     if (e.target.value !== '') {
//         console.log('non empty')
//     } else console.log('empty')
// })

//EVENT: Task is created
newTaskTextInput.addEventListener('change', function (e) {
    if (e.target !== "") {
        axios.post('/task', { text: e.target.value })
            .then((res) => {
                const taskId = res.data

                //create html for new task, and append it to task container div.
                //  get task id from res.data, and wire it onto task div in html code
                const taskDiv = document.createElement("div");
                taskDiv.setAttribute("id", "task");
                taskDiv.setAttribute("data-task_id", taskId);
                console.log(taskDiv);

                const button = document.createElement("button");
                button.setAttribute("id", "taskButton");
                button.innerText = "test";
                taskDiv.prepend(button);
                //white space between button and next element
                taskDiv.append(document.createTextNode("\u00A0"));

                const input = document.createElement("input")
                input.value = e.target.value;
                input.setAttribute("id", "taskTextInput");
                taskDiv.append(input);
                taskDiv.append(document.createTextNode("\u00A0"));

                document.querySelector("#container").append(taskDiv);



                //reset new task component
                newTaskTextInput.value = "";
                newTaskTextInput.placeholder = "Add another item";
            })
            .catch((err) => {
                alert(err)
            });
    }
})


//EVENT: Task options icon is clicked
//Expand task options (Click on options icon)
const optionIcons = document.querySelectorAll("#optionsIcon");
for (let icon of optionIcons) {
    icon.addEventListener('click', function (e) {
        const respectiveOverlayMenu = e.target.nextElementSibling;
        toggleElementVisibility(respectiveOverlayMenu);
    })
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


binIcon
taskIcon
colourPaletteIcon
labelIcon


//EVENT: Task’s order is changed
// click and drag

//EVENT: Task has been deleted
//Trigger: Trash icon in task's overlay menu is clicked

