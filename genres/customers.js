const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const User = mongoose.model(
  "User",
  mongoose.Schema({
    name: { type: String, required: true, minlegnth: 5 },
    isGold: { type: Boolean, required: true },
    phone: { type: Number, required: true }
  })
);

router.get("/", async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.send(users);
});
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = new User({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  let some = await user.save();
  res.send(some);
});
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).send("not valid user id");
  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    },
    { new: true }
  );
  res.send(user);
});
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) res.status(400).send("not a valid id");
  res.send(user);
});
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.number()
      .min(10)
      .required(),
    isGold: Joi.boolean().required()
  };

  return Joi.validate(user, schema);
}
module.exports = router;
