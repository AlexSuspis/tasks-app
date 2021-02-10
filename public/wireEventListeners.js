//All event listeners for each task component.


    //UI Events
//Expand task options (Click on options icon)
const optionIcons = document.querySelectorAll('#optionsIcon');
for(let icon of optionIcons){
    icon.addEventListener('click', function(){
        alert("ahhh!")
    })
}




    // AXIOS PATCH REQUESTS

// Task’s text is modified (1)
    //Trigger: A change in input element is detected. Only then 
    //is the AXIOS request sent.

    const textInputs = document.querySelectorAll('#task input')
    for(let textInput of textInputs){
        textInput.addEventListener('input', function(){
            alert("input event!");
        });
    }

// Task’s colour is changed (2)
    //Trigger: Colour pallette pops up when colour icon is clicked in 
    //expanded OverlayMenu. When a colour is successfully saved, PATCH request sent.

// Task’s subtask has been completed (3) (same as below??)
// Subtask has been completed (4)

    const subtaskButtons = document.querySelectorAll('#task #subtaskButton');
        for(let button of subtaskButtons) {
        button.addEventListener('click', function(){
            alert('subtask completed event!')
        })
    } 

// Label is added to task (5)
    const labelIcons = document.querySelectorAll('');
// Subtask has been created (6)
    //Trigger: Subtask icon in OverlayMenu is clicked.

// Task’s order is changed (7)
// click and drag


    //AXIOS DELETE REQUESTS

// Task has been deleted (8)
    //Trigger: Trash icon in task's overlay menu is clicked

// Task has been completed (9)
    //Trigger: Circular button in task's object has been clicked

    const taskButtons = document.querySelectorAll('#task #taskButton');
        for(let button of taskButtons) {
        button.addEventListener('click', function(){
            alert('task completed event!')
        })
    } 


