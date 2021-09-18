import setSpecificSetting from "../functions/settings/setSpecificSetting.js";

export default function set(message, args, prideFlag, authCode) { // same problem as help
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

	setSpecificSetting(authCode, args[0], args[1], message, prideFlag);
}