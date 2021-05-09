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
	// console.log(`command: ${command}`);
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
            /* const guilds = bot.guilds.array();

            for (let i = 0; i < guilds.length; i++) {
                bot.guilds.get(guilds[i].id).fetchMembers().then(r => {
                    r.members.array().forEach(r => {
                        const username = `${r.user.username}#${r.user.discriminator}`;
                        console.log(`${username}`);
                    });
                });
            }
            console.log(`${guilds}`);
*/
        }

        break;
    case 'idk':
        // ...
        break;
	}
});