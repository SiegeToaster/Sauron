/* eslint-disable no-prototype-builtins */

function countObject(object) {
	let count = 0;
	for (const prop in object) {
		if (object.hasOwnProperty(prop)) count++;
	}

	return count;
}