# nb4-seven-team6

## [🔗 노션](https://www.notion.so/24cb1b4efe4d80dc818cf37149e2f65b)

## 팀원 구성

이상욱 (https://github.com/NewL1f3)<br>
김보경 (https://github.com/bgk614)<br>
엄규리 (https://github.com/ammgree)<br>
박형익 (https://github.com/NewL1f3)<br>
김태회 (https://github.com/F-los)<br>

## 프로젝트 소개

운동 인증 커뮤니티 서비스의 백엔드 시스템 구축<br>
프로젝트 기간: 2025.08.11 ~ 2025.08.29<br>

## 기술 스택

Backend: TypeScript, Express.js, PrismaORM<br>
Database: PostgreSQL<br>
공통 Tool: Git & Github, Discord<br>

## 팀원별 구현 기능 상세

이상욱
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

김보경
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

엄규리
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

박형익
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

김태회
(자신이 개발한 기능에 대한 사진이나 gif 파일 첨부)

## 파일 구조

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

## 구현 홈페이지

(개발한 홈페이지에 대한 링크 게시)

## 프로젝트 회고록

(제작한 발표자료 링크 혹은 첨부파일 첨부)
