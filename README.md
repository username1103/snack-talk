# 🍿 Snacktalk
![snacktalk_vertical_colored](https://user-images.githubusercontent.com/49140707/173799648-e9c1b232-29b9-4609-95c4-e7612476ac30.png)

## 👀 Overview
Socket 기반의 채팅 앱을 제작하는 토이 프로젝트입니다.

<br/>

## 🛠 Development
<table>
  <thead>
    <tr>
      <th align="center">Project</th>
      <th>Milestone</th>
      <th align="center"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><strong>스택 및 라이브러리 setting</strong></td>
      <td>-</td>
      <td align="center">✅</td>
    </tr>
    <tr>
      <td align="center" rowspan="3"><strong>DB 및 서버 구조 설계</strong></td>
      <td>DB 설계</td>
      <td align="center">👀</td>
    </tr>
    <tr>
      <td>서버 구조 잡기</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>로깅, 구조 잡기</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center" rowspan="2"><strong>앱 디자인 및 기획</strong></td>
      <td>메뉴 및 화면 구성 기획</td>
      <td align="center">👀</td>
    </tr>
    <tr>
      <td>앱 레이아웃 디자인</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center" rowspan="4"><strong>사용자 관리</strong></td>
      <td>사용자 데이터 설계 및 구현</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>token 및 session 관리 구현</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>회원기능 구현</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>테스트</td>
      <td align="center"></td>
    </tr>
  </tbody>
</table>
<br/>


## 🎋 Branch

server, client 브랜치 분리  

### Naming Convention

```
issueNumber-{feat|docs|test|refact|chore}/{comment}

ex) 3-feat/create-user
```

### git flow

1. 이슈에 따른 브랜치 생성 후 server or client로 pr 생성
2. 개발 진행
3. 셀프 리뷰
4. 커밋 메시지 작성
```
{feat|docs|test|refact|chore}: {제목} 

{세부사항}

issue: {#issueNumber}

ex)
feat: 유저 모듈 추가

- POST /v1/users 추가
- GET /v1/users 추가
- PUT /v1/users/:userId/name 추가
- DELETE /v1/users/:userId 추가

issue: #3, #4
```
5. 머지
6. 마일스톤 단위로 master에 pr생성 및 리뷰 요청
7. 리뷰 후 병합


##  📝 Commit Message Convention

- feat: 신기능 추가 및 수정
- docs: 문서 나 명세 
- test: 테스트 작성
- refact: 리팩터링
- chore: 기능 변경 및 추가가아닌 간단한 수정(빌드 스크립트 수정이나 디펜던시 업데이트 등)
```
// 제목까지만 필수
{feat|docs|test|refact|chore}: {제목} 

[세부사항]

[issue: #issueNumber]

ex)
feat: 유저 모듈 추가

- 유저 컨트롤러 추가
- 유저 서비스 추가
- 유저 엔티티 추가
- 유저 레퍼지토리 추가

issue: #3
```

## ✨ Tech Stack
### Backend
<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS"/>
  <img src="https://img.shields.io/badge/Typeform-262627?style=for-the-badge&logo=Typeform"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest"/>
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black"/>
</div>
  
### Frontend
<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactNative-282c34?style=for-the-badge&logo=React&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest"/>
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=Expo"/>
</div>

<br/>

## 🏄🏻‍♀️ Team
- **Kim Myeongil** [@username1103](https://github.com/username1103) / Back-end
- **Kim Dahee** [@dadakim-dev](https://github.com/dadakim-dev) / Front-end
