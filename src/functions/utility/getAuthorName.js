export default function getAuthorName(message, user) {
	return (message.guild.members.cache.get(user.id)).nickname ? (message.guild.members.cache.get(user.id)).nickname : user.username;
}