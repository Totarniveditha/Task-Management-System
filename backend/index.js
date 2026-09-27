require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri =process.env.MONGO_URI;


const client = new MongoClient(uri);
const db = client.db("todoApp");
const users = db.collection("users");

client.connect()
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

   /*users.insertOne({
    name: "Nivvi",
    password: "test123"
})
.then(() => {
    console.log("User inserted!");
})
.catch((err) => {
    console.log("Insert error:", err);
});*/




const http = require("http");

const server = http.createServer((req, res) => {

    // CORS
    res.setHeader(
        "Access-Control-Allow-Origin",
        "http://127.0.0.1:5500"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );


    // Handle preflight request
    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }


    console.log(req.method);
    console.log(req.url);


    // Store incoming body
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
        
    });


    // Runs after complete body is received
    req.on("end", async () => {

        if (req.method === "POST" && req.url === "/tasks") {

            console.log(body);

            res.setHeader(
                "Content-Type",
                "application/json"
            );


            const task=JSON.parse(body);
            res.end(JSON.stringify({
                message: "Task received",
                task:task
            }));

        }
        // if for login
        else if(req.method==="POST"&&req.url==="/login"){
            console.log(body);
            res.setHeader(
                "Content-Type","application/json"
            );
            
            const logindata=JSON.parse(body);
           
            

            const loggeduser=await users.findOne({
                username:logindata.name,
                password:logindata.pass
            })
            if(loggeduser)
            {
                res.end(JSON.stringify({
                    message:"Login successfull",
                    user_id:loggeduser._id.toString()
                }))
            }
            else{
                res.end(JSON.stringify({
                    message:"Invalid...."
                }))
            }

        }
        //if for registration

        else if(req.url=="/register"&&req.method=="POST")
        {
            
            res.setHeader(
                "Content-Type","application/json"
            );
            const registerval=JSON.parse(body);

            const existinguser=await users.findOne({
                username:registerval.username,
                password:registerval.password
            });
            if(existinguser){
                res.end(JSON.stringify({
                    message:"Already Registered!!!"
                }))
            }
            else{
                
            users.insertOne({
                username:registerval.username,
                password:registerval.password
            })
            .then(()=>{
                
                res.end(JSON.stringify({
                    message:"Registration completed"
                }))
            })
            .catch((err)=>
            {
                 console.log(err);
                res.end(JSON.stringify({
                    message:"Found error"
                }))
            });
        }

            /*res.end(JSON.stringify({
                
                username:registerval.username,
                password:registerval.password
            }));*/

        }

        else {

            res.end("Hello from backend");

        }

    });

});


server.listen(3000, () => {
    console.log("Server running on port 3000");
});