const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation.controller');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/v1/recommendations/products
// @desc    Get personalized product recommendations
// @access  Private
router.get('/products', protect, recommendationController.getProductRecommendations);

// @route   GET /api/v1/recommendations/doctors
// @desc    Get doctor recommendations based on health profile
// @access  Private
router.get('/doctors', protect, recommendationController.getDoctorRecommendations);

// @route   GET /api/v1/recommendations/lab-tests
// @desc    Get recommended lab tests
// @access  Private
router.get('/lab-tests', protect, recommendationController.getLabTestRecommendations);

module.exports = router;
