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
    const img = setPoster(movie.large_cover_image, movie.url);

    const cardBoby = setCardBody(movie);

    const card = document.createElement("div");
    card.append(img, cardBoby);
    cardStyle(card);
    card.classList.add("movie-card");

    return card;
}

function setPoster(imgSrc, urlValue) {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.onclick = function () { window.open(`${urlValue}`); };
    img.classList.add("poster");
    posterStyle(img);

    return img;
}

function setRating(ratingValue) {
    const ratingWrap = document.createElement("div");

    for (let i = 0; i < ratingValue; i++) {
        const starIcon = document.createElement("i");
        starIcon.classList.add('fas', 'fa-star');
        starIconStyle(starIcon);

        ratingWrap.append(starIcon);
    }
    const underDot = ratingValue % 1;
    if (underDot >= 0.5) {
        const halfStarIcon = document.createElement("i");
        halfStarIcon.classList.add('fas', 'fa-star-half');
        starIconStyle(halfStarIcon);

        ratingWrap.append(halfStarIcon);
    }
    const rating = document.createElement("span");
    rating.innerText = "(" + ratingValue + ")";
    ratingStyle(rating);

    ratingWrap.append(rating);
    ratingWrapStyle(ratingWrap);

    return ratingWrap;
}

function setTitle(titleValue, urlValue) {
    const title = document.createElement("h1");
    const titleAtag = document.createElement("a");

    titleAtag.innerText = titleValue;
    titleAtag.href = `${urlValue}`;
    titleAtag.target = "_blank";
    titleAtagStyle(titleAtag);

    title.append(titleAtag);
    titleStyle(title);

    return title;
}

function setRunTime(runTimeValue) {
    const runTimeWrap = document.createElement("div");
    
    const clockIcon = document.createElement("i");
    clockIcon.classList.add('far', 'fa-clock');
    clockIconStyle(clockIcon);

    const runTime = document.createElement("span");
    runTime.innerText = runTimeValue;
    runTimeWrap.append(clockIcon, runTime);
    runTimeWrapStyle(runTimeWrap);

    return runTimeWrap;
}

function setGenres(genreList) {
    const genres = document.createElement("div");
    for (let j = 0; j < genreList.length; j++) {
        const genre = document.createElement("p");
        genre.innerText = genreList[j];
        genreStyle(genre);

        genres.append(genre);
    }
    genreWrapStyle(genres);

    return genres;
}

function setDesc(description) {
    const desc = document.createElement("p");

    desc.innerText = description;
    descStyle(desc);

    return desc;
}

function setYtBtn(ytLink) {
    const ytBtn = document.createElement("button");

    ytBtn.innerText = "See Trailer";
    ytBtn.onclick = function () { window.open(`https://www.youtube.com/watch?v=${ytLink}`); };
    ytBtn.target = "_blank";
    ytBtnStyle(ytBtn);

    return ytBtn;
}

