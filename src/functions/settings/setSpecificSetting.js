import { google } from "googleapis";
import getSpecificSetting from "./getSpecificSetting.js";
import { updateSettings } from "./../../../index.js";

export default async function setSpecificSetting(auth, range, value, message, prideFlag) {
	const sheets = google.sheets({ version: 'v4', auth });
	const previousValue = await getSpecificSetting(auth, range);
	if (!previousValue) return message.channel.send(`Failed to update setting. ${prideFlag}`);
	if (value === previousValue) return message.channel.send(`Setting is already ${value} ${prideFlag}`);

	const request = {
		spreadsheetId: process.env.SpreadsheetId,
		range: range,
		valueInputOption: 'RAW',
		resource: {
			"range": range,
			"values": [[value]],
		},
		auth: auth,
	};
	try {
		(sheets.spreadsheets.values.update(request)).data;
		message.channel.send(`Successfully updated setting to ${value} ${prideFlag}`);
		updateSettings(auth);
	} catch (err) {
		message.channel.send(`Failed to update setting. ${prideFlag}`);
		console.log(err);
	}
}