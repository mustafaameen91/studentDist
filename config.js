const mysql = require("mysql");
//const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
   host: "localhost",
   user: "devone",
   password: "uni_Dijla_87601",
   database: "studentDist",
   // port: dbConfig.PORT,
});

connection.connect((error) => {
   if (error) throw error;
   console.log("Successfully connected to the studentHall database.");
});

exports.connection = connection;

const connectionTwo = mysql.createConnection({
   host: "localhost",
   user: "devone",
   password: "uni_Dijla_87601",
   database: "portal",
   // port: dbConfig.PORT
});

connectionTwo.connect((error) => {
   if (error) throw error;
   console.log("Successfully connected to the portal database.");
});

exports.connectiontwo = connectionTwo;
