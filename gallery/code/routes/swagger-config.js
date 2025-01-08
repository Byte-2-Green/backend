import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Users Service API",
    version: "1.0.0",
    description: "Endpoints for the Users microservice",
  },
  servers: [
    {
      url: "http://localhost:3014",
      description: "Educational Service",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/index.js"], // Adjust this to the path where your route files are stored
};

export default swaggerJSDoc(options);