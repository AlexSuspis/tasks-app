//UI Events
//Expand task options (Click on options icon)
const optionIcons = document.querySelectorAll("#optionsIcon");
for (let icon of optionIcons) {
    icon.addEventListener('click', function (e) {
        const respectiveOverlayMenu = e.target.nextElementSibling;
        console.log(respectiveOverlayMenu);
        toggleElementVisibility(respectiveOverlayMenu);
    })
}
const toggleElementVisibility = (el) => {
    console.log(el)
    if (el.style.display === 'none') {
        el.style.display = 'inline';
    } else {
        el.style.display = 'none';
    }
}


//EVENT: Task’s text is modified
//Trigger: A change in input element is detected. Only then 
//is the AXIOS request sent.

const textInputs = document.querySelectorAll('#task input')
for (let textInput of textInputs) {
    textInput.addEventListener('input', function () {
        alert("input event!");
    });
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

