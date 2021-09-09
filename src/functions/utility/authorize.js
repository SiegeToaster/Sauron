import fs from 'fs';
import { google } from "googleapis";
import getNewToken from "./getNewToken.js";

export default function authorize(credentials) {
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
	fs.readFile("token.json", (err, token) => {
		if (err) return getNewToken(oAuth2Client);
		oAuth2Client.setCredentials(JSON.parse(token));
	});
	return oAuth2Client;
}