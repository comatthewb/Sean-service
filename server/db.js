const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "imageurls"
});

const getItemImages = callback => {
  db.query(`SELECT URLS FROM URLSET`, (err, info) => {
    if (err) callback(err, null);
    else callback(null, info);
  });
};

module.exports = { db, getItemImages };


