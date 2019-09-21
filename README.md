# API를 써보자

## NPM에 대해서

[NPM 페이지](https://www.npmjs.com/)

NPM은 Python의 pip와 똑같은 거라고 생각하시면 됩니다. 여러 외부 모듈들을 가지고 있습니다. 대신 `package.json` 파일이 같이 생성되고 `requirements.txt`를 `dependencies`로 관리한다고 생각하시면 됩니다. 지금 여기 프로젝트 안에는 `gh-pages`라는 모듈을 설치했습니다.

근데 일단 외부 모듈을 설치하면 `node_modules`에 엄청나게 많은 파일들이 설치됩니다. Python에서 외부 모듈을 모두 git 저장소에 올리는 것이 아닌 것 처럼 Node에서도 마찬가지로 설치된 외부 모듈 올리지 않고 `.gitignore`을 사용해 주고 새로 pull 받을 땐 `package.json`에 있는 모듈을 설치해주면 됩니다.

결론은 이 프로젝트를 받고 나서 `npm i` or `npm install`을 하고 사용하셔야 합니다.

## Axios

[Axios](https://github.com/axios/axios)

curl처럼 주소로 HTTP 요청을 보낼 수 있습니다. 비동기로 작동합니다. npm으로 깔려있지는 않고 cdn을 사용했습니다.

## gh-pages

[gh-pages](https://www.npmjs.com/package/gh-pages)

gh-pages라는 브랜치에 정적 페이지 형태로 퍼블리싱 해줍니다. 어짜피 JS가 정적 파일이라 이런식으로 안해도 되긴 하는데 써보세요 모듈 사용 하는 경험이니까

## 과제

[API 주소](https://yts.lt/api)

가볍게 사용해볼 수 있는 API입니다. 아래 API를 사용한 영화 소개 페이지를 만들어주세요.

- List Movies
- Movie Details
- Movie Suggestions
- Movie Comments
- Movie Reviews
- Movie Parental Guides


