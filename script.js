"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2023-10-28T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-07-26T17:01:17.194Z",
    "2023-07-28T12:36:17.929Z",
    "2023-10-24T10:51:36.790Z",
  ],
  locale: "en-US",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  locale: "en-HR",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-10-28T10:51:36.790Z",
  ],
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  locale: "pt-PT",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS

const formatMovementsDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    // return new Intl.DateTimeFormat(locale).format(date);
    return new Intl.DateTimeFormat().format(date);
  }
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 110 / 100;

const movementsUsd = movements.map((mov) => {
  return mov * eurToUsd;
});

const movementsUsdFor = [];
for (const mov of movements) {
  movementsUsdFor.push(mov * eurToUsd);
}

const movementsDescritpion = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )} €`
);

// function that displays balance in balance label
const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  // this function shows all incomes of account
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  // this function shows all outcomes of account
  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = formatCur(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(
    Math.abs(interest),
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accounts) {
  accounts.forEach(function (acc) {
    // Create username based of accounts.owner from first letter of name and surname
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((firstLetterUsername) => firstLetterUsername[0])
      .join("");
  });
};

createUsernames(accounts);

const updateUI = (acc) => {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

////////////////////////////
// EVENT handlers
////////////////////////////

let currentAcc, timer;

// FAKE ALWAYS LOGGED IN±
// currentAcc = account1;
// updateUI(currentAcc);
// containerApp.style.opacity = 100;

const now = new Date();

const options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
  // weekday: "long",
};

const locale = navigator.language;
console.log(locale);

setInterval(function updateTimer() {
  const now = new Date();
  labelDate.textContent = new Intl.DateTimeFormat(options).format(now);
}, 1000);

// Logout timer function
const startLogoutTimer = () => {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When the time is at 0 logout the user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Login to get started`;
      containerApp.style.opacity = 0;
    }
    // Decrase timer by 1 second
    time--;
  };
  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
/////////////////////
//BUTTONS//
/////////////////////

btnLogin.addEventListener("click", function (e) {
  // Prevent from submiting
  e.preventDefault();
  currentAcc = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAcc);
  if (currentAcc?.pin === +inputLoginPin.value) {
    // Display UI and welcome MSG
    labelWelcome.textContent = `Welcome back ${currentAcc.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const minutes = `${now.getMinutes()}`.padStart(2, 0);
    ``;
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

    // Updating UI
    updateUI(currentAcc);

    // Timer
    if (timer) clearInterval(timer);

    timer = startLogoutTimer();
  }

  btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = +inputTransferAmount.value;
    const receiverAcc = accounts.find(
      (acc) => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = "";

    if (
      amount > 0 &&
      receiverAcc &&
      currentAcc.balance >= amount &&
      receiverAcc?.username !== currentAcc.username
    ) {
      // Doing the transfer
      currentAcc.movements.push(-amount);
      receiverAcc.movements.push(amount);

      // Add tranfer date
      currentAcc.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());

      // Updating UI
      updateUI(currentAcc);

      // Reset timer on click
      clearInterval(timer);
      timer = startLogoutTimer();
    }
  });

  btnLoan.addEventListener("click", (e) => {
    e.preventDefault();

    const amount = Math.floor(inputLoanAmount.value);

    // added setTimeout, after 5 seconds the loan amount is visible on our account
    if (amount > 0 && currentAcc.movements.some((mov) => mov > amount * 0.1)) {
      setTimeout(function () {
        // Add movement
        currentAcc.movements.push(amount);

        // Add loan date
        currentAcc.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAcc);
      }, 5000);
      // Reset timer on click
      clearInterval(timer);
      timer = startLogoutTimer();
    }

    inputLoanAmount.value = "";
  });

  // with findIndex() we can select index in an array and with splice() method we can remove it from an array. In this example we check if the value that we entered in input is the same as logged account. If it is the same we remove it with mentioned methods

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      inputCloseUsername.value === currentAcc.username &&
      +inputClosePin.value === +currentAcc.pin
    ) {
      const index = accounts.findIndex(
        (acc) => acc.username === currentAcc.username
      );
      console.log(index);
      // Delete account
      accounts.splice(index, 1);

      // Hide UI
      containerApp.style.opacity = 0;
    }
    inputCloseUsername.valiue = inputClosePin.value = "";
  });
  // Reseting inputs to empty strings
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
  //Bluring inputs
  inputLoginUsername.blur();
  inputLoginPin.blur();
});

// PIPELINE
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  // we call .map on result of movements.filter
  .map((mov, i, arr) => {
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);

let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAcc.movements, !sorted);
  sorted = !sorted;
});

// LECTURES
