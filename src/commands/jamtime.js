import getAuthorName from "../functions/utility/getAuthorName.js";

export default function jamtime(message, args, prideFlag) {
	// eslint-disable-next-line prefer-const
	let reactedUsers = [''];
	message.channel.send(`@everyone jam time?  <:FeelsOkayMan:785613008247193660> ${prideFlag}`).then(sent => {
		sent.react('✅')
			.then(() => {
				sent.react('❌');
				const filterX = (reaction, user) => {
					return reaction.emoji.name === '❌' && user.id === user.id && !(user.bot);
				};
				const collectorX = sent.createReactionCollector(filterX);
				collectorX.on('collect', (reaction, user) => {
					if (!reactedUsers.includes(user)) {
						reactedUsers.push(user);
						message.channel.send(`${getAuthorName(message, user)} absent jammer <:Sadge:804521949794795601> ${prideFlag}`);
					}
				});
				const filterY = (reaction, user) => {
					return reaction.emoji.name === '✅' && user.id === user.id && !(user.bot);
				};
				const collectorY = sent.createReactionCollector(filterY);
				collectorY.on('collect', (reaction, user) => {
					if (!reactedUsers.includes(user)) {
						reactedUsers.push(user);
						message.channel.send(`${getAuthorName(message, user)} present jammer <:FeelsOkayMan:785613008247193660> ${prideFlag}`);
					}
				});
			});
	});
}