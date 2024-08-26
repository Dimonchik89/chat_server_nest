import { Injectable } from "@nestjs/common";
import { handleError } from "../services/error";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import * as sharp from "sharp";

@Injectable()
export class FileService {
  async saveFile(file): Promise<string> {
    try {
      // const fileExtension = file.originalname.split(".").pop();
      const fileName = `${uuid.v4()}.webp`;
      const filePath = path.resolve(__dirname, "../..", "static/chatAvatar");

      if(!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }
      // fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      await sharp(file.buffer)
        .resize(320, 240)
        .toFormat("webp")
        .toFile(path.resolve(__dirname, "../..", "static/chatAvatar", fileName));
      return `/chatAvatar/${fileName}`;
    } catch(error) {
      return handleError(error)
    }
  }
}