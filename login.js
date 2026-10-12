
let username=document.getElementById("username");

let login=document.getElementById("logged");

let password=document.getElementById("password");
let blogin=document.getElementById("blogin");

blogin.addEventListener("click",()=>{
  let logindata= {
   name:username.value,
   pass:password.value
   };

login.textContent = "";

    // check empty fields
    if (username.value === "" || password.value === "") {
        login.textContent = "Please enter username and password";
        return;
    }
   fetch("http://127.0.0.1:3000/login",{
    method:"POST",
    credentials: "include",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(
        logindata
    )

   })
   .then(res=>{
    return res.json();
   })
   .then(data=>{
    
     login.textContent = data.message;
  
if(data.message=="Login successful")
{
    setTimeout(()=>{window.location.href="index.html";},2000);
   
}

     
   });

});
