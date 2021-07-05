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
let votedYesUsers = [];
let votedNoUsers = [];
const correctionGifs = [
    'https://images-ext-2.discordapp.net/external/x_dsYvJXnDZ-He2xSj1d2UjqFzouYJLzn6qk_mff4fg/https/media.discordapp.net/attachments/728319830108667989/858313721507348480/image0.gif',
    'https://tenor.com/view/bbc-two-bbc-two-peaky-blinders-gif-20722169',
    'https://tenor.com/view/your-youre-gif-19011295',
    'https://tenor.com/view/youre-your-spies-spies-in-disguise-youre-spies-gif-20405819',
    'https://tenor.com/view/youre-gif-18693005',
];
let lastCorrectionIndex = 0;
let pingVar = 'false';
let prideVar = 'false';
let prideFlag = '';
let virginVar = 'false';
let susVar = 'false';

const mysql = require('mysql');
const { SQLPassword } = require('./private.json');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: SQLPassword,
	database: 'sauronscores',
});
connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to SQL server.');
    updateSettings();
});

client.once('ready', () => {
    console.log('');
    console.log('Sauron is now online.');
    client.user.setStatus("online");
    // ToDo: configure updateSettings
    // updateSettings();
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
        { name: 'Absent', value: 'Checks is people are offline.  If people are pinged after command, it only checks those, otherwise, it checks everyone.' },
        { name: 'Troll', value: 'Sends the message declared after the command 25 times.' },
        { name: 'Gamble', value: 'Guessing game for numbers between 1 and 10.  OPTIONAL: Add a number after command to automatically get answer.' },
        { name: 'Coinflip', value: 'Flips a coin, lands on heads or tails.' },
        { name: 'Jamtime', value: 'Pings everyone asking for jamtime and adds yes/no reactions.\n\nIf someone reacts yes, they get present jammer <:FeelsOkayMan:785613008247193660>.\nIf someone reacts no, they get absent jammer <:Sadge:804521949794795601>.' },
        { name: 'Rate', value: 'Sets the score in the database.  After the command, a user must be mentioned followed by a number (the score).  Example:\n?rate `@Willius Dominus` 10' },
        { name: 'Getscore', value: 'Gets the score for everyone in the database.  Optional: add mention(s) after the command to get their score only.  Example:\n?getscore\n?getScore `@Willius Dominus` `@Bennamus Jullius`' },
        { name: 'UpdateSettings', value: 'Re-fetches settings from database.  No return' },
        { name: 'Set', value: 'Changes settings.  After the command, a setting must be named followed by "true" or "false".  Valid settings are: "ping", "pride", "virgin", and "sus".  Example:\n?set ping true' },
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
    if ((message.content.match(/you're(\*$)|(^\*)you're/gmi) || message.content.toLowerCase().includes('youre')) && !message.author.bot) {
        let correctionIndex = Math.floor(Math.random() * correctionGifs.length);
        while (correctionIndex == lastCorrectionIndex) {
            correctionIndex = Math.floor(Math.random() * correctionGifs.length);
        }
        lastCorrectionIndex = correctionIndex;
        message.channel.send(correctionGifs[correctionIndex] + prideFlag);
    }
    if (message.content.toLowerCase().includes('fuck') || message.content.toLowerCase().includes('shit') || message.content.toLowerCase().includes('retard')) setSwearCount(message);
    if (message.content.toLowerCase().includes('female') && !message.content.toLowerCase().includes(`${prefix}ben10`)) message.channel.send('girl*');
    if (susVar === 'true' && message.content.toLowerCase().includes('sus') && !message.content.match(/<:Susge:[0-9]+>/gm)) message.channel.send(`https://www.youtube.com/watch?v=0bZ0hkiIKt0 ${prideFlag}`);
    if (message.content.includes('https://cdn.discordapp.com/attachments/831202194673107005/849052330560323644/evening_gentlemen.png') || message.content.includes('didnt ask willius anything')) message.delete();
    if (pingVar === 'true' && message.mentions.users.first()) message.channel.send(`https://i.imgur.com/lqw97AX.jpg ${prideFlag}`);
    if (virginVar === 'true' && !message.author.bot) message.channel.send(`https://cdn.discordapp.com/attachments/761347053983891499/858791752601042974/evening_gentlemen.png ${prideFlag}`);
    if (prideVar === 'true' && !message.content.endsWith('🏳️‍🌈')) {
        console.log('pride');
        message.delete();
        message.channel.send('Your message has been deleted for not having :rainbow_flag: at the end.  Happy Pride Month!\n:rainbow_flag:\n:rainbow_flag:\n:rainbow_flag:\n:rainbow_flag:\n🏳️‍🌈');
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

        case 'forgot':
            // eslint-disable-next-line no-unused-vars
            message.channel.send(`<:FeelsNotSureMan:841539607664918558> ${prideFlag}`).then(_nil => {
                message.channel.send(`I forgot ${prideFlag}`);
            });
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
                                    let userNickname = message.guild.members.cache.get(user.id).nickname.trim().split(/ +/);
                                    userNickname = userNickname[userNickname.length - 1];
                                    if (user.id == 495290130924437516) {
                                        userNickname = 'Mrs. ' + userNickname;
                                    } else {
                                        userNickname = 'Mr. ' + userNickname;
                                    }
                                    message.channel.send(`${userNickname} absent jammer <:Sadge:804521949794795601> ${prideFlag}`);
                                }
                            });
                            const filterY = (reaction, user) => {
                                return reaction.emoji.name === '✅' && user.id === user.id && !(user.bot);
                            };
                            const collectorY = sent.createReactionCollector(filterY);
                            collectorY.on('collect', (reaction, user) => {
                                if (!reactedUsers.includes(user)) {
                                    reactedUsers.push(user);
                                    let userNickname = message.guild.members.cache.get(user.id).nickname.trim().split(/ +/);
                                    userNickname = userNickname[userNickname.length - 1];
                                    userNickname = 'Mr. ' + userNickname;
                                    message.channel.send(`${userNickname} present jammer <:FeelsOkayMan:785613008247193660> ${prideFlag}`);
                                }
                            });
                        });
                });
        break;

        case 'rate':
            if (!args[1]) return message.channel.send(`Missing Parameters <:FeelsWeirdMan:792656734409195542> ${prideFlag}`);
            if (args[0] == `<@!${message.author.id}>`) return message.channel.send(`Invalid user - Rule 10 <:FeelsWeirdMan:792656734409195542> ${prideFlag}`);
            if (!args[0].match(/<@![0-9]+>/gm)) return message.channel.send(`Invalid user <:FeelsWeirdMan:792656734409195542> ${prideFlag}`);
            if (args[1] < 1 || args[1] > 10) return message.channel.send(`Invalid rating <:FeelsWeirdMan:792656734409195542> ${prideFlag}`);

            const ratedUser = message.mentions.users.first();
            let userID = 0;
            try {
                userID = message.mentions.users.first().id;
            } catch (err) {
                message.channel.send(`Invalid user <:FeelsWeirdMan:792656734409195542> ${prideFlag}`);
                return console.error(`Error: setScore Error - ${err}`);
            }
            console.log(userID);
            connection.query(`SELECT * FROM scores WHERE userID = ${userID}`, function(err, result) {
                if (err) {
                    console.error(`Error: setScore fetch Error - ${err}`);
                    return message.channel.send(`Failed to set score <:FeelsBadMan:794744572718481408> ${prideFlag}`);
                }
                if (result) {
                    let highestScore = 0;
                    if (args[1] > result[0].highestRating) {
                        highestScore = args[1];
                    } else {
                        highestScore = result[0].highestRating;
                    }
                    connection.query(`UPDATE scores SET totalScore = ${result[0].totalScore} + ${args[1]}, amountOfRatings = ${result[0].amountOfRatings + 1}, highestRating = ${highestScore}, averageRating = ${Math.round((result[0].totalScore + parseInt(args[1])) / (result[0].amountOfRatings + 1))} WHERE userID = ${userID}`, function(err, solution) {
                        if (err) {
                            console.error(`Error: setScore update Error - ${err}`);
                            return message.channel.send(`Failed to set score <:FeelsBadMan:794744572718481408> ${prideFlag}`);
                        }
                        if (solution) {
                            message.channel.send(`Score of ${args[1]} successfully added to ${ratedUser}. ${prideFlag}`);
                        } else {
                            console.error('Error: setScore fetch result undefined');
                            return message.channel.send(`Failed to set score <:FeelsBadMan:794744572718481408> ${prideFlag}`);
                        }
                    });
                } else {
                    console.error('Error: setScore fetch result undefined');
                    return message.channel.send(`Failed to set score <:FeelsBadMan:794744572718481408> ${prideFlag}`);
                }
            });
        break;
        case 'getscore':
            if (message.mentions.members.array().length < 1) {
                message.guild.members.cache.forEach(element => {
                    if (element.user.bot) return;
                    getSpecificScore(message, element.user.id);
                });
            } else {
                message.mentions.members.array().forEach(element => {
                    getSpecificScore(message, element.id);
                });
            }
        break;

        case 'updatesettings':
            updateSettings();
        break;

        case 'set':
            if (args[0] !== 'ping' && args[0] !== 'pride' && args[0] !== 'virgin' && args[0] !== 'sus') return message.channel.send(`${args[0]} is not a setting. ${prideFlag}`);
            if (args[1] !== 'true' && args[1] !== 'false') return message.channel.send(`${args[1]} is an invalid setting for ${args[0]} ${prideFlag}`);
            setSpecificSetting(args[0], args[1], message);
        break;

        case 'getswear':
            if (message.mentions.members.array().length < 1) {
                message.guild.members.cache.forEach(element => {
                    if (element.user.bot) return;
                    getSwearCount(message, element.user.id);
                });
            } else {
                message.mentions.members.array().forEach(element => {
                    getSwearCount(message, element.id);
                });
            }
            break;

        case 'resetscores':
            votedYesUsers = [];
            votedNoUsers = [];
            message.channel.send(`@everyone reset scores? ${prideFlag}`).then(sent => {
                sent.react('✅').then(() => {
                    sent.react('❌');
                    const filterX = (reaction, user) => {
                        return reaction.emoji.name === '❌' && !(user.bot) && votedNoUsers.length < 1;
                    };
                    const collectorX = sent.createReactionCollector(filterX);
                    collectorX.on('collect', (reaction, user) => {
                        if (!votedNoUsers.includes(user)) {
                            votedNoUsers.push(user);
                            message.channel.send(`${(message.guild.members.cache.get(user.id)).nickname} voted no. ${prideFlag}`);
                            message.channel.send(`Proposal rejected. ${prideFlag}`);
                        }
                    });
                    const filterY = (reaction, user) => {
                        return reaction.emoji.name === '✅' && user.id === user.id && !(user.bot) && votedNoUsers.length < 1;
                    };
                    const collectorY = sent.createReactionCollector(filterY);
                    collectorY.on('collect', (reaction, user) => {
                        if (!votedYesUsers.includes(user)) {
                            votedYesUsers.push(user);
                            message.channel.send(`${(message.guild.members.cache.get(user.id).nickname)} voted yes. ${prideFlag}`);
                            let numberOfGuildMembers = 0;
                            message.guild.members.cache.forEach(element => {
                                if (!element.user.bot) numberOfGuildMembers = numberOfGuildMembers + 1;
                            });
                            console.log(numberOfGuildMembers);
                            if (votedYesUsers.length >= numberOfGuildMembers) {
                                console.log('query');
                                connection.query('UPDATE scores SET totalScore = 0, amountOfRatings = 0, highestRating = 0, averageRating = 0', function(err, result) {
                                    if (err) {
                                        console.error(`Error: Reset Scores Error - ${err}`);
                                        return message.channel.send(`Failed to reset scores <:FeelsBadMan:794744572718481408> ${prideFlag}`);
                                    }
                                    if (result) {
                                        message.channel.send(`Successfully reset scores. ${prideFlag}`);
                                    } else {
                                        console.error('Error: reset score result undefined');
                                        return message.channel.send(`Failed to get scores <:FeelsBadMan:794744572718481408> ${prideFlag}`);
                                    }
                                });
                            }
                        }
                    });
                    console.log('reactions created');
                });
            });
        break;

        case 'test':
            message.channel.send('no tests today <:pepePOG:796983161249988648>');
        break;
    }
});

