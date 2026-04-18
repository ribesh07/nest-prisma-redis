import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import * as fs from 'fs';
import * as path from 'path';


const theme = new SwaggerTheme();

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation for backend services')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  // Auto-generate from Nest
  const nestDocument = SwaggerModule.createDocument(app, config);

  // OPTIONAL: Merge custom additions
  const customDocPath = path.join(process.cwd(), 'src/docs/custom-swagger.json');

  let finalDocument = nestDocument;

  if (fs.existsSync(customDocPath)) {
    const customDoc = JSON.parse(fs.readFileSync(customDocPath, 'utf8'));

    // merge automatic + custom
    finalDocument = {
      ...nestDocument,
      ...customDoc,
      paths: {
        ...nestDocument.paths,
        ...customDoc.paths,
      },
      components: {
        ...nestDocument.components,
        ...customDoc.components,
      },
    };
  }

  SwaggerModule.setup('docs', app, finalDocument, {
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
  },
  customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
  customSiteTitle: 'API Docs',
});


// OPTIONAL: Export swagger.json (for clients, SDKs, etc.)
  const outputPath = path.join(process.cwd(), 'swagger.json');
  fs.writeFileSync(outputPath, JSON.stringify(finalDocument, null, 2));
  console.log('📄 Swagger JSON exported → swagger.json');
}