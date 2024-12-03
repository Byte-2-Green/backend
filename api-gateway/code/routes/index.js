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

// route to educational microservice
router.use('/educational', cors(), educationalProxy);

router.use('/challenges', cors(), challengeProxy);

router.get('/', (req, res) => {
  res.send('Nothing to see here');
  });

export default router;
