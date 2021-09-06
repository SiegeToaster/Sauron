import { getSpecificSetting } from "./getSpecificSetting.js";

export async function updateSettings(auth) {
	let { pingVar, prideVar, prideFlag, virginVar, susVar } = 'false';
	pingVar = await getSpecificSetting(auth, 'Settings!A2');
	prideVar = await getSpecificSetting(auth, 'Settings!B2');
	if (prideVar === 'true') {
		prideFlag = '🏳️‍🌈';
	} else {
		prideFlag = ' ';
	}
	virginVar = await getSpecificSetting(auth, 'Settings!C2');
	susVar = await getSpecificSetting(auth, 'Settings!D2');

	console.log('Settings Updated.');
	return [pingVar, prideVar, prideFlag, virginVar, susVar];
}