async function setScore(auth, range, value, message) {
	const previousValues = await getSpecificScore(authCode, range);
	if (!previousValues) return message.channel.send(`Failed to add score. ${prideFlag}`);
	value = parseInt(value);
	const previousScore = parseInt(previousValues[0][0]);
	const previousNumber = parseInt(previousValues[0][1]);
	let highest = parseInt(previousValues[0][2]);
	if (value > highest) {
		highest = value;
	}
	const sheets = google.sheets({ version: 'v4', auth });
	const request = {
		spreadsheetId: SpreadsheetId,
		range: range,
		valueInputOption: 'RAW',
		resource: {
			"range": range,
			"values": [[value + previousScore, previousNumber + 1, highest]],
		},
		auth: auth,
	};
	try {
		(sheets.spreadsheets.values.update(request)).data;
		message.channel.send(`Score of ${value} successfully added to ${message.mentions.users.first()}. ${prideFlag}`);
	} catch (err) {
		message.channel.send(`Failed to add score. ${prideFlag}`);
		console.error(`${err}`);
	}
}