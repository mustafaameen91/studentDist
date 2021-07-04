const teacherHall = require("../controllers/teacherHalls.controllers");
const auth = require("../middleware/checkAuth.middleware");

module.exports = (app) => {
   app.post("/api/addTeacherHall", auth, teacherHall.create);

   app.get("/api/teacherHall/:id", auth, teacherHall.findOne);

   app.get("/api/teacherHall", auth, teacherHall.findAll);

   app.put("/api/teacherHall/:id", auth, teacherHall.update);

   app.delete("/api/teacherHall/:id", auth, teacherHall.delete);
};
