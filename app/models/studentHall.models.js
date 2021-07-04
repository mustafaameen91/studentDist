const conn = require("../../config").connection;
const StudentHalls = function (studentHalls) {
   this.hallId = studentHalls.hallId;
   this.collegeNumber = studentHalls.collegeNumber;
   this.groupId = studentHalls.groupId;
   this.C = studentHalls.C;
   this.R = studentHalls.R;
   this.distribute = studentHalls.distribute;
   this.sectionId = studentHalls.sectionId;
   this.sectionName = studentHalls.sectionName;
   this.level = studentHalls.level;
   this.studentName = studentHalls.studentName;
};

StudentHalls.create = (newStudentHalls, result) => {
   conn.query("INSERT INTO studenthall SET ?", newStudentHalls, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new student hall: ", {
         idStudentHall: res.insertId,
         ...newStudentHalls,
      });
      result(null, { idStudentHall: res.insertId, ...newStudentHalls });
   });
};

StudentHalls.findById = (idStudentHall, result) => {
   conn.query(
      `SELECT * FROM studenthall WHERE idStudentHall = ${idStudentHall}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }
         if (res.length) {
            console.log("found image: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

StudentHalls.getAll = (result) => {
   conn.query(`SELECT * FROM studenthall`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      result(null, res);
   });
};

StudentHalls.updatedById = (idStudentHall, studentHalls, result) => {
   conn.query(
      "UPDATE studenthall SET  ? WHERE idStudentHall = ?",
      [studentHalls, idStudentHall],
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

         console.log("updated idStudentHall: ", {
            idStudentHall: idStudentHall,
            ...studentHalls,
         });
         result(null, { idStudentHall: idStudentHall, ...studentHalls });
      }
   );
};

StudentHalls.delete = (idStudentHall, result) => {
   conn.query(
      `DELETE FROM studenthall WHERE idStudentHall = ${idStudentHall}`,
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

         console.log("deleted studenthall with idStudentHall: ");
         result(null, res);
      }
   );
};

StudentHalls.findByIds = (idStudentHall, result) => {
   if (idStudentHall != null) {
      conn.query(
         `SELECT * FROM studenthall WHERE idStudentHall = ${idStudentHall}`,
         (err, res) => {
            if (err) {
               console.log("error: ", err);
               result(err, null);
               return;
            }
            if (res.length) {
               console.log("found student: ", res[0]);
               result(null, res[0]);
               return;
            }

            result({ kind: "not_found" }, null);
         }
      );
   }
};

StudentHalls.createMultiStudents = (studentHalls, result) => {
   if (studentHalls.length) {
      let groupId = studentHalls[0].groupId;

      conn.query(
         `SELECT studenthall.groupId FROM studenthall WHERE groupId = ${groupId}`,
         (err, res) => {
            console.log(res[0]);

            if (err) {
               console.log("error: ", err);
               result(err, null);
               return;
            }
            if (res.length > 0) {
               console.log("found student with groupId: ", groupId);
               result("test", null);
               return;
            }
            if (res.affectedRows == 0) {
               result(res.status(700), null);
               return;
            }

            conn.query(
               "INSERT INTO studenthall (hallId , groupId,collegeNumber, C , R , distribute,sectionId,sectionName,level,studentName) VALUES ?",
               [
                  studentHalls.map((studenthall) => [
                     studenthall.hallId,
                     studenthall.groupId,
                     studenthall.collegeNumber,
                     studenthall.C,
                     studenthall.R,
                     studenthall.distribute,
                     studenthall.sectionId,
                     studenthall.sectionName,
                     studenthall.level,
                     studenthall.studentName,
                  ]),
               ],
               (err, res) => {
                  console.log("created new studentHalls: ");
                  result(null, res);
               }
            );
         }
      );
   }
};

StudentHalls.findByFilters = (sqlQuery, result) => {
   conn.query(`${sqlQuery}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }
      if (res.length) {
         console.log("found image: ", res);
         result(null, res);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

module.exports = StudentHalls;
