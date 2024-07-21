
const form = document.querySelector('#registration-form');
const submitButton = document.querySelector('#submit-button');

const validateName = (input) => {
    const value = input.value;
    return (/^[a-zA-Zа-яА-Я]{2,30}$/.test(value));
};

const validateEmail = (input) => {
    const value = input.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (emailPattern.test(value));
};

const validatePassword = (input) => {
    const value = input.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return (passwordPattern.test(value))
};

const validatePasswordMatch = () => {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    return (password === confirmPassword);
};

const validateBirthdate = (input) => {
    if(!input.value) return false;
    const value = new Date(input.value);
    const today = new Date();
    const age = today.getFullYear() - value.getFullYear();
    return !(age < 18 || (age === 18 && today.getMonth() < value.getMonth()) || (age === 18 && today.getMonth() === value.getMonth() && today.getDate() < value.getDate()));
};

const checkFormValidity = () => {
    const isFirstNameValid = validateName(document.getElementById('first-name'));
    const isLastNameValid = validateName(document.getElementById('last-name'));
    const isEmailValid = validateEmail(document.getElementById('email'));
    const isPasswordValid = validatePassword(document.getElementById('password'));
    const isPasswordMatchValid = validatePasswordMatch();
    const isBirthdateValid = validateBirthdate(document.getElementById('birthdate'));

    submitButton.disabled = !(isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isPasswordMatchValid && isBirthdateValid);
};

const functionsToInputs = {
    'first-name': {
        validate: validateName,
        errorMessage: 'Firstname must contain only letters and be between 2 and 30 characters long.',
    },
    'last-name': {
        validate: validateName,
        errorMessage: 'Lastname must contain only letters and be between 2 and 30 characters long.',
    },
    'email': {
        validate: validateEmail,
        errorMessage: 'Enter a valid email address.',
    },
    'password': {
        validate: validatePassword,
        errorMessage: 'Password must contain at least 8 characters, including digits, uppercase and lowercase letters, and special characters.',
    },
    'confirm-password': {
        validate: validatePasswordMatch,
        errorMessage: 'Passwords do not match.',
    },
    'birthdate': {
        validate: validateBirthdate,
        errorMessage: 'You must be at least 18 years old.',
    },
};

form.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
        const errorElement = form.querySelector(`#${input.id}-error`);
        const isValid = functionsToInputs[input.id].validate(input);
        if(isValid) {
            errorElement.textContent = '';
        } else {
            errorElement.textContent = functionsToInputs[input.id].errorMessage;
        }
    });
});

form.addEventListener('input', checkFormValidity);