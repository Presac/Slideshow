
let slideIndex = 0;
let delay = 10000
let slideTimeout
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    slideTimeout = setTimeout(showSlides, delay);
}

//     document.addEventListener('contextmenu', function (e) {
//         let result = prompt("Set delay (seconds)");
//         delay = result * 1000;
//         e.preventDefault();
//     }, false);


function SetDelay(input) {
    delay = input * 1000;
    clearTimeout(slideTimeout);
    slideTimeout = setTimeout(showSlides, delay);
    contextMenu.style.visibility = "hidden"
}

//initial declaration
var timeout;

//refer menu div
let contextMenu = document.getElementById("context-menu");

//same function for both events
//event type is a data structure that defines the data contained in an event
document.addEventListener(
    "contextmenu",
    (e) => {
        //preventDefault() method stops the default action of a selected element from happening by a user
        e.preventDefault();
        //x and y position of mouse or touch
        //mouseX represents the x-coordinate of the mouse
        let mouseX = e.clientX || e.touches[0].clientX;
        //mouseY represents the y-coordinate of the mouse.
        let mouseY = e.clientY || e.touches[0].clientY;
        //height and width of menu
        //getBoundingClientRect() method returns the size of an element and its position relative to the viewport
        console.log(contextMenu);
        let rect = contextMenu.getBoundingClientRect()
        let menuHeight = rect.height;
        let menuWidth = rect.width;
        //width and height of screen
        //innerWidth returns the interior width of the window in pixels
        let width = window.innerWidth;
        let height = window.innerHeight;
        //If user clicks/touches near right corner
        if (width - mouseX <= 200) {
            contextMenu.style.borderRadius = "5px 0 5px 5px";
            contextMenu.style.left = width - menuWidth + "px";
            contextMenu.style.top = mouseY + "px";
            //right bottom
            if (height - mouseY <= 200) {
                contextMenu.style.top = mouseY - menuHeight + "px";
                contextMenu.style.borderRadius = "5px 5px 0 5px";
            }
        }
        //left
        else {
            contextMenu.style.borderRadius = "0 5px 5px 5px";
            contextMenu.style.left = mouseX + "px";
            contextMenu.style.top = mouseY + "px";
            //left bottom
            if (height - mouseY <= 200) {
                contextMenu.style.top = mouseY - menuHeight + "px";
                contextMenu.style.borderRadius = "5px 5px 5px 0";
            }
        }
        //display the menu
        contextMenu.style.visibility = "visible";
    },
    { passive: false }
);

//click outside the menu to close it (for click devices)
document.addEventListener("click", function (e) {
    if (!contextMenu.contains(e.target)) {
        contextMenu.style.visibility = "hidden";
    }
});