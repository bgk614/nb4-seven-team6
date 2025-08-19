# nb4-seven-team6

## [:link: 노션](https://www.notion.so/24cb1b4efe4d80dc818cf37149e2f65b)

## 로컬 [swagger](http://localhost:6123/api-docs/)

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
    <td align="right">6.14.0</td>
  </tr>
  <tr>
    <td>Database</td>
    <td>PostgreSQL</td>
    <td align="right">17.5</td>
  </tr>
  <tr>
    <td>Auth</td>
    <td>Bcrypt</td>
    <td align="right">6.0.0</td>
  </tr>
  <tr>
    <td>Validation</td>
    <td>Zod</td>
    <td align="right">4.0.17</td>
  </tr>
  <tr>
    <td>File Upload</td>
    <td>Multer</td>
    <td align="right">2.0.2</td>
  </tr>
  <tr>
    <td>Logger</td>
    <td>Morgan</td>
    <td align="right">1.10.1</td>
  </tr>
  <tr>
    <td>Middleware</td>
    <td>CORS</td>
    <td align="right">2.8.5</td>
  </tr>
  <tr>
    <td>Config</td>
    <td>Dotenv</td>
    <td align="right">17.2.1</td>
  </tr>
  <tr>
    <td>API Docs</td>
    <td>Swagger UI Express</td>
    <td align="right">5.0.1</td>
  </tr>
  <tr>
    <td>Test</td>
    <td>Vitest / Supertest</td>
    <td align="right">3.2.4 / 7.1.4</td>
  </tr>
  <tr>
    <td>Lint / Format</td>
    <td>ESLint / Prettier</td>
    <td align="right">9.33.0 / 3.6.2</td>
  </tr>
  <tr>
    <td>Git Hook</td>
    <td>Husky</td>
    <td align="right">9.1.7</td>
  </tr>
  <tr>
    <td>Package Manager</td>
    <td>npm</td>
    <td align="right">10.x</td>
  </tr>
</table>

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
.
├── src
│   ├── app.ts
│   ├── config
│   │   └── db.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── group
│   │   ├── record.controller.ts
│   │   └── user.controller.ts
│   ├── generated
│   ├── index.ts
│   ├── middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validate.middleware.ts
│   ├── models
│   │   ├── auth
│   │   ├── course.model.ts
│   │   ├── error_response.model.ts
│   │   ├── group
│   │   ├── upload
│   │   └── user.model.ts
│   ├── routes
│   │   ├── auth.routes.ts
│   │   ├── group.routes.ts
│   │   ├── record.routes.ts
│   │   ├── timer.routes.ts
│   │   ├── upload.route.ts
│   │   ├── uploads
│   │   └── user.routes.ts
│   ├── services
│   │   ├── auth.service.ts
│   │   ├── group
│   │   ├── record.service.ts
│   │   └── user.service.ts
│   ├── swagger
│   │   ├── components
│   │   ├── info
│   │   ├── paths
│   │   ├── server
│   │   ├── swagger.yaml
│   │   └── tags
│   ├── tests
│   │   ├── record.e2e.test.ts
│   │   └── record.more.e2e.test.ts
│   └── utils
│       ├── auth.util.ts
│       ├── discord.ts
│       ├── mappers
│       ├── password.ts
│       └── timer.ts
├── eslint.config.js
├── tsconfig.json
├── vitest.config.ts
├── package-lock.json
├── package.json
├── seed.js
├── uploads
└── README.md
```

</details>

## 구현 홈페이지

(개발한 홈페이지에 대한 링크 게시)

## 프로젝트 회고록

(제작한 발표자료 링크 혹은 첨부파일 첨부)
