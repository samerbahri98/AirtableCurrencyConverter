const axios = require("axios");
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
			fs.writeFileSync("./model/rates.json", JSON.stringify(data.data))
			// console.log(data)
		)
		.catch((err) => console.error(err));
};

module.exports = modelRefresh;
