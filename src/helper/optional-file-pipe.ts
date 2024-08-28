import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class OptionalFilePipe implements PipeTransform {
  transform(file: Express.Multer.File | undefined, metadata: ArgumentMetadata) {
    if (!file) {
      return file;
    }

    return file;
  }
}