let passwordInput = document.querySelector("#new_password");
let cnfrmPasswordInput = document.querySelector("#confirm_password");
let emailInput = document.querySelector("#email_check")
let message = document.querySelector("#password_message");

var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

document.getElementById("reset_password").addEventListener("click", resetPassword);

// When the user clicks on the password field, show the message box
passwordInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
}
  
  // When the user clicks outside of the password field, hide the message box
passwordInput.onblur = function() {
    document.getElementById("message").style.display = "none";
}
  
// When the user starts to type something inside the password field
passwordInput.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;

    if(passwordInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
  }
  
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(passwordInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
  
    // Validate numbers
    var numbers = /[0-9]/g;
    if(passwordInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
  
    // Validate length
    if(passwordInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
}

async function resetPassword() { 
    try {
        console.log(passwordInput.value)
        console.log(cnfrmPasswordInput.value)

        const passwordValidateRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        
        var validPwd = passwordValidateRegEx.test(passwordInput.value); // will return true if password is valid otherwise false

        if (passwordInput.value==cnfrmPasswordInput.value && validPwd) {    
        let res = await fetch(`http://localhost:8080/resetpassword`,{
            method:"POST", 
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                newpassword: passwordInput.value,
                email: emailInput.value,

            }),
        });
        if (res.status == 201){
            alert("Password Reset Successfully!")
        }
        if (res.status == 401){
            alert("Password Reset Unsucesssful!")

        }}else{
            alert("Password does not match!")
        }
    } catch (error){
        console.log(error);
    }
}
