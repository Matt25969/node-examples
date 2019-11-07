const express = require("express");
const router = express.Router();

// @route   GET second/test
// @desc    Tests second route
// @access  Public
router.get("/test", (req, res) => res.json({ message: "Test Second" }));

// @route   GET second/
// @desc    Tests default route
// @access  Public
router.get("/", (req, res) => res.json({ message: "Default Second" }));

module.exports = router;
