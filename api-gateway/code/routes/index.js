import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger-config.js";
const router = express.Router();

// Serve Swagger UI at /api-docs
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// create a proxy for each microservice
const educationalProxy = createProxyMiddleware({
  target:'http://educational:3011',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error(`Error occurred while proxying: ${err.message}`);
    res.status(502).json({ error: 'Microservice unavailable' });
  },
});

const challengeProxy = createProxyMiddleware({
  target:'http://challenges:3012',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error(`Error occurred while proxying: ${err.message}`);
    res.status(502).json({ error: 'Microservice unavailable' });
  },
});

// @swagger
// /educational:
//   use:
//     - cors
//     - educationalProxy
//   get:
//     summary: Proxy to educational microservice
//     responses:
//       200:
//         description: Successful response
router.use('/educational', cors(), educationalProxy);

// @swagger
// /challenges:
//   use:
//     - cors
//     - challengeProxy
//   get:
//     summary: Proxy to challenges microservice
//     responses:
//       200:
//         description: Successful response
router.use('/challenges', cors(), challengeProxy);

export default router;
