/* eslint-disable no-prototype-builtins */
/* eslint-disable no-useless-escape */
/* eslint-disable no-case-declarations */
// =====SETUP=====\\
const Discord = require('discord.js');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { SpreadsheetId } = require('./private.json');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/documents'];
const TOKEN_PATH = 'token.json';
const client = new Discord.Client();
let authCode = '';
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content));
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
let pingVar = 'false';
let prideVar = 'false';
let prideFlag = '';
let virginVar = 'false';
let susVar = 'false';

client.once('ready', () => {
    console.log('');
    console.log('Sauron is now online.');
    client.user.setStatus("online");
    updateSettings(authCode);
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
        { name: 'Set', value: 'Changes settings.  After the command, a setting must be named followed by "true" or "false".  Valid settings are: "ping", "pride", "virgin", and "sus".  Example:\n?set ping true' },
        { name: 'sheeshius', value: 'get verse(s) from The Holy Book of Sheeshius.  Chapters, lines, both, or neither can be declared.  If none are declared, the entire book is sent.  If only a chapter or chapters are declared, it will send the entire chapters.  If both chapter and verse are declared (seperated with ":") it will send the verses.  Multiple verses can be declared with a "-" and/or ",".' },
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
    // const guild = client.guilds.cache.get('761347053983891496');
    console.log(' ');
	// =====DEBUG=====\\
	// console.log(`command: ${command}`);
	// console.log(`args: ${args}`);
    // console.log(`1st element of args: ${args[0]}`);
    // console.log(`args size: ${args.length}`);
	// console.log(`guild: ${guild}`);
    console.log(`input: ${command} ${args}`);
    switch (command) {
	case 'ping':
        message.channel.send(`Pong. ${prideFlag}`);
        console.log('ping');
        break;

    case 'help':
        message.channel.send(helpEmbed);
        break;

	case 'catjam':
        message.delete();
        message.channel.send(`https://tenor.com/view/cat-cat-jam-nod-pet-kitty-gif-17932554 ${prideFlag}`);
        break;

    case 'ben10':
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

    case 'delete':
        message.delete();
        message.channel.send(`https://media.discordapp.net/attachments/761347053983891499/842548851310985236/delete.jpg ${prideFlag}`);
        // ToDo: delete replied message if message is a reply.
        break;

    case 'joe':
        message.channel.send(`joe mama ${prideFlag}`);
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

    case 'troll':
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

    case 'gamble':
        if (args[0] > -1 && args[0] < 11) {
            const gambleNumber = Math.round(Math.random() * 10);
            if (args[0] === gambleNumber) {
                message.channel.send(`Correct! <:HYPERS:794746882760769618> ${prideFlag}`);
            } else {
                message.channel.send(`Incorrect. <:FeelsBadMan:794744572718481408>  The number was ${gambleNumber}. ${prideFlag}`);
            }
        } else {
            // eslint-disable-next-line no-unused-vars
            message.channel.send(`I am thinking of a number between 1 and 10.  What is the number? ${prideFlag}`).then(_nil => {
            const gambleNumber = Math.round(Math.random() * 10);
                    client.once('message', guessMessage => {
                        const guess = Math.round(parseInt(guessMessage.content));
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

    case 'coinflip':
        const flipNumber = Math.round(Math.random());
        console.log(flipNumber);
        if (flipNumber === 1) {
            message.channel.send(`Heads! ${prideFlag}`);
        } else {
            message.channel.send(`Tails! ${prideFlag}`);
        }
        break;

    case 'jamtime':
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
                                message.channel.send(`${(message.guild.members.cache.get(user.id)).nickname ? (message.guild.members.cache.get(user.id)).nickname : user.username} absent jammer <:Sadge:804521949794795601> ${prideFlag}`);
                            }
                        });
                        const filterY = (reaction, user) => {
                            return reaction.emoji.name === '✅' && user.id === user.id && !(user.bot);
                        };
                        const collectorY = sent.createReactionCollector(filterY);
                        collectorY.on('collect', (reaction, user) => {
                            if (!reactedUsers.includes(user)) {
                                reactedUsers.push(user);
                                message.channel.send(`${(message.guild.members.cache.get(user.id)).nickname ? (message.guild.members.cache.get(user.id)).nickname : user.username} present jammer <:FeelsOkayMan:785613008247193660> ${prideFlag}`);
                            }
                        });
                    });
            });
            break;

        case 'rate':
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
            setScore(authCode, args[0], args[1], message);
            break;

        case 'getscore': // ToDo: insteaed of checking against 3 specifics, get each id in the database and compare against.  Must use for loop for it to work (`A${i}:E${i}`)
            if (message.mentions.members.array().length < 1) {
                getTotalScore(authCode, message);
            } else {
                message.mentions.members.array().forEach(element => {
                    console.log(element.id);
                    switch (element.id) {
                        case '356642729394044932':
                        element = 'A2:E2';
                        break;

                    case '306589457908498433':
                        element = 'A3:E3';
                        break;

                    case '495290130924437516':
                        element = 'A4:E4';
                        break;
                    }
                    getIndividualScore(authCode, element, message);
                });
            }
        break;

        case 'set':
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
            setSpecificSetting(authCode, args[0], args[1], message);
        break;

        case 'sheeshius':
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
            getSheeshiusVerse(authCode, message, RequestedChaptersAndLines);
        break;

		case 'addplaylist':
			/*
				adds a song to the database.  After the command, a song name and a link must be added.  Optionally, the artist name can be added Examples:
    				?addplaylist Hey Ya! https://www.youtube.com/watch?v=PWgvGjAhvIw
    				?addplaylist Blitzkrieg Bop https://www.youtube.com/watch?v=iymtpePP8I8 Ramones
			*/
		break;

		case 'getplaylist':
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
			getPlaylist(authCode, message, args[0]);
		break;

        case 'test':
            // message.channel.send(`no tests today <:pepePOG:796983161249988648> ${prideFlag}`);
            getPlaylist(authCode, message, args[0]);
        break;
	}
});

