const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const validation = require('../middlewares/validation');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').trim().isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    validation.handleValidationErrors,
  ],
  userController.register
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists(),
    validation.handleValidationErrors,
  ],
  userController.login
);

router.get('/profile', auth, userController.getProfile);

module.exports = router;