"use strict";
import "./style.css";
// prettier-ignore
import { signUpLink, signUpForm, overlay, logInForm, inputEmailEl, inputPasswordEl, inputEmailEl2, inputPasswordEl2, inputUsernameEl2, homePage, user, transactionList, totalBalanceEl, totalDepositEl, totalWithdrawalEl, sortContainer, logOut, loanForm, inputLoanEl } from "./helpers";

const deleteForm = document.querySelector(".delete");
const inputDeleteUsernameEl = document.querySelector(".input-username-delete");
const inputDeletePasswordEl = document.querySelector(".input-password-delete");

let inputEmail;
let inputPassword;
let inputEmailSignUp;
let inputPasswordSignUp;
let inputUsernameSignUp;

let activeAccount;

let inputLoan;

let inputDeleteUsername;
let inputDeletePassword;

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

inputLoanEl.addEventListener("input", function (e) {
  inputLoan = e.target.value;
});

inputDeleteUsernameEl.addEventListener("input", function (e) {
  inputDeleteUsername = e.target.value;
});
inputDeletePasswordEl.addEventListener("input", function (e) {
  inputDeletePassword = e.target.value;
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
  constructor(email, password, username, balance) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.balance = balance;
  }

  setTotalBalance() {
    return this.balance.reduce((acc, cur) => acc + cur);
  }

  setTotalIncome() {
    // prettier-ignore
    return this.balance.filter(transaction => transaction > 0).reduce((acc, cur)=> acc + cur);
  }

  setTotalWithdrawal() {
    // prettier-ignore
    return this.balance.filter(transaction => transaction < 0).reduce((acc, cur)=> acc + cur);
  }

  sortAscending() {
    return this.balance.sort();
  }

  sortDescending() {
    return this.balance.sort((a, b) => b - a);
  }

  addTransaction(number) {
    this.balance.push(number);
  }
}

// prettier-ignore
const account1 = new Account("sara@gmail.com","1111", "sara", [200, 300, -400, 1000, -700, 300, 200, -350, 1100, -800]);
// prettier-ignore
const account2 = new Account("jonas@gmail.com", "2222", "jonas", [600, 500, -800, 2000, -1700, 200, 300, -400, 1000]);
// prettier-ignore
const account3 = new Account("pera@gmail.com", "3333", "pera", [100, 900, -500, 1200, -600, -800, 2000, -1700, 200]);

class AccountManager {
  constructor() {
    this.accounts = [account1, account2, account3];
  }

  add(acc) {
    this.accounts.push(acc);
  }

  deleteAccount(account) {
    return (this.accounts = this.accounts.filter((acc) => acc !== account));
  }
}

const manager = new AccountManager();

function createErrorNotification(parentElement, text) {
  if (document.querySelector(".error-text")) return;

  const notification = document.createElement("ul");
  notification.innerHTML = `<li > ${text} <button type="button" class="error-btn">❌</button> </li>`;
  notification.className = "error-text";

  parentElement.appendChild(notification);
  const errorBtn = notification.querySelector(".error-btn");

  // errorBtn.addEventListener("click", function (e) {
  //   notification.remove();
  // });
}

function createTransactionElement(transaction, i) {
  const item = document.createElement("li");
  // prettier-ignore
  item.innerHTML = `<div class="type-${(transaction > 0) ? "deposit" : "withdrawal"}"><span class="num-transaction">${i+1}</span> ${(transaction > 0) ? "Deposit" : "Withdrawal"}</div> <span class="date">07.03.2025.</span> <span class="number">${transaction}$</span>`;
  item.className = "transaction-item";

  transactionList.appendChild(item);
}

function updateInfoUI(acc) {
  totalBalanceEl.textContent = acc.setTotalBalance();
  totalDepositEl.textContent = acc.setTotalIncome();
  totalWithdrawalEl.textContent = acc.setTotalWithdrawal();
}

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  manager.accounts.find(function (acc) {
    // prettier-ignore
    if (inputEmail === acc.email && inputPassword === acc.password) {   
      activeAccount = acc;
      logInForm.classList.add("hidden");

      homePage.classList.remove("hidden");
      user.textContent = `${
        acc.username[0].toUpperCase() + acc.username.slice(1).toLowerCase()
      }`;

      acc.balance.forEach((transaction, i) => {
        createTransactionElement(transaction, i)

       
      });

      updateInfoUI(acc)

    } else {
      createErrorNotification(logInForm, 'Email or password is incorrect!')
    }

    inputEmailEl.value = "";
    inputPasswordEl.value = "";
  });
});

signUpForm.addEventListener("click", function (e) {
  if (e.target.classList.contains("error-btn")) {
    const notification = e.target.closest(".error-text");
    notification.remove();
  }
});

logInForm.addEventListener("click", function (e) {
  if (e.target.classList.contains("error-btn")) {
    const notification = e.target.closest(".error-text");
    notification.remove();
  }
});

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (inputEmailSignUp.includes("@") && inputPasswordSignUp.length >= 4) {
    signUpForm.classList.add("hidden");
    overlay.classList.add("hidden");
    console.log(inputEmailSignUp, inputPasswordSignUp, inputUsernameSignUp);

    // prettier-ignore
    const newAccount = new Account(inputEmailSignUp, inputPasswordSignUp, inputUsernameSignUp, []);

    manager.add(newAccount);
  } else {
    createErrorNotification(signUpForm, "Invalid email or password");
  }

  inputEmailEl2.value = "";
  inputPasswordEl2.value = "";
  inputUsernameEl2.value = "";
});

sortContainer.addEventListener("click", function (e) {
  // prettier-ignore
  if (!e.target.classList.contains("sort-plus") && !e.target.classList.contains("sort-minus")) return;
  transactionList.innerHTML = "";

  if (e.target.classList.contains("sort-plus")) {
    activeAccount.sortAscending().forEach((transaction, i) => {
      createTransactionElement(transaction, i);
    });
  }

  if (e.target.classList.contains("sort-minus")) {
    activeAccount.sortDescending().forEach((transaction, i) => {
      createTransactionElement(transaction, i);
    });
  }
});

function logOutFunction() {
  logInForm.classList.remove("hidden");
  homePage.classList.add("hidden");
  transactionList.innerHTML = "";
}

logOut.addEventListener("click", logOutFunction);

loanForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (Number(inputLoan) > 0) {
    transactionList.innerHTML = "";

    activeAccount.addTransaction(Number(inputLoan));
    activeAccount.balance.forEach((transaction, i) => {
      createTransactionElement(transaction, i);
    });
    updateInfoUI(activeAccount);
    inputLoanEl.value = "";
  }
});

deleteForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // prettier-ignore
  if (activeAccount.username === inputDeleteUsername && activeAccount.password === inputDeletePassword) {
    manager.deleteAccount(activeAccount);
    logOutFunction()
  }

  inputDeleteUsernameEl.value = "";
  inputDeletePasswordEl.value = "";
});
