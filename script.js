window.onload = init;

const QUOTE_URL = "https://api.quotable.io";

let main;
let divQuote;

async function init() {
	main = document.querySelector("main");
	divQuote = document.querySelector("main .quote");

	const randomQuote = getRandomQuote();
	randomQuote.then((json) => {
		console.log("json", json);
		// Ajout du paragraphe à la div
		divQuote.innerHTML = `<p>${json.content}</p>`;

		// Ajout du bouton pour accéder aux autres citations de l'auteur
		// Création du paragraphe contenant le nom de l'auteur
		const pName = document.createElement("p");
		pName.classList.add("name");
		pName.innerText = json.author;

		// Création du paragraphe contenant le theme de la citation
		const pTheme = document.createElement("p");
		pTheme.classList.add("theme");
		pTheme.innerText = json.tags[0];

		// Création de la div author et ajouts des paragraphes
		const divAuthor = document.createElement("div");
		divAuthor.classList.add("author");
		divAuthor.append(pName);
		divAuthor.append(pTheme);

		// Création de la flèche du bouton
		const divArrow = document.createElement("div");
		divArrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" height="48" width="48"><path d="m28.05 35.9-2.15-2.1 8.4-8.4H8v-3h26.3l-8.45-8.45 2.15-2.1L40.05 23.9Z"/></svg>`;
		main.append(divArrow);

		// Création de la div btn-author
		const divBtnAuthor = document.createElement("div");
		divBtnAuthor.classList.add("btn-author");
		divBtnAuthor.append(divAuthor);
		// divBtnAuthor.append(divBtnAuthor);

		// On ajoute le tout au main
		main.append(divBtnAuthor);
	});
}


async function getRandomQuote() {
	const responseRandomQuote = await fetch(`${QUOTE_URL}/random`);
	return responseRandomQuote.json();
}

async function getQuotesByAuthor(author) {
	const responseRandomQuote = await fetch(`${QUOTE_URL}/quotes&author=${author}`);
	return responseRandomQuote.json();
}