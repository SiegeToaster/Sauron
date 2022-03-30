const correctionGifs = [
	'https://images-ext-2.discordapp.net/external/x_dsYvJXnDZ-He2xSj1d2UjqFzouYJLzn6qk_mff4fg/https/media.discordapp.net/attachments/728319830108667989/858313721507348480/image0.gif',
	'https://tenor.com/view/bbc-two-bbc-two-peaky-blinders-gif-20722169',
	'https://tenor.com/view/your-youre-gif-19011295',
	'https://tenor.com/view/youre-your-spies-spies-in-disguise-youre-spies-gif-20405819',
	'https://tenor.com/view/youre-gif-18693005',
];
let lastCorrectionIndex = 0;

export default function messageChecker(message, prideFlag, susVar, pingVar, virginVar, prideVar) {
	if (message.content === 'https://media.discordapp.net/attachments/761347053983891499/842548851310985236/delete.jpg') {
		message.channel.bulkDelete(2);
		console.log('Delete That!! activated.');
	}
	if ((message.content.match(/you're(\*$)|(^\*)you're/gmi) || message.content.includes('youre')) && !message.author.bot) {
		let correctionIndex = Math.floor(Math.random() * correctionGifs.length);
		while (correctionIndex == lastCorrectionIndex) {
			correctionIndex = Math.floor(Math.random() * correctionGifs.length);
		}
		lastCorrectionIndex = correctionIndex;
		message.channel.send(correctionGifs[correctionIndex] + prideFlag);
	}
	if (message.content.toLowerCase().includes('female')) message.channel.send('girl*');
	if (susVar === 'true' && message.content.toLowerCase().includes('sus') && !message.content.match(/<:Susge:[0-9]+>/gm)) message.channel.send(`https://www.youtube.com/watch?v=KWtwIf-TSlo ${prideFlag}`);
	if (message.content.includes('https://cdn.discordapp.com/attachments/831202194673107005/849052330560323644/evening_gentlemen.png')) message.delete();
	if (pingVar === 'true' && message.mentions.users.first()) message.channel.send(`https://i.imgur.com/lqw97AX.jpg ${prideFlag}`);
	if (virginVar === 'true' && !message.author.bot) message.channel.send(`https://cdn.discordapp.com/attachments/761347053983891499/858791752601042974/evening_gentlemen.png ${prideFlag}`);
	if (prideVar === 'true' && !message.content.endsWith('🏳️‍🌈')) {
		console.log('pride');
		message.delete();
		message.channel.send('Your message has been deleted for not having :rainbow_flag: at the end.  Happy Pride Month!\n:rainbow_flag:\n:rainbow_flag:\n:rainbow_flag:\n:rainbow_flag:\n🏳️‍🌈');
	}
}