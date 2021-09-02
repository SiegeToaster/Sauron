async function addToPlaylist(auth, message, songArray) {
	if (!songArray || songArray.length < 3) return message.channel.send('invalid song.');
	const sheets = google.sheets({ version: 'v4', auth });
	console.log(songArray);

	const playlistCount = await new Promise((resolve) => {
		sheets.spreadsheets.values.get({
			spreadsheetId: SpreadsheetId,
			range: 'Music!A2:C1000',
		}, (err, res) => {
			if (err) return console.error(`countPlaylist Error: ${err}`);
			resolve(res.data.values ? res.data.values.length + 2 : 2);
		});
	});

	// console.log(`Music!A${playlistCount}:C${playlistCount}`);
	const request = {
		spreadsheetId: SpreadsheetId,
		range: `Music!A${playlistCount}:C${playlistCount}`,
		valueInputOption: 'RAW',
		resource: {
			"range": `Music!A${playlistCount}:C${playlistCount}`,
			"values": [songArray],
		},
		auth: auth,
	};

	try {
		(sheets.spreadsheets.values.update(request)).data;
		message.channel.send(`Successfully added ${songArray[0]} ${prideFlag}`);
	} catch (err) {
		message.channel.send(`Failed to add song to playlist. ${prideFlag}`);
		console.log(err);
	}
}