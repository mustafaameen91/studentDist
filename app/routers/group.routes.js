module.exports = (app) => {
    const group = require("../controllers/group.controllers");
    const auth = require("../middleware/checkAuth.middleware");
 
    app.post(`/api/addGroup`,auth, group.create);
 
    app.get(`/api/groups`,auth, group.findAll);
 
    app.get(`/api/group/:idGroup`,auth, group.findOne);
 
    app.put(`/api/group/:idGroup`,auth, group.update);
 
    app.delete(`/api/group/:idGroup`,auth, group.delete);
 };
 