// =====Functions===== \\
function getSpecificScore(message, userID) {
    connection.query(`SELECT * FROM scores WHERE userID = ${userID}`, function(err, result) {
        if (err) {
            console.error(`Error: getSpecificScore Error - ${err}`);
            return message.channel.send(`Failed to get scores <:FeelsBadMan:794744572718481408> ${prideFlag}`);
        }
        if (result) {
            message.channel.send(`${message.guild.members.cache.get(result[0].userID).nickname} - Total Score: ${result[0].totalScore}, Number of Ratings: ${result[0].amountOfRatings}, Highest Rating: ${result[0].highestRating}, Average Rating: ${result[0].averageRating}.  ${prideFlag}`);
        } else {
            console.error('Error: getSpecificScore result undefined');
            return message.channel.send(`Failed to get scores <:FeelsBadMan:794744572718481408> ${prideFlag}`);
        }
    });
}

async function updateSettings() {
    pingVar = await getSpecificSetting('ping');
    prideVar = await getSpecificSetting('pride');
    if (prideVar === 'true') {
        prideFlag = '🏳️‍🌈';
    } else {
        prideFlag = '';
    }
    virginVar = await getSpecificSetting('virgin');
    susVar = await getSpecificSetting('sus');

    console.log('Settings Updated.');
}

