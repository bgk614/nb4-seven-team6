import { Router, Request, Response } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
export const uploadRouter = Router();

const UPLOADS_FOLDER = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// base URL (환경변수로 주입, 기본값은 로컬 테스트용)
const BASE_URL = process.env.UPLOAD_BASE_URL || 'http://localhost:6123';

uploadRouter.post(
  '/',
  upload.array('files', 3), // 최대 3개 파일 (단일 파일도 처리 가능)
  (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const singleFile = req.file as Express.Multer.File;
    // 복수 파일 처리
    if (files && files.length > 0) {
      const urls = files.map((file) => `${BASE_URL}/uploads/${file.filename}`);
      return res.json({ urls });
    }
    // 단일 파일 처리 (기존 API 호환성)
    if (singleFile) {
      const fileUrl = `${BASE_URL}/uploads/${singleFile.filename}`;
      return res.json({ url: fileUrl, urls: [fileUrl] });
    }

    return res.status(400).json({ message: 'No files uploaded' });
  },
);
