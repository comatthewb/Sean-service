const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "imageurls"
});

const getItemImages = (id, callback) => {
  db.query("SELECT URLS FROM URLSET WHERE itemId = ?", id, (err, info) => {
    if (err) callback(err, null);
    else {
      callback(null, info);
    }
  });
};

const insertItems = (id, item, callback) => {
  db.query(
    "Insert into UrlSet (itemId, urls) values (?,?)",
    [id, item],
    (err, info) => {
      if (err) callback(err, null);
      else callback(null, info);
    }
  );
};

module.exports = { db, getItemImages, insertItems };
