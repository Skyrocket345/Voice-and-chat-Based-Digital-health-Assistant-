const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.post('/cart', protect, userController.addToCart);
router.delete('/cart/:productId', protect, userController.removeFromCart);
router.post('/wishlist/:productId', protect, userController.addToWishlist);
router.delete('/wishlist/:productId', protect, userController.removeFromWishlist);

module.exports = router;
