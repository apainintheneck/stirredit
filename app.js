const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
app.get("/", function(req, res){
  if(req.query.feed){
    if(req.query.feed == "NBA"){
      res.render("feed", {"feedName": "NBA", "subreddit1": "warriors", "subreddit2": "nbadiscussion", "subreddit3": "NBA_Draft"});
    } else {
      res.render("index", {"searchError": true, "searchInput": req.query.feed});
    }
  } else {
    res.render("index");
  }
});//"/"

//starting server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Express server is running...");
});
