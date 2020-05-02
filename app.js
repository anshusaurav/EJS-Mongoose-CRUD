//requires
//connect to db
//instantiate express app
//middleware required
//routes
//error handler middleware
//listener

const express = require("express");
// console.log(process.env);
const mongoose = require("mongoose");

const path = require('path');



//REquire router files
var indexRouter = require("./routes/index");
var userRouter = require("./routes/users")
const PORT = process.env.PORT||3000;

mongoose.connect('mongodb://localhost:27017/mongoose-crud', 
{useNewUrlParser: true, useUnifiedTopology: true},
(err) =>{
    console.log(err);
});

var app = express();

//connect to db
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//setup view engine
app.set("view engine", "ejs");          //use ejs and view engine
app.set("views", path.join(__dirname, "/views"));   //



app.use("/", indexRouter);
app.use("/users", userRouter);

app.use(express.static(__dirname +"/public"));



//error handle middlewares
//404
app.use((err,req, res, next) =>{
    res.statusCode = 404;
    res.send('Page not found');
    //same as res.status(404).send('Page not found');
});

//client or sever error
app.use((err, req, res, next) =>{
    if(err.name === "ValidationError"){
        res.json({err});
    }
    return res.json({err});
});
//listen port
app.listen(PORT, ()=> {
    console.log('server started on port', PORT);
});

//Routing Conventions

//Create a resource

GET => "articles/new", "articles/create"
POST => "/article/new"


//List

GET => "/artciles"
GET => "/articles/:id"


//Update

GET =>"/articles/:id/edit"
PUT =>"/articles/:id"


//Delete
DELETE => "articles/:id"
GET =>"/articles/:id/delete"


//Add comment

POST => "/article/:id/comments"