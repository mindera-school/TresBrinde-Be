import { Controller, Get, Res, Header } from "@nestjs/common";
import { Response } from "express";
import { ExcelService } from "./excel.service";
import { Roles } from "../decorators/roles.decorator";
import { Public } from "../decorators/public.decorator";

@Controller('excel')
export class ExcelController {
	constructor(private excelService: ExcelService) {}

	@Public()
	@Get('download')
	@Roles()
    @Header ('Content-Type', 'text/xlsx')
	getFile(): StreamableFile {
		return new StreamableFile(this.excelService.downloadExcel());
	}
	/*async downloadReport(@Res() res: Response) {
		let result = await this.excelService.downloadExcel();
		res.header("Content-type", "text/xlsx");
		res.download(`${result}`);
	}*/
}