async function getSpecificSetting(setting) {
    const promise = new Promise((resolve) => {
        connection.query(`SELECT ${setting} FROM settings`, function(err, result) {
            if (err) {
                resolve('false');
                return console.error(`Error: getSpecificSetting fetch error - ${err}`);
            }
            if (result) {
                if (result[0][setting] == 0) {
                    resolve('false');
                } else {
                    resolve('true');
                }
            } else {
                resolve('false');
                return console.error(`Error: getSpecificSetting fetch error - nil result`);
            }
        });
    });
    return await promise;
}

async function setSpecificSetting(setting, value, message) {
    let binaryValue;
    switch (value) {
        case 'true':
            binaryValue = 1;
        break;

        case 'false':
            binaryValue = 0;
        break;
    }
    const previousValue = await getSpecificSetting(setting);
    if (!previousValue) return message.channel.send(`Failed to update setting. ${prideFlag}`);
    if (binaryValue === previousValue) return message.channel.send(`Setting is already ${value} ${prideFlag}`);

    connection.query(`UPDATE settings SET ${setting} = ${binaryValue}`, function(err, result) {
        if (err) {
            message.channel.send(`Failed to update setting. ${prideFlag}`);
            return console.error(`Error: setSpecificSetting error - ${err}`);
        }
        if (result) {
            message.channel.send(`Successfully updated setting to ${value} ${prideFlag}`);
        } else {
            message.channel.send(`Failed to update setting. ${prideFlag}`);
            return console.error(`Error: setSpecificSetting error - nil result`);
        }
    });
    setTimeout(function() { updateSettings(); }, 1000);
}

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

