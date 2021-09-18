export default function gamble(message, args, prideFlag, authCode, client) {
	const gambleNumber = Math.round(Math.random() * 10);
	if (args[0]) args[0] = parseInt(args[0]);
	if (args[0] > -1 && args[0] < 11) {
		if (args[0] === gambleNumber) {
			message.channel.send(`Correct! <:HYPERS:794746882760769618> ${prideFlag}`);
		} else {
			message.channel.send(`Incorrect. <:FeelsBadMan:794744572718481408>  The number was ${gambleNumber}. ${prideFlag}`);
		}
	} else {
		// eslint-disable-next-line no-unused-vars
		message.channel.send(`I am thinking of a number between 1 and 10.  What is the number? ${prideFlag}`).then(_nil => {
			client.once('message', guessMessage => {
				const guess = parseInt(guessMessage.content);
				if (guess > -1 && guess < 11) {
					if (guess === gambleNumber) {
						message.channel.send(`Correct! <:HYPERS:794746882760769618> ${prideFlag}`);
					} else {
						message.channel.send(`Incorrect. <:FeelsBadMan:794744572718481408>  The number was ${gambleNumber}. ${prideFlag}`);
					}
				}
			});
		});
	}
}