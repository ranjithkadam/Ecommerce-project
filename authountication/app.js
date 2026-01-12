// ======================= Register page =============================================

document.getElementById("register").addEventListener("click", ()=>{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(!email || !password){
        document.getElementById("warning").innerText=`fill all the fields`;
        return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    let success=document.getElementById("warning");
    success.innerText=`Registerd successfully`;
    success.className="text-green-500"   
});

//===================== Login Page ===================================================

document.getElementById("login").addEventListener("click", ()=>{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email === localStorage.getItem("email") && password === localStorage.getItem("password")){
        alert("Login Successfull")
        document.getElementById("login-form").submit();
    }
})