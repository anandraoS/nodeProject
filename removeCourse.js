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

async function removeCourse(id) {
  const result = await Course.deleteOne({_id:id});
  console.log(result);
}
removeCourse("5a6900fff467be65019a9001");