export function forgot(message, args, prideFlag) {
	// eslint-disable-next-line no-unused-vars
	message.channel.send(`<:FeelsNotSureMan:841539607664918558> ${prideFlag}`).then(_nil => {
		message.channel.send(`I forgot ${prideFlag}`);
	});
}