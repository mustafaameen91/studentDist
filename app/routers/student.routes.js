module.exports = (app) => {
   const students = require("../controllers/student.controllers.js");
   const auth = require("../middleware/checkAuth.middleware");

   app.post(`/api/addStudent`, auth, students.create);

   app.get(`/api/studentSection`, students.findBySection);

   app.get(`/api/student/:id`, auth, students.findOne);

   app.put(`/api/student/:id`, students.update);

   app.delete(`/api/student/:id`, auth, students.delete);

   app.get(`/api/studentGroup`, students.studentGroup);
};
