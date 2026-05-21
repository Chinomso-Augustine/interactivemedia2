
(function () {

    let groupOne = document.querySelector("#firstGroup");
    let groupTwo = document.querySelector("#secondGroup");
    let btn = document.querySelector(".Info");
    let animate = document.querySelector("#animate");
    let frame = document.querySelector(".frame");

    function switching() {
        if (groupTwo.style.display == "block" && btn.textContent == "Switch") {
            groupOne.style.display = "block";
            groupTwo.style.display = "none";
            btn.textContent = "Switched";
            btn.style.color = "Gold";
            btn.style.border = "20px dashed gold";
        }
        else {
            groupOne.style.display = "none";
            groupTwo.style.display = "block";
            btn.textContent = "Switch";
            btn.style.border = "20px dashed white";
        }
    }

    btn.addEventListener('click', switching);
    setInterval(switching, 3000);

    animate.addEventListener("click", function () {
        frame.classList.toggle("isAnimating");

        if (frame.classList.contains("isAnimating")) {
            animate.textContent = "Stop";
        }
        else {
            animate.textContent = "Animate";
        }
    });

}
)(); 
