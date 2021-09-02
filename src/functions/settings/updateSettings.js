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