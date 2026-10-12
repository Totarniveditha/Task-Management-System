require("dotenv").config();
const bcrypt=require("bcrypt");
const express=require("express");
const app=express();
const cors=require("cors");
const session=require("express-session");
app.use(express.json());
//to handle incoming json
//res.json() to handle outgoing json


app.use(cors({
     origin: "http://127.0.0.1:5500",
    credentials: true
}));
app.use(session(
    {
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false

    }
));


const { MongoClient,ObjectId } = require("mongodb");

const uri =process.env.MONGO_URI;


const client = new MongoClient(uri);
const db = client.db("todoApp");
const users = db.collection("users");
const task = db.collection("task");

client.connect()
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

   
//middleware for authourization
function checkLogin(req, res, next) {
    if (!req.session.userid) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    next();
}

//check sesssion
app.get("/check-session", (req, res) => {

    if (!req.session.userid) {
        return res.status(401).json({
            loggedIn: false
        });
    }

    res.json({
        loggedIn: true
    });
});




        app.post("/tasks",checkLogin,async (req,res)=>{

            try{
            
              console.log(req.body);
    console.log("TASK SESSION:", req.session);
            const taskdata=req.body;
            const result =await task.insertOne({
                task:taskdata.name,
               userid:req.session.userid ,
                completed: false
            });



            res.json({
                message:"Task Received",
                task:req.body,
                id:result.insertedId
            });
         
        }

        catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to add tasks"
        });
    }






        });

        //for logout
        app.post("/logout",(req,res)=>{
            req.session.destroy((err)=>{
                if(err){
                 return res.status(500).json({
                        message:"found error"
                    });
                }
                res.json({
                    message:"Logout successfully"
                });
            })
        });



          app.get("/tasks",checkLogin,async (req,res)=>{

            try{
                const userdata=await task.find({
                    userid:req.session.userid
                }).toArray();
                console.log("user task",userdata);
                res.json(userdata);
            }
            catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch tasks"
        });
             }

            });

          //to delete task from mongo 
          
          app.delete("/tasks/:id",checkLogin,async(req,res)=>{

            try{

             console.log("ID RECEIVED:", req.params.id);
            await task.deleteOne({
                _id:new ObjectId(req.params.id),
                userid: req.session.userid
            });
            res.json({
                message:"Deleted item"
            });
        }

        catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to delete task"
        });
    }

          });


         //delete all
         app.delete("/tasks",checkLogin,async(req,res)=>{

            try{
            await task.deleteMany({
                userid:req.session.userid
            });
            res.json({
                message:"deleted all"
            });
        }

        catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to delete tasks"
        });
    }
         });







        //to edit existing data
        app.put("/tasks",checkLogin,async(req,res)=>{
            try{
             console.log("PUT BODY:", req.body);
            await task.updateOne(
                {
                    _id:new ObjectId(req.body.id),
                    userid: req.session.userid 
                },
                {
                    $set:{
                        task:req.body.name
                    }
                }
            )

            res.json({
                message:"edited"
            });
        }
        catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to edit tasks"
        });
    }
        });


       // to update completed 
       app.put("/tasks/completed",checkLogin,async(req,res)=>{
        try{
        await task.updateOne(
            {
                _id:new ObjectId(req.body.id),
                userid: req.session.userid
            },
            {
                $set:{
                    completed:req.body.completed
                }
            }
        );

        res.json({
            message:"updated"
        });
    }
    catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update tasks"
        });
    }

       });








        // if for login
       
app.post("/login", async (req, res) => {
    try {
        const logindata = req.body;

        const logged = await users.findOne({
            username: logindata.name
        });

        if (!logged) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const isMatch = await bcrypt.compare(
            logindata.pass,
            logged.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        
req.session.regenerate((err) => {
    if (err) {
        return res.status(500).json({
            message: "Login failed"
        });
    }

    req.session.userid = logged._id;

    res.json({
        message: "Login successful",
        user_id: logged._id.toString()
    });
});


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Login failed"
        });
    }
});

        
        //if for registration

      
app.post("/register", async (req, res) => {
    try {
        const registerval = req.body;

        const hashedPassword = await bcrypt.hash(registerval.password, 10);
        const existinguser = await users.findOne({
            username: registerval.username
        });

        if (existinguser) {
            return res.json({
                message: "Already Registered!!!"
            });
        }

        await users.insertOne({
            username: registerval.username,
            password: hashedPassword
        });

        res.json({
            message: "Registration completed"
        });
    } catch (error) {
    if (error.code === 11000) {
        return res.status(409).json({
            message: "Username already exists"
        });
    }

    console.log(error);
    res.status(500).json({
        message: "Registration failed"
    });
}
});



    


app.listen(3000, () => {
    console.log("Server running on port 3000");
});










