import { google } from "googleapis";
import getSpecificSetting from "./getSpecificSetting.js";
import updateSettings from "./../settings/updateSettings.js";

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
		let updatedSettings = [];
		(sheets.spreadsheets.values.update(request)).data;
		message.channel.send(`Successfully updated setting to ${value} ${prideFlag}`);
		setTimeout(function() { updatedSettings = updateSettings(auth); }, 1000);
		return updatedSettings;
	} catch (err) {
		message.channel.send(`Failed to update setting. ${prideFlag}`);
		console.log(err);
	}
}