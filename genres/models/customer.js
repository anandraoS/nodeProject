const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  mongoose.Schema({
    name: { type: String, required: true, minlegnth: 5 },
    isGold: { type: Boolean, required: true },
    phone: { type: Number, required: true }
  })
);
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

exports.User = User;
exports.validate = validateUser;