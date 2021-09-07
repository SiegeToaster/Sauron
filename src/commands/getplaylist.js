export function getPlaylist(message, args, prideFlag, authCode) {
	/*
			get a song from playlist
				without anything after command, returns a random song name and link
				with 'all' after command, returns all song names in playlist
				with a song name after command, returns song name and link of song (if it exists in the playlist)
				with an artist after command, returns all songs by artists (if it exists in the playlist)
				examples:
					?getplaylist all
					?getplaylist Hey Ya!
					?getplaylist Ramones
		*/
	const filter = args.join(' ');
	console.log(filter);
	getPlaylist(authCode, message, filter);
}
