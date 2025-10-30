const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.get('/specialization/:specialization', doctorController.getDoctorsBySpecialization);
router.post('/:id/review', protect, doctorController.addReview);

module.exports = router;
