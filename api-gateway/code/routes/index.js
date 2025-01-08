import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
const router = express.Router();


router.use((req, res, next) => {
  next();
});

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
  target: 'http://challenges:3012',
  changeOrigin: true,
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error(`[CHALLENGES PROXY ERROR]: ${err.message}`);
    res.status(502).json({ error: 'Microservice Challenges unavailable' });
  }
});

const userProxy = createProxyMiddleware({
  target:'http://users:3013',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error(`Error occurred while proxying: ${err.message}`);
    res.status(502).json({ error: 'Microservice unavailable' });
  },
});

const galleryProxy = createProxyMiddleware({
  target:'http://gallery:3014',
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error(`Error occurred while proxying: ${err.message}`);
    res.status(502).json({ error: 'Microservice unavailable' });
  },
});

router.use('/educational', cors(), educationalProxy);

router.use('/challenges', cors(), challengeProxy);

router.use('/users', cors(), userProxy);

router.use('/gallery', cors(), galleryProxy);

export default router;
