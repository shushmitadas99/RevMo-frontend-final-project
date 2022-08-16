const url = "127.0.0.1";
console.log('aaaaaaaaaaahhhhhhhhhhhhhhhhhhh');
let logoutBtn = document.getElementById('logout-btn');
let loginBtn = document.getElementById('login-btn');
let createAccount = document.getElementById('create-account');
let myAccount = document.getElementById('my-account');
let transferMoney = document.getElementById('transfer-money');

const burgerIcon=document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active')
});


let accountsList = document.getElementById('accounts-list')
let nameDiv = document.getElementById('name');
let emailDiv = document.getElementById('email');
let phoneDiv = document.getElementById('phone');
let hello = document.getElementById('hello');
let userId = sessionStorage.getItem('userId')

window.addEventListener('load', async () => {
    console.log('in window load block');
    console.log(sessionStorage.getItem('userId'))
    if (sessionStorage.getItem('userId') != null){
        createAccount.classList.add('is-hidden');
        logoutBtn.classList.remove('is-hidden');
        loginBtn.classList.add('is-hidden');
        myAccount.classList.remove('is-hidden');
        transferMoney.classList.remove('is-hidden');

        try {
            console.log("in try");
            let res = await fetch(`http://${url}:8080/user`, {
            
            'credentials': 'include',
            'method': 'GET',
            'headers': {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
    
            }});
    
            let data = await res.json();
            console.log(data);
            hello.innerHTML = "";
            hello.innerHTML = `Hello, ${data.firstName}`;
            nameDiv.innerHTML = `${data.firstName} ${data.lastName}` 
            emailDiv.innerHTML = data.email; 
            phoneDiv.innerHTML = data.phoneNumber; 
            console.log(data.accounts);
    
            addAccounts(data.accounts);
    
        } catch(err) {
            console.log(err);
        } 

    } else {
        createAccount.classList.remove('is-hidden');
        logoutBtn.classList.add('is-hidden');
        loginBtn.classList.remove('is-hidden');
        myAccount.classList.add('is-hidden');
        transferMoney.classList.add('is-hidden');
    }
})
logoutBtn.addEventListener('click', async (e) => 
    {
        let result = await fetch(`http://${url}:8080/logout`, {
            'method': 'POST', 
            'credentials': 'include',
            'headers':{
                'Access-Control-Allow-Origin': '*'
            }
        })
        sessionStorage.clear();
        e.preventDefault();
        if (result.status === 201) {
            window.location.href = "./home.html"

        }
    }
)

//---------------------------------------------------------------------------




function addAccounts(accts){
    for (acct of accts){
        let box = document.createElement('div');
        box.classList.add('box');
        let cols = document.createElement('div');
        cols.classList.add('columns');
        let col1 = document.createElement('div');
        col1.classList.add('column', 'is-three-fifths');
        
        let p1 = document.createElement('p');
        let header = document.createElement('span');
        header.classList.add('is-size-4');
        header.innerHTML = "Account";
        let acctNum = document.createElement('span');
        acctNum.classList.add('px-5');
        acctNum.innerHTML = acct.accountId; 
        p1.appendChild(header)
        p1.appendChild(acctNum)
        
        let p2 = document.createElement('p');
        p2.innerHTML = acct.typeName; 

        col1.appendChild(p1);
        col1.appendChild(p2);

        let col2 = document.createElement('div');
        col2.classList.add('column', 'is-size-2', 'is-two-fifths');
        col2.innerHTML = `\$${(acct.balance/100).toFixed(2)}`; //------------check -----------------------

        cols.appendChild(col1);
        cols.appendChild(col2);

        box.appendChild(cols);

        accountsList.appendChild(box);

    }
}