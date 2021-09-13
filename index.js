// =====SETUP=====\\
import Discord from 'discord.js';
import fs from 'fs';
import { config } from 'dotenv';
config();
const client = new Discord.Client();
let authCode = '';
fs.readFile('credentials.json', (err, content) => {
	if (err) return console.log('Error loading client secret file:', err);
	authCode = authorize(JSON.parse(content));
});
let reactedUsers = [`
> ⠀⠀⠉⠛⠛⠻⢿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣶⣶⣶⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀
> ⠀⠀⠀⠀⠀⠀⠚⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀
> ⠀⠀⠀⠀⠀⠀⠀⠘⠛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀
> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣿⣿⣿⠟⠛⠋⠉⠉⠉⠙⣿⣿⣿⣿⣶⣀⠀
> ⠀⠀⠀⠰⠶⠿⢰⣿⣶⣦⠀⠀⢸⣿⣿⣦⡄⠀⢀⣴⣾⣿⣿⣿⡿⠿⣿⣿⣿⠇
> ⠀⠀⠀⠀⠀⠀⠀⠻⠿⠃⠀⠀⠀⣿⣿⣿⣧⠀⠀⠉⣉⣉⣩⣥⡶⠀⠀⠀⣿⡇
> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⠀⠀⣻⣿⣿⣿⠃⠀⠀⢠⣿⠃
> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠁⣴⣿⣿⣿⠟⠃⡀⠀⢠⣿⠟⠀
> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣄⠀⣤⣤⣤⢰⣿⡦⣿⠀⣿⣿⠀⠀
> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠛⠛⠀⠛⠛⠋⠈⠉⠀⠀⢀⣿⣿⠀⠀
> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢴⡆⣤⣤⣄⡄⢀⣀⣀⢀⣀⢀⡄⠀⢨⣿⣿⠀⠀
> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠃⣿⣿⣿⠇⣿⣿⡋⣿⠏⠛⣃⣤⣾⣿⣿⠀⠀
> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤⣄⣠⣤⣠⣴⣶⣾⣿⣿⣿⣿⣿⣿⡀⠀
> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀
> ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁
`];
const correctionGifs = [
	'https://images-ext-2.discordapp.net/external/x_dsYvJXnDZ-He2xSj1d2UjqFzouYJLzn6qk_mff4fg/https/media.discordapp.net/attachments/728319830108667989/858313721507348480/image0.gif',
	'https://tenor.com/view/bbc-two-bbc-two-peaky-blinders-gif-20722169',
	'https://tenor.com/view/your-youre-gif-19011295',
	'https://tenor.com/view/youre-your-spies-spies-in-disguise-youre-spies-gif-20405819',
	'https://tenor.com/view/youre-gif-18693005',
];
let lastCorrectionIndex = 0;

//=====SETTINGS=====\\
export let pingVar, prideVar, prideFlag, virginVar, susVar;

async function updateSettings(auth) {
	pingVar = await getSpecificSetting(auth, 'Settings!A2');
	prideVar = await getSpecificSetting(auth, 'Settings!B2');
	if (prideVar === 'true') {
		prideFlag = '🏳️‍🌈';
	} else {
		prideFlag = ' ';
	}
	virginVar = await getSpecificSetting(auth, 'Settings!C2');
	susVar = await getSpecificSetting(auth, 'Settings!D2');

	console.log('Settings Updated.');
	return [pingVar, prideVar, prideFlag, virginVar, susVar];
} // ToDo: remove returned array and just edit values directly from funciton.

//=====FUNCTIONS=====\\
import authorize from "./src/functions/utility/authorize.js";
import getAuthorName from "./src/functions/utility/getAuthorName.js";

import addToPlaylist from "./src/functions/playlist/addToPlaylist.js";
import getPlaylist from "./src/functions/playlist/getPlaylist.js";

import getIndividualScore from "./src/functions/score/getIndividualScore.js";
import getTotalScore from "./src/functions/score/getTotalScore.js";
import setScore from "./src/functions/score/setScore.js";

import setSpecificSetting from "./src/functions/settings/setSpecificSetting.js";
import getSpecificSetting from "./src/functions/settings/getSpecificSetting.js";

import getOfflineMembers from './src/functions/getOfflineMembers.js';
import getSheeshiusVerse from './src/functions/getSheeshiusVerse.js';

//=====CLIENT=====\\
client.once('ready', () => {
	console.log('');
	console.log('Sauron is now online.');
	client.user.setStatus("online");
	(async () => {
		const settingsArray = await updateSettings(authCode);
		console.log(`Settings Array: ${settingsArray}`);
		pingVar = settingsArray[0];
		prideVar = settingsArray[1];
		prideFlag = settingsArray[2];
		virginVar = settingsArray[3];
		susVar = settingsArray[4];
	})();
});