// =====Functions===== \\
function authorize(credentials) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client);
        oAuth2Client.setCredentials(JSON.parse(token));
        authCode = oAuth2Client;
    });
}

function getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to ', TOKEN_PATH);
            });
        });
    });
}

function getTotalScore(auth, message) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: SpreadsheetId,
        range: 'A2:E4',
    }, (err, res) => {
        if (err) {
            message.channel.send(`Failed to get scores <:FeelsDankMan:794744902172540968> ${prideFlag}`);
            return console.error(`The API returned an error: ${err}`);
        }
        const rows = res.data.values;
        if (rows.length && message) {
            rows.map((row) => {
                message.channel.send(`${(message.guild.members.cache.get(row[0])).nickname} - Total Score: ${row[1]}, Number of Ratings: ${row[2]}, Highest Rating: ${row[3]}, Average Rating: ${row[4]} ${prideFlag}`);
            });
        } else {
            console.error('No data found.');
        }
    });
}

async function getSpecificScore(auth, range) {
    const promise = new Promise((resolve) => {
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get({
            spreadsheetId: SpreadsheetId,
            range: range,
        }, (err, res) => {
            if (err) {
                resolve(false);
                return console.error(`The API returned an error: ${err}`);
            } else {
                const rows = res.data.values;
                resolve(rows);
            }
        });
    });
    return await promise;
}

function getIndividualScore(auth, range, message) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: SpreadsheetId,
        range: range,
    }, (err, res) => {
        if (err) {
            message.channel.send(`Failed to get scores <:FeelsDankMan:794744902172540968> ${prideFlag}`);
            return console.error(`The API returned an error: ${err}`);
        }
        const row = res.data.values[0];
        if (row.length && message) {
            message.channel.send(`${(message.guild.members.cache.get(row[0])).nickname} - Total Score: ${row[1]}, Number of Ratings: ${row[2]}, Highest Rating: ${row[3]}, Average Rating: ${row[4]} ${prideFlag}`);
        } else {
            console.error('No data found.');
        }
    });
}

async function setScore(auth, range, value, message) {
    const previousValues = await getSpecificScore(authCode, range);
    if (!previousValues) return message.channel.send(`Failed to add score. ${prideFlag}`);
    value = parseInt(value);
    const previousScore = parseInt(previousValues[0][0]);
    const previousNumber = parseInt(previousValues[0][1]);
    let highest = parseInt(previousValues[0][2]);
    if (value > highest) {
        highest = value;
    }
    const sheets = google.sheets({ version: 'v4', auth });
    const request = {
        spreadsheetId: SpreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        resource: {
            "range": range,
            "values": [[value + previousScore, previousNumber + 1, highest]],
        },
        auth: auth,
    };
    try {
        (sheets.spreadsheets.values.update(request)).data;
        message.channel.send(`Score of ${value} successfully added to ${message.mentions.users.first()}. ${prideFlag}`);
    } catch (err) {
        message.channel.send(`Failed to add score. ${prideFlag}`);
        console.error(`${err}`);
    }
}

