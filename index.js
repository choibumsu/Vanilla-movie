window.onload = async () => {
	bodyStyle();

	const app = document.querySelector("#app");
	const loading = document.createElement("div");
	loading.innerText = "Loading...";
	app.appendChild(loading);
	const main = async () => {
		const {
			data: {
				data: { movies: movies }
			}
		} = await axios.get(
			`https://yts.lt/api/v2/list_movies.json?sort_by=like_count`
		);
		app.removeChild(loading);
		appStyle(app);
		addCard(movies, app);
	};

	await main();
};

function addCard(movies, app) {
	for (let i = 0; i < movies.length; i++) {
		const card = setCard(movies[i]);
		app.appendChild(card);
	}
}

function setCard(movie) {
	const img = document.createElement("img");
	img.src = movie.large_cover_image;
	posterStyle(img);

	const title = document.createElement("h1");
	title.innerText = movie.title;
	titleStyle(title);

	const genres = document.createElement("div");
	for (let j = 0; j < movie.genres.length; j++) {
		const genre = document.createElement("p");
		genre.innerText = movie.genres[j];
		genreStyle(genre);

		genres.append(genre);
	}
	genreWrapStyle(genres);

	const desc = document.createElement("p");
	desc.innerText = movie.summary;
	descStyle(desc);

	const cardBoby = document.createElement("div");
	cardBoby.append(title, genres, desc)
	cardBodyStyle(cardBoby);

	const card = document.createElement("div");
	card.append(img, cardBoby);
	card.onclick = function() { location.href = `./detail.html?id=${movie.id}`; };
	cardStyle(card);

	return card;
}

/* style */

// boay 와 app 스타일 초기화
function bodyStyle() {
	const body = document.querySelector("body");

	body.style.margin = "0px";
	body.style.fontFamily = "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif";
}

function appStyle(app) {
	app.style.padding = "50px";
	app.style.display = "flex";
	app.style.justifyContent = "space-around";
	app.style.flexWrap = "wrap";
	app.style.fontSize = "14px";
	app.style.backgroundColor = "#eff3f7";
}

/*
resize 이벤트 핸들러 
반응형을 위한 이벤트
*/
var mql = window.matchMedia("screen and (min-width: 320px) and (max-width: 667px) ");
mql.addListener(handleSmSize);

//반응이 일어나는 부분 == 포스터 사이즈와 카드 사이즈
function handleSmSize() {
	cardWidthResize(mql.matches);
	posterWidthResize(mql.matches);
}

//모든 카드들이 width를 조절하는 함수를 호출함
function cardWidthResize(matching) {
	const cards = document.querySelectorAll(".movie-card");

	cards.forEach(card => {
		cardWidth(card, matching)
	});
}

function cardWidth(card, matching) {
	if (matching)
		card.style.width = "92.5%";
	else 
		card.style.width = "40%";
}

function cardStyle(card) {
	card.classList.add("movie-card");

	cardWidth(card, mql.matches);
	card.style.display = "flex";
	card.style.flexWrap = "wrap";
	card.style.marginBottom = "50px";
	card.style.justifyContent = "space-between";
	card.style.alignItems = "flex-start";
	card.style.padding = "0 20px";
	card.style.backgroundColor = "white";
	card.style.boxShadow = "0 8px 38px hsla(0,0%,52.2%,.3), 0 5px 12px hsla(0,0%,52.2%,.22)";
}

function posterWidthResize(matching) {
	const posters = document.querySelectorAll(".poster");

	posters.forEach(poster => {
		posterWidth(poster, matching)
	});
}

function posterWidth(poster, matching) {
	if (matching) 
		poster.style.width = "100%";
	else 
		poster.style.width = "30%";
}

function posterStyle(poster) {
	poster.classList.add("poster");

	posterWidth(poster, mql.matches);
	poster.style.maxWidth = "100%";
	poster.style.position = "relative";
	poster.style.top = "-20px";
	poster.style.boxShadow = "-10px 19px 38px rgba(83,83,83,.3), 10px 15px 12px rgba(80,80,80,.22)";
}

function cardBodyStyle(cardBoby) {
	cardBoby.classList.add("card-body");

	cardBoby.style.width = "60%";
	cardBoby.style.padding = "20px 0";
}

function titleStyle(title) {
	title.style.fontSize = "20px";
	title.style.fontWeight = "600";
}

function genreStyle(genre) {
	genre.style.display = "inline-block";
	genre.style.color = "#b4b5bd";
	genre.style.marginTop = "0px";
	genre.style.marginBottom = "0px";
	genre.style.marginRight = "10px";
}

function genreWrapStyle(genres) {
	genres.style.marginBottom = "20px";
}

function descStyle(desc) {
	desc.style.color = "#b4b5bd";
	desc.style.overflow = "hidden";
	desc.style.textOverflow = "ellipsis";
	desc.style.overflow = "hidden";
	desc.style.whiteSpace = "nowrap";
	desc.style.margin = "0";
}