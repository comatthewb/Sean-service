const express = require("express");
const path = require("path");
const app = express();
const port = 3030;
const cors = require("cors");
const data = require("../datatoinsert.json");
const { db, getItemImages, insertItems } = require("./db");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/imageurl/:id", (req, res) => {
  console.log("GET REQ RCVD");
  getItemImages(req.params.id, (err, results) => {
    if (err) res.send(err);
    else {
      if (results.length === 0) res.status(500);
      else {
        var urlArr = JSON.parse(results[0].imageArray);
        res.send(urlArr);
      }
    }
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));

// app.listen(port, "0.0.0.0", () =>
//   console.log(`Server is listening on port ${port}!`)
// );
