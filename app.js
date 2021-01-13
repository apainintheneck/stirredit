const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
app.get("/", function(req, res){
    res.render("index");
});//"/"

//routes
app.get("/feed", function(req, res){
    res.render("feed", {"feedName": "NBA", "subreddit1": "warriors", "subreddit2": "nbadiscussion", "subreddit3": "NBA_Draft"});
});//"/"

//starting server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Express server is running...");
});
