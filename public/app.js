const startPage = () => {
	let objectOfItems;
	const promise = new Promise((resolve, reject) => {
		const http = new XMLHttpRequest();

		http.open('GET', '/load');
		http.onreadystatechange = () =>{
			if(http.readyState == 4) {
				objectOfItems = http.response;
				resolve(JSON.parse(objectOfItems))
			}
		}
		http.send();
	})
	return promise;
}
startPage()
	.then((word) =>listItems(word))

const listItems = (words) => {
	words.forEach(function(element) {
		const word = document.createElement('span');
		const meaning = document.createElement('span');
		const block = document.createElement('div');

		block.addEventListener('click', (e) => updateBox(e));
	
		block.appendChild(word);
		block.appendChild(meaning);
		block.id = element.id + '-block';
		block.className = 'block';
		document.getElementById('mainPageContent').appendChild(block);

		word.innerText = element.word;
		meaning.innerText = element.meaning;

		word.id = element.id + "-word";
		meaning.id = element.id + "-meaning";

		const updateBox = (e) => {
			console.log(element);
			localStorage['elementjajajuju'] = JSON.stringify(element);
			// localStorage['word'] = e.path[1].firstChild.innerText;
			window.location.href = '/add.html';
		}
	});
}

console.log(localStorage);