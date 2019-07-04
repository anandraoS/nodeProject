const mongooose = require("mongoose");
const Joi = require("Joi");
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});
userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id},config.get('jwtPrivateKey'));
  return token;
}
const User = mongooose.model("User", userSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .required()
      .min(5)
      .max(50),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
