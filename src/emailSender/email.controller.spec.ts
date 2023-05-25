import { Test, TestingModule } from "@nestjs/testing";
import { EmailController } from "src/emailSender/email.controller";

describe("EmailController", () => {
  let controller: EmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
    }).compile();

    controller = module.get<EmailController>(EmailController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
