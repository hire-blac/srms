const mongoose = require('mongoose');
const Student = require('./student');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
  grade_level: {
    type: String,
    required: true
  },
  students: {
    type: [mongoose.ObjectId],
    ref: Student
  }
})

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;