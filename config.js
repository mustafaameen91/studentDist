const mysql = require("mysql");
//const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
   host: "localhost",
   // user: "root",
   // password: "root",
   // user: "devone",
   // password: "uni_Dijla_87601",
   user: "duc",
   password: "DucDuc123123!@",
   database: "studentDist",
   port: 8889,
});

connection.connect((error) => {
   if (error) throw error;
   console.log("Successfully connected to the studentHall database.");
});

exports.connection = connection;

const connectionTwo = mysql.createConnection({
   host: "localhost",
   // user: "devone",
   // password: "uni_Dijla_87601",
   user: "duc",
   password: "DucDuc123123!@",
   // user: "root",
   // password: "root",
   // database: "portal",
   database: "studentPortal",
   port: 8889,
});

connectionTwo.connect((error) => {
   if (error) throw error;
   console.log("Successfully connected to the portal database.");
});

exports.connectiontwo = connectionTwo;
