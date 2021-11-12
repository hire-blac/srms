const mongoose = require('mongoose');
const Student = require('./student');
const Subject = require('./subject');
const Schema = mongoose.Schema;

enrollmentSchema = new Schema({
  student_id: {
    type: mongoose.ObjectId,
    ref: Student
  },
  subject_id: {
    type: mongoose.ObjectId,
    ref: Subject
  },
  subject_name: {
    type: String,
  },
  c_assesment: {
    type: Number,
    default: 0,
    max: 40
  },
  exam_score: {
    type: Number,
    default: 0,
    max: 60
  },
  total: {
    type: Number,
    default: function() {
      return this.c_assesment + this.exam_score
    }
  },
  grade: {
    type: String,
    default: function(total=this.total){
      if(total >= 80) {
        return 'A'
      } else if(total >= 70){
        return 'B'
      } else if(total >= 60){
        return 'C'
      } else if(total >= 50){
        return 'D'
      } else {
        return 'F'
      }
    }
  }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)

module.exports = Enrollment;