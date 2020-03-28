const mysql = require("mysql");

const db = mysql.createConnection({
  host: "104.154.16.201",
  user: "root",
  password: "password",
  database: "ImageUrls"
});

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "ImageUrls"
// });

const getItemImages = (id, callback) => {
  db.query(
    "SELECT imageArray FROM UrlSet WHERE itemId = ?",
    id,
    (err, info) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, info);
      }
    }
  );
};

const insertItems = (id, item, callback) => {
  db.query(
    "Insert into UrlSet (itemId, imageArray) values (?,?)",
    [id, item],
    (err, info) => {
      if (err) callback(err, null);
      else callback(null, info);
    }
  );
};

module.exports = { db, getItemImages, insertItems };
