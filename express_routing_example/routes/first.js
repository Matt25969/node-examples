const express = require("express");
const router = express.Router();

// @route   GET first/test
// @desc    Tests first route
// @access  Public
router.get("/test", (req, res) => res.json({ message: "Test First" }));

// @route   GET first/
// @desc    Tests default route
// @access  Public
router.get("/", (req, res) => res.json({ message: "Default First" }));

module.exports = router;
