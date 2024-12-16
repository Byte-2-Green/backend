import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Educational Service API",
    version: "1.0.0",
    description: "Endpoints for the Educational microservice",
  },
  servers: [
    {
      url: "http://localhost:3011",
      description: "Educational Service",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/index.js"], // Adjust this to the path where your route files are stored
};

export default swaggerJSDoc(options);