const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
async function updateCourse(courseId){
  const course = await Course.update({_id: courseId},{
    //$set: {'author.name' :'Sahukari Ananda Rao'}
    $unset: {'author' :''}
  });
  // console.log(course);
  // course.author.name= 'ananda Rao';
  // course.save();  
}
async function addAuthor(courseId, author){
const course  = await Course.findById(courseId);
course.authors.push(author);
course.save();
}
// createCourse('Node Course', [
//   new Author({ name: 'Anand' }),
//   new Author({ name: 'vicky' }),
//   new Author({ name: 'Kavi' })
// ]);
// updateCourse('5d13a798838cea09f052dcec');
async function removeAuthor(courseId, authorId){
const course = await Course.findById(courseId);
const author = await course.authors.id(authorId);
author.remove();
course.save();
}
// addAuthor('5d13acb92a16f41428888211', new Author({ name: 'Bala' }));
removeAuthor('5d13acb92a16f41428888211','5d13adc89568021db43079de');