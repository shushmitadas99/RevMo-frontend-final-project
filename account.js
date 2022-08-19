console.log("account.js")
let acctNum = document.getElementById('account-number');
let acctType = document.getElementById('account-type');
let acctAmount = document.getElementById('account-amount');
let userList = document.getElementById('user-list')
let requestMoney = document.getElementById('request-transfer');
let sendMoney = document.getElementById('send-money');
let addUser = document.getElementById('add-user');
let removeUser = document.getElementById('remove-user');

let account = sessionStorage.getItem("account");
console.log(account);


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
            // acctNum.innerHTML = "";
            acctNum.innerHTML = data.accountId;
            acctType.innerHTML = data.typeName;
            acctAmount.innerHTML = (data.balance/100).toFixed(2);
            for (user of data.accountOwners){
                let cell = document.createElement('p');
                cell.innerHTML = user;
                userList.appendChild(cell);
            }
        }

    }
})
