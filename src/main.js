"use strict";
import "./style.css";
// prettier-ignore
import { signUpLink, signUpForm, overlay, logInForm, inputEmailEl, inputPasswordEl, inputEmailEl2, inputPasswordEl2, inputUsernameEl2, homePage, user, transactionList, totalBalanceEl, totalDepositEl, totalWithdrawalEl, sortContainer } from "./helpers";

let inputEmail;
let inputPassword;
let inputEmailSignUp;
let inputPasswordSignUp;
let inputUsernameSignUp;

let activeAccount;

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
  balance: [200, 300, -400, 1000, -700],
};
const account2 = {
  username: "jonas",
  email: "jonas@gmail.com",
  password: "2222",
  balance: [600, 500, -800, 2000, -1700],
};
const account3 = {
  username: "pera",
  email: "pera@gmail.com",
  password: "3333",
  balance: [100, 900, -500, 1200, -600],
};

class Account {
  constructor(email, password, username) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.balance;
  }

  // setTotalBalance() {
  //   return this.balance.reduce((acc, cur) => {
  //     acc + cur;
  //   }, 0);
  // }
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

function createTransactionElement(transaction, i) {
  const item = document.createElement("li");
  // prettier-ignore
  item.innerHTML = `<div class="type-${(transaction > 0) ? "deposit" : "withdrawal"}"><span class="num-transaction">${i+1}</span> ${(transaction > 0) ? "Deposit" : "Withdrawal"}</div> <span class="date">07.03.2025.</span> <span class="number">${transaction}$</span>`;
  item.className = "transaction-item";

  transactionList.appendChild(item);
}

// createErrorNotification("Error notification");

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  manager.accounts.find(function (acc) {
    // prettier-ignore
    if (inputEmail === acc.email && inputPassword === acc.password) {   
      activeAccount = acc;
      console.log(activeAccount);
      logInForm.classList.add("hidden");

      homePage.classList.remove("hidden");
      user.textContent = `${
        acc.username[0].toUpperCase() + acc.username.slice(1).toLowerCase()
      }`;

      acc.balance.forEach((transaction, i) => {
        createTransactionElement(transaction, i)

       
      });
      // console.log(acc.balance.reduce((acc, cur)=> acc + cur));
      totalBalanceEl.textContent = acc.balance.reduce((acc, cur)=> acc + cur);
      totalDepositEl.textContent = acc.balance.filter(x => x > 0).reduce((acc, cur)=> acc + cur);
      totalWithdrawalEl.textContent = acc.balance.filter(x => x < 0).reduce((acc, cur)=> acc + cur);

      // console.log(acc.setTotalBalance());

    } else {
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

  if (e.target.classList.contains("sort-plus")) {
    transactionList.innerHTML = "";

    const sortedAscending = activeAccount.balance.sort();

    sortedAscending.forEach((transaction, i) => {
      createTransactionElement(transaction, i);
    });
  }

  if (e.target.classList.contains("sort-minus")) {
    transactionList.innerHTML = "";

    const sortedDescending = activeAccount.balance.sort((a, b) => b - a);

    sortedDescending.forEach((transaction, i) => {
      createTransactionElement(transaction, i);
    });
  }
});
