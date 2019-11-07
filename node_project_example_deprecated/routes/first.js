const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//Load input validation

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

//Load User Model
const User = require("../models/User");

// @route   GET first/test
// @desc    Tests first route
// @access  Public
router.get("/test", (req, res) => {
  res.json({
    message: "First"
  });
});

// @route   GET first/all
// @desc    Get all users
// @access  Public

router.get("/all", (req, res) => {
  const errors = {};
  User.find()
    .then(users => {
      if (!users) {
        errors.nousers = "There are no users";
        res.status(404).json(errors);
      }

      res.json(users);
    })
    .catch(err => res.status(404).json({ nousers: "There are no users" }));
});

// @route   POST first/register
// @desc    Register a user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation using the contents of the validation folder
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //first find if the email exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // we need to generate a salt
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route   POST first/login
// @desc    Login User
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

   //Check Validation using the contents of the validation folder
   if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ message: "Success" });
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
