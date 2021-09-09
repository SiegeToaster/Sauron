import { google } from "googleapis";

export default async function getSpecificScore(auth, range) {
	const promise = new Promise((resolve) => {
		const sheets = google.sheets({ version: 'v4', auth });
		sheets.spreadsheets.values.get({
			spreadsheetId: process.env.SpreadsheetId,
			range: range,
		}, (err, res) => {
			if (err) {
				resolve(false);
				return console.error(`The API returned an error: ${err}`);
			} else {
				const rows = res.data.values;
				resolve(rows);
			}
		});
	});
	return await promise;
}