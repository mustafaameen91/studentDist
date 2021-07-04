const TeacherHalls = require("../models/teacherHalls.models");

require("dotenv").config();
//const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const teacherHalls = new TeacherHalls({
      teacherName: req.body.teacherName,
      sectionId: req.body.sectionId,
      sectionName: req.body.sectionName,
      hallStatus: req.body.hallStatus,
   });

   TeacherHalls.create(teacherHalls, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the hall.",
         });
      else res.send(data);
      // console.log(data)
   });
};

exports.findOne = (req, res) => {
   TeacherHalls.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found teacher with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving teacher with id " + req.params.id,
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

   TeacherHalls.updatedById(
      req.params.id,
      new TeacherHalls(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found teacher with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message: "Error updating teacher with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   TeacherHalls.delete(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found teacher Hall with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete teacher hall with id " + req.params.id,
            });
         }
      } else res.send({ message: `teacher hall was deleted successfully!` });
   });
};

exports.findAll = (req, res) => {
   TeacherHalls.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving teacher hall.",
         });
      else res.send(data);
   });
};
