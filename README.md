![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22.17.0-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express-5.1.0-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.14.0-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.5-4169E1?logo=postgresql&logoColor=white)

# 운동인증 커뮤니티 서비스 백엔드

## 목차

- [프로젝트 소개](#프로젝트-소개)
- [구현한 웹페이지](#구현한-웹페이지)
- [주요 문서](#주요-문서--자료)
- [팀원](#팀원)
- [기술 스택](#기술-스택)
- [구현 기능](#팀원별-구현-기능-상세)
- [파일 구조](#파일-구조)

## 프로젝트 소개

- 운동 인증 커뮤니티 서비스의 백엔드 시스템 구축<br>
- 그룹, 참여자, 운동 기록, 배지, 좋아요 기능<br>
- 프로젝트 기간: 2025.08.11 ~ 2025.08.29<br>

## 구현한 웹페이지

- 사이트 주소: https://nb4-seven-team6-front.vercel.app/

## 주요 문서 & 자료

| 문서                 | 링크 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Swagger API          | [바로가기](https://codeit.teamproject1.server.bgk.dev/api-docs/) |
| 팀 문서 (Notion)     | [바로가기](https://radial-attention-ca6.notion.site/24cb1b4efe4d80dc818cf37149e2f65b) |
| 실행 영상            | [바로가기](https://docs.google.com/file/d/1YaSgmVFjx7ccKw2Noi5LhFdTZup_FRHF/preview) |
| 최종 발표 PPT        | [바로가기](https://file.notion.so/f/f/a29b669d-e680-438e-b18c-08888fc54a21/812c8ea0-db07-4181-9326-05c1231c884c/부캠팀플1최종발표템플릿.pdf?table=block&id=25a6fd22-8e8d-8097-82a8-ce9129223a8e&spaceId=a29b669d-e680-438e-b18c-08888fc54a21&expirationTimestamp=1756468800000&signature=8QhMrpv9UfzmNk_WCK12Jzgej0S8X7tv4pUhjKEWUwY&downloadName=6팀_SEVEN_발표자료.pdf) |
| 프론트엔드 레포지토리 | [바로가기](https://github.com/NewL1f3/nb4-seven-team6-front) |

## 팀원

| [이상욱](https://github.com/NewL1f3)                                 | [김보경](https://github.com/bgk614)                                 | [엄규리](https://github.com/ammgree)                                 | [박형익](https://github.com/Sw-twt)                                 | [김태회](https://github.com/F-los)                                 |
| -------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| <img src="https://avatars.githubusercontent.com/NewL1f3" width="80"> | <img src="https://avatars.githubusercontent.com/bgk614" width="80"> | <img src="https://avatars.githubusercontent.com/ammgree" width="80"> | <img src="https://avatars.githubusercontent.com/Sw-twt" width="80"> | <img src="https://avatars.githubusercontent.com/F-los" width="80"> |

## 기술 스택

<details>
<summary>📂 기술 스택 보기</summary>
<br>
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
</details>

## 팀원별 구현 기능 상세

### 이상욱 <sub>운동기록(조회/정렬/검색)</sub>

<details>
<summary> 구현 내용 </summary>
<img width="1079" height="910" alt="1" src="https://github.com/user-attachments/assets/9b540d28-5aa7-4cf0-a4a1-5d366ec45eac" />
<img width="1096" height="805" alt="2" src="https://github.com/user-attachments/assets/3aabca3a-c0fc-451e-b5ab-ae6784da8d3d" />
<img width="1069" height="805" alt="3" src="https://github.com/user-attachments/assets/ee451050-53e7-4eea-8b19-2e9e2854d692" />
<img width="1096" height="781" alt="4" src="https://github.com/user-attachments/assets/7dd16df1-a5fc-4dce-b09d-1848561324f4" />
<img width="1127" height="796" alt="5" src="https://github.com/user-attachments/assets/531e6b40-ff70-4eb6-8eb3-c65e85608c48" />
<img width="1088" height="774" alt="6" src="https://github.com/user-attachments/assets/edf1bda5-239c-4810-b2df-b552044723c5" />
</details>

### 김보경 <sub>그룹 DB, 그룹(생성/수정/삭제)</sub>
<details>
<summary>
  📁 자세히 보기
</summary>
  <table>
 <tr>
  <td>
   <mark>그룹</mark><br>등록<br>수정<br>삭제<br><mark>이미지 업로드</mark><br>참여자 인증
  </td>
  <td>
   <img src="https://github.com/user-attachments/assets/abbd95b7-60ff-48cf-a529-c4aef2d53775" width="300"/>
  </td>
 </tr>
 <tr>
  <td>
   <mark>Husky</mark> 이용<br>Prettier<br>Lint<br>Build 자동화<br>Lint 규칙 설정
  </td>
  <td>
   <img src="https://github.com/user-attachments/assets/85c924b5-6c41-418d-bbc7-b01f8d6f2e05" width="300"/>
  </td>
 </tr>
 <tr>
  <td>
   <mark>GitHub Actions CD</mark> 이용<br>백엔드 배포 자동화<br><br>+<br> AWS EC2 / RDS<br>Vercel(프론트)
  </td>
  <td>
   <img src="https://github.com/user-attachments/assets/208f52e5-524e-4bd8-8395-0c2fea7496d0" width="300"/>
  </td>
 </tr>
 <tr>
  <td>
   그룹 & 이미지<br><mark>Swagger</mark>문서 작성<br>및 파일 분리
  </td>
  <td>
   <img src="https://github.com/user-attachments/assets/b9739d20-cbdc-4b2f-8046-feb749733fd3" width="300"/>
  </td>
 </tr>
 <tr>
  <td>
   <mark>gotty</mark>이용<br>서버 로그 실시간<br>웹뷰어 설정
  </td>
  <td>
   <img src="https://github.com/user-attachments/assets/fb31588f-63d9-4dd0-bed8-69ef0227378a" width="300"/>
  </td>
 </tr>
 <tr>
  <td>
   <mark>ERD</mark>
  </td>
  <td>
   <img src="https://github.com/user-attachments/assets/6f454c37-9185-4f23-b975-582ace41f0a9" width="300"/>
  </td>
 </tr>
 <tr>
  <td>
   <mark>Deployment Diagram</mark>
  </td>
  <td>
   <img src="https://github.com/user-attachments/assets/9742f3fc-6090-41a8-b282-614ca4d72cc8" width="300"/>
  </td>
 </tr>
</table>

- 참여자의 그룹 탈퇴 상황 케이스 처리
- 그룹 응답 데이터 프론트와 일치시키는 매핑 개발
- 배지 테스트를 위한 목업 데이터 만들기
</details>

### 엄규리 <sub>그룹(조회/정렬/검색)</sub>

![ezgif-79107d9dacac90](https://github.com/user-attachments/assets/c4c2e055-efbb-40d2-a64d-397949c1445d)


### 박형익 <sub>그룹(배지/참여/추천)</sub>
-뱃지 표시
<img width="1248" height="639" alt="Image" src="https://github.com/user-attachments/assets/b2a69ce8-4d62-4c0d-93e4-342e731e1600" />
-추천 참여 api
<img width="1917" height="913" alt="Image" src="https://github.com/user-attachments/assets/1490e234-5c28-4691-a0fb-c5ab48bb5eac" />
<img width="1913" height="156" alt="Image" src="https://github.com/user-attachments/assets/40517e65-d192-4162-8b3e-56db76a94c4d" />
-orm최적화
<img width="1656" height="954" alt="Image" src="https://github.com/user-attachments/assets/5b44fe07-ddc9-41be-b0b8-a62213448c5a" />

### 김태회 <sub>기록 DB, 운동기록(생성/수정/삭제)</sub>
<details>
  <summary> 개발 내용 </summary>
  - vitest를 통한 전체적인 기능점검
  <img width="1012" height="766" alt="image" src="https://github.com/user-attachments/assets/844cb69b-1d2f-4ff7-a5e6-71187adf0320" />
  <img width="849" height="512" alt="image" src="https://github.com/user-attachments/assets/06ae5bcf-5310-47b7-980a-cf36b14c3ec1" />

  - 백앤드의 설정한 fields 값이 아닐경우 request를 reject한후 무슨 값이 필요한지 알려주는 기능
  <img width="1265" height="922" alt="image" src="https://github.com/user-attachments/assets/8eff89b6-ad3b-4180-aff6-184f9843cfaa" />

  - 직접 타이머 api를 구축해 실제로 UI 시작 종료를 누르는시간을 서버타임으로 계산후 검증기능 구축
  <img width="741" height="915" alt="image" src="https://github.com/user-attachments/assets/68a59c54-1421-4b1f-8ca6-b13f405e861d" />

  - 운동기록/사진 검증 및 등록 기능 구축

</details>


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
│   │   ├── group
│   │   │   ├── create_group.controller.ts
│   │   │   ├── delete_group.controller.ts
│   │   │   ├── get_group_by_id.controller.ts
│   │   │   ├── get_group_mem_rank.controller.ts
│   │   │   ├── get_group.controller.ts
│   │   │   ├── index.ts
│   │   │   ├── join_group.controller.ts
│   │   │   ├── leave_group.controller.ts
│   │   │   ├── recommend_group.controller.ts
│   │   │   └── update_group.controller.ts
│   │   └── record.controller.ts
│   ├── generated
│   ├── index.ts
│   ├── middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── group.middleware.ts
│   │   ├── index.ts
│   │   └── validate.middleware.ts
│   ├── models
│   │   ├── auth
│   │   │   ├── auth_request.model.ts
│   │   │   ├── auth_response.model.ts
│   │   │   └── index.ts
│   │   ├── error_response.model.ts
│   │   ├── group
│   │   │   ├── create_group.dto.ts
│   │   │   ├── delete_group.dto.ts
│   │   │   ├── group_response.dto.ts
│   │   │   ├── index.ts
│   │   │   └── update_group.dto.ts
│   │   └── upload
│   │       ├── upload_request.model.ts
│   │       └── upload_response.model.ts
│   ├── routes
│   │   ├── group.routes.ts
│   │   ├── record.routes.ts
│   │   ├── timer.routes.ts
│   │   ├── upload.route.ts
│   │   └── uploads
│   ├── services
│   │   ├── group
│   │   │   ├── badge_evaluation.service.ts
│   │   │   ├── create_group.service.ts
│   │   │   ├── delete_group.service.ts
│   │   │   ├── get_group_by_id.service.ts
│   │   │   ├── get_group_mem_rank.service.ts
│   │   │   ├── get_group.service.ts
│   │   │   ├── index.ts
│   │   │   ├── join_group.service.ts
│   │   │   ├── leave_group.service.ts
│   │   │   ├── recommend_group.service.ts
│   │   │   └── update_group.service.ts
│   │   └── record.service.ts
│   ├── swagger
│   │   ├── components
│   │   │   ├── examples
│   │   │   ├── index.yaml
│   │   │   ├── parameters
│   │   │   ├── responses
│   │   │   └── schemas
│   │   ├── info
│   │   │   └── index.yaml
│   │   ├── paths
│   │   │   ├── group
│   │   │   ├── index.yaml
│   │   │   ├── record
│   │   │   ├── timer
│   │   │   └── upload
│   │   ├── server
│   │   │   └── index.yaml
│   │   ├── swagger.yaml
│   │   └── tags
│   │       └── index.yaml
│   ├── tests
│   │   ├── api.test.ts
│   │   └── setup.ts
│   └── utils
│       ├── auth.util.ts
│       ├── discord.ts
│       ├── mappers
│       │   └── group.mapper.ts
│       ├── password.ts
│       └── timer.ts
├── test_webhook.js
├── test.txt
├── tsconfig.json
├── uploads
├── eslint.config.js
├── package-lock.json
├── package.json
├── README.md
├── seed.js
└── vitest.config.ts
```

</details>
