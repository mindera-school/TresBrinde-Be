import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SendBudgetDto } from "./dto/sendBudget.dto";
import { ProductService } from "../products/services/product.service";
import { join } from "path";
import { InternalServerErrorDto } from "src/errorDTOs/internalServerError.Dto";
import { ProductNotFoundDto } from "src/errorDTOs/productNotFound.Dto";

@Injectable()
export class EmailService {
  constructor(
    private readonly mailSender: MailerService,
    private readonly productService: ProductService
  ) {}

  async sendBudget(body: SendBudgetDto) {
    try {
      const { budgets, toEmail, name, address, zipCode, message } = body;

      const emailData = {
        to: toEmail.toString(),
        cc: process.env.CC_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: "Budget Request",
        template: "budget",
        context: {
          name,
          toEmail,
          address,
          zipCode,
          message,
          budgets: [],
        },
        attachments: [],
      };

      const updatedBudgets: any[] = [];

      for (const budget of budgets) {
        const productDetails = await this.productService.findOne(
          budget.productId
        );

        if (!productDetails) {
          throw new ProductNotFoundDto;
        }

        let imagePath;
        if (productDetails.mainImage !== null) {
          imagePath = join(process.cwd(), productDetails.mainImage);
        }

        const updatedBudget = {
          ...budget,
          productId: productDetails.id,
          productName: productDetails.productName,
          mainImage: imagePath ? `cid:image-${budget.productId}` : null,
        };
        updatedBudgets.push(updatedBudget);

        if (imagePath) {
          const attachment = {
            filename: productDetails.mainImage,
            path: imagePath,
            cid: `image-${budget.productId}`,
          };

          emailData.attachments.push(attachment);
        }
      }

      emailData.context.budgets = updatedBudgets;

      await this.mailSender.sendMail(emailData);

      return "Email sent successfully";
    } catch (error) {
      if (error instanceof ProductNotFoundDto) {
        throw new ProductNotFoundDto;
      }
      throw new InternalServerErrorDto();
    }
  }
}
