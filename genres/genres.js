const mongoose = require("mongoose");
const expres = require("express");
const router = expres.Router();
const Joi = require('joi');
const Genre = mongoose.model(
  "Genre",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20
    }
  })
);
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.post("/", async (req, res) => {
    console.log('some issue');
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = new Genre({
    name: req.body.name
  });
  let some = await genre.save();
  res.send(some);
});
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given id is not valid");
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given id is not valid");
  res.send(genre);
});

router.get('/:id',async(req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if (!genre)
    return res.status(404).send("The genre with the given id is not valid");
    res.send(genre);
})
function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}
module.exports = router;