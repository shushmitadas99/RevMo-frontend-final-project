// console.log("account.js")
let acctNum = document.getElementById('account-number');
let acctType = document.getElementById('account-type');
let acctAmount = document.getElementById('account-amount');
let userList = document.getElementById('user-list')
let requestMoney = document.getElementById('request-transfer');
let sendMoney = document.getElementById('send-money');
let addUser = document.getElementById('add-user');
let removeUser = document.getElementById('remove-user');
// let sendButton = document.getElementById('sending-transfer-btn');
// let requestButton = document.getElementById('request-transfer-btn');
let submitTransferButton = document.getElementById('submit-transfer-btn');
let transferAmountDollars = document.getElementById('transfer-amount-dollars');
let receivingId = document.getElementById('transfer-receiving-id');
let accountDropdown = document.getElementById('transfer-receiving-id')
let currentMonthIncome = document.getElementById('current-month-total-income');
let allTimeIncome = document.getElementById('all-time-total-income');
let errMsgs = document.getElementById('error-messages');
let account = sessionStorage.getItem("account");
let xferDiv = document.getElementById('xfer-between-accounts-div');








window.addEventListener('load', async () => {

    try {

        let res1 = await fetch(`http://${url}:8080/user`, {   // get user info 
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'

        }
        });
        if (res1.status == 200) {
        let data1 = await res1.json();
        for (let i = 0; i < (data1.accounts).length; i++) {

            let newOption = document.createElement('option');
            newOption.text = data1.accounts[i].accountId;
            newOption.value = data1.accounts[i].accountId;
            accountDropdown.appendChild(newOption)
        }
        }

        if (sessionStorage.getItem('userId')) {
            let res = await fetch(`http://${url}:8080/accounts/${account}`, { // get account
                'credentials': 'include',
                'method': 'GET',
                'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
                }
            });
            if (res.status == 200) {
                let data = await res.json();
                acctNum.innerHTML = data.accountId;
                acctType.innerHTML = data.typeName;
                acctAmount.innerHTML = `\$${numWCommas((data.balance / 100).toFixed(2))}`;
                for (user of data.accountOwners) {
                    let cell = document.createElement('p');
                    cell.innerHTML = user;
                    userList.appendChild(cell);
                }
                
                let allIncome = await fetch(`http://${url}:8080/trx/income-by-account/${account}`, {
                    'credentials': 'include',
                    'method': 'GET',
                    'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                    }
                });
                if (allIncome.status == 200) {
                    let allIncomeRes = await allIncome.json();
                    console.log("all income", numWCommas((allIncomeRes / 100).toFixed(2)))
                    allTimeIncome.innerText = "";
                    allTimeIncome.innerText = `\$${numWCommas((allIncomeRes / 100).toFixed(2))}`
                }
            
            
                // fetch and input income for account for the current month
                let monthIncome = await fetch(`http://${url}:8080/trx/income-by-account/${account}/0/0`, {
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
            
                //Fetch transactions
            
                let transx = await fetch(`http://${url}:8080/trx/account/${account}`, { //--------------------!!!------------
                    'credentials': 'include',
                    'method': 'GET',
                    'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                    }
                });
                if (transx.status == 200) {
                    let transactions = await transx.json();
            
                    addIncomeToTable(transactions);
                }
            } else {
                xferDiv.innerHTML = "Something has gone wrong. Please return to your user page."
            }

        }


        
    } catch (err) {
        userList.innerHTML = "";
        userList.innerHTML = "You are not logged in!";
        console.log(err);
    }
})

function addIncomeToTable(transactions) {
  let transxTable = document.querySelector('#transactions-table tbody');
  transxTable.innerHTML = '';
  for (transx of transactions) {
    //create row
    let row = document.createElement('tr');
    row.setAttribute("id", `Transaction ${transx.transactionId}`)

    //create date cell
    let date = document.createElement('td');

    // check resolveTime, set time based on resovleTime if resolved, request time if not resolved
    if (transx.resolveTime == null) {
      date.innerHTML = new Date(transx.requestTime).toLocaleDateString();
    } else {
      date.innerHTML = new Date(transx.resolveTime).toLocaleDateString();
    }
console.log(transx);

    // set row to green if income, yellow if expense
    
    

    // set type
    let type = document.createElement('td');
    type.innerHTML = transx.description;

    //set amount
    let amount = document.createElement('td');
    amount.innerHTML = numWCommas((transx.amount / 100).toFixed(2));

    //set status
    let status = document.createElement('td');
    status.innerHTML = transx.typeName;

    if (transx.typeName == "DECLINED"){
        row.setAttribute("class", "has-background-danger-light");
    } else if (acctNum.textContent == transx.receivingId) {
        row.setAttribute("class", "has-background-primary-light");
    } else {
        row.setAttribute("class", "has-background-warning-light")
    }

    //append cells to row
    row.appendChild(date);
    row.appendChild(type);
    row.appendChild(amount);
    row.appendChild(status);

    //append row to table
    transxTable.appendChild(row);


  }
}


// let transactionBtn = document.getElementById('tcategory-btn');
// let transactionMenu = document.getElementById('transaction-ddown');

// transactionBtn.addEventListener('click', () => {
//     transactionMenu.classList.toggle('is-active');
// })

// add event listeners to the transaction dropdown. When any is clicked, remove is-active from all and set is-active to clicked one.
const transactionDDown = document.querySelectorAll('#transaction-types a');
transactionDDown.forEach((item) => {
  item.addEventListener('click', () => {
    transactionDDown.forEach(a => a.classList.remove('is-active'));
    item.classList.add('is-active');
    let text = item.getAttribute('value');
    let tag = document.getElementById('transaction-text');
    tag.innerHTML = text;
  })
})




// handle submitting transfer to another account owned by 
submitTransferButton.addEventListener('click', async () => {
  console.log("session email", sessionStorage.getItem('email'));
  errMsgs.innerText = "";
  let amount = (transferAmountDollars.value);
  let rid = receivingId.value;
  console.log(rid)
  let email = sessionStorage.getItem("email");
  let requesterId = sessionStorage.getItem('userId');
  let res = await fetch(`http://${url}:8080/trx/accounts`, {
    'credentials': 'include',
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      "requesterId": requesterId,
      "sendingId": account,
      "receivingId": rid,
      "amount": amount,
      "receivingEmail": email


    })
  })
  if (res.status == 400) {
    let data = await res.json();
    console.log(data);
    // let errorElement = document.createElement('p');
    errMsgs.innerText = data;
    errMsgs.style.color = 'red';
    errMsgs.style.fontWeight = 'bold';
    // userList.appendChild(errorElement);
  } else {
    location.reload();
  }
  //   reload page after transfer

})
