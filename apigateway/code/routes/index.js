import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

// create a proxy for each microservice
const microserviceProxy = createProxyMiddleware({
  target: 'http://educational:3012',
  changeOrigin: true
});

router.use('/educational', microserviceProxy);

export default router;
