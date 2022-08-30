console.log("in income.js")
let incomeTable = document.getElementById('income-table');
let userId = sessionStorage.getItem('userId')
console.log("user Id: ", userId)

let refreshBtn = document.getElementById('refresh');
let monthsToDisplay = document.getElementById('months-to-display');


let column = document.getElementById('tables-column');

let today = new Date();
let month = today.getMonth()+1;
var year = today.getFullYear();


window.addEventListener('load', async (e) => {
    let res = await fetch (`http://${url}:8080/user`, { //--------------------!!!------------
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        }
    });
    if(sessionStorage.getItem("months to display")){
        monthsToDisplay.setAttribute("value", sessionStorage.getItem("months to display"))
    }
    
    let data = await res.json();
    console.log("data");
    console.log(data);
    console.log(data.accounts);
    addTableForAccount(data.accounts);
    
})

refreshBtn.addEventListener('click', () => {
    sessionStorage.setItem("months to display", monthsToDisplay.value);
    location.reload();
})

console.log(today, today.getMonth()+1, today.getFullYear())



async function addTableForAccount(accounts) {
    console.log(isIterable(accounts));
    if (isIterable(accounts)) {
        for (account of accounts){
            let monthsToDo = monthsToDisplay.value || 3;
            // console.log("months to display", monthsToDo);
            
            
            let aId = account.accountId;
            // console.log("aId", aId);

            let header = document.createElement('h2');
            header.setAttribute("id", `header-acct-${aId}`);
            header.classList.add('is-size-4');
            header.innerHTML = `Account ${account.accountId} <span class="is-size-5">(${account.typeName})</span>`;
            column.appendChild(header);
            let table = document.createElement('table');
            table.classList.add('table', 'has-text-centered', 'is-fullwidth')
            table.setAttribute("id", `table-acct-${aId}`)
            table.innerHTML = "<thead><tr class=\"has-text-centered\"><th>Year</th> <th>Month</th><th>Total Income</th></tr></thead>";
            let body = document.createElement('tbody');
            body.innerHTML = "";

            for (let i = 0; i < monthsToDo; i++){
                let thisMonth = month-i-1;
                let thisYear = year;
                console.log("thisMonth", thisMonth, "thisYear", thisYear)
                if (thisMonth < 0 ){
                    thisMonth = 12+thisMonth;
                    thisYear--;
                }
            
                let income = await fetch (`http://${url}:8080/trx/income-by-account/${aId}/${thisMonth+1}/${year}`, {
                    'credentials': 'include',
                    'method': 'GET',
                    'headers': {
                        'Access-Control-Allow-Origin':'*',
                        'Content-Type': 'application/json'
                    }
                });
                let incomeData = await income.json();
                // console.log("incomeData", incomeData);
                // console.log("status", income.status)
                
                
                if(incomeData > 0) {
                    
                   
                    

                    let row = document.createElement('tr');
                    let yearCell = document.createElement('td');
                    yearCell.innerHTML = `<p>${thisYear}</p>`;
                    let monthCell = document.createElement('td');
                    monthCell.innerHTML = `${months[thisMonth]}`;
                    let income = document.createElement('td');
                    income.innerHTML = `${numWCommas((incomeData/100).toFixed(2))}`;
                    
                    row.appendChild(yearCell);
                    row.appendChild(monthCell);
                    row.appendChild(income);                
                    body.appendChild(row);
                
                
                    
                    table.appendChild(body);
                    column.appendChild(table);
                }
                // else {
                //     let header = document.getElementById(`header-acct-${aId}`);
                //     header.classList.add("is-hidden");
                // }
            }
            console.log("can find header?", document.getElementById(`table-acct-${aId}`))
            if(!document.getElementById(`table-acct-${aId}`)){
                let header = document.getElementById(`header-acct-${aId}`);
                header.classList.add("is-hidden");
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