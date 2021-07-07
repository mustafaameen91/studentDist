const conn = require("../../config").connection;
const Halls = function (halls) {
   this.hallName = halls.hallName;
   this.cols = halls.cols;
   this.rows = halls.rows;
   this.hallNumber = halls.hallNumber;
};

Halls.create = (newHalls, result) => {
   conn.query("INSERT INTO halls SET ?", newHalls, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new Halls: ", { id: res.insertId, ...newHalls });
      result(null, { id: res.insertId, ...newHalls });
   });
};

Halls.findById = (idHall, result) => {
   conn.query(`SELECT * FROM halls WHERE idHall = ${idHall}`, (err, res) => {
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
   });
};

Halls.getAll = (result) => {
   conn.query(`SELECT * FROM halls ORDER BY hallNumber`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("halls: ", res);
      result(null, res);
   });
};

Halls.getStatistics = (result) => {
   conn.query(
      "SELECT COUNT(*) AS hallsLength , (SELECT COUNT(*) FROM studenthall)  AS studentHallLength , (SELECT COUNT(*) FROM `groups`) AS groupsLength FROM halls",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("statistics : ", res[0]);
         result(null, res[0]);
      }
   );
};

Halls.updatedById = (idHall, Halls, result) => {
   conn.query(
      "UPDATE halls SET  ? WHERE idHall = ?",
      [Halls, idHall],
      (err, res) => {
         if (err?.errno == 1062) {
            result({ kind: "duplicate" }, null);
            return;
         }

         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated Hall: ", {
            idHall: idHall,
            ...idHall,
         });
         result(null, { idHall: idHall, ...Halls });
      }
   );
};

Halls.delete = (idHall, result) => {
   conn.query(`DELETE FROM halls WHERE idHall = ${idHall}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted hall with id: ", idHall);
      result(null, res);
   });
};

Halls.studentGroup = (result) => {
   conn.query(
      `SELECT * FROM studenthall JOIN groups ON studenthall.groupId = groups.idGroup JOIN halls ON studenthall.hallId = halls.idHall`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("halls: ", res);
         result(null, res);
      }
   );
};

module.exports = Halls;
