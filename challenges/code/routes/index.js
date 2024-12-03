import express from 'express';
import { test, getNotificationByChallengeId, getNotificationById, getNotifications, createNotification} from '../controllers/challengesController.js';
import cors from 'cors';
const app = express();
const router = express.Router();

router.get('/challenges', cors(), test);

router.get('/notifications', cors(), getNotifications);

router.get('/notifications/:id', cors(), getNotificationById);

router.get('/notifications/challenge/:id', cors(), getNotificationByChallengeId);

router.post('/notifications', cors(), createNotification);

export default router;
