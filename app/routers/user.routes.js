const User = require("../controllers/user.controllers");
const auth = require("../middleware/checkAuth.middleware");

module.exports = (app) => {
   app.post("/api/addUser", auth, User.create);

   app.get("/api/user/:id", auth,User.findOne);

   app.get("/api/users", auth, User.findAll);

   app.put("/api/user/:id", auth, User.update);

   app.delete("/api/user/:id", auth, User.delete);

   app.post("/api/login", User.loginUser);
};
