const express = require("express");
const router = express.Router();
const fs = require("fs")

// @route   GET api/list
// @desc    Get the list of currencies
// @access  PUBLIC
router.get("/", async (req, res) => {
    const rawData = JSON.parse(fs.readFileSync('./Model/placeholder.json'));
    
    res.json(Object.keys(rawData.rates))
});

module.exports = router;
