const express = require("express");
const cors = require("cors");
const app = express();
const { urlencoded } = require("express");

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

require("./app/routers/hall.routes.js")(app);
require("./app/routers/studentHall.routes.js")(app);
require("./app/routers/teacherHalls.routes.js")(app);
require("./app/routers/user.routes.js")(app);
require("./app/routers/group.routes.js")(app);
require("./app/routers/student.routes.js")(app);

app.listen(5510, () => {
   console.log("Server is running on port 5510");
});
