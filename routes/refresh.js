const express = require("express");
const router = express.Router();
const fs = require("fs")
const modelRefresh = require("../model/convert")

// @route   GET api/convert
// @desc    Convert ammount from basae currency to desired currency
// @access  PUBLIC
router.get("/", async (req, res) => {
    modelRefresh()
    res.json()
});

module.exports = router;