async function getSwearCount(message, ID) {
    console.log(ID);
    const promise = new Promise((resolve) => {
        connection.query(`SELECT numberOfWords FROM swearwords WHERE userID = ${ID}`, function(err, result) {
            if (err) {
                resolve('false');
                return console.error(`Error: getSwearCount fetch error - ${err}`);
            }
            if (result) {
                resolve(result[0].numberOfWords);
            } else {
                resolve('false');
                return console.error(`Error: getSpecificSetting fetch error - nil result`);
            }
        });
    });
    if (message) message.channel.send(`${message.guild.members.cache.get(ID).nickname} - Number of Swear Words: ${await promise}`);
    return await promise;
}

async function setSwearCount(message) {
    const previousValue = await getSwearCount(false, message.author.id);
    if (previousValue == null) return message.channel.send(`Failed to log swear word. ${prideFlag}`);
    connection.query(`UPDATE swearwords SET numberOfWords = ${previousValue} + 1 WHERE userID = ${message.author.id}`, function(err, result) {
        if (err) {
            message.channel.send(`Failed to log swear word. ${prideFlag}`);
            return console.error(`Error: setSpecificSetting error - ${err}`);
        }
        if (!result) {
            message.channel.send(`Failed to log swear word. ${prideFlag}`);
            return console.error(`Error: setSpecificSetting error - nil result`);
        }
    });
}