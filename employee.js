let submitButton = document.getElementById("submit-btn"); 
let typeIdInput = document.getElementById("type-id-input");
let amountInput = document.getElementById('amount-input');
let confirmation = document.getElementById('error-messages');
let idButtons = document.querySelectorAll('input[name="account-type-id"]');
let removeButton = document.getElementById("remove-btn"); 
let accountId = document.getElementById("account-id");
let accountIdInput = document.getElementById("account-id-input");
let emailInput = document.getElementById("email-input"); 
let searchEmailButton = document.getElementById('search-email-btn');
let accountsList = document.getElementById('accounts-tbody');

// set active account

// window.addEventListener('load', async () => {
//   console.log('in window load block load-test.js');
//       try {
//           console.log("in try load-test.js");
//           let res = await fetch(`http://${url}:8080/user`, {
          
//           'credentials': 'include',
//           'method': 'GET',
//           'headers': {
//               'Access-Control-Allow-Origin':'*',
//               'Content-Type': 'application/json'
  
//           }});
  
//           let data = await res.json();
//           console.log(data);
//           hello.innerHTML = "";
//           hello.innerHTML = `Hello, ${data.firstName}`;
//           nameDiv.innerHTML = `${data.firstName} ${data.lastName}` 
//           emailDiv.innerHTML = data.email; 
//           phoneDiv.innerHTML = data.phoneNumber; 
//           console.log(data.accounts);
  
//           addAccounts(data.accounts);
  
//       } catch(err) {
          
//           accountsList.innerHTML = "";
//           accountsList.innerHTML = "You are not logged in!";
//           console.log(err);
//       } 

//   })

// Add account




// Set active user



searchEmailButton.addEventListener("click", async () => {

  sessionStorage.setItem("email", emailInput.value);
  let email = sessionStorage.getItem("email");
  
  console.log('in window load block load-test.js');
      try {
          console.log("in try load-test.js");
          let res = await fetch(`http://${url}:8080/${email}/accounts`, {
          
          'credentials': 'include',
          'method': 'GET',
          'headers': {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json'
  
          }});
  
          let data = await res.json();
          console.log(data);
          // hello.innerHTML = "";
          // hello.innerHTML = `Hello, ${data.firstName}`;
          // nameDiv.innerHTML = `${data.firstName} ${data.lastName}` 
          // emailDiv.innerHTML = data.email; 
          // phoneDiv.innerHTML = data.phoneNumber; 
          // console.log(data.accounts);
  
          addAccounts(data);


  }
  
  catch(err) {

    accountsList.innerHTML = "";
    accountsList.innerHTML = "You are not logged in!";
    console.log(err);
}


})

//   function addAccounts(accts){
//     for (acct of accts){
//         let box = document.createElement('div');
//         box.classList.add('box');
//         let cols = document.createElement('div');
//         cols.classList.add('columns');
//         let col1 = document.createElement('div');
//         col1.classList.add('column', 'is-two-fifths', 'has-text-centered-mobile');
        
//         let p1 = document.createElement('p');
//         let header = document.createElement('span');
//         header.classList.add('is-size-4');
//         header.innerHTML = "Account";
//         let acctNum = document.createElement('span');
//         acctNum.classList.add('px-5', 'is-size-4');
//         acctNum.innerHTML = acct.accountId; 
//         p1.appendChild(header)
//         p1.appendChild(acctNum)
        
//         let p2 = document.createElement('p');
//         p2.innerHTML = acct.typeName; 

//         col1.appendChild(p1);
//         col1.appendChild(p2);

//         let col2 = document.createElement('div');
//         col2.classList.add('column', 'is-size-3', 'has-text-centered-mobile', 'is-one-fifths-tablet', 'is-two-fifths-desktop');
//         col2.innerHTML = `\$${(acct.balance/100).toFixed(2)}`; //------------check -----------------------

//         let col3 = document.createElement('div');
//         col3.classList.add('column', 'is-two-fifths-tablet', 'is-one-fifth-desktop', 'has-text-centered-mobile');

//         let acctPage = document.createElement('div');
//         acctPage.innerHTML =  `<button class="button is-info is-light has-text-weight-semibold my-2" id="${acct.accountId}">View Account</button>`;
//         acctPage.addEventListener('click', (e) => {
//             sessionStorage.setItem("account", e.target.id);
//             window.location.href = './account.html';
//             console.log(`clicked "view account" for account ${e.target.id}`)
//         })


//         col3.appendChild(acctPage);

//         cols.appendChild(col1);
//         cols.appendChild(col2);
//         cols.appendChild(col3);

//         box.appendChild(cols);

//         accountsList.appendChild(box);

//     }
// }

function addAccounts(accounts){
  
  let acctsTable = document.getElementById('accounts-tbody');
  acctsTable.innerHTML = '';
  

  for (account of accounts) {
      console.log(account);

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


// function addIncomeToTable(transactions){
//   let transxTable = document.querySelector('#transactions-table tbody');
//   transxTable.innerHTML = '';
//   for (transx of transactions) {
//       console.log(transx);

//       let row = document.createElement('tr');
//       let date = document.createElement('td');
//       if (transx.resolveTime == null) {
//           date.innerHTML = new Date(transx.requestTime).toLocaleDateString();
//       } else {
//           date.innerHTML = new Date(transx.resolveTime).toLocaleDateString();
//       }
      
      
//       let type = document.createElement('td');
//       type.innerHTML = transx.description;
//       let amount = document.createElement('td');
//       amount.innerHTML = transx.amount;
      
//       let status = document.createElement('td');
//       status.innerHTML = transx.typeName;
      

//       row.appendChild(date);
//       row.appendChild(type);
//       row.appendChild(amount);
//       row.appendChild(status);
      

//       transxTable.appendChild(row);


//   }
// }








  



removeButton.addEventListener('click', async (e) => {
accountId = accountId.value;
let email = localStorage.getItem(email)

let res = await fetch(`http://${url}:8080/accounts/${accountId}`, {
  'credentials': 'include',
  'method': 'DELETE',
  'headers': {
    'Content-Type': 'application/json'
  }
})

if (res.status == 200) {
  confirmation.innerHTML = ""
  let confirmationMessage = document.createElement('p');
  confirmationMessage.innerHTML = "Account deleted successfully!";
  confirmationMessage.style.color = 'green';
  confirmationMessage.style.fontWeight = 'bold';
  confirmation.appendChild(confirmationMessage);

} else if (res.status == 400) {
  confirmation.innerHTML = ""
  let data = await res.json();
  for (const msg of data) {
    let errorElement = document.createElement('p');
    errorElement.innerHTML = msg;
    errorElement.style.color = 'red';
    errorElement.style.fontWeight = 'bold';
    confirmation.appendChild(errorElement);
  }
}
});
