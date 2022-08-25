console.log("in income.js")
let incomeTable = document.getElementById('income-table');
let userId = sessionStorage.getItem('userId')
console.log("user Id: ", userId)
// console.log(userId)


window.addEventListener('load', async (e) => {
    let res = await fetch (`http://${url}:8080/trx/4/receiver`, { //--------------------!!!------------
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        }
    });
    let data = await res.json();
    console.log("data")
    console.log(data);
    addIncomeToTable(data);
})

function addIncomeToTable(transactions){
    let table = document.querySelector('#income-table tbody');
    table.innerHTML = '';
    for (transx of transactions) {
        console.log(transx);

        let row = document.createElement('tr');
        let date = document.createElement('td');
        date.innerHTML = new Date(transx.requestTime).toLocaleDateString();
        let amount = document.createElement('td');
        amount.innerHTML = transx.amount;
        let descrip = document.createElement('td');
        descrip.innerHTML = transx.description;
        let status = document.createElement('td');
        status.innerHTML = transx.typeName;
        let account = document.createElement('td');
        account.innerHTML = transx.receivingId;

        row.appendChild(date);
        row.appendChild(amount);
        row.appendChild(descrip);
        row.appendChild(status);
        row.appendChild(account);

        table.appendChild(row);



    }
}