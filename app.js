const express = require("express");
const pool = require("./dbPool.js");
const app = express();

//Used to parse the body of a post request.
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
app.get("/", function(req, res){
  if(req.query.feed){
    let sql = "SELECT * FROM feeds WHERE name = ?";
    let sqlParams = [req.query.feed];

    pool.query(sql, sqlParams, function (err, rows, fields){
      console.log(rows); //testing
      if(err || rows.length == 0){
        console.log(err);
        res.render("index", {"errorMsg": `Unable to find feed: ${req.query.feed}`});
      } else {
        res.render("feed", {"feedName": rows[0].name, "subreddit1": rows[0].sub1, "subreddit2": rows[0].sub2, "subreddit3": rows[0].sub3});
      }
    });
  } else {
    res.render("index");
  }
});

app.post("/", function(req, res){
  console.log(req.body); //testing

  let sql = "INSERT INTO feeds (name, sub1, sub2, sub3) VALUES (?,?,?,?)";
  let sqlParams = [req.body.feedname, req.body.sub1, req.body.sub2, req.body.sub3];

  //Query database to insert post.
  pool.query(sql, sqlParams, function (err, rows){
    if(err) { //If there is a sql error, handle it immediately.
      //Display if it is a duplicate entry.
      if(err.code == "ER_DUP_ENTRY" || err.errno == 1062){
        res.render("index", {"errorMsg": `Cannot create feed with duplicate name: ${req.body.feedname}`});
      //Generic error message.
      } else {
        res.render("index", {"errorMsg": `Unable to create new feed: ${req.body.feedname}`});
      }
    } else { //If there are no errors, display new feed page.
      res.render("feed", {"feedName": req.body.feedname, "subreddit1": req.body.sub1, "subreddit2": req.body.sub2, "subreddit3": req.body.sub3});
    }
  });
});

//starting server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("Express server is running...");
});
