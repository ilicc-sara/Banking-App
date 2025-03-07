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

const errorText = document.querySelector(".error-text"); // div ispod inputa
const errorBtn = document.querySelector(".error-btn"); // btn za brisanje  error notifikacije

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

function createErrorNotification(parentElement, text) {
  if (document.querySelector(".error-text")) return;

  const notification = document.createElement("div");
  notification.innerHTML = `${text} <div class="error-btn">X</div>`;
  notification.className = "error-text";

  parentElement.appendChild(notification);
  const errorBtn = notification.querySelector(".error-btn");

  errorBtn.addEventListener("click", function (e) {
    notification.remove();
  });
}

// createErrorNotification("Error notification");

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  manager.accounts.find(function (acc) {
    // prettier-ignore
    if (inputEmail === acc.email && inputPassword === acc.password) {   
      logInForm.classList.add("hidden");

      homePage.classList.remove("hidden");
      user.textContent = `${
        acc.username[0].toUpperCase() + acc.username.slice(1).toLowerCase()
      }`;
    } else {
      // errorText.classList.remove("hidden");
      createErrorNotification(logInForm, 'Email or password is incorrect!')
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
  }
  createErrorNotification(signUpForm, "Email or password is incorrect!");

  inputEmailEl2.value = "";
  inputPasswordEl2.value = "";
  inputUsernameEl2.value = "";
});
