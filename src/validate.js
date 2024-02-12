
import IMask from 'imask';

const nameInput = document.querySelector("#name");

const emailInput = document.querySelector("#email");

const phoneInput = document.querySelector("#phone");

const phoneMask = new IMask(phoneInput, {
    mask: "+{375}(00)000-00-00",
});

const messageArea = document.querySelector("#message");

const submitBtn = document.querySelector("#submitForm");

const errorRequred = document.querySelector("#errorRequired");

const emailError = document.querySelector("#emailError");

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let isValidate = false;

    const nameValue = nameInput.value;
    const emailValue = emailInput.value;
    const phoneValue = phoneInput.value;
    const messageValue = messageArea.value;
    if(nameValue === '' || emailValue === '' || phoneValue === '' || messageValue === '') {
        errorRequred.classList.add("show");
        if(nameValue === '') {
            nameInput.classList.add("error");
        }
        if(emailValue === '') {
            emailInput.classList.add("error");
        }
        if(phoneValue === '') {
            phoneInput.classList.add("error");
        }
        if(messageValue === '') {
            messageArea.classList.add("error");
        }
    }

    const regularEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regularEx.test(String(emailValue).toLowerCase())){
        isValidate = true;
    } else {
        console.log(`Email is not OK`);
        if(emailValue !== '') {
            emailInput.classList.add("error");
            emailError.classList.add("show");
        }
    }
    
    if (phoneMask.masked.isComplete) {
        isValidate = true;
    } else {
        console.log(`Phone mask is NOT complete`);
    }

    if(isValidate === true) {
        fetch('http://localhost:9090/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json()) 
        .then(data => console.log(`Success `, data))
        .catch(error => console.error('Error:', error));
    }
});

function hideErrors() {
    errorRequred.classList.remove("show");
    emailError.classList.remove("show");
    nameInput.classList.remove("error");
    emailInput.classList.remove("error");
    phoneInput.classList.remove("error");
    messageArea.classList.remove("error");
}

nameInput.addEventListener("keypress", () => {
    hideErrors();
});

emailInput.addEventListener("keypress", () => {
    hideErrors();
});

phoneInput.addEventListener("keypress", () => {
    hideErrors();
});

messageArea.addEventListener("keypress", () => {
    hideErrors();
});
