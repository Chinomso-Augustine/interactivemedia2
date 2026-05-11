(function () {

    "use strict";
    console.log("reading js");

    const myForm = document.querySelector('#myForm');
    const madlib = document.querySelector('#madlib');
    const formData = document.querySelectorAll("input[type=text]");

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        processFormData(formData);
    });

    function makeMadlib(words) {
        const myText = `
    Freedom isn't a  ${words[0]} wrapped in paper, 
    it’s the ${words[1]} found in the silence of peace.
    It isn’t a ${words[2]} to be guarded, 
    but a ${words[3]} waiting to be crossed.
    It doesn’t ${words[4]} like an old memory; 
    it ${words[5]} like the rising tide.
    We all ${words[6]} for Freedom
    So why ${words[7]})  for the cage?
   `;
        madlib.innerHTML = myText;

        for (const eachField of formData) {
            eachField.value = "";
        }
    }

    function processFormData(formData) {
        const words = [];
        let emptyFields = [];
        let counter = 0;

        for (const eachWords of formData) {
            if (eachWords.value) {
                words.push(eachWords.value);
                eachWords.value = "";
            }
            else {
                emptyFields.push(counter);
            }
            counter++;
        }

        if (emptyFields.length > 0) {
            showErrors(formData, emptyFields);
        }
        else {
            makeMadlib(words);
        }
    }

    //gets form id and set message to that id
    function showErrors(formData, emptyFields) {
        const errorId = formData[emptyFields[0]].id;
        const errorText = `Please fill out this field: ${errorId}`;
        madlib.innerHTML = errorText;
        document.querySelector(`#${errorId}`).focus();
    }

})();
