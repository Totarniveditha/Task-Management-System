let ac = document.getElementById("ac");
let submit = document.getElementById("submit");

let ntask;
let completed;
let notaskyet;
let logout=document.getElementById("logout");



//checksession
fetch("http://127.0.0.1:3000/check-session", {
    method: "GET",
    credentials: "include"
})
.then(res => {

    if (!res.ok) {
        window.location.href = "login.html";
        return;
    }

    return res.json();
})
.then(data => {

    if (data && !data.loggedIn) {
        window.location.href = "login.html";
    }

});

// NO task yet
if (tlist.children.length === 0) {
    notaskyet = document.getElementById("notaskyet");
    notaskyet.innerHTML = "NO task yet";
}


// FUNCTION TO CREATE A TASK
function createTask(taskText,taskid,completedstatus) {

    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskText));


    // CHECKBOX
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked=completedstatus;
    li.appendChild(checkbox);


    let completedcount = document.getElementById("completed");

    checkbox.addEventListener("change", () => {



        fetch("http://127.0.0.1:3000/tasks/completed",{
            method:"PUT",
            credentials:"include",
            headers: {
                "content-type":"application/json"
            },
            body:JSON.stringify({
            

            id: taskid,
            completed: checkbox.checked

            })
        }).then(res=>{
            return res.json();
        })
        .then(data=>{
            console.log(data.message);
            
        });

        completed = document.querySelectorAll("input:checked");
       
        completedcount.innerHTML = completed.length;

        if (completed.length === tlist.children.length) {
            completedcount.innerHTML = "🎊";
        }
    });


    // DELETE BUTTON
    let button = document.createElement("button");
    button.innerHTML = "delete";

    li.appendChild(button);


    button.addEventListener("click", () => {


      fetch(`http://127.0.0.1:3000/tasks/${taskid}`,{
        method:"DELETE",
        credentials:"include",
      })
      .then(res=>{
       return  res.json();
      })
      .then(data=>{
        console.log(data);
      });







        li.remove();

        ntask.innerHTML = tlist.children.length;

        if (tlist.children.length === 0) {

            notaskyet = document.getElementById("notaskyet");

            notaskyet.innerHTML = "NO task yet";
        }
    });


    // DOUBLE CLICK EDIT
    li.addEventListener("dblclick", () => {

        let oldtext = li.firstChild.textContent;

        let edit = document.createElement("input");

        edit.value = oldtext;

        li.firstChild.replaceWith(edit);


        edit.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

            let newtext = edit.value;



            //send to backend when edited new task
             fetch(`http://127.0.0.1:3000/tasks`,{
                method:"PUT",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:newtext,
                    id:taskid
                })
             }).then(res=>{
                return res.json();
             })
             .then(data=>{
                console.log(data.message);
             });





                edit.replaceWith(
                    document.createTextNode(newtext)
                );
            }
        });
    });


    // ADD LI TO LIST
    tlist.appendChild(li);

    notaskyet.innerHTML = "";

    ntask = document.getElementById("ntask");

    ntask.innerHTML = tlist.children.length;

    completed = document.querySelectorAll("input:checked");

completedcount = document.getElementById("completed");

completedcount.innerHTML = completed.length;

if (completed.length === tlist.children.length) {
    completedcount.innerHTML = "🎊";
}




}



// ADD NEW TASK
submit.addEventListener("click", () => {


    if (ac.value !== "") {


        let newtask=ac.value;

        fetch("http://127.0.0.1:3000/tasks", {

            method: "POST",

            credentials: "include",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: newtask
            })

        })
        .then(res => {

            console.log("RESPONSE ARRIVED");

            return res.json();

        })
        .then(data => {

            console.log(data.message);

            console.log(data.task.name);
             // CREATE TASK IN UI
        createTask(newtask,data.id);
           

        })
        .catch(error => {

            console.log("FETCH ERROR:", error);

        });


       
    }


    console.log("submitted");

    console.log(ac.value);

    ac.value = "";

});



// DELETE ALL
let delall = document.getElementById("delall");

delall.addEventListener("click", () => {

  

    fetch("http://127.0.0.1:3000/tasks",{
        method:"DELETE",
        credentials:"include"
    }).then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log(data.message);

         tlist.innerHTML = "";

    ntask.innerHTML = tlist.children.length;


    });




    if (tlist.children.length === 0) {

        notaskyet = document.getElementById("notaskyet");

        notaskyet.innerHTML = "NO task yet";
    }

});



// GET TASKS FROM MONGODB
fetch("http://127.0.0.1:3000/tasks", {

    method: "GET",

    credentials: "include"

})
.then(res => {

    return res.json();

})
.then(data => {

    console.log("MY TASKS:", data);


    // CREATE EVERY STORED TASK IN UI
    data.forEach(task => {

        createTask(task.task,task._id,task.completed);
     

    });

   




})
.catch(error => {

    console.log("FETCH ERROR:", error);

});


//logout
logout.addEventListener("click",()=>{
    fetch("http://127.0.0.1:3000/logout",{
       method:"POST",
       credentials:"include", 
    }).then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log(data.message);
        if(data.message=="Logout successfully")
            window.location.href="login.html";
    });
});