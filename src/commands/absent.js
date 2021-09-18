import getOfflineMembers from './../functions/getOfflineMembers.js';

export default function absent(message, args, prideFlag) {
	let offlineMembers = getOfflineMembers(message.mentions.members.array(), message);
	if (offlineMembers.length < 1) {
		message.channel.send(`No one is absent <:FeelsOkayMan:785613008247193660> ${prideFlag}`);
	} else if (offlineMembers.length === 1) {
		message.channel.send(`${offlineMembers} is absent <:FeelsBadMan:794744572718481408> ${prideFlag}`);
	} else {
		const lastMember = offlineMembers[offlineMembers.length - 1];
		offlineMembers.length = offlineMembers.length - 1;
		if (offlineMembers.length == 1) {
			offlineMembers = offlineMembers + ' and ' + lastMember;
		} else {
			offlineMembers = offlineMembers.join(', ');
			offlineMembers = offlineMembers + ', and ' + lastMember;
		}
		message.channel.send(`${offlineMembers} are absent <:FeelsBadMan:794744572718481408> ${prideFlag}`);
	}
}