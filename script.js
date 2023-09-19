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
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};
cd;
const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: "Antonio Biskupec",
  movements: [],
  interestRate: 1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

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

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>

    <div class="movements__value">${mov} €</div>
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

console.log(movementsUsd);

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

console.log(movementsDescritpion);

// function that displays balance in balance label
const calcDisplayBalance = (movements) => {
  const balance = movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${balance} €`;
};

const calcDisplaySummary = function (acc) {
  // this function shows all incomes of account
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  // this function shows all outcomes of account
  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)} €`;
};

const createUsernames = function (accounts) {
  accounts.forEach(function (acc) {
    // Create username based of accounts.owner from first letter of name and surname
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((firstLetterUsername) => firstLetterUsername[0])
      .join("");
    console.log(acc.username);
  });
};

createUsernames(accounts);
console.log(accounts);

// EVENT handlers
let currentAcc;

btnLogin.addEventListener("click", function (e) {
  // Prevent from submiting
  e.preventDefault();
  currentAcc = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAcc);
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome MSG
    labelWelcome.textContent = `Welcome back ${currentAcc.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;
    // Display movements
    displayMovements(currentAcc.movements);
    // Display balance
    calcDisplayBalance(currentAcc.movements);
    // Display summary
    calcDisplaySummary(currentAcc);

    console.log("Logged in succesfully");
  }
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
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
