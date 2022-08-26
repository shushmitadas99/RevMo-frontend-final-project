let submitButton = document.getElementById("submit-btn"); 
let typeIdInput = document.getElementById("type-id-input");
let amountInput = document.getElementById('amount-input');
let confirmation = document.getElementById('error-messages');
let newAccountConfirmation = document.getElementById('create-message');
let idButtons = document.querySelectorAll('input[name="account-type-id"]');
let unlinkButton = document.getElementById("unlink-btn"); 
let linkButton = document.getElementById("link-btn");
let linkAccountId = document.getElementById("link-account-id");
let unlinkAccountId = document.getElementById("unlink-account-id");
let accountIdInput = document.getElementById("account-id-input");
let emailInput = document.getElementById("email-input"); 
let searchEmailButton = document.getElementById('search-email-btn');
let accountsList = document.getElementById('accounts-tbody');


document.addEventListener('DOMContentLoaded', getAllAccounts)


searchEmailButton.addEventListener("click", setEmail);


function setEmail(){
  sessionStorage.clear;
  sessionStorage.setItem("email", emailInput.value);  
  location.reload();
}

async function getAllAccounts(){
  let email = sessionStorage.getItem("email");
      try {
          let res = await fetch(`http://${url}:8080/${email}/accounts`, {
          
          'credentials': 'include',
          'method': 'GET',
          'headers': {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json'
  
          }});
  
          let data = await res.json();
          
          addAccounts(data);

          
  }
  
  catch(err) {

    accountsList.innerHTML = "";
    accountsList.innerHTML = "You are not logged in!";
}
}


submitButton.addEventListener('click', async () => {

 newAccountConfirmation.innerHTML = "";
  let selectedRadioButton;
  for (let radioBtn of idButtons) {
      if (radioBtn.checked) {
          selectedRadioButton = radioBtn
          break;
      }
  }

  let res = await fetch(`http://127.0.0.1:8080/accounts`, {
      // 'mode': 'no-cors',
      'credentials': 'include',
      'method': 'POST',
      'headers': {
          'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
          "typeId": selectedRadioButton.value
      })
  })

if (res.status == 201) {
  let data = await res.json();
  // let accountId = data.accountId;
  // alert("Account with number ${accountId} has been created")
  // let errorElement = document.createElement('p');
  // errorElement.innerHTML = data.accountId;
  // errorElement.style.color = 'green';
  // errorElement.style.fontWeight = 'bold';
  // newAccountConfirmation.appendChild(errorElement);

  let email = sessionStorage.getItem("email");
  // let aid = data.accountId
  let res2 = await fetch(`http://${url}:8080/accounts/${data.accountId}/users/${email}`, {
    'credentials': 'include',
    'method': 'PUT',
    'headers': {
      'Content-Type': 'application/json'}
    })
    getAllAccounts();
    if(res2.status == 200){
    
    location.reload();
    }
  }
})




function addAccounts(accounts){
  
  let acctsTable = document.getElementById('accounts-tbody');
  acctsTable.innerHTML = '';
  

  for (account of accounts) {
      // console.log(account);

      let row = document.createElement('tr');
      let accountId = document.createElement('td');
      accountId.innerHTML = account.accountId;
      let type = document.createElement('td');
      type.innerHTML = account.typeName;
      let amount = document.createElement('td');
      amount.innerHTML = `$${(account.balance/100).toFixed(2)}`
      
      // let trxlist = document.createElement('td');
      // trxlist.innerHTML = `<button class="button is-info is-light has-text-weight-semibold my-2" id="${acct.accountId}">View Transactions</button>`;
      // trxlist.addEventListener('click', (e) => {
      //     sessionStorage.setItem("account", e.target.id);
      //     window.location.href = './account.html';
      //     console.log(`clicked "view account" for account ${e.target.id}`)})

      row.appendChild(accountId);
      row.appendChild(amount);
      row.appendChild(type);

      acctsTable.appendChild(row);


  }
}

linkButton.addEventListener('click', async ()=>{
  let email = sessionStorage.getItem("email");
let aid = linkAccountId.value;
  let res = await fetch(`http://${url}:8080/accounts/${aid}/users/${email}`, {
    'credentials': 'include',
    'method': 'PUT',
    'headers': {
      'Content-Type': 'application/json'}
    })
    let data = await res.json;
    window.location.reload();
})

  
unlinkButton.addEventListener('click', async ()=>{
let email = sessionStorage.getItem("email");
let aid = unlinkAccountId.value;
console.log(aid);
  let res = await fetch(`http://${url}:8080/accounts/${aid}/users/${email}`, {
    'credentials': 'include',
    'method': 'Delete',
    'headers': {
      'Content-Type': 'application/json'}
    })
    let data = await res.json;
    console.log(data);
    window.location.reload();
})



// removeButton.addEventListener('click', async (e) => {
// accountId = accountId.value;
// let email = localStorage.getItem(email)

// let res = await fetch(`http://${url}:8080/accounts/${accountId}`, {
//   'credentials': 'include',
//   'method': 'DELETE',
//   'headers': {
//     'Content-Type': 'application/json'
//   }
// })

// if (res.status == 200) {
//   confirmation.innerHTML = ""
//   let confirmationMessage = document.createElement('p');
//   confirmationMessage.innerHTML = "Account deleted successfully!";
//   confirmationMessage.style.color = 'green';
//   confirmationMessage.style.fontWeight = 'bold';
//   confirmation.appendChild(confirmationMessage);

// } else if (res.status == 400) {
//   confirmation.innerHTML = ""
//   let data = await res.json();
//   for (const msg of data) {
//     let errorElement = document.createElement('p');
//     errorElement.innerHTML = msg;
//     errorElement.style.color = 'red';
//     errorElement.style.fontWeight = 'bold';
//     confirmation.appendChild(errorElement);
//   }
// }
// });
