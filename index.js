const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("we are connected to mongo db "))
  .catch(err => console.error("not able to connect to mongodb" + err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type:Date, default: Date.now },
  isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "NOde JS coursse",
    author: "anand",
    tags: ["node", "express"],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}

async function  getCourses(){
const courses = await Course.find({author: 'anand'})
.limit(10)
.sort({name: 1})
.select({name: 1, author: 1});
console.log(courses);
}
// createCourse();
getCourses();