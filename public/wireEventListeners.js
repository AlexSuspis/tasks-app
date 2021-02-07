    //UI Events
//Expand task options (Click on options icon)
const optionIcons = document.querySelectorAll('span');
for(let icon of optionIcons){
    icon.addEventListener('click', function(){
        alert("ahhh!")
    })
}


//


    // AXIOS PATCH REQUESTS

// Task’s text is modified (1)
    //Trigger: A change in input element is detected. Then validated. Only then 
    //is the AXIOS request sent.

// Task’s colour is changed (2)
    //Trigger: Colour pallette pops up when colour icon is clicked in 
    //expanded OverlayMenu. When a colour is successfully saved, PATCH request sent.

// Task’s subtask has been completed (3)

// Label is added to task (4)

// Subtask has been created (5)
    //Trigger: Subtask icon in OverlayMenu is clicked.

// Subtask has been completed (6)

// Task’s order is changed (7)



    //AXIOS DELETE REQUESTS

// Task has been deleted (8)
    //Trigger: Trash icon in task's overlay menu is clicked

// Task has been completed (9)
    //Trigger: Circular button in task's object has been clicked


