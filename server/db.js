const mysql = require("mysql");

const db = mysql.createConnection({
  host: "104.154.16.201",
  user: "root",
  password: "kKmNGfOFhkawtqer",
  database: "ImageUrls",
  port: 3306
});

console.log(db);

const getItemImages = (id, callback) => {
  db.query("SELECT URLS FROM URLSET WHERE itemId = ?", id, (err, info) => {
    if (err) callback(err, null);
    else {
      conole.log(info);
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
