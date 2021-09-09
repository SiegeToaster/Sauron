import { google } from "googleapis";
import getAuthorName from "./../utility/getAuthorName.js";

export default function getIndividualScore(auth, id, message, prideFlag) {
	const sheets = google.sheets({ version: 'v4', auth });
	sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SpreadsheetId,
		range: 'A2:E1000',
	}, (err, res) => {
		if (err) {
			message.channel.send(`Failed to get scores <:FeelsDankMan:794744902172540968> ${prideFlag}`);
			return console.error(`getIndividualScore fetch error: ${err}`);
		}
		let invalidIds = true;
		res.data.values.forEach(userValues => {
			console.log(userValues[0]);
			if (id == userValues[0]) {
				message.channel.send(`${getAuthorName(message, message.guild.members.cache.get(id))} - Total Score: ${userValues[1]}, Number of Ratings: ${userValues[2]}, Highest Rating: ${userValues[3]}, Average Rating: ${userValues[4]} ${prideFlag}`);
				invalidIds = false;
				// getAuthorName doesn't work properly - returns Undefined.
			}
			if (invalidIds) message.channel.send('No data found.');
		});
	});
}