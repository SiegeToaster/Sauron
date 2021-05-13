/* eslint-disable quotes */
/* eslint-disable no-case-declarations */
/* eslint-disable brace-style */
/* eslint-disable indent */
// =====SETUP=====\\
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Sauron is now online.');
});

const { prefix } = require('./config.json');
const { token } = require('./private.json');
const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help')
    .setAuthor('Sauron', 'https://media.discordapp.net/attachments/831202194673107005/841810208833142844/evening_gentlemen.png')
    .setDescription('A list of commands for the Sauron bot.')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Prefix', value: 'Use this character at the beginning of any message that is a command\n?' },
        { name: 'Ping', value: "Sends 'pong' instantly.  Used to test bot's connection or if the bot is online." },
        { name: 'Help', value: 'Sends this embed.' },
        { name: 'Catjam', value: 'Sends a gif of a cat jamming.' },
        { name: 'Joe', value: 'mama' },
        { name: 'Ligma', value: 'balls' },
        { name: 'Troll', value: 'Sends the message declared after the command 25 times.' },
        { name: 'Gamble', value: 'Guessing game for numbers between 1 and 10.' },
        { name: 'Jamtime', value: 'Pings everyone asking for jamtime and adds yes/no reactions.\n\nIf someone reacts yes, they get present jammer <:FeelsOkayMan:785613008247193660>.\nIf someone reacts no, they get absent jammer <:Sadge:804521949794795601>.' },
    )
    .setFooter('ligma');

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
	// console.log(`command: ${command}`);
	// console.log(`guild: ${guild}`);
    const tempVar = message.guild.members.fetch(message.author.id);
    console.log(tempVar.nickname);
    console.log(' ');
    console.log(`input: ${command} ${args}`);
    switch (command) {
	case 'ping':
        message.channel.send('Pong.');
        break;

    case 'help':
        message.channel.send(helpEmbed);
        break;

	case 'catjam':
        message.delete();
        message.channel.send('https://tenor.com/view/cat-cat-jam-nod-pet-kitty-gif-17932554');
        break;

    case 'joe':
        message.channel.send('joe mama');
        break;

    case 'ligma':
        message.channel.send('ligma balls');
        break;

	case 'absent':
		if (!message.mentions.users.size) {
			return message.channel.send('No one is abcent <:FeelsOkayMan:785613008247193660>');
		} else {
            console.log(guild.members);
        }
        break;

    case 'troll':
        message.delete();
        if (args.length < 1) {
            return message.channel.send('No one to troll <:FeelsBadMan:794744572718481408>');
        } else {
            let fullMessage = '';
                for (let i = 0; i < args.length; i++) {
                if(args[i].includes('<@!306589457908498433>')) {
                    args[i] = (message.guild.members.cache.get('306589457908498433')).nickname;
                }
                fullMessage = fullMessage + args[i] + ' ';
            }
            for (let i = 0; i < 25; i++) {
                message.channel.send(fullMessage);
            }
        }
        break;

    case 'gamble':
        message.channel.send('I am thinking of a number between 1 and 10.  What is the number?').then(sent => {
        const gambleNumber = Math.round(Math.random() * 10);
                client.once('message', guessMessage => {
                    const guess = Math.round(parseInt(guessMessage.content));
                    if (guess > 1 && guess < 11) {
                        if (guess === gambleNumber) {
                            message.channel.send('Correct! <:HYPERS:794746882760769618>');
                        } else {
                            message.channel.send(`Incorrect. <:FeelsBadMan:794744572718481408>  The number was ${gambleNumber}.`)
                        }
                    }
                });
        });
        
        break;

    case 'jamtime':
            message.channel.send('@everyone jam time?  <:FeelsOkayMan:785613008247193660>').then(sent => {
                sent.react('✅')
                    .then(() => {
                        sent.react('❌');
                        const filterX = (reaction, user) => {
                            return reaction.emoji.name === '❌' && user.id === user.id && !(user.bot);
                        };
                        const collectorX = sent.createReactionCollector(filterX);
                        collectorX.on('collect', (reaction, user) => {
                            message.channel.send(`${(message.guild.members.cache.get(user.id)).nickname} absent jammer <:Sadge:804521949794795601>`);
                        });
                        const filterY = (reaction, user) => {
                            return reaction.emoji.name === '✅' && user.id === user.id && !(user.bot);
                        };
                        const collectorY = sent.createReactionCollector(filterY);
                        collectorY.on('collect', (reaction, user) => {
                            message.channel.send(`${(message.guild.members.cache.get(user.id).nickname)} present jammer <:FeelsOkayMan:785613008247193660>`);
                        });
                    });
            });
            break;

        case 'test':
            message.channel.send('no tests today <:pepePOG:796983161249988648>');
            break;
	}
});