const mongooose = require("mongoose");
const Joi = require('Joi');
const User = mongooose.model(
  "User",
  new mongooose.Schema({
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
  })
);
function validateUser(user){
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(255).required() 
    };
    return Joi.validate(user,schema);
}
exports.User = User;
exports.validate = validateUser;