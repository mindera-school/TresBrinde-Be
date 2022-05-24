import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {readFile} from "fs/promises";

@Injectable()
export class FileService {
    constructor() {
    }

    async download(url: string): Promise<Buffer> {
        try {
            return await readFile(url)
        } catch (e) {
            throw new HttpException("Image not found", HttpStatus.NOT_FOUND)
        }
    }
}