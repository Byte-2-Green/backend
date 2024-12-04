import express from 'express';
import { test, denyChallenge } from '../controllers/challengesController.js';
import cors from 'cors';

const app = express();
const router = express.Router();

router.get('/challenges', cors(), test);

router.post('/challenges/deny', cors(), denyChallenge);

export default router;