function setCardBody(movie) {
    const ratingWrap = setRating(parseInt(movie.rating));

    const title = setTitle(movie.title_long, movie.url);

    const runTimeWrap = setRunTime(movie.runtime);

    const genres = setGenres(movie.genres);

    const desc = setDesc(movie.description_full);

    const ytBtn = setYtBtn(movie.yt_trailer_code);

    const cardBoby = document.createElement("div");

    cardBoby.append(ratingWrap, title, runTimeWrap, genres, desc, ytBtn);
    cardBoby.classList.add("card-body");
    cardBodyStyle(cardBoby);

    return cardBoby
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
var mqlSm = window.matchMedia("screen and (min-width: 320px) and (max-width: 667px) ");
var mqlMd = window.matchMedia("screen and (min-width: 768px) and (max-width: 991px) ");
var mqlLg = window.matchMedia("screen and (min-width: 992px) and (max-width: 1199px) ");
var mqlXlg = window.matchMedia("screen and (min-width: 1200px)");
mqlSm.addListener(handleScreenSize);
mqlMd.addListener(handleScreenSize);
mqlLg.addListener(handleScreenSize);
mqlXlg.addListener(handleScreenSize);

//반응이 일어나는 부분 == 포스터 사이즈와 카드 사이즈
function handleScreenSize() {
    cardWidthResize();
    cardBodyWidthResize();
    posterWidthResize();
}

//모든 카드들이 width를 조절하는 함수를 호출함
function cardWidthResize() {
    const cards = document.querySelectorAll(".movie-card");

    cards.forEach(card => {
        cardWidth(card);
    });
}

function cardWidth(card) {
    sm = mqlSm.matches;
    md = mqlMd.matches;
    lg = mqlLg.matches;
    xlg = mqlXlg.matches;

    if (xlg)
        card.style.width = "60%";
    else if (lg)
        card.style.width = "80%";
    else
        card.style.width = "100%";
}

function cardStyle(card) {
    cardWidth(card);
    card.style.display = "flex";
    card.style.flexWrap = "wrap";
    card.style.justifyContent = "space-around";
    card.style.alignItems = "center";
    card.style.padding = "0 20px";
    card.style.backgroundColor = "white";
    card.style.boxShadow = "0 8px 38px hsla(0,0%,52.2%,.3), 0 5px 12px hsla(0,0%,52.2%,.22)";
}

function posterWidthResize() {
    const posters = document.querySelectorAll(".poster");

    posters.forEach(poster => {
        posterWidth(poster)
    });
}

function posterWidth(poster) {
    sm = mqlSm.matches;
    md = mqlMd.matches;
    lg = mqlLg.matches;
    xlg = mqlXlg.matches;

    if (xlg || lg)
        poster.style.width = "40%";
    else if (md)
        poster.style.width = "50%";
    else
        poster.style.width = "90%";
}

function posterStyle(poster) {
    posterWidth(poster);
    poster.style.maxWidth = "100%";
    poster.style.position = "relative";
    poster.style.top = "-20px";
    poster.style.boxShadow = "-10px 19px 38px rgba(83,83,83,.3), 10px 15px 12px rgba(80,80,80,.22)";
}

function cardBodyWidthResize() {
    const cardBodies = document.querySelectorAll(".card-body");

    cardBodies.forEach(cardBody => {
        cardBodyStyleWidth(cardBody)
    });
}

function cardBodyStyleWidth(cardBody) {
    sm = mqlSm.matches;
    md = mqlMd.matches;
    lg = mqlLg.matches;
    xlg = mqlXlg.matches;

    if (xlg || lg)
        cardBody.style.width = "50%";
    else if (md)
        cardBody.style.width = "40%";
    else
        cardBody.style.width = "100%";
}

function cardBodyStyle(cardBoby) {
    cardBodyStyleWidth(cardBoby)
    cardBoby.style.padding = "20px 0";
}

function starIconStyle(starIcon) {
    starIcon.style.color = "gold";
    starIcon.style.fontSize = "20px";
}

function ratingStyle(rating) {
    rating.style.marginLeft = "5px";
}

function ratingWrapStyle(ratingWrap) {
    ratingWrap.style.display = "flex";
    ratingWrap.style.alignItems = "center";
}

function titleAtagStyle(titleAtag) {
    titleAtag.style.textDecoration = "none";
    titleAtag.style.color = "black";
}

function titleStyle(title) {
    title.style.fontSize = "20px";
    title.style.fontWeight = "600";
}

function clockIconStyle(clockIcon) {
    clockIcon.style.marginRight = "5px";
}

function runTimeWrapStyle(runTimeWrap) {
    runTimeWrap.style.marginBottom = "10px";
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

function ytBtnStyle(ytBtn) {
    ytBtn.style.marginTop = "20px";
    ytBtn.style.backgroundColor = "#eff3f7";
    ytBtn.style.textDecoration = "none";
    ytBtn.style.border = "1px solid #cccccc";
    ytBtn.style.padding = "13px 26px";
    ytBtn.style.boxShadow = "3px 3px 8px hsla(0,0%,52.2%,.3)";
}