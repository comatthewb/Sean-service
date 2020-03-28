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

app.get("/imageurl/:id", (req, res) => {
  console.log("GET REQ RCVD");
  getItemImages(req.params.id, (err, results) => {
    if (err) res.send(err);
    else {
      var urlArr = JSON.parse(results[0].imageArray);
      res.send(urlArr);
    }
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));

// app.listen(port, "0.0.0.0", () =>
//   console.log(`Server is listening on port ${port}!`)
// );
