const express = require('express');
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/class-online', {
  useNewUrlParser: true
});

// Create a scheme for items in the museum: a title and a path to an image.
const gradeSchema = new mongoose.Schema({
  id: String,
  grade: String,
  class_id: String,
});

const classSchema = new mongoose.Schema({
  id: String,
  class_name: String,
  prof_id: String,
  class_hour: String,
  class_day: String,
});

const professorsSchema = new mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  years_teaching: String,
  age: String,
  salary: String,
});
const studentsSchema = new mongoose.Schema({
  id: String,
  user_name: String,
  password: String,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
});

const ProfessorItem = mongoose.model('professor', professorsSchema);
const ClassItem = mongoose.model('classe', classSchema);
const GradeItem = mongoose.model('grade', gradeSchema);
const StudentItem = mongoose.model('student', studentsSchema);

app.get('/api/students', async (req, res) => {
  try {
    let student = await StudentItem.find();
    res.send(student);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get('/api/classes', async (req, res) => {
  try {
    let classe = await ClassItem.find();
    res.send(classe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get('/api/professors', async (req, res) => {
  try {
    let professor = await ProfessorItem.find();
    res.send(professor);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get('/api/grades', async (req, res) => {
  try {
    let grade = await GradeItem.find();
    res.send(grade);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/api/students/:id', async (req, res) => {
  try {
    await StudentItem.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});app.delete('/api/classes/:id', async (req, res) => {
  try {
    await ClassItem.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});app.delete('/api/professors/:id', async (req, res) => {
  try {
    await ProfessorItem.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});app.delete('/api/grades/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
