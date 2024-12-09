import express from 'express';
import { test, getNotificationByChallengeId, getNotificationById, getNotifications, createNotification, denyChallenge, getDeniedChallenges } from '../controllers/challengesController.js';
import cors from 'cors';

const router = express.Router();

router.get('/challenges', test);

router.post('/challenges/deny/:id', cors(), denyChallenge);

router.get('/denied-challenges', cors(), getDeniedChallenges);

router.get('/notifications', cors(), getNotifications);

router.get('/notifications/:id', cors(), getNotificationById);

router.get('/notifications/challenge/:id', cors(), getNotificationByChallengeId);

router.post('/notifications', cors(), createNotification);

export default router;
