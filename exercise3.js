const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('connection estableshed'))
.catch(err=> console.error('connection failed',err));
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
      return await Course.find({isPublished:true})
      .or([{price:{$gte:15}},
         {name: /.*by.*/i}]);
  }
  async function run(){ 
      const courses  = await getDetails();
      console.log(courses);
  }
  run();