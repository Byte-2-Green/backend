import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Challenges Service API",
    version: "1.0.0",
    description: "Endpoints for the Challenges microservice",
  },
  servers: [
    {
      url: "http://localhost:3012",
      description: "Challenges Service",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/index.js"], // Adjust this to the path where your route files are stored
};

export default swaggerJSDoc(options);