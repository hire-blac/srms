const express = require('express');
const mongoose = require('mongoose');
const Enrollment = require('./models/enrollment');
const Grade = require('./models/grade');
const Student = require('./models/student');
const Subject = require('./models/subject');
const subjectSchema = require('./models/subject');
const adminRoutes = require('./routes/adminRoutes');

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

// Admin routes
app.use(adminRoutes);


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

// Default Route
app.use((req, res)=>{
  res.status(404).render('404', {title: 'Page Not Found'})
});