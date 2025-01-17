const { signup, login,driver} = require('../Controllers/AuthController');
const { signupValidation, loginValidation,driverValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/driver', driverValidation, driver);






module.exports = router;
