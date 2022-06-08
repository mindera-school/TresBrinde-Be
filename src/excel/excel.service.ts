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

		let sheet = book.addWorksheet("Sheet 1");

		sheet.addRows(rows);

		let File = await new Promise(
			(resolve, reject) => {
				tmp.file(
					{ discardDescriptor: true, prefix: `MyExcelSheet`, postfix: ".xlsx", mode: parseInt("0600", 8) },
					async (err, file) => {
						if (err) {
							throw new BadRequestException(err);
						}

						book.xlsx
							.writeFile(file)
							.then(
								(_) => {
									resolve(file);
								},
							)
							.catch(
								(err) => {
									throw new BadRequestException(err);
								},
							);
					},
				);
			},
		);
		return File;
	}
}