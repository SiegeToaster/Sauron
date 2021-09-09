import { google } from "googleapis";

export default async function getSpecificSetting(auth, range) {
	return await new Promise((resolve) => {
		const sheets = google.sheets({ version: 'v4', auth });
		sheets.spreadsheets.values.get({
			spreadsheetId: "1S0-MC0BWaGxhybXlpmE9Eu9ctsjeQ2Bjdha9DBnFFHo",
			range: range,
		}, (err, res) => {
			if (err) {
				resolve(false);
				console.log(`Error: ${err}`);
				/* if (fs.existsSync('./token.json')) {
					fs.unlink('./token.json', (err) => {
						if (err) return console.error(err);
						console.log('token.json successfully deleted.  Stopping bot...');
						process.exit(0);
					});
				} */
				return;
			}
			resolve(res.data.values[0][0]);
		});
	});
}