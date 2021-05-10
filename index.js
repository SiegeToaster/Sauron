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
    console.log(' ');
    console.log(`input: ${command} ${args}`)
    switch (command) {
	case 'ping':
        message.channel.send('Pong.');
        break;

	case 'catjam':
        message.delete();
        message.channel.send('https://tenor.com/view/cat-cat-jam-nod-pet-kitty-gif-17932554');
        break;

    case 'joe':
        message.channel.send('joe mama');
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
                    args[i] = 'Sheeshus Sheeshius';
                }
                fullMessage = fullMessage + args[i] + ' ';
            }
            for (let i = 0; i < 25; i++) {
                message.channel.send(fullMessage);
            }
        }
        break;

    case 'gamble':
        message.channel.send('I am thinking of a number between 1 and 10.  What is the number?');
        let gambleNumber = Math.round(Math.random() * 10);
        client.once('message', guessMessage => {
            let guess = Math.round(parseInt(guessMessage.content));
            console.log(gambleNumber);
            console.log(guess);
            console.log(guess > 1 && guess < 11)
            console.log(guess === gambleNumber);
            if (guess > 1 && guess < 11) {
                if (guess === gambleNumber) {
                    message.channel.send('Correct! <:HYPERS:794746882760769618>');
                }
            }
        });
        break;

    case 'test':
            message.channel.send('no tests today <:pepePOG:796983161249988648>');
        break;

    case 'jamtime':
            message.channel.send('@everyone jam time?  <:FeelsOkayMan:785613008247193660>').then(sent => {
                sent.react('✅')
                    .then(() => {
                        sent.react('❌');
                        const filterX = (reaction, user) => {
                            return reaction.emoji.name === '❌' && user.id === user.id;
                        };
                        const collectorX = sent.createReactionCollector(filterX);
                        collectorX.on('collect', (reaction, user) => {
                            if (!(user.id === '840287143204880444')) {
                                if (user.id === '306589457908498433') {
                                    message.channel.send("Sheeshus Sheeshius absent jammer <:Sadge:804521949794795601>");
                                } else {
                                    message.channel.send(`<@!${user.id}> absent jammer <:Sadge:804521949794795601>`);
                                }
                            }
                        });
                        const filterY = (reaction, user) => {
                            return reaction.emoji.name === '✅' && user.id === user.id;
                        };
                        const collectorY = sent.createReactionCollector(filterY);
                        collectorY.on('collect', (reaction, user) => {
                            if (!(user.id === '840287143204880444')) {
                                if (user.id === '306589457908498433') {
                                    message.channel.send("Sheeshus Sheeshius presnt jammer <:FeelsOkayMan:785613008247193660>");
                                } else {
                                    message.channel.send(`<@!${user.id}> present jammer <:FeelsOkayMan:785613008247193660>`);
                                }
                            }
                        });
                    });
            });
            break;
	}
});