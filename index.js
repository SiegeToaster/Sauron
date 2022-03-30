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
const allCommandsWithExtension = fs.readdirSync('./src/commands/');
const allCommands = ['help'];
allCommandsWithExtension.forEach(command => {
	allCommands.push(command.split('.')[0]);
});
allCommands.splice(allCommands.indexOf('allCommands'), 1);

//=====SETTINGS=====\\
export let pingVar, prideVar, prideFlag, virginVar, susVar;
export async function updateSettings(auth) {
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
}

//=====FUNCTIONS=====\\
import authorize from "./src/functions/utility/authorize.js";
import getSpecificSetting from "./src/functions/settings/getSpecificSetting.js";

//=====CLIENT=====\\
client.once('ready', () => {
	console.log('');
	console.log('Sauron is now online.');
	client.user.setStatus("online");
	updateSettings(authCode);
});
client.login(process.env.discord_token);

//=====prefix and help command=====\\
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
// eslint-disable-next-line no-unused-vars
function help(message) {
	message.channel.send(helpEmbed);
}

//=====COMMANDS=====\\
// imported commands are called by a string inputted by the user, cannot really use it since the first place it would be read is from a user-inputted string
// eslint-disable-next-line no-unused-vars
import { absent, addplaylist, ben10, catjam, coinflip, forgot, gamble, getplaylist, getscore, jamtime, joe, ping, rate, set, sheeshius, test, troll } from './src/commands/allCommands.js';
import messageChecker from './src/messageChecker.js';

//=====ACTIONS===== \\
client.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (!message.author.bot) messageChecker(message, prideFlag, susVar, pingVar, virginVar, prideVar);
	if (!message.content.startsWith(prefix) || message.content == prefix || !allCommands.includes(command)) return;
	console.log(' ');
	console.log(`input: ${command} ${args}`);
	eval(`${command}(message, args, prideFlag, authCode, client)`);
});