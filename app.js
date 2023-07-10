const global = {
	currentPage: window.location.pathname,
	search: {
		term: '',
		type: '',
		page: 1,
		totalPages: 1,
		totalResults: 0
	},
	api: {
		apiKey:
			'live_Xw83CD9F62yRFoBWM3UF9IlziDIbZi7BFgOaulzgoPS31nWNqaQCWrAQtsk3PLEt',
		apiUrl: 'https://api.thecatapi.com/v1/images/search?limit=20&',
		apiRandomUrl: 'https://api.thecatapi.com/v1/images/search'
	}
};

async function getCats() {
	const url = `${global.api.apiUrl}&${global.apiKey}`;

	try {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}
getCats();

//Random button for generating new cats
const baseUrl = global.api.apiRandomUrl;
const section = document.querySelector('section');
const button = document.querySelector('.btn');

async function getRandomCats() {
	section.innerHTML = '';

	try {
		const response = await fetch(baseUrl);
		const json = await response.json();
		console.log('JSON:', json);
		return randomCatPhoto(json);
	} catch (e) {
		console.log('This is an error');
		console.log(e);
	}
}

randomCatPhoto = (json) => {
	let photo = json[0].url;
	section.classList.add('cats');
	//Create cat image
	let image = document.createElement('img');
	image.src = photo;
	image.classList.add('random_cats');
	image.alt = photo;
	section.appendChild(image);
};

button.addEventListener('click', getRandomCats);

// get data into select
const catSelect = document.getElementById('select');
console.log(catSelect);

const getCat = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await response.json();
	console.log(data);
	return data;
};

getCat();

// Init App
function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			break;
		case '/search.html':
			getRandomCats();
			break;
	}
}

document.addEventListener('DOMContentLoaded', init);
