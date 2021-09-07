export function troll(message, args, prideFlag) {
	message.delete();
	if (args.length < 1) {
		return message.channel.send(`No one to troll <:FeelsBadMan:794744572718481408> ${prideFlag}`);
	} else {
		let fullMessage = '';
		args.forEach(element => {
			if(element.includes('<@!306589457908498433>')) {
				element = (message.guild.members.cache.get('306589457908498433')).nickname;
			}
			fullMessage = fullMessage + element + ' ';
		});
		for (let i = 0; i < 25; i++) {
			message.channel.send(`${fullMessage} ${prideFlag}`);
		}
	}
}