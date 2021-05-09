/* eslint-disable no-case-declarations */
/* eslint-disable brace-style */
/* eslint-disable indent */
// =====SETUP=====\\
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    // client.user.setActivity('Bots', { type: 'WATCHING' });
    console.log('Sauron is now online.');
});

const { prefix } = require('./config.json');
const { token } = require('./private.json');
client.login(token);

// =====ACTIONS=====\\
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    const guild = client.guilds.cache.get('761347053983891496');

	// =====DEBUG=====\\
	// console.log(`args: ${args}`);
    // console.log(`1st element of args: ${args[0]}`);
    // console.log(`args size: ${args.length}`);
	console.log(`command: ${command}`);
	// console.log(`guild: ${guild}`);
    switch (command) {
	case 'ping':
        message.channel.send('Pong.');
        break;
	case 'catjam':
        message.delete();
        message.channel.send('https://tenor.com/view/cat-cat-jam-nod-pet-kitty-gif-17932554');
        break;
	case 'absent':
		if (!message.mentions.users.size) {
			return message.channel.send('No one is abcent <:FeelsOkayMan:785613008247193660>');
		} else {
            console.log(guild.members);
        }
        break;
    case 'troll':
        let waitTime = 0;
        message.delete();
        if (args.length < 1) {
            return message.channel.send('No one to troll <:FeelsBadMan:794744572718481408>');
        } else {
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            waitTime++;
            waitTime++;
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
            setTimeout(() => {message.channel.send(args[0]); }, waitTime * 1000);
        }
        break;
	}
});