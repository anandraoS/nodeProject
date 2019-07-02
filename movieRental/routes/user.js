const _ = require("lodash");
const bcrypt = require('bcrypt');
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body.email);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists");
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  res.send(_.pick(user, ["name", "email", "_id"]));
});

module.exports = router;
