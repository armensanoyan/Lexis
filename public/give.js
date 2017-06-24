const listenToAreas = () => {
	const word = document.getElementById('word');
	const meaning = document.getElementById('meaning');
	const example = document.getElementById('example');
	const synoym = document.getElementById('synoym');

	if(localStorage['elementjajajuju']) {
		const box = JSON.parse(localStorage['elementjajajuju']);
		word.value = box.word;
		meaning.value = box.meaning;
		example.value = box.example;
		synonym.value = box.synonyms;
		delete localStorage['elementjajajuju'];
	}

	const getValues = (() => {
		const saveValues = () => {
			const box = {};
			box.word = word.value;
			box.meaning = meaning.value;
			box.example = example.value;
			box.synoym = synonym.value;
			sendValues(box)
			// console.log(box);
		}

		document.getElementById('submit').addEventListener('click', saveValues)
	})()

	const sendValues = (box) => {
		console.log(box);
		const xml = new XMLHttpRequest;
		xml.onreadystatechange = () => {
			console.log(xml.status);
			console.log(xml.response);
		};
		xml.open('PUT','/give');
		xml.setRequestHeader('Content-Type','application/json')
		xml.send(JSON.stringify(box));

	}
	
}
listenToAreas()