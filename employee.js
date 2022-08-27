let submitButton = document.getElementById("submit-btn"); 
let typeIdInput = document.getElementById("type-id-input");
let amountInput = document.getElementById('amount-input');
let confirmation = document.getElementById('error-messages');
let confirmationlink = document.getElementById('error-messages-link');

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
let submitTransferButton = document.getElementById('submit-transfer-btn');
let transferAmountDollars = document.getElementById('transfer-amount-dollars');
let transferAmountPennies = document.getElementById('transfer-amount-pennies');
// let confirmation = document.getElementById('error-messages');

let receivingId = document.getElementById('transfer-receiving-id');
let sendingId = document.getElementById('transfer-sending-id');
let transferType = document.getElementById('transfer-type');
let backButton = document.getElementById('back-btn');

document.addEventListener('DOMContentLoaded', getAllAccounts)


searchEmailButton.addEventListener("click", setEmail);
backButton.addEventListener("click", getAllAccounts);

function setEmail(){

  sessionStorage.clear;
  sessionStorage.setItem("email", emailInput.value); 
  

  location.reload();

}

async function getAllAccounts(){
  let email = sessionStorage.getItem("email");
  document.getElementById("accounts-title").innerHTML = "Accounts for " + email;
  document.getElementById("accounts-title").innerHTML = "Accounts for " + email;
  document.getElementById("th-1").innerHTML = "ID";
  document.getElementById("th-2").innerHTML = "Balance";
  document.getElementById("th-3").innerHTML = "Type";
  document.getElementById("th-4").innerHTML = "";
  backButton.innerHTML = "";
  
  
      try {
          let res = await fetch(`http://${url}:8080/${email}/accounts`, {
          
          'credentials': 'include',
          'method': 'GET',
          'headers': {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json'
  
          }});
  
          let data = await res.json();
          sessionStorage.setItem("accounts", data);
          unlinkAccountId.innerHTML = "";
          sendingId.innerHTML = "";
          receivingId.innerHTML= "";
          for(let i = 0; i<(data).length;i++){
            let unlinkIdOption = document.createElement('option');
            let sendingIdOption = document.createElement('option');
            let receivingIdOption = document.createElement('option');
            
            unlinkIdOption.text = data[i].accountId;
            unlinkIdOption.value = data[i].accountId;
            sendingIdOption.text = data[i].accountId;
            sendingIdOption.value = data[i].accountId;
            receivingIdOption.text = data[i].accountId;
            receivingIdOption.value = data[i].accountId;
           

            unlinkAccountId.appendChild(unlinkIdOption);
            sendingId.appendChild(sendingIdOption);
            receivingId.appendChild(receivingIdOption);
        }
          addAccounts(data);
          // console.log(data);
          
  }
  
  catch(err) {
    // console.log(err);
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
  let errorElement = document.createElement('p');
  errorElement.innerHTML = data.accountId;
  errorElement.style.color = 'green';
  errorElement.style.fontWeight = 'bold';
  newAccountConfirmation.appendChild(errorElement);

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
      // let accounts = sessionStorage.getItem("accounts");
      // let accId = accounts.accountId;
      // console.log(accounts)
      let row = document.createElement('tr');
      let accountId = document.createElement('td');
      accountId.innerHTML = account.accountId;
      let type = document.createElement('td');
      type.innerHTML = account.typeName;
      let amount = document.createElement('td');
      amount.innerHTML = `$${(account.balance/100).toFixed(2)}`
      accountId.style.color = 'blue';
      accountId.style.textDecoration = 'underline';
      accountId.style.cursor = 'pointer';
      
      let trxlist = document.createElement('td');
      trxlist.innerHTML = `<button class="button is-info is-light has-text-weight-semibold my-2" id="${accounts.accountId}">View Transactions</button>`;
      trxlist.addEventListener('click', (e) => {
          sessionStorage.setItem("account", e.target.id);
          window.location.href = './account.html';
          })

      accountId.addEventListener('click', async (e) => {
        sessionStorage.setItem("accountId", e.target.innerHTML)
        let accountId = sessionStorage.getItem("accountId");

        backButton.innerHTML = "Back to Accounts";
        backButton.style.color = 'blue';
        backButton.style.textDecoration = 'underline';
        backButton.style.cursor = 'pointer';

        // backButton.addEventListener('click', )
        
        document.getElementById("th-1").innerHTML = "Date";
        document.getElementById("th-2").innerHTML = "Status";
        document.getElementById("th-3").innerHTML = "Amount";
        document.getElementById("th-4").innerHTML = "Description";
        document.getElementById("accounts-title").innerHTML = "Transactions for Account " + accountId;

        try {
          
          let res = await fetch(`http://${url}:8080/trx/account/${accountId}`, {
          
          'credentials': 'include',
          'method': 'GET',
          'headers': {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json'
  
          }});
  
          let data = await res.json();

          addTrx(data);


  }
  
  catch(err) {

    accountsList.innerHTML = "";
    accountsList.innerHTML = "You are not logged in!";
    console.log(err);
}

        

      })
      
      
      row.appendChild(accountId);
      row.appendChild(amount);
      row.appendChild(type);

      acctsTable.appendChild(row);


  // })
}
}




function addTrx(trxs){
  
  let acctsTable = document.getElementById('accounts-tbody');
  acctsTable.innerHTML = '';
  

  for (trx of trxs) {

      let row = document.createElement('tr');
      
      let resolveTime = document.createElement('td');
      resolveTime.innerHTML = trx.resolveTime;

      let type = document.createElement('td');
      type.innerHTML = trx.typeName;
      
      let amount = document.createElement('td');
      amount.innerHTML = `$${(trx.amount/100).toFixed(2)}`

      let description = document.createElement('td');
      description.innerHTML = trx.description;

      row.appendChild(resolveTime);
      row.appendChild(type);
      row.appendChild(amount);
      row.appendChild(description);
      

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
    if(res.status == 200){
    window.location.reload();
    }
    if(res.status == 400){
      confirmationlink.innerHTML = "Account Not Found"
      confirmationlink.style.color = "red";
      confirmation.style.fontWeight = "bold";
      confirmation.style.position = "center";
    }
    if(res.status == 404){
      confirmationlink.innerHTML = "Enter An Account Number"
      confirmationlink.style.color = "red";
      confirmation.style.fontWeight = "bold";
      confirmation.style.position = "center";
    }
})

  
unlinkButton.addEventListener('click', async ()=>{
 
  
let email = sessionStorage.getItem("email");
let aid = unlinkAccountId.value;
  let res = await fetch(`http://${url}:8080/accounts/${aid}/users/${email}`, {
    'credentials': 'include',
    'method': 'Delete',
    'headers': {
      'Content-Type': 'application/json'}
    })
    window.location.reload();
})


submitTransferButton.addEventListener('click', async ()=> {
  let amount  = (transferAmountDollars.value);
  let rid = receivingId.value;
  let sid = sendingId.value;
  let email = sessionStorage.getItem("email");
  let res = await fetch(`http://${url}:8080/trx/accounts`, {
    'credentials': 'include',
    'method': 'POST',
    'headers': {
        'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      "sendingId": sid,
      "receivingId": rid,
      "amount":amount,
      "email":email

      
    })
})
location.reload();
console.log(res);

})
