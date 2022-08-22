let password = document.querySelector("#email").value;
document.getElementById("email_submit").addEventListener("click", forgotEmail);


async function forgotEmail() {
    try {
        let res = await fetch(`http://localhost:8080/forgotpassword`,{
            credentials: "include",
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: emailInput.value
            }),
        });
        if (res.status == 202){
            let data = await res.json;
            let email = data.email
            
        }
        if (res.status == 401){
            data = await res.json();
            console.log("401 status gopu");
            emailInput.value = "";
            console.log("401 status gopu2");
            let para = document.querySelector("#error-message p");
            console.log(`para = ${para}`);
            para.style.color = "black";
            para.innerHTML = data.message;

        }
    } catch (err){
        // console.log(err);
    }
}