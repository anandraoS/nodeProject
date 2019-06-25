const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('connection estableshed'))
.catch(err=> console.error('connection failed',err));
const courseSchema = mongoose.Schema({
  name: {type: String ,
     required: true,
     minlength: 5,
     maxlength: 23
    },
    category: {
        type: String,
        required: true,
        enum: ['web','network','appDev']
    },
  author: String,
  tags: {
      type: Array,
      validate: {
          isAsync: true,
          validator: function(v,callback){
            setTimeout(() => {
                const result = v && v.length >0;
                callback(result);
            }, 4000);
          }
      }
  },
  date: { type:Date, default: Date.now },
  isPublished: Boolean,
  price: {
      type: Number,
      min :10,
      max: 250,
      required : function(){return this.isPublished;}
  }
});
const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "NOde JS coursse",
    author: "anand",
    category: 'so',
    isPublished: true,
    tags:null,
    price: 23
  });
  try{
    const result = await course.save();
    console.log(result);
  }
  catch(ex){
      for(field in ex.errors)
        console.log(ex.errors[field].message);
      //console.log(ex.message);
  }
}

createCourse();
