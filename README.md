# ๐ฟ Snacktalk
![snacktalk_vertical_colored](https://user-images.githubusercontent.com/49140707/173799648-e9c1b232-29b9-4609-95c4-e7612476ac30.png)

## ๐ Overview
Socket ๊ธฐ๋ฐ์ ์ฑํ ์ฑ์ ์ ์ํ๋ ํ ์ด ํ๋ก์ ํธ์๋๋ค.

<br/>

## ๐  Development
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
      <td align="center"><strong>์คํ ๋ฐ ๋ผ์ด๋ธ๋ฌ๋ฆฌ setting</strong></td>
      <td>ํ์ ํ๊ฒฝ ๊ตฌ์ฑ</td>
      <td align="center">โ</td>
    </tr>
    <tr>
      <td align="center" rowspan="3"><strong>DB ๋ฐ ์๋ฒ ๊ตฌ์กฐ ์ค๊ณ</strong></td>
      <td>DB ์ค๊ณ</td>
      <td align="center">๐</td>
    </tr>
    <tr>
      <td>์๋ฒ ๊ตฌ์กฐ ์ก๊ธฐ</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>๋ก๊น, ๊ตฌ์กฐ ์ก๊ธฐ</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center" rowspan="2"><strong>์ฑ ๋์์ธ ๋ฐ ๊ธฐํ</strong></td>
      <td>๋ฉ๋ด ๋ฐ ํ๋ฉด ๊ตฌ์ฑ ๊ธฐํ</td>
      <td align="center">๐</td>
    </tr>
    <tr>
      <td>์ฑ ๋ ์ด์์ ๋์์ธ</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td align="center" rowspan="4"><strong>์ฌ์ฉ์ ๊ด๋ฆฌ</strong></td>
      <td>์ฌ์ฉ์ ๋ฐ์ดํฐ ์ค๊ณ ๋ฐ ๊ตฌํ</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>token ๋ฐ session ๊ด๋ฆฌ ๊ตฌํ</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>ํ์๊ธฐ๋ฅ ๊ตฌํ</td>
      <td align="center"></td>
    </tr>
    <tr>
      <td>ํ์คํธ</td>
      <td align="center"></td>
    </tr>
  </tbody>
</table>
<br/>


## ๐ Branch

server, client ๋ธ๋์น ๋ถ๋ฆฌ  

### Naming Convention

```
issueNumber-{feat|docs|test|refact|chore}/{comment}

ex) 3-feat/create-user
```

### git flow

1. ์ด์์ ๋ฐ๋ฅธ ๋ธ๋์น ์์ฑ ํ server or client๋ก pr ์์ฑ
2. ๊ฐ๋ฐ ์งํ
3. ์ํ ๋ฆฌ๋ทฐ
4. ์ปค๋ฐ ๋ฉ์์ง ์์ฑ
```
{feat|docs|test|refact|chore}: {์ ๋ชฉ} 

{์ธ๋ถ์ฌํญ}

issue: {#issueNumber}

ex)
feat: ์ ์  ๋ชจ๋ ์ถ๊ฐ

- POST /v1/users ์ถ๊ฐ
- GET /v1/users ์ถ๊ฐ
- PUT /v1/users/:userId/name ์ถ๊ฐ
- DELETE /v1/users/:userId ์ถ๊ฐ

issue: #3, #4
```
5. ๋จธ์ง
6. ๋ง์ผ์คํค ๋จ์๋ก master์ pr์์ฑ ๋ฐ ๋ฆฌ๋ทฐ ์์ฒญ
7. ๋ฆฌ๋ทฐ ํ ๋ณํฉ


##  ๐ Commit Message Convention

- feat: ์ ๊ธฐ๋ฅ ์ถ๊ฐ ๋ฐ ์์ 
- docs: ๋ฌธ์ ๋ ๋ช์ธ ์์ฑ
- test: ํ์คํธ ์์ฑ
- refact: ๋ฆฌํฉํฐ๋ง
- chore: ๊ธฐ๋ฅ ๋ณ๊ฒฝ ๋ฐ ์ถ๊ฐ๊ฐ์๋ ๊ฐ๋จํ ์์ (๋น๋ ์คํฌ๋ฆฝํธ ์์ ์ด๋ ๋ํ๋์ ์๋ฐ์ดํธ ๋ฑ)
```
// ์ ๋ชฉ๊น์ง๋ง ํ์
{feat|docs|test|refact|chore}: {์ ๋ชฉ} 

[์ธ๋ถ์ฌํญ]

[issue: #issueNumber]

ex)
feat: ์ ์  ๋ชจ๋ ์ถ๊ฐ

- ์ ์  ์ปจํธ๋กค๋ฌ ์ถ๊ฐ
- ์ ์  ์๋น์ค ์ถ๊ฐ
- ์ ์  ์ํฐํฐ ์ถ๊ฐ
- ์ ์  ๋ ํผ์งํ ๋ฆฌ ์ถ๊ฐ

issue: #3
```

## โจ Tech Stack
### Backend
<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS"/>
  <img src="https://img.shields.io/badge/TypeORM-f5f5f5?style=for-the-badge"/>
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

## ๐๐ปโโ๏ธ Team
- **Kim Myeongil** [@username1103](https://github.com/username1103) / Back-end
- **Kim Dahee** [@dadakim-dev](https://github.com/dadakim-dev) / Front-end
