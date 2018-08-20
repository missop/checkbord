export default function addClassOn(className, num) {
    return document.querySelectorAll('.' + className)[num].className = className + ' on'
}