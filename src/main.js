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

// console.log(inputEmailEl);
// console.log(inputPasswordEl);

// console.log(inputEmailEl2);
// console.log(inputPasswordEl2);
// console.log(inputUsernameEl2);

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

class Account {
  constructor() {
    this.email = "";
    this.password = "";
    this.username = "";
  }
}

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(inputEmail, inputPassword);
});

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
});
