import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "src/decorators/public.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { SendBudgetDto } from "./dto/sendBudget.dto";
import { EmailService } from "./email.service";

@ApiTags("Email")
@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post("send-budget")
  @Public()
  @Roles()
  @ApiOperation({ summary: "Send email" })
  sendEmail(@Body() body: SendBudgetDto) {
    return this.emailService.sendBudget(body);
  }
}
