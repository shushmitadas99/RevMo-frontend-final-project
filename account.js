console.log("account.js")
let acctNum = document.getElementById('account-number');
let acctType = document.getElementById('account-type');
let acctAmount = document.getElementById('account-amount');
let userList = document.getElementById('user-list')
let requestMoney = document.getElementById('request-transfer');
let sendMoney = document.getElementById('send-money');
let addUser = document.getElementById('add-user');
let removeUser = document.getElementById('remove-user');
let sendButton = document.getElementById('sending-transfer-btn');
let requestButton = document.getElementById('request-transfer-btn');



let account = sessionStorage.getItem("account");

sendButton.addEventListener('click', async () => {
    let sendInput = document.getElementById('sending-sending-id');
    let receiveInput = document.getElementById('sending-receiving-id');
    let amount = document.getElementById('sending-amount-dollars');

    try {
        let res = await fetch(`http://${url}:8080/trx-send`, {
          
            'credentials': 'include',
            'method': 'POST',
            'headers': {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
    
            }, 'body': JSON.stringify({
                "sendingId": sendInput.value,
                "receivingEmail": receiveInput.value,
                "amount": amount.value
            })
    })} catch (err) {
        console.log(err)
    }
    location.reload();
})

requestButton.addEventListener('click', async () => {
    let sendInput = document.getElementById('request-sending-id');
    let receiveInput = document.getElementById('request-receiving-id');
    let amount = document.getElementById('request-amount-dollars');

    try {
        let res = await fetch(`http://${url}:8080/trx-req`, {
          
            'credentials': 'include',
            'method': 'POST',
            'headers': {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
    
            }, 'body': JSON.stringify({
                "receivingEmail": sendInput.value,
                "receivingId": receiveInput.value,
                "amount": amount.value
            })
    })} catch (err) {
        console.log(err)
    }
    location.reload();
})







window.addEventListener('load', async () => {
    console.log('in account.js window load block');

  

    if(sessionStorage.getItem('userId') == null){
        console.log('userId not in session')
    } else {
        console.log(`account: ${account}`)
        let res = await fetch(`http://${url}:8080/accounts/${account}`, {
            'credentials': 'include',
            'method': 'GET',
            'headers': {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            }
        });
        let data = await res.json();
        console.log(data);
        if (res.status == 200){
            acctNum.innerHTML = "";
            acctNum.innerHTML = data.accountId;
            acctType.innerHTML = data.typeName;
            acctAmount.innerHTML = `\$${numWCommas((data.balance/100).toFixed(2))}`;
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
    console.log("data")
    console.log(transactions);
    addIncomeToTable(transactions);

    }
 })

function addIncomeToTable(transactions){
    let transxTable = document.querySelector('#transactions-table tbody');
    transxTable.innerHTML = '';
    for (transx of transactions) {
        console.log(transx);

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




