import addToPlaylist from './../functions/playlist/addToPlaylist.js';

export function addPlaylist(message, args, prideFlag, authCode) {
	/*
		adds a song to the database.  After the command, a song name and a link must be added.  Optionally, the artist name can be added Examples:
			?addplaylist Hey Ya! https://www.youtube.com/watch?v=PWgvGjAhvIw
			?addplaylist Blitzkrieg Bop https://www.youtube.com/watch?v=iymtpePP8I8 Ramones
	*/
	let currentAssign = 0;
	let name = '';
	let link = '';
	let artist = '';
	args.forEach((element) => {
		const oldElement = element;
		if (element.startsWith('"')) {
			currentAssign++;
			element = element.substring(1);
		}
		if (element.endsWith('"')) element = element.substring(0, element.length - 1);
		switch (currentAssign) {
		case 1:
			name = name ? [name, element].join(' ') : element;
			break;

		case 2:
			link = element;
			break;

		case 3:
			artist = artist ? [artist, element].join(' ') : element;
			break;
		}
		if (oldElement.endsWith('"')) currentAssign++;
	});

	// console.log(`Song name: ${name}\nSong Link: ${link}\nSong artist: ${artist}`);
	addToPlaylist(authCode, message, [name, link, artist]);
}