async function updateSettings(auth) {
    pingVar = await getSpecificSetting(auth, 'Settings!A2');
    prideVar = await getSpecificSetting(auth, 'Settings!B2');
    if (prideVar === 'true') {
        prideFlag = '🏳️‍🌈';
    } else {
        prideFlag = '';
    }
    virginVar = await getSpecificSetting(auth, 'Settings!C2');
    susVar = await getSpecificSetting(auth, 'Settings!D2');

    console.log('Settings Updated.');
}

async function getSpecificSetting(auth, range) {
    const promise = new Promise((resolve) => {
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get({
            spreadsheetId: SpreadsheetId,
            range: range,
        }, (err, res) => {
            if (err) {
                resolve(false);
                console.log(`Error: ${err}`);
				if (fs.existsSync('./token.json')) {
					fs.unlink('./token.json', (err) => {
						if (err) return console.error(err);
						console.log('token.json successfully deleted.  Stopping bot...');
						process.exit(0);
					});
				}
				return;
            }
            resolve(res.data.values[0][0]);
        });
    });
    return await promise;
}

async function setSpecificSetting(auth, range, value, message) {
    const sheets = google.sheets({ version: 'v4', auth });
    const previousValue = await getSpecificSetting(auth, range);
    if (!previousValue) return message.channel.send(`Failed to update setting. ${prideFlag}`);
    if (value === previousValue) return message.channel.send(`Setting is already ${value} ${prideFlag}`);

    const request = {
        spreadsheetId: SpreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        resource: {
            "range": range,
            "values": [[value]],
        },
        auth: auth,
    };
    try {
        (sheets.spreadsheets.values.update(request)).data;
        message.channel.send(`Successfully updated setting to ${value} ${prideFlag}`);
    } catch (err) {
        message.channel.send(`Failed to update setting. ${prideFlag}`);
        console.log(err);
    }
    setTimeout(function() { updateSettings(authCode); }, 1000);
}

function getOfflineMembers(subjects, message) {
    const membersToReturn = [];
    if (!subjects.length) {
        subjects = message.guild.members.cache.array();
    }
    // console.log(subjects);
    subjects.forEach(element => {
        // console.log(element);
        if (element.user.bot) return;
        const tempPresence = (element.presence.status);
        if(tempPresence == 'offline' || tempPresence == 'idle') membersToReturn.push(element.nickname ? element.nickname : element.user.username);
    });
    // console.log(membersToReturn);
    return membersToReturn;
}

