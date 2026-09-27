let ruser=document.getElementById("ruser");
let rpass=document.getElementById("rpass");
let register=document.getElementById("register");
let remessage=document.getElementById("remessage");
let loading=document.createElement("div");
loading.classList.add("loader");

register.addEventListener("click",()=>{
    let registerval={
        username:ruser.value,
        password:rpass.value

    };
    
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
        console.log(data.message);
        let text=document.createElement("p");
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