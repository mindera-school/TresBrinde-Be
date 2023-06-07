import {Request} from 'express';
import {extname} from 'path';
import {HttpException, HttpStatus} from "@nestjs/common";

export const editFileName = (
    req: Request,
    file: Express.Multer.File,
    callback
) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback
) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new HttpException("Only image files([.jpg], [.jpeg], [.png]) are allowed!", HttpStatus.CONFLICT), false);
    }
    callback(null, true);
};