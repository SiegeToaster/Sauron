import fs from 'fs';
import readline from 'readline';

export default function getNewToken(oAuth2Client) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/documents'],
	});
	console.log('Authorize this app by visiting this url: ', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error while trying to retrieve access token', err);
			oAuth2Client.setCredentials(token);
			fs.writeFile("token.json", JSON.stringify(token), (err) => {
				if (err) return console.error(err);
				console.log('Token stored to ', "token.json");
			});
		});
	});
}