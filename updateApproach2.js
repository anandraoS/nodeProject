const mongoose = require("mongoose");
mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log("connection estableshed"))
  .catch(err => console.error("connection failed", err));
const courseSchema = mongoose.Schema({
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function updateCourse(id) {
  const result = await Course.update({_id:id},{
    $set: {author:'Rao', isPublished: 'true'}});
  console.log(result);
}
updateCourse("5a68fdc3615eda645bc6bdec");
