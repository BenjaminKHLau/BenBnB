// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('firstName')
    .isAlpha()
    .withMessage('First name cannot be empty and only contain letters'),
    // .exists({ checkFalsy: true })
    // .withMessage('First name cannot be empty.'),
  check('lastName')
    .isAlpha()
    .withMessage('Last name cannot be empty and only contain letters'),
    // .exists({ checkFalsy: true })
    // .withMessage('Last name cannot be empty.'),
  check('email')
    // .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    // .exists({ checkFalsy: true })
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric')
    .isLength({ min: 3 })
    .withMessage('Please provide a username with at least 3 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    // .exists({ checkFalsy: true })
    // .withMessage('Provide a password')
    .isLength({ min: 6 })
    .withMessage('Provide Password with 6 or more characters.'),
  handleValidationErrors
];



// Sign up
router.post('/', validateSignup, async (req, res, next) => {
      const { firstName, lastName, email, password, username } = req.body;
      
      //CHECK TO SEE IF USER ALREADY EXISTS
      const uniqueEmail = await User.findOne({
        where: {email}
      })
      if(uniqueEmail){
        const err = new Error('User already exists')
        err.status = 403
        err.errors = ["User with that email already exists"]
        return next(err)
      }
      const uniqueUsername = await User.findOne({
        where: {username}
      })
      if(uniqueUsername){
        const err = new Error('Username already exists')
        err.status = 403
        err.errors = ["User with that username already exists"]
        return next(err)
      }
      
      //SIGN UP USER IF NOT
      let user = await User.signup({ firstName, lastName, email, username, password });
      const token = await setTokenCookie(res, user);
      user = user.toJSON()
      user.token = token
      return res.json({
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        username:user.username,
        token: user.token
      });
}
);

  
module.exports = router;