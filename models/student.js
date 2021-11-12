const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  matric_num: {
    type: String,
    required: true,
    unique: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  d_o_b: {
    type: Date,
    required: true
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;