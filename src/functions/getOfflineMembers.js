export default function getOfflineMembers(subjects, message) {
	const membersToReturn = [];
	if (!subjects.length) {
		subjects = message.guild.members.cache.array();
	}
	// console.log(subjects);
	subjects.forEach(element => {
		// console.log(element);
		if (element.user.bot) return;
		const tempPresence = (element.presence.status);
		if(tempPresence == 'offline' || tempPresence == 'idle') membersToReturn.push(element.nickname ? element.nickname : element.user.username);
	});
	// console.log(membersToReturn);
	return membersToReturn;
}