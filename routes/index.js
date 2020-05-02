const express = require("express");

var router = express.Router();      //extract router module from express

router.get('/', (req, res) =>{
    res.render("index");        //ejs file named index.ejs
});


//export router

module.exports = router;


// <% names.array.forEach(name => { %>
//     <h4><%= name%></h4>
// <% })%>
