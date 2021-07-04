//const Halls = require("../models/halls.models");
const Hall = require("../models/halls.models");

require("dotenv").config();
//const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
   console.log(req.body);

   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const hall = new Hall({
      hallName: req.body.hallName,
      cols: req.body.cols,
      rows: req.body.rows,
      hallNumber: req.body.hallNumber,
   });

   Hall.create(hall, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the hall.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Hall.findById(req.params.id, (err, data) => {
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

   Hall.updatedById(req.params.id, new Hall(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found hall with id ${req.params.id}.`,
            });
         } else if (err.kind === "duplicate") {
            res.status(300).send({
               message: `duplicate.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating hall with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Hall.delete(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found hall with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete hall with id " + req.params.id,
            });
         }
      } else res.send({ message: `hall was deleted successfully!` });
   });
};

exports.findAll = (req, res) => {
   Hall.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving hall.",
         });
      else res.send(data);
   });
};

exports.findStatistics = (req, res) => {
   Hall.getStatistics((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving statistics.",
         });
      else res.send(data);
   });
};

exports.studentGroup = (req, res) => {
   Hall.studentGroup((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving hall.",
         });
      else res.send(data);
   });
};
