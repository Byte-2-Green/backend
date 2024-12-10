import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
const router = express.Router();

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

const userProxy = createProxyMiddleware({
  target:'http://users:3013',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error(`Error occurred while proxying: ${err.message}`);
    res.status(502).json({ error: 'Microservice unavailable' });
  },
});

router.use('/educational', cors(), educationalProxy);

router.use('/challenges', cors(), challengeProxy);

router.use('/users', cors(), userProxy);

export default router;
