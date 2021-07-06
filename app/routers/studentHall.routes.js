const studentHall = require("../controllers/studentHall.controllers");
const auth = require("../middleware/checkAuth.middleware");

module.exports = (app) => {
   app.post("/api/addStudentHall", auth, studentHall.create);

   app.get("/api/studentHalls", auth, studentHall.findAll);

   app.get("/api/studentHall/:id", auth, studentHall.findOne);

   app.get("/api/getStats/:id", auth, studentHall.getForStats);

   app.put("/api/studentHall/:id", auth, studentHall.update);

   app.delete("/api/studentHall/:id", auth, studentHall.delete);

   app.post("/api/addMultiStudentHalls", studentHall.createStudentHalls);

   app.get("/api/studentHallByFilter", studentHall.getStudentHallByFilter);
};
