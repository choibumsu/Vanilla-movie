function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.onload = async () => {
    const app = document.querySelector("#app");
    const loading = document.createElement("div");
    loading.innerText = "Loading...";
    app.appendChild(loading);
    id = getParameterByName('id');

    const main = async () => {
        const {
            data: {
                data: { movie: movie }
            }
        } = await axios.get(
            `https://yts.lt/api/v2/movie_details.json?movie_id=${id}`
        );
        app.removeChild(loading);
        bodyStyle();
        appStyle(app);
        addMovie(movie, app);
    };

    await main();
};

function addMovie(movie, app) {
    const card = setCard(movie);
    app.appendChild(card);
}

function setCard(movie) {
    const img = document.createElement("img");
    img.src = movie.large_cover_image;
    img.onclick = function() { window.open(`${movie.url}`); };
    posterStyle(img);

    const ratingWrap = document.createElement("div");
    for (let i = 0; i < parseInt(movie.rating); i++) {
        const starIcon = document.createElement("i");
        starIcon.classList.add('fas', 'fa-star');
        starIcon.style.color = "gold";
        starIcon.style.fontSize = "20px";
        ratingWrap.append(starIcon);
    }
    const underDot = movie.rating % 1;
    if (underDot >= 0.5) {
        const halfStarIcon = document.createElement("i");
        halfStarIcon.classList.add('fas', 'fa-star-half');
        halfStarIcon.style.color = "gold";
        halfStarIcon.style.fontSize = "20px";
        ratingWrap.append(halfStarIcon);
    }
    const rating = document.createElement("span");
    rating.innerText = "(" + movie.rating + ")";
    rating.style.marginLeft = "5px";
    ratingWrap.append(rating);
    ratingWrap.style.display = "flex";
    ratingWrap.style.alignItems = "center";

    const title = document.createElement("h1");
    const titleAtag = document.createElement("a");
    titleAtag.innerText = movie.title_long;
    titleAtag.href = `${movie.url}`;
    titleAtag.target = "_blank";
    titleAtag.style.textDecoration = "none";
    titleAtag.style.color = "black";
    title.append(titleAtag);
    titleStyle(title);

    const runTimeWrap = document.createElement("div");
    const clockIcon = document.createElement("i");
    const runTime = document.createElement("span");
    clockIcon.classList.add('far', 'fa-clock');
    clockIcon.style.marginRight = "5px";
    runTime.innerText = `${movie.runtime}`;
    runTimeWrap.append(clockIcon, runTime);
    runTimeWrap.style.marginBottom = "10px";

    const genres = document.createElement("div");
    for (let j = 0; j < movie.genres.length; j++) {
        const genre = document.createElement("p");
        genre.innerText = movie.genres[j];
        genreStyle(genre);

        genres.append(genre);
    }
    genreWrapStyle(genres);

    const desc = document.createElement("p");
    desc.innerText = movie.description_full;
    descStyle(desc);

    const ytButton = document.createElement("button");
    ytButton.innerText = "See Trailer";
    ytButton.onclick = function () { window.open(`https://www.youtube.com/watch?v=${movie.yt_trailer_code}`); };
    ytButton.target = "_blank";
    ytButton.style.marginTop = "20px";
    ytButton.style.backgroundColor = "#eff3f7";
    ytButton.style.textDecoration = "none";
    ytButton.style.border = "1px solid #cccccc";
    ytButton.style.padding = "15px 32px";
    ytButton.style.boxShadow = "3px 3px 8px hsla(0,0%,52.2%,.3)";

    const cardBoby = document.createElement("div");
    cardBoby.append(ratingWrap, title, runTimeWrap, genres, desc, ytButton)
    cardBodyStyle(cardBoby);

    const card = document.createElement("div");
    card.append(img, cardBoby);
    cardStyle(card);

    return card;
}

/* style */

// boay 와 app 스타일 초기화
function bodyStyle() {
    const body = document.querySelector("body");

    body.style.margin = "0px";
    body.style.fontFamily = "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif";
    body.style.display = "flex";
    body.style.alignItems = "center";
    body.style.minHeight = "100vh";
    body.style.backgroundColor = "#eff3f7";
}

function appStyle(app) {
    app.style.padding = "50px";
    app.style.display = "flex";
    app.style.justifyContent = "space-around";
    app.style.flexWrap = "wrap";
    app.style.fontSize = "16px";
}

/*
resize 이벤트 핸들러 
반응형을 위한 이벤트
*/
var mql = window.matchMedia("screen and (min-width: 320px) and (max-width: 667px) ");
mql.addListener(handleSmSize);

//반응이 일어나는 부분 == 포스터 사이즈와 카드 사이즈
function handleSmSize() {
    cardBodyWidthResize(mql.matches);
    posterWidthResize(mql.matches);
}

//모든 카드들이 width를 조절하는 함수를 호출함
function cardStyle(card) {
    card.classList.add("movie-card");

    card.style.width = "100%";
    card.style.display = "flex";
    card.style.flexWrap = "wrap";
    card.style.justifyContent = "space-around";
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

function cardBodyWidthResize(matching) {
    const cardBodies = document.querySelectorAll(".card-body");

    cardBodies.forEach(cardBody => {
        cardBodyStyleWidth(cardBody, matching)
    });
}

function cardBodyStyleWidth(cardBody, matching) {
    if (matching)
        cardBody.style.width = "100%";
    else
        cardBody.style.width = "60%";
}

function cardBodyStyle(cardBoby) {
    cardBoby.classList.add("card-body");

    cardBodyStyleWidth(cardBoby, mql.matches)
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
    desc.style.margin = "0";
}