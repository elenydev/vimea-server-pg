import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";
import e from "express";

const fileDestination = "uploads";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    fs.mkdirSync(fileDestination, { recursive: true });
    callback(null, fileDestination);
  },
  filename: (req, file, callback) => {
    callback(null, `${v4() + path.extname(file.originalname)}`);
  },
});

const fileFilter = (req: e.Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 512 * 1024 * 1024,
  },
});

export default upload;
