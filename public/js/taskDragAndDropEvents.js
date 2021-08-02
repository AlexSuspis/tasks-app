const dragHandles = document.querySelectorAll('.myDragHandle');

findAncestorElementWithId = (startElement, targetId) => {

    let ancestor = startElement.parentElement;
    do {
        if (ancestor.getAttribute("id") === targetId) {
            return ancestor;
        }
    } while ((ancestor = ancestor.parentElement) !== null);

    return null;
}