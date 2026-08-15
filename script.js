
let ac=document.getElementById("ac");
let submit=document.getElementById("submit");


submit.addEventListener("click",()=>
{
    console.log("submitted");
    console.log(ac.value);
    let li=document.createElement("li");
    li.innerHTML=ac.value;
    if(ac.value!==""){
    tlist.appendChild(li);
    li.addEventListener("click",()=>
    {
        
        li.style.textDecoration="line-through";
    });
  
    let button=document.createElement("button");
    button.innerHTML="delete";
    li.appendChild(button);
    button.addEventListener("click",()=>
    {
        li.remove();
    });}
    ac.value="";
});
let delall=document.getElementById("delall");
delall.addEventListener("click",()=>{
    tlist.remove();
});
