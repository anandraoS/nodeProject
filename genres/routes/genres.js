
const expres = require("express");
const router = expres.Router();
const {Genre,validate} = require('.././models/genre');
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = new Genre({
    name: req.body.name
  });
  let some = await genre.save();
  res.send(some);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
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

module.exports = router;