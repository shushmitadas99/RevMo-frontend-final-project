let submitButton = document.getElementById("submit-btn"); 
let typeIdInput = document.getElementById("type-id-input");
let amountInput = document.getElementById('amount-input');
let confirmation = document.getElementById('error-messages');
let idButtons = document.querySelectorAll('input[name="account-type-id"]');
let removeButton = document.getElementById("remove-btn"); 
let accountId = document.getElementById("account-id");
let accountIdInput = document.getElementById("account-id-input");
let emailInput = document.getElementById("email-input");
let searchEmailButton = document.getElementById('search-email-btn')


// Set active user

searchEmailButton.addEventListener("click", function(){
  sessionStorage.setItem("email", emailInput.value)
});

let email = sessionStorage.getItem("email");








// Add account


submitButton.addEventListener('click', async () => {
  let selectedRadioButton;
  for (let radioBtn of idButtons) {
    if (radioBtn.checked) {
      selectedRadioButton = radioBtn
      break;
    }
  }

  let res = await fetch(`http://${url}:8080/accounts`, {
    // 'mode': 'no-cors',
    'credentials': 'include',
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      "id": accountIdInput.value,
      "typeId": selectedRadioButton.value,
      "balance": amountInput.value
    })
  })

  if (res.status == 201) {
    confirmation.innerHTML = ""
    let confirmationMessage = document.createElement('p');
    confirmationMessage.innerHTML = "Account created successfully!";
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

})


// Remove Account



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
