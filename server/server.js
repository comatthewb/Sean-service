const express = require("express");
const path = require("path");
const app = express();
const port = 3030;
const cors = require("cors");
const { db, getItemImages } = require("./db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/imageurl", (req, res) => {
  console.log("GET REQ RCVD");
  getItemImages((err, results) => {
    if (err) res.send(err);
    else {
      var urlArr = JSON.parse(results[0].URLS);
      // console.log("results are ", urlArr);
      // res.status(200);
      res.send(urlArr);
    }
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
