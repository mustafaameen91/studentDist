//const Students = require("../models/students.models");
const Student = require("../models/student.models.js");

require("dotenv").config();
//const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
   console.log(req.body);

   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const student = new Student({
      studentName: req.body.studentName,
      cols: req.body.cols,
      rows: req.body.rows,
      studentNumber: req.body.studentNumber,
   });

   Student.create(student, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the student.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Student.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving user with id " + req.params.id,
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

   Student.updatedById(req.params.id, new Student(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student with id ${req.params.id}.`,
            });
         } else if (err.kind === "duplicate") {
            res.status(300).send({
               message: `duplicate.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating student with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Student.delete(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete student with id " + req.params.id,
            });
         }
      } else res.send({ message: `student was deleted successfully!` });
   });
};
exports.findBySection = (req, res) => {
   let filters = req.query;

   Student.getBySection(filters, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving student.",
         });
      else res.send(data);
   });
};

exports.studentGroup = (req, res) => {
   Student.studentGroup((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving student.",
         });
      else res.send(data);
   });
};
