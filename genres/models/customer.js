const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  mongoose.Schema({
    name: { type: String, required: true, minlegnth: 5 },
    isGold: { type: Boolean, required: true },
    phone: { type: Number, required: true }
  })
);
function validateCustomer(Customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.number()
      .min(10)
      .required(),
    isGold: Joi.boolean().required()
  };

  return Joi.validate(Customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;