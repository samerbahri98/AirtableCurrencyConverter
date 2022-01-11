const express = require("express");
const router = express.Router();
const fs = require("fs")

// @route   GET api/convert
// @desc    Convert ammount from basae currency to desired currency
// @access  PUBLIC
router.get("/:base/:desired/:amount", async (req, res) => {
    const rawData = JSON.parse(fs.readFileSync('./model/rates.json'));
    const numerator = rawData.rates[req.params.desired]
    const denominator = rawData.rates[req.params.base]
    res.json({"amount":req.params.amount*numerator/denominator})
});

module.exports = router;
