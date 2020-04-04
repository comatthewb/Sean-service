// const mysql = require("mysql");
const faker = require("faker");

const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  database: "postgres",
  password: "password",
});

const db = client.connect();

// let result = [];
const generateLinks = () => {
  for (let i = 0; i < 10000000; i++) {
    result.push(faker.image.imageUrl());
  }
  return result;
};

// console.log(generateLinks());

// const db = mysql.createConnection({
//   host: "104.154.16.201",
//   user: "root",
//   password: "password",
//   database: "ImageUrls"
// });

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "ImageUrls"
// });

const getAllItemImages = (callback) => {
  client.query(
    "SELECT * from imageUrls",

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

const insertImagesURL = (array, callback) => {
  client.query(
    "insert into ImageUrls(image_url) VALUES ('test')",
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

// const insertItems = (id, item, callback) => {
//   db.query(
//     "Insert into UrlSet (itemId, imageArray) values (?,?)",
//     [id, item],
//     (err, info) => {
//       if (err) callback(err, null);
//       else callback(null, info);
//     }
//   );
// };

module.exports = { getAllItemImages, db, insertImagesURL, generateLinks };
