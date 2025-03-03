"use strict";
import "./style.css";

const signUpLink = document.querySelector(".sign-up-link");

const signUpForm = document.querySelector(".sign-up-form");
const overlay = document.querySelector(".overlay");

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
