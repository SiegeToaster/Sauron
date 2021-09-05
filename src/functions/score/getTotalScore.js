import { google } from "googleapis";

export function getTotalScore(auth, message, prideFlag) {
	const sheets = google.sheets({ version: 'v4', auth });
	sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SpreadsheetId,
		range: 'A2:E4',
	}, (err, res) => {
		if (err) {
			message.channel.send(`Failed to get scores <:FeelsDankMan:794744902172540968> ${prideFlag}`);
			return console.error(`The API returned an error: ${err}`);
		}
		const rows = res.data.values;
		if (rows.length && message) {
			rows.map((row) => {
				message.channel.send(`${(message.guild.members.cache.get(row[0])).nickname} - Total Score: ${row[1]}, Number of Ratings: ${row[2]}, Highest Rating: ${row[3]}, Average Rating: ${row[4]} ${prideFlag}`);
			});
		} else {
			console.error('No data found.');
		}
	});
}