
(function () {

    let groupOne = document.querySelector("#firstGroup");
    let groupTwo = document.querySelector("#secondGroup");
    let btn = document.querySelector(".Info");
    let animate = document.querySelector("#animate");
    let frame = document.querySelector(".frame");
    let showingFirstGroup = false;

    function updateGroups() {
        groupOne.classList.toggle("is-active", showingFirstGroup);
        groupOne.classList.toggle("is-hidden", !showingFirstGroup);
        groupTwo.classList.toggle("is-active", !showingFirstGroup);
        groupTwo.classList.toggle("is-hidden", showingFirstGroup);

        if (showingFirstGroup) {
            btn.textContent = "Switched";
            btn.style.color = "Gold";
            btn.style.border = "20px dashed gold";
        }
        else {
            btn.textContent = "Switch";
            btn.style.color = "#efeeea";
            btn.style.border = "20px dashed white";
        }
    }

    function switching() {
        showingFirstGroup = !showingFirstGroup;
        updateGroups();
    }

    updateGroups();
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
