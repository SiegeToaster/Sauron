import { messageTest } from '../../index.js';

export default function ping(/*message, args, prideFlag*/) {
	const message = messageTest;
	message.channel.send(`Pong.`);
	console.log('ping');
}