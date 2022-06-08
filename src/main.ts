import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import helmet from "fastify-helmet";
import { contentParser } from "fastify-multer";
import { join } from "path";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({ bodyLimit: 100000000, logger: true }),
	);
	app.enableCors();
	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("Três brindes")
		.setDescription("The três Brindes API description")
		.setVersion("1.0")
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				name: "JWT",
				description: "Enter JWT token",
				in: "Authorization",
			},
			"JWT-auth", // This name here is important for matching up with @ApiBearerAuth() in your controller!
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);

	await app.register(
		helmet,
		{
			contentSecurityPolicy: {
				directives: {
					imgSrc: [`'self'`, "blob:", "data"],
					defaultSrc: [`'self'`],
					styleSrc: [`'self'`, `'unsafe-inline'`],
					scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
				},
			},
		},
	);

	await app.register(contentParser);

	app.useStaticAssets({ root: join(__dirname, "../../tresbrindes-be") });

	SwaggerModule.setup("swagger", app, document);

	await app.listen(8080);
}

bootstrap();
