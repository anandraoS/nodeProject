
const express = require("express");
const router = express.Router();
const {User,validate} = require('.././models/customer');

router.get("/", async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.send(users);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
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
  const { error } = validate(req.body);
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

module.exports = router;
