const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route   GET test
// @desc    Tests first route
// @access  Public
app.get("/test", (req, res) => {
  res.json({
    message: "Test"
  });
});

// @route   POST encrpyt
// @desc    encrypt a value
// @access  Public
app.post("/encrypt", (req, res) => {

    encrypt = {};

    // we need to generate a salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.value, salt, (err, hash) => {
        if (err) throw err;
        encrypt.value = hash;
        res.json(encrypt);
      });
    });

});

// @route   POST decrypt
// @desc    decrypt a value
// @access  Public
app.post("/decrypt", (req, res) => {
errors = {};

  const value = req.body.value;
  const encryptedValue = req.body.encryptedValue;
  
    //Check Value
    bcrypt.compare(value, encryptedValue).then(isMatch => {
      if (isMatch) {
        res.json({ message: "Success" });
      } else {
        errors.value = "Incorrect";
        return res.status(400).json(errors);
      }
    });
  
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));