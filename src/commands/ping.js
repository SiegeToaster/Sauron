export function ping(message, args, prideFlag) {
	message.channel.send(`Pong. ${prideFlag}`);
	console.log('ping');
}