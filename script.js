window.onload = init;

const QUOTE_URL = "https://api.quotable.io";

let main;
let divQuotes;
let divBtnAuthor;
let paraName;
let paraTheme;

async function init() {
	main         = document.querySelector("main");
	divQuotes    = document.querySelector("main .list-quote");
	divBtnAuthor = document.querySelector("main .btn-author");
	paraName     = document.querySelector("main .btn-author .name");
	paraTheme    = document.querySelector("main .btn-author .theme");

	randomQuoteView();
}

async function randomQuoteView() {
	const randomQuote = getRandomQuote();
	randomQuote.then((json) => {
		// On réinitialise la div des quote
		divQuotes.innerHTML = "";
		
		// Ajout du paragraphe à la div
		divQuotes.innerHTML = `
			<div class="quote">
				<div class="rectangle"></div>
				<p>“${json.content}”</p>
			</div>
		`;

		// Ajout des infos sur l'auteur
		paraName.innerText  = json.author;
		paraTheme.innerText = json.tags[0];

		// On enlève la classe .hide
		divBtnAuthor.classList.remove("hide");
	});
}

async function authorQuotesView() {

	const authorQuotes = getQuotesByAuthor();
	authorQuotes.then((json) => {

		console.log("json", json);
		// On réinitialise la div des quote
		divQuotes.innerHTML = "";

		// On affiche l'auteur
		const h2Author = document.createElement("h2");
		h2Author.innerText = json.results[0].author;
		divQuotes.append(h2Author);

		// On boucle sur tous les résultats trouvés et on les affiches les uns en dessous des autres
		json.results.forEach((result) => {

			console.log("result", result);
			// On crée la div qui va englober le tout
			const divQuote = document.createElement("div");
			divQuote.classList.add("quote");

			// On crée la div qui va contenir le rectangle
			const divRectangle = document.createElement("div");
			divRectangle.classList.add("rectangle");

			// On crée le paragraphe qui va contenir la quote
			const paraQuote = document.createElement("p");
			paraQuote.innerText = `“${result.content}”`;
			divQuote.append(divRectangle);
			divQuote.append(paraQuote);

			// On ajoute la div quote à la liste des quotes
			divQuotes.append(divQuote);

		});

		divBtnAuthor.classList.add("hide");
	});
}

async function getRandomQuote() {

	const responseRandomQuote = await fetch(`${QUOTE_URL}/random`);
	return responseRandomQuote.json();
}

async function getQuotesByAuthor() {

	const responseRandomQuote = await fetch(`${QUOTE_URL}/quotes?author=${paraName.textContent}`);
	return responseRandomQuote.json();
}