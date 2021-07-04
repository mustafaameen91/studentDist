const conn = require("../../config").connection;

const Group = function (group) {
   this.groupName = group.groupName;
};

Group.create = (newGroup, result) => {
   conn.query("INSERT INTO `groups` SET ?", newGroup, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created new Group: ", { id: res.insertId, ...newGroup });
      result(null, { id: res.insertId, ...newGroup });
   });
};

Group.findById = (idGroup, result) => {
   conn.query(`SELECT * FROM groups WHERE idGroup = ${idGroup}`, (err, res) => {
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
   });
};

Group.getAll = (result) => {
   conn.query(`SELECT * FROM groups `, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("group: ", res);
      result(null, res);
   });
};

Group.updatedById = (idGroup, Group, result) => {
   conn.query(
      "UPDATE groups SET  ? WHERE idGroup = ?",
      [Group, idGroup],
      (err, res) => {
         if (err) {
            console.log("error: ");
            result(err, null);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated group: ", { idGroup: idGroup, ...Group });
         result(null, { idGroup: idGroup, ...Group });
      }
   );
};

Group.delete = (idGroup, result) => {
   conn.query(`DELETE FROM groups WHERE idGroup = ${idGroup}`, (err, res) => {
      if (err) {
         // console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted group with id: ", idGroup);
      result(null, res);
   });
};

module.exports = Group;
