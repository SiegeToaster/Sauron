import Discord from 'discord.js';
import { google } from 'googleapis';
import { countObject } from './utility/countObject.js';

export function getSheeshiusVerse(auth, message, requestedChaptersAndLines, prideFlag) {
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
		if (Object.values(sheeshiusEmbedContent)[0] ? !Object.values(sheeshiusEmbedContent)[0][1] : true) return message.channel.send('Invalid Chapter/Verse.');
		Object.values(sheeshiusEmbedContent).forEach(element => {
			sheeshiusEmbed.addFields(element);
		});
		// console.log(sheeshiusEmbedContent);
		message.channel.send(sheeshiusEmbed);
	});
}