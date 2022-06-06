import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { data } from "./data";
import { createReadStream } from "fs";
import { Workbook } from "exceljs";
import * as tmp from "tmp";
import { join } from "path";
import { writeFile } from "fs/promises";

@Injectable()
export class ExcelService {
	async downloadExcel() {
		if (!data) {
			throw new NotFoundException("No data to download");
		}

		let rows = [];

		data.forEach(
			(doc) => {
				rows.push(Object.values(doc));
			},
		);

		let book = new Workbook();

		book.xlsx.writeFile("whatever")

		return createReadStream(join(process.cwd(), file));
	}
}