const prefix = process.env.prefix;
const helpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Help')
	.setAuthor('Saur\u00F6n', 'https://media.discordapp.net/attachments/831202194673107005/841810208833142844/evening_gentlemen.png')
	.setDescription('A list \u00F6f c\u00F6mmands f\u00F6r the Saur\u00F6n b\u00F6t.')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Prefix', value: `Use this character at the beginning \u00F6f any message that is a c\u00F6mmand\n${prefix}` },
		{ name: 'Ping', value: "Sends 'p\u00F6ng' instantly.  Used t\u00F6 test b\u00F6t's c\u00F6nnecti\u00F6n \u00F6r if the b\u00F6t is \u00F6nline." },
		{ name: 'Help', value: 'Sends this embed.' },
		{ name: 'Catjam', value: 'Sends a gif \u00F6f a cat jamming.' },
		{ name: 'Ben10', value: 'Sends the text y\u00F6u put after the c\u00F6mmand and a picture \u00F6f a guy with his hand \u00F6ut.' },
		{ name: 'Delete', value: 'Sends a picture \u00F6f Pepe h\u00F6lding a sign that says "Delete That!!"' },
		{ name: 'J\u00F6e', value: 'mama' },
		{ name: 'Absent', value: 'Checks is pe\u00F6ple are \u00F6ffline.  If pe\u00F6ple are pinged after c\u00F6mmand, it \u00F6nly checks th\u00F6se, \u00F6therwise, it checks every\u00F6ne.' },
		{ name: 'Tr\u00F6ll', value: 'Sends the message declared after the c\u00F6mmand 25 times.' },
		{ name: 'Gamble', value: 'Guessing game f\u00F6r numbers between 1 and 10.  \u00D6PTI\u00D6NAL: Add a number after c\u00F6mmand t\u00F6 aut\u00F6matically get answer.' },
		{ name: 'C\u00F6inflip', value: 'Flips a c\u00F6in, lands \u00F6n heads \u00F6r tails.' },
		{ name: 'Jamtime', value: 'Pings every\u00F6ne asking f\u00F6r jamtime and adds yes/n\u00F6 reacti\u00F6ns.\n\nIf s\u00F6me\u00F6ne reacts yes, they get present jammer <:FeelsOkayMan:785613008247193660>.\nIf s\u00F6me\u00F6ne reacts n\u00F6, they get absent jammer <:Sadge:804521949794795601>.' },
		{ name: 'Rate', value: 'Sets the sc\u00F6re in the database.  After the c\u00F6mmand, a user must be menti\u00F6ned f\u00F6ll\u00F6wed by a number (the sc\u00F6re).  Example:\n?rate `@Willius Dominus` 10' },
		{ name: 'Getsc\u00F6re', value: 'Gets the sc\u00F6re f\u00F6r every\u00F6ne in the database.  Opti\u00F6nal: add menti\u00F6n(s) after the c\u00F6mmand t\u00F6 get their sc\u00F6re \u00F6nly.  Example:\n?getscore\n?getScore `@Willius Dominus` `@Bennamus Jullius`' },
		{ name: 'Set', value: 'Changes settings.  After the c\u00F6mmand, a setting must be named f\u00F6ll\u00F6wed by "true" \u00F6r "false".  Valid settings are: "ping", "pride", "virgin", and "sus".  Example:\n?set ping true' },
		{ name: 'sheeshius', value: 'get verse(s) fr\u00F6m The H\u00F6ly B\u00F6\u00F6k \u00F6f Sheeshius.  Chapters, lines, b\u00F6th, \u00F6r neither can be declared.  If n\u00F6ne are declared, the entire b\u00F6\u00F6k is sent.  If \u00F6nly a chapter \u00F6r chapters are declared, it will send the entire chapters.  If b\u00F6th chapter and verse are declared (separated with ":") it will send the verses.  Multiple verses can be declared with a "-" and/\u00F6r ",".' },
		{ name: 'addPlaylist', value: 'Adds a s\u00F6ng name, link, and \u00F6pti\u00F6nally, an artist t\u00F6 the playlist.  S\u00F6ng name and artist must be in qu\u00F6tes.  Example:\n?addPlaylist "Puff the Magic Drag\u00F6n" https://youtu.be/z15pxWUXvLY "Peter, Paul, and Mary"' },
		{ name: 'getPlaylist', value: 'Gets a s\u00F6ng fr\u00F6m the playlist.  S\u00F6ng name \u00F6r artist can be used as a filter.  Examples\n?getPlaylist Puff the Magic Drag\u00F6n\n?getPlaylist Peter, Paul, and Mary\n?getPlaylist' },
	)
	.setFooter('ligma');
let fullMessage = '';

