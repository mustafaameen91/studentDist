//const Halls = require("../models/halls.models");
const User = require("../models/user.models");

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const user = new User({
      userName: req.body.userName,
      password: req.body.password,
      roleId: req.body.roleId,
   });

   console.log(user);

   User.create(user, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the user.",
         });
      else res.send(data);
      // console.log(data)
   });
};

exports.findOne = (req, res) => {
   User.findById(req.params.id, (err, data) => {
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

   User.updatedById(req.params.id, new User(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating user with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   User.delete(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete user with id " + req.params.id,
            });
         }
      } else res.send({ message: `User was deleted successfully!` });
   });
};

exports.findAll = (req, res) => {
   User.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving user.",
         });
      else res.send(data);
   });
};

exports.loginUser = (req, res) => {
   console.log(req.body)
   User.login(req.body.userName, req.body.password, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found user with name ${req.body.userName}. or password ${req.body.password}`,
            });
         } else {
            res.status(500).send({
               message: `Error retrieving user with name ${req.body.userName}. or password ${req.body.password}`,
            });
         }
      } else {
         console.log(process.env.JWT_SECRET_KEY);
         const token = jwt.sign(
            {
               id:data.id,
               name: data.name,
               perv:data.perv,
               prev2:data.prev2,
               
            },
            process.env.JWT_SECRET_KEY,
            {
               expiresIn: "30d",
            }
         );
         res.send({ token });
      }
      console.log(data);
   });
};
