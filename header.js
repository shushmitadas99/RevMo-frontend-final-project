const url = "127.0.0.1";
console.log("header.js");

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


window.addEventListener('load', (e) => {
    console.log('in window load block header.js');
    if (sessionStorage.getItem('userId') != null){
        createAccount.classList.add('is-hidden');
        logoutBtn.classList.remove('is-hidden');
        loginBtn.classList.add('is-hidden');
        myAccount.classList.remove('is-hidden');
        transferMoney.classList.remove('is-hidden');
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