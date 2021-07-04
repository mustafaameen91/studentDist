//const conn = require("../../config").connection;
const connectiontwo = require("../../config").connectiontwo;
//const connectiontwo = require("../../config");

const User = function (user) {
   //this.idUser	 = user.idUser;
   this.userName = user.userName;
   this.password = user.password;
};

User.create = (newUser, result) => {
   connectiontwo.query("INSERT INTO portal.user SET ?", newUser, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created newUser: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
   });
};

User.findById = (idUser, result) => {
   connectiontwo.query(
      `SELECT * FROM user WHERE id = ${idUser}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }
         if (res.length) {
            console.log("found class: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

User.getAll = (result) => {
   connectiontwo.query(`SELECT * FROM user`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("user: ", res);
      result(null, res);
   });
};

User.updatedById = (idUser, User, result) => {
   //console.log(idUser)

   connectiontwo.query(
      "UPDATE portal.user SET  ? WHERE id = ?",
      [User, idUser],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated user: ", { idUser: idUser, ...User });
         result(null, { idUser: idUser, ...User });
      }
   );
};

User.delete = (idUser, result) => {
   connectiontwo.query(
      `DELETE FROM portal.user WHERE id = ${idUser}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("deleted User with id: ", idUser);
         result(null, res);
      }
   );
};

User.login = (userName, password, result) => {
   connectiontwo.query(
      `SELECT * FROM portal.user  WHERE user.name = "${userName}" AND user.password = "${password}"`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

module.exports = User;
