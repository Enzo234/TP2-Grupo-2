window.addEventListener('load', function () {
    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent('scroll')) //Mini hack
});

window.addEventListener('scroll', function () {
    let elements = document.getElementsByClassName('anim');
    let screenSize = window.innerHeight;

    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];

        if (element.getBoundingClientRect().top + 100 < screenSize) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    }
});