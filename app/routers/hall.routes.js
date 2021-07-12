module.exports = (app) => {
   const halls = require("../controllers/hall.controller.js");
   const auth = require("../middleware/checkAuth.middleware");

   app.post(`/api/addHall`, auth, halls.create);

   app.get(`/api/halls`, halls.findAll);

   app.get(`/api/statistics`, auth, halls.findStatistics);

   app.get(`/api/hall/:id`, auth, halls.findOne);

   app.put(`/api/hall/:id`, halls.update);

   app.delete(`/api/hall/:id`, auth, halls.delete);

   app.get(`/api/studentGroup`, halls.studentGroup);
};
