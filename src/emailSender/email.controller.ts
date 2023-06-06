import { Body, Controller, HttpException, HttpStatus, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/decorators/public.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { SendBudgetDto } from "./dto/sendBudget.dto";
import { EmailService } from "./email.service";
import { OPERATION_FAILED, PRODUCT_NOT_FOUND_EXCEPTION } from "src/constants";
import { ProductNotFoundDto } from "src/errorDTOs/productNotFound.Dto";
import { InternalServerErrorDto } from "src/errorDTOs/internalServerError.Dto";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "src/files/utils/file.upload";
import { FastifyFilesInterceptor } from "src/files/multipleFiles.interceptor";
import { Budget } from "./dto/budget.dto";
import { plainToClass } from "class-transformer";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Email")
@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post("send-budget")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FastifyFilesInterceptor("toPrintImages", {
      storage: diskStorage({
        destination: "./mail/images",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 2.5 * 1024 * 1024,
      },
    })
  )
  @Public()
  @Roles()
  @ApiOperation({ summary: "Send email" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PRODUCT_NOT_FOUND_EXCEPTION,
    type: ProductNotFoundDto,
  })
  @ApiResponse({
    status: 500,
    description: OPERATION_FAILED,
    type: InternalServerErrorDto,
  })
  sendEmail(
    @Body() body: SendBudgetDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request
  ) {
    const { budgets, ...rest } = body;
    let budgetsArray: [Budget];
    try {
      const budgetsString = `[${budgets}]`;
      budgetsArray = JSON.parse(budgetsString);
    } catch (error) {
    throw new HttpException(
      "Not Valid Budgets",
      HttpStatus.BAD_REQUEST
    );
    }

    const newBody = { ...rest, budgets: budgetsArray };

    return this.emailService.sendBudget(newBody, files);
  }
}
