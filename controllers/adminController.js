const Enrollment = require("../models/enrollment");
const Grade = require("../models/grade");
const Student = require("../models/student");
const Subject = require("../models/subject");
let context = {}

module.exports.students = (req, res)=>{
  Student.find()
    .then(students=>{
      context = {
        title: 'Students',
        students
      }
      res.render('admin/students', context)
    })
    .catch(err=>{
      console.log(err)
    })
}

// student details
module.exports.student_details = (req, res) => {
  const id = req.params.id;
  Student.findById(id)
  .then(student=>{
    Enrollment.find({student_id: id})
    .then(enrollment=>{
      context = {
        title: 'Student Details',
        student,
        enrollment
      }
      res.render('admin/student-details', context)
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    console.log(err)
  })
}

// edit student subject scores
module.exports.edit_scores_get = (req, res) => {
  const id = req.params.id;
  Enrollment.findById(id)
  .then(subject => {
    Student.findById(subject.student_id)
    .then(student => {
      context = {
        title: 'Edit Scores',
        subject,
        student
      }
      res.render('admin/edit-scores', context)
    })
  })
  .catch(err => console.log(err))
}

module.exports.edit_scores_put = (req, res) => {
  const id = req.params.id;
  Enrollment.findByIdAndUpdate(id, req.body)
  .then(result => console.log(result))
  .catch(err => console.log(err))
}

// enroll student for subject
module.exports.subject_enroll_get = (req, res) => {
  const id = req.params.id;
  Subject.find()
  .then(subjects=>{
    context = {
      title:'Enroll Student',
      id,
      subjects
    }
    res.render('enroll', context)
  })
  .catch(err=>console.log(err))
}

module.exports.subject_enroll_post = (req, res) => {
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
}

// new student
module.exports.new_student_get = (req, res) => {
  context = {
    title: 'Add new Student'
  }
  res.render('admin/new-student', context)
}

module.exports.new_student_post = (req, res) => {

  const student = new Student(req.body);

  student.save()
    .then(result=>{
      res.redirect('/students');
    })
    .catch(err=>{
      console.log(err)
    })
}

// new subject
module.exports.new_subject_get = (req, res) => {
  Subject.find()
  .then(subjects=>{
    context = {
      title: 'Add New Subject',
      subjects
    }
    res.render('admin/subjects', context)
  })
  .catch(err=>{
    console.log(err)
  })
}

module.exports.new_subject_post = (req, res) => {
  const subj = new Subject(req.body)

  subj.save()
  .then(result=>{
    res.redirect('/subjects');
  })
  .catch(err=>{
    console.log(err)
  })
}

// grade levels
module.exports.grade_levels = (req, res) => {
  Grade.find()
  .then(grades => {
    context = {
      title: 'Grades',
      grades
    }
    res.render('grades', context)
  })
  .catch(err => console.log(err))
}

// add new grade level
module.exports.new_grade_level = (req, res)=>{
  const grade = new Grade(req.body)

  grade.save()
  .then(result=>{
    console.log(result)
  })
  .catch(err=>{
    console.log(err)
  })
}

// grade details
module.exports.grade_level_details = (req, res) => {
  const id = id;
  Grade.findById(id)
  .then(grade => {
    Student.find(grad)
  })
}