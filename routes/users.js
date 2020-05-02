const express = require("express");
var User = require("../models/user");
var router = express.Router();      //extract router module from express

router.get("/", (req, res, next) =>{
    // console.log('here');
    
    User.find({}, (err, listUsers) =>{
        if(err)
            return next(err);
        return res.render("users",{users: listUsers });
    });
});
router.post("/", (req, res,next) => {
    //grab body data
    console.log(req.body);
    //save a data to database
    User.create(req.body, (err, data) => {
        if(err) return next(err);
        console.log(req.body);
        return res.json(data);
    });
    //send a response to client
});
router.get("/new", (req, res, next) =>{
    // console.log('NEW');
    res.render("newUser");
});

router.post("/new", ( req, res, next) =>{
    console.log('ADDED');
    
    req.body.sports = req.body.sports.split(", ");
    console.log(req.body);
    //save a data to database
    User.create(req.body, (err, data) => {
        // console.log(err.name);
        if(err) return next(err);
        console.log(req.body);
        return res.redirect("/users");
    });
});

router.get("/:id/edit", (req, res, next) =>{
    // console.log('spartan');
    User.findById(req.params.id, (err, user) =>{
        console.log(user);
        if(err) 
            return next(err);
        res.render("updateUser", {user});
    });
});

router.post("/:id/edit", (req, res) => {
    //grab body data
    console.log('Spartan');
    console.log(req.body);
    var id = req.params.id;
    User.findByIdAndUpdate(id, req.body, {new: true}, (err, updatedUser) =>{
        if(err)
            return next(err);
        res.json({updatedUser});
    });  //defaults to $set fields missing from {} object are not updated

});
router.put("/:id", (req, res) => {
    //grab body data
    console.log(req.body);
    var id = req.params.id;
    User.findByIdAndUpdate(id, req.body, {new: true}, (err, updatedUser) =>{
        if(err)
            return next(err);
        res.json({updatedUser});
    });  //defaults to $set fields missing from {} object are not updated

});

router.delete("/:id", (req, res, next) =>{
    var id = req.params.id;
    console.log(id);
    
    User.findByIdAndDelete(id, (err, updatedUser) =>{
        if(err)
            return next(err);
        res.json(updatedUser.email + ' deleted');
    });  //defaults to $set fields missing from {} object are not updated
});
router.get("/:email", (req, res, next) =>{
    var email = req.params.email;

    User.findOne({email}, (err, user) =>{
        // console.log(user, "Here")
        if(err)
            return next(err);
        res.render("userDetails", {user});
        //res.render("userDetails", {user});
        
    });
});
router.get("/:email/delete", (req, res, next)=>{
    User.findOneAndDelete({email: req.params.email}, (err, user) =>{
        res.redirect("/users");
    });
});



//export router

module.exports = router;
