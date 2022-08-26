console.log("in income.js")
let incomeTable = document.getElementById('income-table');
let userId = sessionStorage.getItem('userId')
console.log("user Id: ", userId)
// console.log(userId)


window.addEventListener('load', async (e) => {
    let res = await fetch (`http://${url}:8080/user`, { //--------------------!!!------------
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        }
    });
    let data = await res.json();
    console.log("data");
    console.log(data);
    console.log(data.accounts)
    // addTableForAccount(data.accounts);
    
})


let column = document.getElementById('tables-column');


async function addTableForAccount(accounts) {
    console.log(isIterable(accounts));
    if (isIterable(accounts)) {
        for (account of accounts){
            console.log(account.accountId)
            
            let trxs = await fetch (`http://${url}:8080/trx/${account.accountId}/receiver`, {
                'credentials': 'include',
                'method': 'GET',
                'headers': {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json'
                }
            });
            let trxData = await trxs.json();
            console.log("trxData")
            console.log(trxData)
            
            if(Object.keys(trxData).length > 0) {
                
                let header = document.createElement('h2');
                header.classList.add('is-size-4');
                header.innerHTML = `Account ${account.accountId} <span class="is-size-5">(${account.typeName})</span>`;
                column.appendChild(header);
                let table = document.createElement('table');
                table.classList.add('table')
                table.innerHTML = "<thead><tr class=\"has-text-centered\"><th>Date</th> <th>Amount</th><th>Description</th><th>Status</th></tr></thead>";
                let body = document.createElement('tbody');
                body.innerHTML = "";
                
                for (transx of trxData) {
                    console.log(transx);
            
                    let row = document.createElement('tr');
                    let date = document.createElement('td');
                    date.innerHTML = new Date(transx.requestTime).toLocaleDateString();
                    let amount = document.createElement('td');
                    amount.innerHTML = (transx.amount/100).toFixed(2);
                    let descrip = document.createElement('td');
                    descrip.innerHTML = transx.description;
                    let status = document.createElement('td');
                    status.innerHTML = transx.typeName;
                    
            
                    row.appendChild(date);
                    row.appendChild(amount);
                    row.appendChild(descrip);
                    row.appendChild(status);
                    
                    
            
                    body.appendChild(row);
            
                }
                
                
                table.appendChild(body);
                column.appendChild(table);
            }
            
            
    
        }
    }
    
    
}



function addIncomeToTable(transactions){
    console.log(isIterable(transactions))
    if (isIterable(transactions)){
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
            
    
            body.appendChild(row);
    
        }
    }
   
}