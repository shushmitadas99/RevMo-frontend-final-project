const url = "127.0.0.1";


let accountsList = document.getElementById('accounts-list')
let nameDiv = document.getElementById('name');
let emailDiv = document.getElementById('email');
let phoneDiv = document.getElementById('phone');
let hello = document.getElementById('hello');

document.addEventListener('DOMContentLoaded', async () => {

    try {
        let res = await fetch(`http://${url}:8080/user/${isbn}`, {
        // 'mode': 'no-cors',
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'

        }});

        let data = await res.json();
        hello.innerHTML = "";
        hello.innerHTML = `Hello, ${data.firstName}`;
        nameDiv.innerHTML = `${data.firstName} ${data.lastName}` //------------check -----------
        emailDiv.innerHTML = data.email; //------------check -----------
        phoneDiv.innerHTML = data.phone; //------------check -----------

        addAccounts(data.accounts);



    
    } catch(err) {
        console.log(err);
    } 
}
);


function addAccounts(accts){
    for (acct of accts){
        let box = document.createElement('div class="box"');
        let cols = document.createElement('div class="columns"');
        let col1 = document.createElement('div class="column is-three-fifths"');
        
        let p1 = document.createElement('p');
        let header = document.createElement('span class="is-size-4">');
        header.innerHTML = "Account";
        let acctNum = document.createElement('span');
        acctNum.innerHTML = acct.acctNum; //------------check -----------
        p1.appendChild(header)
        p1.appendChild(acctNum)
        
        let p2 = document.createElement('p');
        p2.innerHTML = acct.type; //------------check -----------

        col1.appendChild(p1);
        col1.appendChild(p2);

        let col2 = document.createElement('div class="column is-size-2 is-two-fifths"');
        col2.innerHTML = `\$${acct.amount/100}`; //------------check -----------

        cols.appendChild(col1);
        cols.appendChild(col2);

        box.appendChild(cols);

        accountsList.appendChild(box);

    }
}