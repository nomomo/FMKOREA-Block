# FMKOREA-Block

- 에펨코리아의 포텐글을 게시판/게시글 제목 내 지정단어로 필터링하여 표시해주는 UserScript 기반 브라우저 확장기능
- 상세 설명: [https://nomo.asia/446](https://nomo.asia/446)

## Install

FMKOREA-Block 의 설치 방법을 설명합니다.

### STEP 1. ScriptManager

아래 링크에서 사용 중인 브라우저에 맞는 유저스크립트 관리 확장기능을 설치하세요.

- Firefox - [Tampermonkey](https://addons.mozilla.org/ko/firefox/addon/tampermonkey/)
- Chrome - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Opera - [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)
- Safari - [Tampermonkey](https://safari.tampermonkey.net/tampermonkey.safariextz)
- Edge - [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### STEP 2. UserScript

유저스크립트 관리 확장기능 설치가 완료되었다면, 아래 링크를 클릭한 후 뜨는 창에서 설치 버튼을 누릅니다.

- [https://raw.githubusercontent.com/nomomo/FMKOREA-Block/master/FMKOREA-Block.user.js](https://raw.githubusercontent.com/nomomo/FMKOREA-Block/master/FMKOREA-Block.user.js)

이것으로 설치는 끝입니다. 즐겁게 사용하세요~

> 주의: 본 스크립트를 설치 및 사용하며 브라우저 과부하로 인한 응답 없음/뻗음으로 인한 데이터 손실, 운영원칙 위반에 따른 제재, 기타 발생하는 모든 문제에 대하여 개발자는 책임지지 않음  
> 대상 사이트 접속에 문제가 생기거나 클립 재생이 안 되는 문제 등이 발생하는 경우, Tampermonkey 의 관리 메뉴에서 이 스크립트를 끄거나 삭제해주세요.  
> 본 스크립트는 Tampermonkey 외의 스크립트 매니저에서는 정상 동작하지 않을 수 있습니다.  
> 동작 테스트는 Chrome, Firefox 에서만 했습니다.  

## Change Logs

### 0.1.4 - Mar. 10, 2024

- 포텐터진 게시판에서 크킹 카테고리의 경우 글 제목에 "[크킹]"을 붙여주는 기능을 추가했어요.

### 0.1.3 - Dec. 16, 2023

- 메모 내용을 삭제 시, 대상 유저가 차단 상태가 아닌 경우 메모를 삭제
- 메모 내용이 비어있는 경우 표시하지 않음

### 0.1.2 - Dec. 02, 2023

- 글 보기 화면에서 글 작성자 닉네임 우측에 메모 내용이 표시되지 않는 문제 수정

### 0.1.1 - Dec. 01, 2022

- 메모된 유저의 닉네임이 변경되었을 때 설정 창에 변경된 닉네임이 반영되지 않는 문제 수정

### 0.1.0 - Jun. 12, 2022

- 동작 속도 개선
- [실험실] 유저 관리 기능 추가 (메모 및 차단)
- Dark mode 에서 설정 페이지를 더 깔끔하게 표시

### 0.0.1 - Dec. 22, 2019

- 최초 커밋

## Happy??

<a href="https://www.buymeacoffee.com/nomomo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="60"></a>