function getIndividualScore(auth, range, message) {
	const sheets = google.sheets({ version: 'v4', auth });
	sheets.spreadsheets.values.get({
		spreadsheetId: SpreadsheetId,
		range: range,
	}, (err, res) => {
		if (err) {
			message.channel.send(`Failed to get scores <:FeelsDankMan:794744902172540968> ${prideFlag}`);
			return console.error(`The API returned an error: ${err}`);
		}
		const row = res.data.values[0];
		if (row.length && message) {
			message.channel.send(`${(message.guild.members.cache.get(row[0])).nickname} - Total Score: ${row[1]}, Number of Ratings: ${row[2]}, Highest Rating: ${row[3]}, Average Rating: ${row[4]} ${prideFlag}`);
		} else {
			console.error('No data found.');
		}
	});
}