/* eslint-disable no-case-declarations */
// =====SETUP=====\\
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Sauron is now online.');
    client.user.setStatus("online");
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
        { name: 'Delete', value: 'Sends a picture of Pepe holding a sign that says "Delete That!!"' },
        { name: 'Joe', value: 'mama' },
        { name: 'Ligma', value: 'balls' },
        { name: 'Troll', value: 'Sends the message declared after the command 25 times.' },
        { name: 'Gamble', value: 'Guessing game for numbers between 1 and 10.' },
        { name: 'Coinflip', value: 'Flips a coin, lands on heads or tails.' },
        { name: 'Jamtime', value: 'Pings everyone asking for jamtime and adds yes/no reactions.\n\nIf someone reacts yes, they get present jammer <:FeelsOkayMan:785613008247193660>.\nIf someone reacts no, they get absent jammer <:Sadge:804521949794795601>.' },
    )
    .setFooter('ligma');
let fullMessage = '';

client.login(token);

// =====ACTIONS=====\\
client.on('message', message => {
    if (message.content === 'https://media.discordapp.net/attachments/761347053983891499/842548851310985236/delete.jpg') {
        message.channel.bulkDelete(2);
        console.log('Delete That!! activated.');
    }
    if (message.content.includes('sus')) {
        message.channel.send('https://www.youtube.com/watch?v=0bZ0hkiIKt0');
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    // const guild = client.guilds.cache.get('761347053983891496');
    console.log(' ');
	// =====DEBUG=====\\
	// console.log(`args: ${args}`);
    // console.log(`1st element of args: ${args[0]}`);
    // console.log(`args size: ${args.length}`);
	// console.log(`command: ${command}`);
	// console.log(`guild: ${guild}`);
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

    case 'ben10':
        message.delete();
        if (message.author.id == '495290130924437516') {
            message.channel.send('fuck off Ben.');
        } else {
            fullMessage = '';
            if (args) {
                args.forEach(element => {
                    fullMessage = fullMessage + element + ' ';
                });
            }
            message.channel.send(`${fullMessage}`);
            message.channel.send('https://media.discordapp.net/attachments/831202194673107005/844378006147694622/Thats_far_enough.PNG');
        }
        break;

    case 'delete':
        message.delete();
        message.channel.send('https://media.discordapp.net/attachments/761347053983891499/842548851310985236/delete.jpg');
        // ToDo: delete replied message if message is a reply.
        break;

    case 'joe':
        message.channel.send('joe mama');
        break;

    case 'ligma':
        message.channel.send('ligma balls');
        break;

	case 'absent':
		if (!message.mentions.users.size) {
            const allMembers = message.guild.members.cache.array();
            let offlineMembers = [];
            allMembers.forEach(element => {
                if (element.user.bot) return;
                if (element.presence.status == 'offline' || element.presence.status == 'idle') {
                    offlineMembers.push(element.nickname);
                }
            });
            if (offlineMembers.length < 1) {
                message.channel.send('No one is abcent <:FeelsOkayMan:785613008247193660>');
            } else if (offlineMembers.length === 1) {
                    message.channel.send(`${offlineMembers} is offline <:FeelsBadMan:794744572718481408>`);
                } else {
                    const lastMember = offlineMembers[offlineMembers.length - 1];
                    offlineMembers.length = offlineMembers.length - 1;
                    if (offlineMembers.length == 1) {
                        offlineMembers = offlineMembers + ' and ' + lastMember;
                    } else {
                        offlineMembers = offlineMembers.join(', ');
                        offlineMembers = offlineMembers + ', and ' + lastMember;
                    }
                    message.channel.send(`${offlineMembers} are offline <:FeelsBadMan:794744572718481408>`);
                }
		} else {
            let tempPresence = (message.mentions.users.first().presence.status);
            if (tempPresence === 'idle') {
                tempPresence = 'offline';
            }
            message.channel.send(`${(message.guild.members.cache.get(message.mentions.users.first().id)).nickname} is ${tempPresence}`);
        }
        break;

    case 'troll':
        message.delete();
        if (args.length < 1) {
            return message.channel.send('No one to troll <:FeelsBadMan:794744572718481408>');
        } else {
            fullMessage = '';
                args.forEach(element => {
                    if(element.includes('<@!306589457908498433>')) {
                        element = (message.guild.members.cache.get('306589457908498433')).nickname;
                    }
                    fullMessage = fullMessage + element + ' ';
                });
            for (let i = 0; i < 25; i++) {
                message.channel.send(fullMessage);
            }
        }
        break;

    case 'gamble':
        // eslint-disable-next-line no-unused-vars
        message.channel.send('I am thinking of a number between 1 and 10.  What is the number?').then(_nil => {
        const gambleNumber = Math.round(Math.random() * 10);
                client.once('message', guessMessage => {
                    const guess = Math.round(parseInt(guessMessage.content));
                    if (guess > 1 && guess < 11) {
                        if (guess === gambleNumber) {
                            message.channel.send('Correct! <:HYPERS:794746882760769618>');
                        } else {
                            message.channel.send(`Incorrect. <:FeelsBadMan:794744572718481408>  The number was ${gambleNumber}.`);
                        }
                    }
                });
        });
        break;

    case 'coinflip':
        const flipNumber = Math.round(Math.random());
        console.log(flipNumber);
        if (flipNumber === 1) {
            message.channel.send('Heads!');
        } else {
            message.channel.send('Tails!');
        }
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