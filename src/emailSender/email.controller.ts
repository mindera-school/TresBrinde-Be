import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/decorators/public.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { SendBudgetDto } from "./dto/sendBudget.dto";
import { EmailService } from "./email.service";
import { OPERATION_FAILED, PRODUCT_NOT_FOUND_EXCEPTION } from "src/constants";
import { ProductNotFoundDto } from "src/errorDTOs/productNotFound.Dto";
import { InternalServerErrorDto } from "src/errorDTOs/internalServerError.Dto";

@ApiTags("Email")
@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post("send-budget")
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
  sendEmail(@Body() body: SendBudgetDto) {
    return this.emailService.sendBudget(body);
  }
}
