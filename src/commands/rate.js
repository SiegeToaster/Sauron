import setScore from "../functions/score/setScore.js";

export default function rate(message, args, prideFlag, authCode) {
	if (args[0] == `<@!${message.author.id}>`) return message.channel.send(`Invalid user - Rule 10 <:FeelsWeirdMan:792656734409195542> ${prideFlag}`);
	if (args[1] < 1 || args[1] > 10) return message.channel.send(`Invalid rating <:FeelsWeirdMan:792656734409195542> ${prideFlag}`);
	if (!args[1]) return message.channel.send(`Missing Parameters <:FeelsWeirdMan:792656734409195542> ${prideFlag}`);
	switch (args[0]) {
	case '<@!356642729394044932>':
		args[0] = 'B2:D2';
		break;

	case '<@!306589457908498433>':
		args[0] = 'B3:D3';
		break;

	case '<@!495290130924437516>':
		args[0] = 'B4:D4';
		break;
	}
	setScore(authCode, args[0], args[1], message, prideFlag);
}