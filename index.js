const form = document.querySelector(".signup-form");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#confirm-pass");


[password, passwordConfirm].forEach(field => {
  field.addEventListener("input", promptNonMatchingPassword)
})

function promptNonMatchingPassword() {
  const passError = password.nextElementSibling;
  const confirmError = passwordConfirm.nextElementSibling;
  const text = "Passwords do not match";


  if (password.value !== passwordConfirm.value) {
    [passError, confirmError].forEach(errMsg => {
      errMsg.textContent = text;
      errMsg.classList.add("active");
    })
  } else {
    [passError, confirmError].forEach(errMsg => {
      errMsg.classList.remove("active");
    })
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const result = validate();

  Object.keys(result).forEach(key => {
    const field = form.querySelector(`#${key}`);
    field.nextElementSibling.textContent = result[key];

    if (result[key]) {
      field.nextElementSibling.classList.add("active");
    } else {
      field.nextElementSibling.classList.remove("active");
    }
  })
})

function validate() {
  const firstName = form.querySelector("#first-name");
  const lastName = form.querySelector("#last-name");
  const email = form.querySelector("#email");
  const password = form.querySelector("#password");
  const confirmPassword = form.querySelector("#confirm-pass");
  const errors = {
    "first-name": "",
    "last-name": "",
    "email": "",
    "password": "",
    "confirm-pass": ""
  };

  if (!firstName.value) {
    errors["first-name"] = "First name is required";
    firstName.nextElementSibling.classList.add("active");
  }

  if (!lastName.value) {
    errors["last-name"] = "First name is required";
  }

  const emailRegex = /^[a - zA - Z0 - 9.!#$ %& '*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.value.match(emailRegex) || !email.value) {
    errors["email"] = "Enter a valid email";
  }

  if (password.value !== confirmPassword.value) {
    errors["password"] = "Passwords do not match";
    errors["confirm-pass"] = "Passwords do not match";
  }

  if (!password.value) {
    errors["password"] = "Please provide a password";
  }

  return errors;
}
