let submitButton = document.getElementById("submit-btn");
let typeIdInput = document.getElementById("type-id-input");
let amountInput = document.getElementById('amount-input');
let confirmation = document.getElementById('error-messages');
let idButtons = document.querySelectorAll('input[name="account-type-id"]');


submitButton.addEventListener('click', async () => {
  let selectedRadioButton;
  for (let radioBtn of idButtons) {
    if (radioBtn.checked) {
      selectedRadioButton = radioBtn
      break;
    }
  }

  let res = await fetch(`http://127.0.0.1:8080/users/1/accounts`, {
    // 'mode': 'no-cors',
    'credentials': 'include',
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      "typeId": selectedRadioButton ? selectedRadioButton.value : null,
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
