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

const access = (e) => window.location.href.includes(e);
const allowed = ["/index.html", "/login.html"]

window.addEventListener('load', (e) => {
    // let loggedIn = await fetch(`http://${url}:8080/logged-in-user`, {
    //     'credentials': 'include',
    //     'method': 'GET',
    //     'headers': {
    //         'Access-Control-Allow-Origin':'*',
    //     }
    // })
    console.log("allowed.some(access)", allowed.some(access));
    // if (loggedIn.status == 404 && !allowed.some(access)){ //not logged in on backend, not on public page
    //     sessionStorage.clear();
    //     window.location.href = "./index.html";

    // }
    console.log(window.location.href.includes("/index.html"))
    console.log('in window load block header.js');
    if (sessionStorage.getItem('userId') != null){
        console.log('userId in session');
        createAccount.classList.add('is-hidden');
        logoutBtn.classList.remove('is-hidden');
        loginBtn.classList.add('is-hidden');
        myAccount.classList.remove('is-hidden');
        transferMoney.classList.remove('is-hidden');
    } else {
        console.log('userId not in session');
        createAccount.classList.remove('is-hidden');
        logoutBtn.classList.add('is-hidden');
        loginBtn.classList.remove('is-hidden');
        myAccount.classList.add('is-hidden');
        transferMoney.classList.add('is-hidden');
    }
    
})


logoutBtn.addEventListener('click', async (e) => {
    console.log('click logout');
    
        let result = await fetch(`http://${url}:8080/logout`, {
            'method': 'POST', 
            'credentials': 'include',
            'headers':{
                'Access-Control-Allow-Origin': '*'
            }
        })
        console.log(result.status);
        e.preventDefault();
        if (result.status === 201) {
            sessionStorage.clear();
            window.location.href = "./index.html"

        }
    }
)


const isIterable = (value) => {
    return Symbol.iterator in Object(value);
}


function numWCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];