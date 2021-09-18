export default function coinflip(message, args, prideFlag) {
	const flipNumber = Math.round(Math.random());
	console.log(flipNumber);
	if (flipNumber === 1) {
		message.channel.send(`Heads! ${prideFlag}`);
	} else {
		message.channel.send(`Tails! ${prideFlag}`);
	}
}