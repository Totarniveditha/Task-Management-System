let ac=document.getElementById("ac");
let submit=document.getElementById("submit");

let ntask;
let completed;
let notaskyet;

  if(tlist.children.length===0)
    {
         notaskyet=document.getElementById("notaskyet");
        notaskyet.innerHTML="NO task yet";
    }



submit.addEventListener("click",()=>
{   

  fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
},
    body: JSON.stringify({
        name: ac.value
    })
})

.then(res => {
    console.log("RESPONSE ARRIVED");
    return res.json();
})
.then(data => {
    console.log(data.message);
    console.log(data.task.name);
})
.catch(error => {
    console.log("FETCH ERROR:", error);
});
   





   
    console.log("submitted");

    console.log(ac.value);
    let li=document.createElement("li");
    li.innerHTML=ac.value;

    

     

    if(ac.value!==""){

    



    tlist.appendChild(li);
    notaskyet.innerHTML="";
    
    let checkbox=document.createElement("input");
    checkbox.type="checkbox";

    li.appendChild(checkbox);

    let completedcount=document.getElementById("completed");
    checkbox.addEventListener("change",()=>
    {

     completed=document.querySelectorAll("input:checked");
      completedcount.innerHTML=completed.length;
      if(completed.length===tlist.children.length)
      {
              completedcount.innerHTML="🎊"
      }
    });
    
    
    
   
     

    let button=document.createElement("button");
    button.innerHTML="delete";
    li.appendChild(button);
    button.addEventListener("click",()=>
    {
        li.remove();
        ntask.innerHTML=tlist.children.length;

         if(tlist.children.length===0)
    {
         notaskyet=document.getElementById("notaskyet");
        notaskyet.innerHTML="NO task yet";
    }




    });

}

li.addEventListener("dblclick",()=>
{
    let oldtext=li.firstChild.textContent;


    let edit=document.createElement("input");
    edit.value=oldtext;
    li.firstChild.replaceWith(edit);

    edit.addEventListener("keydown",(event)=>
    {
        if(event.key==="Enter")
        {
            let newtext=edit.value;

            edit.replaceWith(document.createTextNode(newtext));
        }
    });
    
});



 ntask=document.getElementById("ntask");
ntask.innerHTML=tlist.children.length;

  




    ac.value="";

  




});


let delall=document.getElementById("delall");
delall.addEventListener("click",()=>{
    tlist.innerHTML="";
    ntask.innerHTML=tlist.children.length;

  if(tlist.children.length===0)
    {
         notaskyet=document.getElementById("notaskyet");
        notaskyet.innerHTML="NO task yet";
    }




});


