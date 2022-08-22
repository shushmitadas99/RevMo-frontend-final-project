let password = document.querySelector("#new_password").value;
let cnfrmPassword = document.querySelector("#confirm_password").value;
console.log(" Password:", password,'\n',"Confirm Password:",cnfrmPassword);
let message = document.querySelector("#password_message");
resetPasswordButton.addEventListner("click", resetPassword);

async function resetPassword
    try{
        let res =await fetch(``)
    }

    