function getSheeshiusVerse(auth, message, requestedChaptersAndLines) {
    // console.log(Object.getOwnPropertyNames(requestedChaptersAndLines));
    const docs = google.docs({ version: 'v1', auth });
    docs.documents.get({
        documentId: '1zGaKNYfLUeq7W0OdnFNzM3UkqohNB-waEtPg1vfLcQc',
    }, (err, res) => {
        if (err) {
            message.channel.send(`Failed to get Sheeshius verse ${prideFlag}`);
            return console.log('Error: getSheeshiusVerse google API error - ' + err);
        }
        const sheeshiusEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('The Holy Book of Sheeshius')
            .setAuthor('Sheeshius "sus" Maximus', 'https://media.discordapp.net/attachments/831202194673107005/841810208833142844/evening_gentlemen.png')
            .setFooter(`Requested by: ${message.author}`);
        // eslint-disable-next-line prefer-const
        let documentData = res.data.body.content;
        documentData.splice(0, 12);
        // eslint-disable-next-line prefer-const
        let sheeshiusEmbedContent = {};
        let currentChapter = 0;
        let currentLine = 1;
        if (!countObject(requestedChaptersAndLines)) {
            sheeshiusEmbed
                .setDescription('All entries of The Holy Book of Sheeshius "sus" Maximus.')
                .addField('\u200B', '\u200B');
            documentData.forEach(element => {
                try {
                    let embedContent = `${element.paragraph.elements[0].textRun.content}`;
                    embedContent = embedContent.replace('\n', '');
                    if (embedContent.includes('Chapter')) sheeshiusEmbedContent[embedContent.slice(-1)] = { name: `${embedContent}`, value: '' };
                    if (embedContent != '\n' && !embedContent.includes('Chapter')) sheeshiusEmbedContent[countObject(sheeshiusEmbedContent)] = { name: `${sheeshiusEmbedContent[countObject(sheeshiusEmbedContent)].name}`, value: `${sheeshiusEmbedContent[countObject(sheeshiusEmbedContent)].value}\n${embedContent}` };
                } catch (error) {
                    // console.log(`sheeshiusEmbed construct error: no element`);
                }
            });
        } else {
            const chapters = [];
            Object.getOwnPropertyNames(requestedChaptersAndLines).forEach(chapter => {
                chapters.push(parseInt(chapter));
            });
            sheeshiusEmbed.setDescription('A chapter of The Holy Book of Sheeshius "sus" Maximus.');
            documentData.forEach(element => {
                try {
                    if (!element.paragraph.elements[0].textRun.content || element.paragraph.elements[0].textRun.content == '\n') return;
                    let embedContent = `${element.paragraph.elements[0].textRun.content}`;
                    embedContent = embedContent.replace('\n', '');
                    // console.log(embedContent);
                    if (embedContent.includes('Chapter')) {
                        // console.log(`chapter+ ${embedContent}`);
                        currentChapter++;
                        currentLine = 1;
                        if (chapters.includes(currentChapter)) {
                            sheeshiusEmbedContent[embedContent.slice(-1)] = { name: `${embedContent}`, value: '' };
                            // console.log(`chapter added: ${embedContent}`);
                        }
                    } else {
                        if (chapters.includes(currentChapter) && requestedChaptersAndLines[currentChapter].includes(currentLine)) {
                            sheeshiusEmbedContent[currentChapter] = { name: `${sheeshiusEmbedContent[currentChapter].name}`, value: `${sheeshiusEmbedContent[currentChapter].value}\n${embedContent}` };
                            // console.log(`line added: ${embedContent}`);
                        }
                        // console.log(`check line ${currentChapter}:${currentLine}`);
                        // console.log('line+');
                        currentLine++;
                    }
                    // console.log(sheeshiusEmbedContent);
                } catch (err) {
                    // console.log(`sheeshiusEmbed catch error ${err}`);
                }
            });
        }
        // console.log(sheeshiusEmbedContent);

        Object.values(sheeshiusEmbedContent).forEach(element => {
            sheeshiusEmbed.addFields(element);
        });
        // console.log(sheeshiusEmbedContent);
        message.channel.send(sheeshiusEmbed);
    });
}

function countObject(object) {
    let count = 0;
    for (const prop in object) {
        if (object.hasOwnProperty(prop)) count++;
    }

    return count;
}

async function getPlaylist(auth, message, filter) {
	const sheets = google.sheets({ version: 'v4', auth });
	sheets.spreadsheets.values.get({
        spreadsheetId: SpreadsheetId,
        range: 'Music!A2:Z1000',
    }, (err, res) => {
		if (err) return console.error(`Error: ${err}`);
		const getPlaylistEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setAuthor('Sauron', 'https://media.discordapp.net/attachments/831202194673107005/841810208833142844/evening_gentlemen.png')
			.setFooter(`Requested by: ${(message.guild.members.cache.get(message.author.id)).nickname ? (message.guild.members.cache.get(message.author.id)).nickname : message.author.username}`);
        const songsToReturn = {};
		let filterIsArtist = false;
		// console.log(res.data.values);
		if (filter) {
			res.data.values.forEach(songArray => {
				if (songArray[0] === filter) songsToReturn[countObject(songsToReturn)] = { name: `${songArray[0]}`, value: `${songArray[2]}` };
				if (songArray[1] === filter) {
					songsToReturn[countObject(songsToReturn)] = { name: `${songArray[0]}`, value: `${songArray[2]}` };
					filterIsArtist = true;
				}
			});
		} else {
			res.data.values.forEach(songArray => {
				songsToReturn[countObject(songsToReturn)] = { name: `${songArray[0]}`, value: `${songArray[2]}` };
			});
		}

		getPlaylistEmbed.setTitle(`Songs ${filterIsArtist ? ("by " + filter) : "in playlist"}.`);
		Object.values(songsToReturn).forEach(song => {
			// console.log(song);
			getPlaylistEmbed.addFields(song);
		});
		// console.log(songsToReturn);
		// console.log(getPlaylistEmbed);
		message.channel.send(getPlaylistEmbed);
	});
}