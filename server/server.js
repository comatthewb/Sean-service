const express = require("express");
const path = require("path");
const app = express();
const port = 3030;
const cors = require("cors");
const data = require("../datatoinsert.json");
const { db, getItemImages, insertItems } = require("./db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist")));

var boolean = false;
if (boolean) {
  for (var item of data) {
    if (item.imageArray && item.itemId >= 0) {
      insertItems(item.itemId, item.imageArray, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    }
  }
}

app.get("/imageurl/:id", (req, res) => {
  console.log("GET REQ RCVD");
  getItemImages(req.params.id, (err, results) => {
    if (err) res.send(err);
    else {
      console.log("this is result", results);
      var urlArr = JSON.parse(results[0].URLS);
      console.log(urlArr.URLS);
      res.send(urlArr);
    }
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
