const cron = require("node-cron");
require("dotenv").config();

const modelRefresh = require('../model/convert.js')

const job = () => cron.schedule("0 0 0 * * *", modelRefresh);

module.exports = job;
