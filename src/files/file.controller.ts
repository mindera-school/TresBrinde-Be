import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Res} from "@nestjs/common";
import {Public} from "../decorators/public.decorator";
import {FileService} from "./file.service";

@ApiTags("File")
@Controller('file')
@ApiBearerAuth("JWT-auth")
export class FileController {
    constructor(
        private readonly fileService: FileService
    ) {
    }

    @Get('/image/:url')
    @ApiOperation({summary: 'Gets a specific image from the fileSystem'})
    @Public()
    async download(@Param('url') url: string, @Res() res) {
        const image = await this.fileService.download(url)
        res.header("Content-type", 'image/*')
        res.send(image);
    }
}