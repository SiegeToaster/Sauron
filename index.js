/* eslint-disable no-case-declarations */
// =====SETUP=====\\
const Discord = require('discord.js');
const client = new Discord.Client();
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

const mysql = require('mysql');
const { SQLPassword } = require('./private.json');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: SQLPassword,
	database: 'sauronScores',
});
connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to SQL server.');
	const sql = "INSERT INTO scores (user) VALUES (1)";
	connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log("table altered");
	console.log(result);
  });
});

client.once('ready', () => {
    console.log('');
    console.log('Sauron is now online.');
    client.user.setStatus("online");
});

const { prefix } = require('./config.json');
const { discord_token } = require('./private.json');
const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help')
    .setAuthor('Sauron', 'https://media.discordapp.net/attachments/831202194673107005/841810208833142844/evening_gentlemen.png')
    .setDescription('A list of commands for the Sauron bot.')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Prefix', value: `Use this character at the beginning of any message that is a command\n${prefix}` },
        { name: 'Ping', value: "Sends 'pong' instantly.  Used to test bot's connection or if the bot is online." },
        { name: 'Help', value: 'Sends this embed.' },
        { name: 'Catjam', value: 'Sends a gif of a cat jamming.' },
        { name: 'Ben10', value: 'Sends the text you put after the command and a picture of a guy with his hand out.' },
        { name: 'Delete', value: 'Sends a picture of Pepe holding a sign that says "Delete That!!"' },
        { name: 'Joe', value: 'mama' },
        { name: 'Ligma', value: 'balls' },
        { name: 'Absent', value: 'Checks is people are offline.  If people are pinged after command, it only checks those, otherwise, it checks everyone.' },
        { name: 'Troll', value: 'Sends the message declared after the command 25 times.' },
        { name: 'Gamble', value: 'Guessing game for numbers between 1 and 10.' },
        { name: 'Coinflip', value: 'Flips a coin, lands on heads or tails.' },
        { name: 'Jamtime', value: 'Pings everyone asking for jamtime and adds yes/no reactions.\n\nIf someone reacts yes, they get present jammer <:FeelsOkayMan:785613008247193660>.\nIf someone reacts no, they get absent jammer <:Sadge:804521949794795601>.' },
        { name: 'Rate', value: 'Sets the score in the database.  After the command, a user must be mentioned followed by a number (the score).  Example:\n?rate `@Willius Dominus` 10' },
        { name: 'Getscore', value: 'Gets the score for everyone in the database.  Optional: add mention(s) after the command to get their score only.  Example:\n?getscore\n?getScore `@Willius Dominus` `@Bennamus Jullius`' },
    )
    .setFooter('ligma');
let fullMessage = '';

client.login(discord_token);

// =====ACTIONS===== \\
client.on ('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    if (message.content === 'https://media.discordapp.net/attachments/761347053983891499/842548851310985236/delete.jpg') {
        message.channel.bulkDelete(2);
        console.log('Delete That!! activated.');
    }
    if (message.content.toLowerCase().includes('sus')) {
        message.channel.send('https://www.youtube.com/watch?v=0bZ0hkiIKt0');
    }
    if (message.content.toLowerCase().includes('candice')) {
        message.channel.send('https://www.youtube.com/watch?v=604v-hVszTU');
    }
    if (message.content.includes('https://cdn.discordapp.com/attachments/831202194673107005/849052330560323644/evening_gentlemen.png')) {
        message.delete();
    }
    if (message.mentions.users.first()) {
        message.channel.send('https://i.imgur.com/lqw97AX.jpg');
    }
    if (!message.content.startsWith(prefix)) return;
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
            fullMessage = '';
            if (args.length > 0) {
                args.forEach(element => {
                    fullMessage = fullMessage + element + ' ';
                });
                message.channel.send(`${fullMessage}`);
            }
            message.channel.send('https://media.discordapp.net/attachments/831202194673107005/844378006147694622/Thats_far_enough.PNG');
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
		let offlineMembers = getOfflineMembers(message.mentions.members.array(), message);
        if (offlineMembers.length < 1) {
            message.channel.send('No one is absent <:FeelsOkayMan:785613008247193660>');
        } else if (offlineMembers.length === 1) {
            message.channel.send(`${offlineMembers} is absent <:FeelsBadMan:794744572718481408>`);
        } else {
            const lastMember = offlineMembers[offlineMembers.length - 1];
            offlineMembers.length = offlineMembers.length - 1;
            if (offlineMembers.length == 1) {
                offlineMembers = offlineMembers + ' and ' + lastMember;
            } else {
                offlineMembers = offlineMembers.join(', ');
                offlineMembers = offlineMembers + ', and ' + lastMember;
            }
            message.channel.send(`${offlineMembers} are absent <:FeelsBadMan:794744572718481408>`);
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
            reactedUsers = [];
            message.channel.send('@everyone jam time?  <:FeelsOkayMan:785613008247193660>').then(sent => {
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
                                message.channel.send(`${(message.guild.members.cache.get(user.id)).nickname} absent jammer <:Sadge:804521949794795601>`);
                            }
                        });
                        const filterY = (reaction, user) => {
                            return reaction.emoji.name === '✅' && user.id === user.id && !(user.bot);
                        };
                        const collectorY = sent.createReactionCollector(filterY);
                        collectorY.on('collect', (reaction, user) => {
                            if (!reactedUsers.includes(user)) {
                                reactedUsers.push(user);
                                message.channel.send(`${(message.guild.members.cache.get(user.id).nickname)} present jammer <:FeelsOkayMan:785613008247193660>`);
                            }
                        });
                    });
            });
        break;

        case 'test':
            message.channel.send('no tests today <:pepePOG:796983161249988648>');
        break;
	}
});

// =====Functions===== \\
function getOfflineMembers(subjects, message) {
    const membersToReturn = [];
    if (!subjects.length) {
        subjects = message.guild.members.cache.array();
    }
    subjects.forEach(element => {
        const tempPresence = (element.presence.status);
        if(tempPresence == 'offline' || tempPresence == 'idle') membersToReturn.push(element.nickname);
    });
    return membersToReturn;
}