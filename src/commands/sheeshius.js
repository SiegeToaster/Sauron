import getSheeshiusVerse from "../functions/getSheeshiusVerse.js";

export function sheeshius(message, args, prideFlag, authCode) {
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
	getSheeshiusVerse(authCode, message, RequestedChaptersAndLines, prideFlag);
}