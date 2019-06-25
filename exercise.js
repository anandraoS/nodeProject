const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("connected to mongo exercises"))
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

async function getDetails(){
   return  await Course.find({isPublished: true, tags: 'backend'})
    .sort({name:1})
    .select({name:1, author: 1});
    console.log(courses);
}
async function run(){
    const courses = await getDetails();
    console.log(courses);
}
run();