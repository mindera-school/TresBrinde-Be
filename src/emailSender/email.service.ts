import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SendBudgetDto } from "./dto/sendBudget.dto";

@Injectable()
export class EmailService {
  constructor(private mailSender: MailerService) {}

  async sendBudget(body: SendBudgetDto) {
    await this.mailSender.sendMail({
      to: process.env.FROM_EMAIL,
      cc: body.toEmail.toString(),
      from: process.env.FROM_EMAIL,
      subject: "Test 2",
      template: "budget",
    });
    return "success";
  }
}
