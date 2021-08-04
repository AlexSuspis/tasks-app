//wire all events
const taskContainers = document.querySelectorAll("#taskContainer");
taskContainers.forEach(taskContainer => {
    wireDragAndDropEvents(taskContainer)
    wireCRUDEvents(taskContainer)
});