client.login(process.env.discord_token);
//=====ACTIONS===== \\
client.on ('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
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
	if (susVar === 'true' && message.content.toLowerCase().includes('sus') && !message.content.match(/<:Susge:[0-9]+>/gm)) message.channel.send(`https://www.youtube.com/watch?v=0bZ0hkiIKt0 ${prideFlag}`);
	if (message.content.includes('https://cdn.discordapp.com/attachments/831202194673107005/849052330560323644/evening_gentlemen.png')) message.delete();
	if (pingVar === 'true' && message.mentions.users.first()) message.channel.send(`https://i.imgur.com/lqw97AX.jpg ${prideFlag}`);
	if (virginVar === 'true' && !message.author.bot) message.channel.send(`https://cdn.discordapp.com/attachments/761347053983891499/858791752601042974/evening_gentlemen.png ${prideFlag}`);
	if (prideVar === 'true' && !message.content.endsWith('🏳️‍🌈')) {
		console.log('pride');
		message.delete();
		message.channel.send('Your message has been deleted for not having :rainbow_flag: at the end.  Happy Pride Month!\n:rainbow_flag:\n:rainbow_flag:\n:rainbow_flag:\n:rainbow_flag:\n🏳️‍🌈');
	}
	if (!message.content.startsWith(prefix) || message.content == prefix) return;
	console.log(' ');
	// =====DEBUG=====\\
	// console.log(`command: ${command}`);
	// console.log(`args: ${args}`);
	// console.log(`1st element of args: ${args[0]}`);
	// console.log(`args size: ${args.length}`);
	// console.log(`guild: ${guild}`);
	console.log(`input: ${command} ${args}`);
	switch (command) {
	case 'ping': {
		message.channel.send(`Pong. ${prideFlag}`);
		console.log('ping');
		break;
	}

	case 'help': {
		message.channel.send(helpEmbed);
		break;
	}

	case 'catjam': {
		message.delete();
		message.channel.send(`https://tenor.com/view/cat-cat-jam-nod-pet-kitty-gif-17932554 ${prideFlag}`);
		break;
	}

	case 'ben10': {
		message.delete();
		fullMessage = '';
		if (args.length > 0) {
			args.forEach(element => {
				fullMessage = fullMessage + element + ' ';
			});
			message.channel.send(`${fullMessage} ${prideFlag}`);
		}
		message.channel.send(`https://media.discordapp.net/attachments/831202194673107005/844378006147694622/Thats_far_enough.PNG ${prideFlag}`);
		break;
	}

	case 'delete': {
		message.delete();
		message.channel.send(`https://media.discordapp.net/attachments/761347053983891499/842548851310985236/delete.jpg ${prideFlag}`);
		// ToDo: delete replied message if message is a reply.
		break;
	}

	case 'joe': {
		message.channel.send(`joe mama ${prideFlag}`);
		break;
	}

	case 'forgot': {
		// eslint-disable-next-line no-unused-vars
		message.channel.send(`<:FeelsNotSureMan:841539607664918558> ${prideFlag}`).then(_nil => {
			message.channel.send(`I forgot ${prideFlag}`);
		});
		break;
	}

	case 'absent': {
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

		break;
	}

	case 'troll': {
		message.delete();
		if (args.length < 1) {
			return message.channel.send(`No one to troll <:FeelsBadMan:794744572718481408> ${prideFlag}`);
		} else {
			fullMessage = '';
			args.forEach(element => {
				if(element.includes('<@!306589457908498433>')) {
					element = (message.guild.members.cache.get('306589457908498433')).nickname;
				}
				fullMessage = fullMessage + element + ' ';
			});
			for (let i = 0; i < 25; i++) {
				message.channel.send(`${fullMessage} ${prideFlag}`);
			}
		}
		break;
	}

	case 'gamble': {
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
		break;
	}

	case 'coinflip': {
		const flipNumber = Math.round(Math.random());
		console.log(flipNumber);
		if (flipNumber === 1) {
			message.channel.send(`Heads! ${prideFlag}`);
		} else {
			message.channel.send(`Tails! ${prideFlag}`);
		}
		break;
	}

	case 'jamtime': {
		reactedUsers = [];
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
		break;
	}

	case 'rate': {
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
		break;
	}

	case 'getscore': { // ToDo: instead of checking against 3 specifics, get each id in the database and compare against.  Must use for loop for it to work (`A${i}:E${i}`)
		if (message.mentions.members.array().length < 1) {
			getTotalScore(authCode, message, prideFlag);
		} else {
			message.mentions.members.array().forEach(element => {
				console.log(element.id);
				getIndividualScore(authCode, element.id, message, prideFlag);
			});
		}
		break;
	}

	case 'set': {
		if (args[0] !== 'ping' && args[0] !== 'pride' && args[0] !== 'virgin' && args[0] !== 'sus') return message.channel.send(`${args[0]} is not a setting. ${prideFlag}`);
		if (args[1] !== 'true' && args[1] !== 'false') return message.channel.send(`${args[1]} is an invalid setting for ${args[0]} ${prideFlag}`);
		switch (args[0]) {
		case 'ping': args[0] = 'Settings!A2';
			break;

		case 'pride': args[0] = 'Settings!B2';
			break;

		case 'virgin': args[0] = 'Settings!C2';
			break;

		case 'sus': args[0] = 'Settings!D2';
			break;
		}

		(async () => {
			const settingsArray = await setSpecificSetting(authCode, args[0], args[1], message, prideFlag);
			pingVar = settingsArray[0];
			prideVar = settingsArray[1];
			prideFlag = settingsArray[2];
			virginVar = settingsArray[3];
			susVar = settingsArray[4];
		})();
		break;
	}

	case 'sheeshius': {
		// console.log(args);
		let CurrentChapter = -1;
		// eslint-disable-next-line prefer-const
		let RequestedChaptersAndLines = {};
		args.forEach(argument => {
			if (argument.match(/,$/g)) argument = argument.split(',')[0];
			// console.log(argument);
			if (!argument.match(/^[0-9]+/g)) return;
			// console.log('pass 1');
			if (argument.includes(':')) {
				argument = argument.split(':');
				const chapter = parseInt(argument[0]);
				CurrentChapter = chapter;
				if (RequestedChaptersAndLines[chapter] == null) RequestedChaptersAndLines[parseInt(argument[0])] = [];
				if (argument[1].includes('-')) {
					const lines = argument[1].split('-');
					const start = parseInt(lines[0]);
					const end = parseInt(lines[1]);
					// console.log(`start: ${start}, end: ${end}`);
					for (let i = start; i <= end; i++) {
						RequestedChaptersAndLines[CurrentChapter].push(i);
					}
				} else {
					RequestedChaptersAndLines[CurrentChapter].push(parseInt(argument[1]));
				}
				// console.log(RequestedChaptersAndLines);
			} else if (argument.includes('-')) {
				argument = argument.split('-');
				const start = parseInt(argument[0]);
				const end = parseInt(argument[1]);
				for (let i = start; i <= end; i++) {
					RequestedChaptersAndLines[CurrentChapter].push(i);
				}
			} else if (CurrentChapter == -1 && !argument.includes(':')) {
				RequestedChaptersAndLines[argument] = [];
				for (let i = 1; i < 100; i++) {
					RequestedChaptersAndLines[argument].push(i);
				}
			} else {
				const line = parseInt(argument);
				RequestedChaptersAndLines[CurrentChapter].push(line);
			}
		});
		Object.values(RequestedChaptersAndLines).forEach(element => {
			// console.log(element);
			element = [new Set(element)];
			element.sort();
		});
		// console.log(RequestedChaptersAndLines);
		getSheeshiusVerse(authCode, message, RequestedChaptersAndLines, prideFlag);
		break;
	}

	case 'addplaylist': {
		/*
			adds a song to the database.  After the command, a song name and a link must be added.  Optionally, the artist name can be added Examples:
    			?addplaylist Hey Ya! https://www.youtube.com/watch?v=PWgvGjAhvIw
    			?addplaylist Blitzkrieg Bop https://www.youtube.com/watch?v=iymtpePP8I8 Ramones
		*/
		let currentAssign = 0;
		let name = '';
		let link = '';
		let artist = '';
		args.forEach((element) => {
			const oldElement = element;
			if (element.startsWith('"')) {
				currentAssign++;
				element = element.substring(1);
			}
			if (element.endsWith('"')) element = element.substring(0, element.length - 1);
			switch (currentAssign) {
			case 1:
				name = name ? [name, element].join(' ') : element;
				break;

			case 2:
				link = element;
				break;

			case 3:
				artist = artist ? [artist, element].join(' ') : element;
				break;
			}
			if (oldElement.endsWith('"')) currentAssign++;
		});

		// console.log(`Song name: ${name}\nSong Link: ${link}\nSong artist: ${artist}`);
		addToPlaylist(authCode, message, [name, link, artist]);
		break;
	}

	case 'getplaylist': {
		/*
				get a song from playlist
					without anything after command, returns a random song name and link
					with 'all' after command, returns all song names in playlist
					with a song name after command, returns song name and link of song (if it exists in the playlist)
					with an artist after command, returns all songs by artists (if it exists in the playlist)
					examples:
						?getplaylist all
						?getplaylist Hey Ya!
						?getplaylist Ramones
			*/
		const filter = args.join(' ');
		console.log(filter);
		getPlaylist(authCode, message, filter);
		break;
	}

	case 'test': {
		message.channel.send(`no tests today <:pepePOG:796983161249988648> ${prideFlag}`);
		break;
	}
	}
});