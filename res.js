
let ruser=document.getElementById("ruser");
let rpass=document.getElementById("rpass");
let register=document.getElementById("register");
let remessage=document.getElementById("remessage");
let loading=document.createElement("div");
loading.classList.add("loader");
let text=document.createElement("p");

register.addEventListener("click",()=>{
    let registerval={
        username:ruser.value,
        password:rpass.value

    };

    text.textContent="";
    remessage.innerHTML = "";
    if (ruser.value === "" || rpass.value === "") {
        remessage.textContent = "Please enter username and password";
        return;
    }

    
    fetch("http://localhost:3000/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(registerval)

        

    })
    .then(res=>{
        return res.json();
    })
    .then(data=>
    {
       // let text=document.createElement("p");
        text.textContent=data.message;
        remessage.appendChild(text);
        remessage.appendChild(loading);
        if(data.message=="Already Registered!!!"||data.message=="Registration completed"){
            setTimeout(()=>{
            window.location.href="login.html";
            
            
            },5000);
          


        }
    }
    );



});
