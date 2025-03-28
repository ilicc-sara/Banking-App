"use strict";
import "./style.css";
// prettier-ignore
import { signUpLink, signUpForm, overlay, logInForm, inputEmailEl, inputPasswordEl, inputEmailEl2, inputPasswordEl2, inputUsernameEl2, homePage, user, transactionList, totalBalanceEl, totalDepositEl, totalWithdrawalEl, sortContainer, logOut, loanForm, inputLoanEl } from "./helpers";
// prettier-ignore
import { deleteForm, inputDeleteUsernameEl, inputDeletePasswordEl, transferForm, inputTransferUsernameEl, inputTransferAmountEl, greetContainer } from "./helpers";

let inputEmail;
let inputPassword;
let inputEmailSignUp;
let inputPasswordSignUp;
let inputUsernameSignUp;

let inputLoan;
let inputDeleteUsername;
let inputDeletePassword;
let inputTransferUsername;
let inputTransferAmount;

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
inputTransferUsernameEl.addEventListener("input", function (e) {
  inputTransferUsername = e.target.value;
});
inputTransferAmountEl.addEventListener("input", function (e) {
  inputTransferAmount = e.target.value;
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
    this.activeAccount = null;
  }

  setActiveAccount(account) {
    this.activeAccount = account;
  }

  add(acc) {
    this.accounts.push(acc);
  }

  deleteAccount(account) {
    return (this.accounts = this.accounts.filter((acc) => acc !== account));
  }
}

const manager = new AccountManager();

class PublishedDate {
  constructor() {
    this.day = new Date().getDate();
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
    this.date = `${this.day}.${this.month}.${this.year}`;
  }
}

const date = new PublishedDate();

function createErrorNotification(parentElement, text) {
  if (document.querySelector(".error-text")) return;

  const notification = document.createElement("div");
  notification.innerHTML = `${text}<button class="error-btn">❌</button>`;
  notification.className = "error-text";

  parentElement.appendChild(notification);
}

function createErrorPage(text) {
  const notification = document.createElement("div");
  notification.innerHTML = `${text}<button class="error-btn-page">❌</button>`;
  notification.className = "error-text-page";

  greetContainer.appendChild(notification);
}

function createTransactionElement(transaction, i) {
  const item = document.createElement("li");
  // prettier-ignore
  item.innerHTML = `<div class="type-${(transaction > 0) ? "deposit" : "withdrawal"}"><span class="num-transaction">${i+1}</span> ${(transaction > 0) ? "Deposit" : "Withdrawal"}</div> <span class="date">${date.date}</span> <span class="number">${transaction}$</span>`;
  item.className = "transaction-item";
  transactionList.appendChild(item);
}

function updateInfoUI(account) {
  totalBalanceEl.textContent = account.setTotalBalance();
  totalDepositEl.textContent = account.setTotalIncome();
  totalWithdrawalEl.textContent = account.setTotalWithdrawal();
}

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  manager.accounts.find(function (acc) {
    // prettier-ignore
    if (inputEmail === acc.email && inputPassword === acc.password) {   
      manager.setActiveAccount(acc)
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
    manager.activeAccount.sortAscending().forEach((transaction, i) => {
      createTransactionElement(transaction, i);
    });
  }

  if (e.target.classList.contains("sort-minus")) {
    manager.activeAccount.sortDescending().forEach((transaction, i) => {
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

    manager.activeAccount.addTransaction(Number(inputLoan));
    manager.activeAccount.balance.forEach((transaction, i) => {
      createTransactionElement(transaction, i);
    });
    updateInfoUI(manager.activeAccount);
  } else {
    createErrorPage("Invalid load amount!");
  }
  inputLoanEl.value = "";
});

deleteForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // prettier-ignore
  if (manager.activeAccount.username === inputDeleteUsername && manager.activeAccount.password === inputDeletePassword) {
    manager.deleteAccount(manager.activeAccount);
    logOutFunction()
  } else {
    createErrorPage("Email or password is incorrect!")
  }

  inputDeleteUsernameEl.value = "";
  inputDeletePasswordEl.value = "";
});

transferForm.addEventListener("submit", function (e) {
  e.preventDefault;
  // prettier-ignore
  if (manager.accounts.some(account => account.username === inputTransferUsername) && Number(inputTransferAmount) > 0) {
    transactionList.innerHTML = "";
    manager.activeAccount.addTransaction(Number(-inputTransferAmount));
    manager.activeAccount.balance.forEach((transaction, i) => {
      createTransactionElement(transaction, i);
    });
    updateInfoUI(manager.activeAccount);

    // prettier-ignore
    manager.accounts.find(account => account.username === inputTransferUsername).addTransaction(Number(inputTransferAmount));

    createErrorPage("Successfully transferred!")
  } else {
    createErrorPage("There's no account with this username!")
  }
  inputTransferUsernameEl.value = "";
  inputTransferAmountEl.value = "";
});

greetContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("error-btn-page")) return;
  const notification = e.target.closest(".error-text-page");
  notification.remove();
});
