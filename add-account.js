let submitButton = document.getElementById("submit-btn");
let typeIdInput = document.getElementById("type-id-input");
let amountInput = document.getElementById('amount-input');

let idButtons = document.querySelectorAll('input[name="account-type-id"]');


submitButton.addEventListener('click', async () => {

    let selectedRadioButton;
    for (let radioBtn of idButtons) {
        if (radioBtn.checked) {
            selectedRadioButton = radioBtn
            break;
        }
    }
    
    let res = await fetch(`http://127.0.0.1:8080/account`, {
        // 'mode': 'no-cors',
        'credentials': 'include',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            "typeId": selectedRadioButton.value,
            "balance": amountInput.value
        })
    })

if (res.status == 201) {
    
    console.log("Account created successfully")

}
})










