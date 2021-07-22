//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is a Blog Website where you can compose posts and find them and the home page, and check them at their own page";
const aboutContent = "Hi, It's Rahim here, I'm an IT student at INSA Lyon, I enjoy learning while making projects, like this one! ;-)";
const contactContent = "Contact Rahim Belateche (INSA LYON 2023), github : rbelateche";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = []

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
})


app.get("/about", function(req, res){
  res.render("about", {
    aboutContent: aboutContent
  });
})

app.get("/contact", function(req, res){
  res.render("contact", {
    contactContent: contactContent
  });
})

app.get("/compose", function(req, res){
  res.render("compose");
})


app.post("/compose", function(req, res){
  posts.push({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  res.redirect("/");
})

app.get("/posts/:param", function(req, res){
  posts.forEach(function(element){
    if (_.lowerCase(req.params.param) === _.lowerCase(element.title)){
      res.render("post", {
        titleOfPost: element.title,
        contentOfPost: element.content,
      });
    }
  })
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
