let emailInput = document.querySelector("#email");
document.getElementById("email_submit").addEventListener("click", forgotEmail);


async function forgotEmail() { 
    try {
        let res = await fetch(`http://localhost:6060/forgotpassword`,{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: emailInput.value
            }),
        });
        if (res.status == 200){
            let data = await res.json;
            let email = data.email
            
        }
        if (res.status == 401){
            data = await res.json();
            console.log("401 status gopu");
            emailInput.value = "";
            console.log("401 status gopu2");
            let para = document.querySelector("#error-message");
            console.log(`para = ${para}`);
            para.style.color = "black";
            para.innerHTML = data.message;

        }
    } catch (error){
        console.log(error);
    }
}
