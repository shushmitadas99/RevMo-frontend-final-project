let phone = document.getElementById('phone-input');
let firstName = document.getElementById('first-name-input');
let lastName = document.getElementById('last-name-input');
let submitBtn = document.getElementById('submit');
let errorMsgs = document.getElementById('error-msgs');
console.log("in edit-user-info.js")

window.addEventListener('load', async () => {
    console.log('in window load block edit-user-info.js');
        try {
            // console.log("in try load-test.js");
            let res = await fetch(`http://${url}:8080/user`, {
            
            'credentials': 'include',
            'method': 'GET',
            'headers': {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
    
            }});
    
            let data = await res.json();
            // console.log(data);
            // phone.attributes('placeholder', `${data.phoneNumber}`);

            let prevPhone = document.createAttribute("value");
            prevPhone.value = data.phoneNumber;
            phone.attributes.setNamedItem(prevPhone);

            let prevFirstName = document.createAttribute("value");
            prevFirstName.value = data.firstName
            firstName.attributes.setNamedItem(prevFirstName);

            let prevLastName = document.createAttribute("value");
            prevLastName.value = data.lastName
            lastName.attributes.setNamedItem(prevLastName);
            

    
        } catch(err) {
            console.log(err);
        } 


})

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("clicked submit button");
    let phoneInput = phone.value;
    let firstNameInput = firstName.value;
    let lastNameInput = lastName.value;
    console.log("submit");
    console.log(phoneInput);

    let res = await fetch(`http://${url}:8080/user`, {
        'credentials': 'include',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            "phone": phoneInput,
            "firstName": firstNameInput,
            "lastName": lastNameInput
        })
    })

    if (res.status == 201) {
        window.location.href = '/user-page.html';
    }
    else if (res.status = 400){
        errorMsgs.innerHTML = res.message;
    }

})