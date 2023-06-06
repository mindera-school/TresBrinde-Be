import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Injectable()
export class FileSizeLimitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const totalFileSize = req.files.reduce(
      (total, file) => total + file.size,
      0
    );

    const maxTotalFileSize = 10 * 1024 * 1024;

    if (totalFileSize > maxTotalFileSize) {
      throw new HttpException(
        "Total file size exceeded",
        HttpStatus.BAD_REQUEST
      );
    }

    next();
  }
}
