const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.get("./", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
    return res.status(400).send("Invalid Customer");
    
  const customer = Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie Not in Stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  //   rental = await rental.save();
  //   movie.numberInStock--;
  //   movie.save();
  try {
    new Fawn.Task()
      .save("rentals", rental) // here we are dealing direclty with collections so we are passing collection name itself
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 }
        }
      )
      .run();
  } catch (error) {
    return res.status(500).send("Transaction Failed");
  }

  res.send(rental);
});
