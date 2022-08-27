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


let account = sessionStorage.getItem("account");








window.addEventListener('load', async () => {

    try {
        
        let res1 = await fetch(`http://${url}:8080/user`, {
        
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'

        }});

        let data1 = await res1.json();
        for(let i = 1; i<(data1.accounts).length;i++){
            
            let newOption = document.createElement('option');
            newOption.text = data1.accounts[i].accountId;
            newOption.value = data1.accounts[i].accountId;
            accountDropdown.appendChild(newOption)
        }

    } catch(err) {
        
        // accountsList.innerHTML = "";
        // accountsList.innerHTML = "You are not logged in!";
        console.log(err);
    } 

    if(sessionStorage.getItem('userId') == null){
    } else {
        let res = await fetch(`http://${url}:8080/accounts/${account}`, {
            'credentials': 'include',
            'method': 'GET',
            'headers': {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        });
        let data = await res.json();
        if (res.status == 200){
            acctNum.innerHTML = "";
            acctNum.innerHTML = data.accountId;
            acctType.innerHTML = data.typeName;

            acctAmount.innerHTML = (data.balance/100).toFixed(2);
            for (user of data.accountOwners){
                let cell = document.createElement('p');
                cell.innerHTML = user;
                userList.appendChild(cell);
            }
        }

        

        let transx = await fetch(`http://${url}:8080/trx/account/${account}`, { //--------------------!!!------------
            'credentials': 'include',
            'method': 'GET',
            'headers': {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
    });
        let transactions = await transx.json();
   
    addIncomeToTable(transactions);

    }
 })

function addIncomeToTable(transactions){
    let transxTable = document.querySelector('#transactions-table tbody');
    transxTable.innerHTML = '';
    for (transx of transactions) {

        let row = document.createElement('tr');
        row.setAttribute("id", `Transaction ${transx.transactionId}`)
        let date = document.createElement('td');
        if (transx.resolveTime == null) {
            date.innerHTML = new Date(transx.requestTime).toLocaleDateString();
        } else {
            date.innerHTML = new Date(transx.resolveTime).toLocaleDateString();
        }

        if (acctNum.textContent == transx.receivingId){
            row.setAttribute("class", "has-background-primary-light");
        } else {
            row.setAttribute("class", "has-background-warning-light")
        }        
        
        let type = document.createElement('td');
        type.innerHTML = transx.description;
        let amount = document.createElement('td');
        amount.innerHTML = numWCommas((transx.amount/100).toFixed(2));
        
        let status = document.createElement('td');
        status.innerHTML = transx.typeName;
        

        row.appendChild(date);
        row.appendChild(type);
        row.appendChild(amount);
        row.appendChild(status);
        

        transxTable.appendChild(row);


    }
}


// let transactionBtn = document.getElementById('tcategory-btn');
// let transactionMenu = document.getElementById('transaction-ddown');

// transactionBtn.addEventListener('click', () => {
//     transactionMenu.classList.toggle('is-active');
// })

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





submitTransferButton.addEventListener('click', async ()=> {
    let amount  = (transferAmountDollars.value);
    let rid = receivingId.value;
    console.log(rid)
    let email = sessionStorage.getItem("email");
    let res = await fetch(`http://${url}:8080/trx/accounts`, {
      'credentials': 'include',
      'method': 'POST',
      'headers': {
          'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        "sendingId": account,
        "receivingId": rid,
        "amount":amount,
        "email":email
  
        
      })
  })
//   console.log(localStorage.getItem("AllAccounts"));
  location.reload();
  })