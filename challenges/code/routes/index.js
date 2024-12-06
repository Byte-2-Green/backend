import express from 'express';
import cors from 'cors';
import { test, denyChallenge, getDeniedChallenges } from '../controllers/challengesController.js';

const router = express.Router();

router.get('/challenges', test);
router.post('/challenges/deny/:id', denyChallenge);
router.get('/denied-challenges', getDeniedChallenges);

export default router;