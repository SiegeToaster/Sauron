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
	console.log(`command: ${command}`);
	// console.log(`guild: ${guild}`);
    console.log(' ');
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