let passwordInput = document.querySelector("#new_password");
let cnfrmPasswordInput = document.querySelector("#confirm_password");
let emailInput = document.querySelector("#email_check")
let message = document.querySelector("#password_message");
document.getElementById("reset_password").addEventListener("click", resetPassword);

async function resetPassword() { 
    try {
        console.log(passwordInput.value)
        console.log(cnfrmPasswordInput.value)
       if (passwordInput.value==cnfrmPasswordInput.value)
    {let res = await fetch(`http://localhost:8080/resetpassword`,{
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
