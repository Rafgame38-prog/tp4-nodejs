import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API TP4 Auth & Rôles',
    version: '1.0.0',
    description: 'Documentation de l’API TP4 (authentification, gestion des rôles)',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Serveur local',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{ bearerAuth: [] }],
};

export const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};

export const swaggerSpec = swaggerJSDoc(options);
