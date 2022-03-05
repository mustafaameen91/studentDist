const StudentHalls = require("../models/studentHall.models");

require("dotenv").config();

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentHalls = new StudentHalls({
      hallId: req.body.hallId,
      collegeNumber: req.body.collegeNumber,
      groupId: req.body.groupId,
      C: req.body.C,
      R: req.body.R,
      distribute: req.body.distribute,
      sectionId: req.body.sectionId,
      sectionName: req.body.sectionName,
      level: req.body.level,
      studentName: req.body.studentName,
   });

   StudentHalls.create(studentHalls, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the incoming.",
         });
      else res.send(data);
   });
};

exports.getForStats = (req, res) => {
   StudentHalls.findForStats(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found studenthall with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving studenthall with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudentHalls.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found studenthall with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving studenthall with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   StudentHalls.updatedById(
      req.params.id,
      new StudentHalls(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found student with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating studenthall with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentHalls.delete(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found studenthall with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete studenthall with id " + req.params.id,
            });
         }
      } else res.send({ message: `studenthall was deleted successfully!` });
   });
};

exports.findAll = (req, res) => {
   StudentHalls.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving studenthall.",
         });
      else res.send(data);
   });
};

exports.createStudentHalls = (req, res) => {
   // console.log(req.body);
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }
   StudentHalls.createMultiStudents(req.body, (err, data) => {
      if (err)
         res.status(700).send({
            message:
               err.message ||
               "Some error occurred while creating the studentHalls.",
         });
      else res.send(data);
   });
};

exports.getStudentHallByFilter = (req, res) => {
   var hallId = req.query.hallId;
   var groupId = req.query.groupId;
   var collegeNumber = req.query.collegeNumber;

   let sqlQuery = "";

   if (collegeNumber) {
      sqlQuery += ` AND studenthall.collegeNumber = ${collegeNumber} `;
   }
   if (hallId) {
      sqlQuery += ` AND studenthall.hallId = ${hallId} `;
   }
   if (groupId) {
      sqlQuery += ` AND studenthall.groupId = ${groupId} `;
   }

   console.log(sqlQuery);
   StudentHalls.findByFilters(sqlQuery, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.send([]);
         } else {
            res.status(500).send({
               message: "Error with data ",
            });
         }
      } else res.send(data);
   });
};
