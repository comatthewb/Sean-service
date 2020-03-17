const express = require("express");
const path = require("path");
const app = express();
const port = 3030;
const { db, getItemImages } = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/imageurl", (req, res) => {
  getItemImages()
  
  console.log("GET REQ RCVD");
  res.send("hello");
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
