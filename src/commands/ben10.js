export function ben10(message, args, prideFlag) {
	message.delete();
	let fullMessage = '';
	if (args.length > 0) {
		args.forEach(element => {
			fullMessage = fullMessage + element + ' ';
		});
		message.channel.send(`${fullMessage} ${prideFlag}`);
	}
	message.channel.send(`https://media.discordapp.net/attachments/831202194673107005/844378006147694622/Thats_far_enough.PNG ${prideFlag}`);
}