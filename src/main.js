"use strict";
import "./style.css";

const signUpLink = document.querySelector(".sign-up-link");

const signUpForm = document.querySelector(".sign-up-form");
const overlay = document.querySelector(".overlay");

const logInForm = document.querySelector(".log-in-form");

const inputEmailEl = document.querySelector(".input-email");
const inputPasswordEl = document.querySelector(".input-password");

const inputEmailEl2 = document.querySelector(".input-email-sign");
const inputPasswordEl2 = document.querySelector(".input-password-sign");
const inputUsernameEl2 = document.querySelector(".input-username-sign");

const homePage = document.querySelector(".page");
const user = document.querySelector(".username");

const errorText = document.querySelector(".error-text");
const errorBtn = document.querySelector(".error-btn");

const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");

const emailErrorSign = document.querySelector(".email-error-sign");
const passwordErrorSign = document.querySelector(".password-error-sign");

let inputEmail;
let inputPassword;
let inputEmailSignUp;
let inputPasswordSignUp;
let inputUsernameSignUp;

inputEmailEl.addEventListener("input", function (e) {
  inputEmail = e.target.value;
});
inputPasswordEl.addEventListener("input", function (e) {
  inputPassword = e.target.value;
});
inputEmailEl2.addEventListener("input", function (e) {
  inputEmailSignUp = e.target.value;
});
inputPasswordEl2.addEventListener("input", function (e) {
  inputPasswordSignUp = e.target.value;
});
inputUsernameEl2.addEventListener("input", function (e) {
  inputUsernameSignUp = e.target.value;
});

signUpLink.addEventListener("click", function (e) {
  signUpForm.classList.remove("hidden");
  overlay.classList.remove("hidden");

  emailErrorSign.classList.add("hidden");
  passwordErrorSign.classList.add("hidden");
});

overlay.addEventListener("click", function (e) {
  signUpForm.classList.add("hidden");
  overlay.classList.add("hidden");
});

const account1 = {
  username: "sara",
  email: "sara@gmail.com",
  password: "1111",
};
const account2 = {
  username: "jonas",
  email: "jonas@gmail.com",
  password: "2222",
};
const account3 = {
  username: "pera",
  email: "pera@gmail.com",
  password: "3333",
};

class Account {
  constructor(email, password, username) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}

class AccountManager {
  constructor() {
    this.accounts = [account1, account2, account3];
  }

  add(acc) {
    this.accounts.push(acc);
  }
}

const manager = new AccountManager();

const createErrorNotification = function (email, password) {
  if (!email.includes("@")) {
    emailError.classList.remove("hidden");
  } else {
    emailError.classList.add("hidden");
  }
  if (!(password.length >= 4)) {
    passwordError.classList.remove("hidden");
  } else {
    passwordError.classList.add("hidden");
  }
};

const createErrorNotificationSignUp = function (email, password) {
  if (!email.includes("@")) {
    emailErrorSign.classList.remove("hidden");
  } else {
    emailErrorSign.classList.add("hidden");
  }
  if (!(password.length >= 4)) {
    passwordErrorSign.classList.remove("hidden");
  } else {
    passwordErrorSign.classList.add("hidden");
  }
};

errorBtn.addEventListener("click", function (e) {
  errorText.classList.add("hidden");
});

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  createErrorNotification(inputEmail, inputPassword);

  manager.accounts.forEach(function (acc) {
    if (inputEmail === acc.email && inputPassword === acc.password) {
      logInForm.classList.add("hidden");

      homePage.classList.remove("hidden");
      user.textContent = `${
        acc.username[0].toUpperCase() + acc.username.slice(1).toLowerCase()
      }`;
    } else {
      // alert("Email or password is incorrect!");
      errorText.classList.remove("hidden");
    }
  });
});

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (inputEmailSignUp.includes("@") && inputPasswordSignUp.length >= 4) {
    signUpForm.classList.add("hidden");
    overlay.classList.add("hidden");
    console.log(inputEmailSignUp, inputPasswordSignUp, inputUsernameSignUp);

    // prettier-ignore
    const newAccount = new Account(inputEmailSignUp, inputPasswordSignUp, inputUsernameSignUp);

    manager.add(newAccount);
  } else {
    createErrorNotificationSignUp(inputEmailSignUp, inputEmailSignUp);
  }

  inputEmailEl2.value = "";
  inputPasswordEl2.value = "";
  inputUsernameEl2.value = "";
});
