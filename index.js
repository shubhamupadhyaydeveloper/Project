const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
uuidv4();

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(`<h1>Hi and Welcome to my Website👋 </h1>`);
});

let posts = [
  {
    id: uuidv4(),
    name: "Shubham Upadhyay",
    content: "work is worship",
  },
  {
    id: uuidv4(),
    name: "shradha mam",
    content: "harkwork is important to get success",
  },
];

app.listen(port, () => {
  console.log(`Your app is listning on the port ${port}`);
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs", { posts });
});

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { name, content } = req.body;
  posts.push({ id, name, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id === post.id);
  if (post) {
    res.render("view.ejs", { post });
  } else {
    res.render("error.ejs");
  }
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id === post.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id/", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id === post.id);

  let newcontent = req.body.content;
  post.content = newcontent;
  res.redirect("/posts");
});

app.delete('/posts/:id' , (req ,res) => {
  let {id} = req.params;
  posts = posts.filter((post) => id !== post.id)
  res.redirect("/posts");
})