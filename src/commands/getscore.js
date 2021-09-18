import getTotalScore from "../functions/score/getTotalScore.js";
import getIndividualScore from "../functions/score/getIndividualScore.js";

export default function getScore(message, args, prideFlag, authCode) { // ToDo: instead of checking against 3 specifics, get each id in the database and compare against.  Must use for loop for it to work (`A${i}:E${i}`)
	if (message.mentions.members.array().length < 1) {
		getTotalScore(authCode, message, prideFlag);
	} else {
		message.mentions.members.array().forEach(element => {
			console.log(element.id);
			switch (element.id) {
			case '356642729394044932':
				element = 'A2:E2';
				break;

			case '306589457908498433':
				element = 'A3:E3';
				break;

			case '495290130924437516':
				element = 'A4:E4';
				break;
			}
			getIndividualScore(authCode, element, message, prideFlag);
		});
	}
}