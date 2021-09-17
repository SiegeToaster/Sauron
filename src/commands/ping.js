export default function ping(message/*, args, prideFlag*/) {
	message.channel.send(`Pong.`);
	console.log('ping');
}