# nb4-seven-team6

## [:link: 노션](https://www.notion.so/24cb1b4efe4d80dc818cf37149e2f65b)

## 팀원 구성

이상욱 [Github :link:](https://github.com/NewL1f3)<br>
김보경 [Github :link:](https://github.com/bgk614)<br>
엄규리 [Github :link:](https://github.com/ammgree)<br>
박형익 [Github :link:](https://github.com/Sw-twt)<br>
김태회 [Github :link:](https://github.com/F-los)<br>

## 프로젝트 소개

운동 인증 커뮤니티 서비스의 백엔드 시스템 구축<br>
프로젝트 기간: 2025.08.11 ~ 2025.08.29<br>

## 기술 스택

<table>
  <tr>
    <th>Category</th>
    <th>Stack</th>
    <th align="right">Version</th>
  </tr>
  <tr>
    <td>Language</td>
    <td>TypeScript</td>
    <td align="right">5.9.2</td>
  </tr>
  <tr>
    <td>Runtime</td>
    <td>Node.js</td>
    <td align="right">22.17.0</td>
  </tr>
  <tr>
    <td>Framework</td>
    <td>Express.js</td>
    <td align="right">5.1.0</td>
  </tr>
  <tr>
    <td>ORM</td>
    <td>Prisma ORM</td>
    <td align="right">6.13.0</td>
  </tr>
  <tr>
    <td>Database</td>
    <td>PostgreSQL</td>
    <td align="right">17.5</td>
  </tr>
</table>
<detail>

<details>
<summary> :hammer: 더보기</summary>

### 사용 툴

<table>
  <tr>
    <th>Category</th>
    <th>Tool</th>
    <th align="right">Version</th>
  </tr>
  <tr>
    <td>Config</td>
    <td>dotenv</td>
    <td align="right">17.2.1</td>
  </tr>
  <tr>
    <td>API Docs</td>
    <td>swagger-ui-express</td>
    <td align="right">5.0.1</td>
  </tr>
  <tr>
    <td rowspan="3">Lint</td>
    <td>eslint</td>
    <td align="right">9.33.0</td>
  </tr>
  <tr>
    <td>@typescript-eslint/eslint-plugin</td>
    <td align="right">8.39.1</td>
  </tr>
  <tr>
    <td>@typescript-eslint/parser</td>
    <td align="right">8.39.1</td>
  </tr>
  <tr>
    <td rowspan="2">Formatter</td>
    <td>Prettier</td>
    <td align="right">3.6.2</td>
  </tr>
  <tr>
    <td>eslint-plugin-prettier</td>
    <td align="right">5.5.4</td>
  </tr>
  <tr>
    <td rowspan="2">Dev Tools</td>
    <td>nodemon</td>
    <td align="right">3.1.10</td>
  </tr>
  <tr>
    <td>tsx</td>
    <td align="right">4.20.4</td>
  </tr>
  <tr>
    <td rowspan="2">Types</td>
    <td>@types/express</td>
    <td align="right">5.0.3</td>
  </tr>
  <tr>
    <td>@types/node</td>
    <td align="right">24.2.1</td>
  </tr>
</table>

### 기타

<table>
  <tr>
    <th>Tool</th>
    <th>Version</th>
  </tr>
  <tr>
    <td>Git &amp; GitHub</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Discord</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Notion</td>
    <td>-</td>
  </tr>
</table>
</details>

## 팀원별 구현 기능 상세

### 이상욱 <sub>운동기록(조회/정렬/검색)</sub>

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

### 김보경 <sub>그룹 DB, 그룹(생성/수정/삭제)</sub>

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

### 엄규리 <sub>그룹(조회/정렬/검색)</sub>

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

### 박형익 <sub>그룹(배지/참여/추천)</sub>

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

### 김태회 <sub>기록 DB, 운동기록(생성/수정/삭제)</sub>

(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

## 파일 구조

<details>
<summary>📂 파일 구조 보기</summary>

```
 src
 ┣ config
 ┃ ┗ db.ts
 ┣ controllers
 ┃ ┣ record
 ┃ ┃ ┗ create_record.controller.ts
 ┃ ┗ group
 ┃    ┣ create_group.controller.ts
 ┃    ┣ delete_group.controller.ts
 ┃    ┣ update_group.controller.ts
 ┃    ┣ list_groups.controller.ts
 ┃    ┣ get_group.controller.ts
 ┃    ┣ recommend_group.controller.ts
 ┃    ┣ join_group.controller.ts
 ┃    ┗ leave_group.controller.ts
 ┣ middleware
 ┃ ┣ group.middleware.ts
 ┃ ┣ record.middleware.ts
 ┃ ┣ auth.middleware.ts
 ┃ ┗ error.middleware.ts
 ┣ models
 ┃ ┣ record.model.ts
 ┃ ┗ group.model.ts
 ┣ routes
 ┃ ┣ record.routes.ts
 ┃ ┗ group.routes.ts
 ┣ services
 ┃ ┣ record
 ┃ ┃ ┗ create_record.service.ts
 ┃ ┗ group
 ┃    ┣ create_group.service.ts
 ┃    ┣ delete_group.service.ts
 ┃    ┣ update_group.service.ts
 ┃    ┣ list_groups.service.ts
 ┃    ┣ get_group.service.ts
 ┃    ┣ recommend_group.service.ts
 ┃    ┣ join_group.service.ts
 ┃    ┣ leave_group.service.ts
 ┃    ┗ badge_evaluation.service.ts
 ┣ utils
 ┃ ┣ jwt.ts
 ┃ ┣ constants.ts
 ┃ ┗ logger.ts
 ┣ app.ts
 ┗ server.ts
prisma
 ┣ schema.prisma
 ┗ seed.ts
.env
.env.example
.gitignore
.prettierrc
app.js
eslint.config.ts
package.json
tsconfig.json
README.md
```

</details>

## 구현 홈페이지

(개발한 홈페이지에 대한 링크 게시)

## 프로젝트 회고록

(제작한 발표자료 링크 혹은 첨부파일 첨부)
