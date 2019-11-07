const express = require("express");
const router = express.Router();

// @route   GET second/test
// @desc    Tests first route
// @access  Public
router.get("/test", (_req, res) => res.json({ message: "Second" }));

module.exports = router;
