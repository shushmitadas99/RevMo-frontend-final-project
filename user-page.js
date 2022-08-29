

let accountsList = document.getElementById('accounts-list')
let nameDiv = document.getElementById('name');
let emailDiv = document.getElementById('email');
let phoneDiv = document.getElementById('phone');
let hello = document.getElementById('hello');
let userId = sessionStorage.getItem('userId');
let incomeBtn = document.getElementById('my-income');
let currentMonthIncome = document.getElementById('current-month-total-income');
let allTimeIncome = document.getElementById('all-time-total-income');
let sendInput = document.getElementById('sending-sending-id');
let receiveInput = document.getElementById('sending-receiving-id');
let amount = document.getElementById('sending-amount-dollars');
let error = document.getElementById('error-messages-send-money');
let sendButton = document.getElementById('sending-transfer-btn');
let requestButton = document.getElementById('request-transfer-btn');
let uId = sessionStorage.getItem("userId");
console.log("userId", uId)


window.addEventListener('load', async () => {
  try {
    let res = await fetch(`http://${url}:8080/user`, {

      'credentials': 'include',
      'method': 'GET',
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'

      }
    });

    let data = await res.json();
    // console.log(data);
    hello.innerHTML = "";
    hello.innerHTML = `Hello, ${data.firstName}`;
    nameDiv.innerHTML = `${data.firstName} ${data.lastName}`
    emailDiv.innerHTML = data.email;
    phoneDiv.innerHTML = data.phoneNumber;
    console.log(data.accounts);
    for (let i = 0; i < (data.accounts).length; i++) {

      let newOption = document.createElement('option');
      let newOption2 = document.createElement('option');
      let sendInput = document.getElementById('sending-sending-id');
      let receiveInput = document.getElementById('request-receiving-id');
      newOption.text = data.accounts[i].accountId;
      newOption.value = data.accounts[i].accountId;
      newOption2.text = data.accounts[i].accountId;
      newOption2.value = data.accounts[i].accountId;
      sendInput.appendChild(newOption2)
      receiveInput.appendChild(newOption)
    }
    addAccounts(data.accounts);

    let allIncome = await fetch(`http://${url}:8080/trx/income-by-user/${uId}`, {
      'credentials': 'include',
      'method': 'GET',
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
    if (allIncome.status == 200) {
      let allIncomeRes = await allIncome.json();
      console.log("all income", numWCommas((allIncomeRes / 100).toFixed(2)));
      allTimeIncome.innerText = "";
      allTimeIncome.innerText = `\$${numWCommas((allIncomeRes / 100).toFixed(2))}`;
    }
    let monthIncome = await fetch(`http://${url}:8080/trx/income-by-user/${uId}/0/0`, {
      'credentials': 'include',
      'method': 'GET',
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
    if (monthIncome.status == 200) {
      let monthIncomeRes = await monthIncome.json();
      console.log("month income", numWCommas((monthIncomeRes / 100).toFixed(2)));
      currentMonthIncome.innerText = "";
      currentMonthIncome.innerText = `\$${numWCommas((monthIncomeRes / 100).toFixed(2))}`;
    }
  } catch (err) {
    accountsList.innerHTML = "";
    accountsList.innerHTML = "You are not logged in!";
    console.log(err);
  }


})

function addAccounts(accts) {
  for (acct of accts) {
    let box = document.createElement('div');
    box.classList.add('box');
    let cols = document.createElement('div');
    cols.classList.add('columns');
    let col1 = document.createElement('div');
    col1.classList.add('column', 'is-two-fifths', 'has-text-centered-mobile');

    let p1 = document.createElement('p');
    let header = document.createElement('span');
    header.classList.add('is-size-4');
    header.innerHTML = "Account";
    let acctNum = document.createElement('span');
    acctNum.classList.add('px-5', 'is-size-4');
    acctNum.innerHTML = acct.accountId;
    p1.appendChild(header)
    p1.appendChild(acctNum)

    let p2 = document.createElement('p');
    p2.innerHTML = acct.typeName;

    col1.appendChild(p1);
    col1.appendChild(p2);

    let col2 = document.createElement('div');
    col2.classList.add('column', 'is-size-3', 'has-text-centered-mobile', 'is-one-fifths-tablet', 'is-two-fifths-desktop');
    col2.innerHTML = `\$${numWCommas((acct.balance / 100).toFixed(2))}`; //------------check -----------------------

    let col3 = document.createElement('div');
    col3.classList.add('column', 'is-two-fifths-tablet', 'is-one-fifth-desktop', 'has-text-centered-mobile');

    let acctPage = document.createElement('div');
    acctPage.innerHTML = `<button class="button is-info is-light has-text-weight-semibold my-2" id="${acct.accountId}">View Account</button>`;
    acctPage.addEventListener('click', (e) => {
      sessionStorage.setItem("account", e.target.id);
      window.location.href = './account.html';
      // console.log(`clicked "view account" for account ${e.target.id}`)
    })

    // let reqMon = document.createElement('div');
    // let sendMon = document.createElement('div');


    // reqMon.innerHTML = `<button class="button is-link my-2" id="${acct.accountId}">Request Money</button>`;
    // reqMon.addEventListener('click', (e) => {
    //     console.log(`clicked "request money" for account ${e.target.id}`)
    // })
    // sendMon.innerHTML = `<button class="button is-primary my-2" id="${acct.accountId}">Send Money</button>`;
    // sendMon.addEventListener('click', (e) => {
    //     console.log(`clicked "send money" for account ${e.target.id}`)
    // })

    col3.appendChild(acctPage);

    // col3.appendChild(reqMon);
    // col3.appendChild(sendMon);

    cols.appendChild(col1);
    cols.appendChild(col2);
    cols.appendChild(col3);

    box.appendChild(cols);

    accountsList.appendChild(box);

  }

  incomeBtn.addEventListener('click', () => {
    window.location.href = "/income.html"
  })


}


sendButton.addEventListener('click', async () => {


  console.log(sendInput.value)
  try {
    let res = await fetch(`http://${url}:8080/trx`, {

      'credentials': 'include',
      'method': 'POST',
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'

      }, 'body': JSON.stringify({
        "sendingId": sendInput.value,
        "receivingEmail": receiveInput.value,
        "amount": amount.value
      })

    })
    if (res.status == 400) {
      let data = await res.json();
      error.innerText = data;
      error.style.color = 'red';
      error.style.fontWeight = 'bold';
    } else if (res.status == 200) {
      location.reload();
    }

  } catch (err) {
    console.log(err)
  }


})

requestButton.addEventListener('click', async () => {
  console.log("here")
  let sendInput = document.getElementById('request-sending-id');
  let receiveInput = document.getElementById('request-receiving-id');
  let amount = document.getElementById('request-amount-dollars');

  try {
    let res = await fetch(`http://${url}:8080/trx/req`, {

      'credentials': 'include',
      'method': 'POST',
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'

      }, 'body': JSON.stringify({
        "receivingEmail": sendInput.value,
        "receivingId": receiveInput.value,
        "amount": amount.value
      })
    })
  } catch (err) {
    console.log(err)
  }
  location.reload();
})
