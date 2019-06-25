const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('connection estableshed'))
.catch(err=> console.error('connection failed',err));
const courseSchema = mongoose.Schema({
  name: {type: String , required: true},
  author: String,
  tags: [String],
  date: { type:Date, default: Date.now },
  isPublished: Boolean,
  price: {
      type: Number,
      required : function(){return this.isPublished;}
  }
});
const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "NOde JS coursse",
    author: "anand",
    tags: ["node", "express"],
    isPublished: true
  });
  try{
    const result = await course.save();
    console.log(result);
  }
  catch(ex){
      console.log(ex.message);
  }
}

createCourse();
