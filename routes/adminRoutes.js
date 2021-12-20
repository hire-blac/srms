const { Router } = require("express");
const adminController = require('../controllers/adminController');

const router = Router();

router.get('/admin', (req, res) => {
  res.render('admin/admin', {title: 'Admin Homepage'})
})

router.get('/students', adminController.students);
router.get('/students/new', adminController.new_student_get);
router.post('/students/new', adminController.new_student_post);
router.get('/students/:id', adminController.student_details);

router.get('/edit/:id', adminController.edit_scores_get);
router.put('/edit/:id', adminController.edit_scores_put);

router.get('/enroll/:id', adminController.subject_enroll_get);
router.post('/enroll/:id', adminController.subject_enroll_post);

router.get('/subjects', adminController.new_subject_get)
router.post('/subjects', adminController.new_subject_post)

router.get('/grades', adminController.grade_levels)
router.post('/grades', adminController.new_grade_level)
router.get('/grades/:id', adminController.grade_level_details)

module.exports = router;