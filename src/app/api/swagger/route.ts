// File: src/app/api/swagger/route.ts
import { NextRequest } from 'next/server';
import swaggerJSDoc from 'swagger-jsdoc';

export async function GET(request: NextRequest) {
  // your OpenAPI definition
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
    },
  };

  // point at your actual source files under app/api
  const options = {
    swaggerDefinition,
    apis: ['src/app/api/**/*.ts'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  return new Response(JSON.stringify(swaggerSpec), {
    headers: { 'Content-Type': 'application/json' },
  });
}
