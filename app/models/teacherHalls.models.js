const conn = require("../../config").connection;

const TeacherHalls = function (teacherHalls) {
   this.teacherName = teacherHalls.teacherName;
   this.sectionId = teacherHalls.sectionId;
   this.sectionName = teacherHalls.sectionName;
   this.hallStatus = teacherHalls.hallStatus;
};

TeacherHalls.create = (newTeacherHalls, result) => {
   conn.query("INSERT INTO teacherHalls SET ?", newTeacherHalls, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new Halls: ", {
         id: res.insertId,
         ...newTeacherHalls,
      });
      result(null, { id: res.insertId, ...newTeacherHalls });
   });
};

TeacherHalls.findById = (id, result) => {
   conn.query(
      `SELECT * FROM teacherHalls WHERE idTeacher = ${id}`,
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

TeacherHalls.getAll = (result) => {
   conn.query(`SELECT * FROM teacherHalls`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("teacherHalls: ", res);
      result(null, res);
   });
};

TeacherHalls.updatedById = (id, TeacherHalls, result) => {
   conn.query(
      "UPDATE teacherHalls SET  ? WHERE idTeacher = ?",
      [TeacherHalls, id],
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

         console.log("updated user: ", { idTeacher: id, ...TeacherHalls });
         result(null, { idTeacher: id, ...TeacherHalls });
      }
   );
};

TeacherHalls.delete = (id, result) => {
   conn.query(
      `DELETE FROM teacherHalls WHERE idTeacher = ${id}`,
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

         console.log("deleted teacherHalls with id: ", id);
         result(null, res);
      }
   );
};

module.exports = TeacherHalls;
