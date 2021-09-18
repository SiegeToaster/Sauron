export default function forgot(message, args, prideFlag) {
	message.channel.send(`<:FeelsNotSureMan:841539607664918558> ${prideFlag}`).then(() => {
		message.channel.send(`I forgot ${prideFlag}`);
	});
}