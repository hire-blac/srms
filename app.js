const express = require('express');
const mongoose = require('mongoose');
const Enrollment = require('./models/enrollment');
const Grade = require('./models/grade');
const Student = require('./models/student');
const Subject = require('./models/subject');
const subjectSchema = require('./models/subject');


// create new express app
const app = express();

// connect to the database
mongoose.connect('mongodb://localhost/srms', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(result=>{
    console.log('Connected to the database');

    // listen for requests
    app.listen(5000);
    console.log("Server listening on port 5000");
  })
  .catch(err=>{
    console.log(err);
  });

// register view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// app routes
app.get('/', (req, res)=>{
  res.render( 'index', {title: 'Homepage'} );
});

// Students routes
app.get('/students', (req, res)=>{
  Student.find()
    .then(result=>{
      res.render('students', {title: 'Students', students:result})
    })
    .catch(err=>{
      console.log(err)
    })
});

app.get('/students/new', (req, res)=>{
  res.render('new-student',{title: 'Add new Student'})
});

app.post('/students/new', (req, res)=>{

  const student = new Student(req.body);

  student.save()
    .then(result=>{
      res.redirect('/students');
    })
    .catch(err=>{
      console.log(err)
    })
});

app.get('/students/matric_num', (req, res)=>{
  const matric = req.query.matric_num;

  Student.findOne({matric_num: matric})
  .then(student=>{
    Enrollment.find({student_id: student._id})
    .then(enrollment=>{
      res.render('result', {title: 'Result', student, enrollment })
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    console.log(err)
  })
});

app.get('/students/:id',(req, res)=>{
  const id = req.params.id;
  Student.findById(id)
  .then(student=>{
    Enrollment.find({student_id: id})
    .then(enrollment=>{
      res.render('student-details', {title: 'Student Details', student, enrollment })
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    console.log(err)
  })
})

// enroll student for new subject
app.get('/enroll/:id',(req, res)=>{
  const id = req.params.id;
  Subject.find()
  .then(subjects=>{
    res.render('enroll', {title:'Enroll Student', id, subjects })
  })
  .catch(err=>console.log(err))
})

app.post('/enroll/:id',(req, res)=>{
  const id = req.params.id;
  const enrollment = new Enrollment({
    student_id: id,
    subject_id: req.body.subject_id,
    subject_name: req.body.subject_name
  });

  enrollment.save()
  .then(result=>{
    console.log(result)
    res.redirect('/students/:id')
  })
  .catch(err=>console.log(err))
})


// Admin routes
app.get('/admin', (req, res) => {
  res.render('admin', {title: 'Admin Homepage'})
})

// add a new subject
app.get('/subjects',(req, res)=>{
  Subject.find()
  .then(subjects=>{
    res.render('subjects', {title: 'Add New Subject', subjects})
  })
  .catch(err=>{
    console.log(err)
  })
})

app.post('/subjects',(req, res)=>{
  const subj = new Subject(req.body)

  subj.save()
  .then(result=>{
    res.redirect('/subjects');
  })
  .catch(err=>{
    console.log(err)
  })
})

// Grade level routes
app.get('/grades',(req, res)=>{
  Grade.find()
  .then(grades => {
    res.render('grades', {title: 'Grades', grades})
  })
  .catch(err => console.log(err))
})

app.post('/grades',(req, res)=>{
  const grade = new Grade(req.body)

  grade.save()
  .then(result=>{
    console.log(result)
  })
  .catch(err=>{
    console.log(err)
  })
})

app.get('/grades/:id', (req, res) => {
  const id = id;
  Grade.findById(id)
  .then(grade => {
    Student.find(grad)
  })
})

// Edit Subject scores for studnts
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  Enrollment.findById(id)
  .then(subject => {
    res.render('edit-scores', {title: 'Edit Scores', subject})
  })
  .catch(err => console.log(err))
})

app.put('/edit/:id', (req, res) => {
  const id = req.params.id;
  Enrollment.findByIdAndUpdate(id, req.body)
  .then(result => console.log(result))
  .catch(err => console.log(err))
})

// Default Route
app.use((req, res)=>{
  res.status(404).render('404', {title: 'Page Not Found'})
});