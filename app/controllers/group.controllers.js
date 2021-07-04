const Group = require("../models/group.models");

require("dotenv").config();
//const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
   console.log(req.body);

   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const group = new Group({
      groupName: req.body.groupName,
   });

   Group.create(group, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the group.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Group.findById(req.params.idGroup, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found group with idGroup ${req.params.idGroup}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving group with idGroup " + req.params.idGroup,
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

   Group.updatedById(req.params.idGroup, new Group(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found group with id ${req.params.idGroup}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating group with id " + req.params.idGroup,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Group.delete(req.params.idGroup, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found group with idGroup ${req.params.idGroup}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete group with idGroup " + req.params.idGroup,
            });
         }
      } else res.send({ message: `group was deleted successfully!` });
   });
};

exports.findAll = (req, res) => {
   Group.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving group.",
         });
      else res.send(data);
   });
};
