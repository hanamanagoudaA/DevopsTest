function setDynamicStyle() {
    var elements;
    elements = document.getElementsByTagName("*");
    if (document.all) {
        elements = document.all;
    }
    for (i = 0; i < elements.length; i++) {
        var elem = elements[i];
        var clazz = elem.className;
        if (parent.frames.length == 0) {
            if (clazz == 'displayFrame') {
                elem.style.display = 'none';
            }
            else {
                elem.style.display = '';
            }
        }
        else {
            if (clazz == 'displayNoFrame') {
                elem.style.display = 'none';
            }
            else {
                elem.style.display = '';
            }
        }
    }
}
