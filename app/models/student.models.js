const conn = require("../../config").connectiontwo;
const Students = function (students) {
   this.studentName = students.studentName;
   this.cols = students.cols;
   this.rows = students.rows;
   this.studentNumber = students.studentNumber;
};

Students.create = (newStudents, result) => {
   conn.query("INSERT INTO students SET ?", newStudents, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new Students: ", {
         id: res.insertId,
         ...newStudents,
      });
      result(null, { id: res.insertId, ...newStudents });
   });
};

Students.findById = (idStudent, result) => {
   conn.query(
      `SELECT * FROM students WHERE idStudent = ${idStudent}`,
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

Students.getAll = (result) => {
   conn.query(`SELECT * FROM students ORDER BY studentNumber`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("students: ", res);
      result(null, res);
   });
};

Students.getBySection = (filters, result) => {
   console.log(filters);
   conn.query(
      `SELECT *, (SELECT MAX(level) AS levelNow FROM StudentLevel WHERE studentId = Student.idStudent) AS levelStudent FROM Student JOIN Section ON Section.idSection = Student.sectionId WHERE (studentStatusId = 1 OR studentStatusId = 4) AND sectionId = ${filters.sectionId} HAVING levelStudent = ${filters.level}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         //  console.log("students: ", res);
         result(null, res);
      }
   );
};

Students.updatedById = (idStudent, Students, result) => {
   conn.query(
      "UPDATE students SET  ? WHERE idStudent = ?",
      [Students, idStudent],
      (err, res) => {
         if (err.errno == 1062) {
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

         console.log("updated Student: ", {
            idStudent: idStudent,
            ...idStudent,
         });
         result(null, { idStudent: idStudent, ...Students });
      }
   );
};

Students.delete = (idStudent, result) => {
   conn.query(
      `DELETE FROM students WHERE idStudent = ${idStudent}`,
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

         console.log("deleted student with id: ", idStudent);
         result(null, res);
      }
   );
};

Students.studentGroup = (result) => {
   conn.query(
      `SELECT * FROM studentstudent JOIN groups ON studentstudent.groupId = groups.idGroup JOIN students ON studentstudent.studentId = students.idStudent`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("students: ", res);
         result(null, res);
      }
   );
};

module.exports = Students;
