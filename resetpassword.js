let passwordInput = document.querySelector("#new_password");
let cnfrmPasswordInput = document.querySelector("#confirm_password");
let message = document.querySelector("#password_message");
document.getElementById("reset_password").addEventListener("click", resetPassword);

async function resetPassword() { 
    try {
        let res = await fetch(`http://localhost:8080/resetpassword`,{
            method:"POST", 
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                passwordInput: passwordInput.value,
                cnfrmPasswordInput: cnfrmPasswordInput.value
            }),
        });
        if (res.status == 202){
            let data = await res.json;
            let password = data.password;
            let cnfrmPassword = data.cnfrmPassword
            
        }
        if (res.status == 401){
            data = await res.json();
            console.log("401 status gopu");
            emailInput.value = "";
            console.log("401 status gopu2");
            let para = document.querySelector("#password_message");
            console.log(`para = ${para}`);
            para.style.color = "black";
            para.innerHTML = data.message;

        }
    } catch (error){
        console.log(error);
    }
}
