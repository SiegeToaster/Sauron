import Discord from 'discord.js';
import { google } from "googleapis";
import countObject from '../utility/countObject.js';
import getAuthorName from '../utility/getAuthorName.js';


export default function getPlaylist(auth, message, filter) {
	if (!filter || filter.match(/[a|A][l|L]+/)) {
		filter = 'all';
	}
	console.log(`filter: ${filter}`);

	const sheets = google.sheets({ version: 'v4', auth });
	sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SpreadsheetId,
		range: 'Music!A2:Z1000',
	}, (err, res) => {
		if (err) return console.error(`Error: ${err}`);

		const getPlaylistEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setAuthor('Sauron', 'https://media.discordapp.net/attachments/831202194673107005/841810208833142844/evening_gentlemen.png')
			.setFooter(`Requested by: ${getAuthorName(message, message.author)}`);
		const songsToReturn = {};
		let filterIsArtist = false;
		// console.log(res.data.values);
		try {
			if (!(filter === 'all')) {
				console.log(res.data.values);
				res.data.values.forEach(songArray => {
					console.log(songArray);
					if (songArray[0] == filter) songsToReturn[countObject(songsToReturn)] = { name: `${songArray[0]}`, value: `${songArray[1]}` };
					console.log(songArray[0] == filter);
					if (songArray[2] == filter) {
						songsToReturn[countObject(songsToReturn)] = { name: `${songArray[0]}`, value: `${songArray[1]}` };
						filterIsArtist = true;
					}
					console.log(songArray[2] == filter);
				});
				// console.log(songsToReturn);
				if (countObject(songsToReturn) <= 0) return message.channel.send(`No songs by or named ${filter} in the playlist`);
			} else {
				res.data.values.forEach(songArray => {
					songsToReturn[countObject(songsToReturn)] = { name: `${songArray[0]}`, value: `${songArray[1]}` };
				});
			}
		} catch (err) {
			message.channel.send('No songs are in the playlist. <:FeelsWeirdMan:792656734409195542>');
			return console.log(`getPlaylist catch: ${err}`);
		}

		getPlaylistEmbed.setTitle(`Songs ${filterIsArtist ? ("by " + filter) : "in playlist"}.`);
		// console.log(songsToReturn);
		Object.values(songsToReturn).forEach(song => {
			// console.log(song);
			getPlaylistEmbed.addFields(song);
		});
		// console.log(songsToReturn);
		// console.log(getPlaylistEmbed);
		message.channel.send(getPlaylistEmbed);
	});
}