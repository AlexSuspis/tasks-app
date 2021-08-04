findAncestorElementWithId = (startElement, targetId) => {

    let ancestor = startElement.parentElement;
    do {
        if (ancestor.getAttribute("id") === targetId) {
            return ancestor;
        }
    } while ((ancestor = ancestor.parentElement) !== null);

    return null;
}
toggleElementVisibility = (el) => {
    if (el.style.display === 'inline') {
        el.style.display = 'none';
    } else {
        el.style.display = 'inline';
    }
}