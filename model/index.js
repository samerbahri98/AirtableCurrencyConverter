const axios = require("axios");
const cron = require("node-cron");
const url = require("url");
const fs = require("fs");
require("dotenv").config();

const modelRefresh = () => {
	const params = new url.URLSearchParams({
		access_key: process.env.FIXER_API_KEY
	});
	axios
		.get(
			"http://data.fixer.io/api/latest?"
			+ params.toString()
		)
		.then((data) =>
			fs.writeFileSync("./model/placeholder.json", JSON.stringify(data.data))
			// console.log(data)
		)
		.catch((err) => console.error(err));
};

const job = () => cron.schedule("0 0 0 * * *", modelRefresh);

module.exports = job;
