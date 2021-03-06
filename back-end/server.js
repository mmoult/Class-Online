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
  id: Number,
  grade: Number,
  class_id: Number,
});

const classSchema = new mongoose.Schema({
  class_id: Number,
  class_name: String,
  prof_id: Number,
  class_hour: String,
  class_day: String,
});

const professorsSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  years_teaching: Number,
  age: Number,
  salary: String,
});

const studentsSchema = new mongoose.Schema({
  id: Number,
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
app.get('/api/classes/find/:name', async (req, res) => {
	try {
		let classes = await ClassItem.find({class_name: new RegExp(req.params.name, 'i')});
		res.send(classes);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    await StudentItem.deleteOne({
      id: Number(req.params.id)
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.delete('/api/classes/:id', async (req, res) => {
  try {
    await ClassItem.deleteOne({
      class_id: Number(req.params.id)
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.delete('/api/classes/id/:prof_id', async (req, res) => {
  try {
    await ClassItem.deleteOne({
      prof_id: Number(req.params.prof_id)
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.delete('/api/professors/:id', async (req, res) => {
  try {
    await ProfessorItem.deleteOne({
      id: Number(req.params.id)
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.delete('/api/grades/:id', async (req, res) => {
  try {
    await GradeItem.deleteMany({
      id: Number(req.params.id)
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.delete('/api/grades/:id/:class_id', async (req, res) => {
  try {
    await GradeItem.deleteOne({
      id: Number(req.params.id),
	  class_id: Number(req.params.class_id)
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/students', async (req, res) => {
  const student = new StudentItem({
    id: Number(req.body.id),
    user_name: req.body.user_name,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
  });
  try {
    await student.save();
    res.send(student);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.post('/api/classes', async (req, res) => {
  const classe = new ClassItem({
    class_id: Number(req.body.id),
    class_name: req.body.class_name,
    prof_id: Number(req.body.prof_id),
    class_hour: req.body.class_hour,
    class_day: req.body.class_day,
  });
  try {
    await classe.save();
    res.send(classe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.post('/api/professors', async (req, res) => {
  const professor = new ProfessorItem({
    id: Number(req.body.id),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    years_teaching: Number(req.body.years_teaching),
    age: Number(req.body.age),
    salary: req.body.salary,
  });
  try {
    await professor.save();
    res.send(professor);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.post('/api/grades', async (req, res) => {
  const grade = new GradeItem({
    id: Number(req.body.id),
    grade: Number(req.body.grade),
    class_id: Number(req.body.class_id),
  });
  try {
    await grade.save();
    res.send(grade);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
