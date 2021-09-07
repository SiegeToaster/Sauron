export function deleteMessage(message, args, prideFlag) {
	message.delete();
	message.channel.send(`https://media.discordapp.net/attachments/761347053983891499/842548851310985236/delete.jpg ${prideFlag}`);
	// ToDo: delete replied message if message is a reply.
}