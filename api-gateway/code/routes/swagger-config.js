import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "API Gateway Documentation",
      version: "1.0.0",
      description: "Documentation for API microservices",
    },
    servers: [
      {
        url: "http://localhost:3010", // API Gateway base URL
        description: "API Gateway",
      }
    ],
  };

const options = {
  swaggerDefinition,
  apis: [
    "./routes/index.js" // Routes from api-gateway
  ], 
};

export default swaggerJSDoc(options);