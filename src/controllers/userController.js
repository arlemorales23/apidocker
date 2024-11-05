const userService = require('../services/userService');
const logger = require('../utils/logger');

exports.register = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error('Error in user registration:', error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await userService.loginUser(email, password);
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    logger.error('Error in user login:', error);
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error('Error fetching user profile:', error);
    next(error);
  }
};