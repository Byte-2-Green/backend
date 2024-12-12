import express from 'express';
import { test, getNotificationById, getNotifications, createNotification, denyChallenge, getDeniedChallenges, acceptChallenge, getAcceptedChallenges } from '../controllers/challengesController.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger-config.js';

const router = express.Router();

// Serve Swagger UI at /api-docs
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /challenges:
 *   get:
 *     summary: Get all challenges
 *     responses:
 *       200:
 *         description: A list of challenges
 */
router.get('/challenges', cors(), test);

/**
 * @swagger
 * /challenges/deny/{id}:
 *   post:
 *     summary: Deny a challenge
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the challenge to deny
 *     responses:
 *       200:
 *         description: Challenge denied successfully
 *       404:
 *         description: Challenge not found
 */
router.post('/challenges/deny/:id', cors(), denyChallenge);

/**
 * @swagger
 * /denied-challenges:
 *   get:
 *     summary: Get all denied challenges
 *     responses:
 *       200:
 *         description: A list of denied challenges
 */
router.get('/denied-challenges', cors(), getDeniedChallenges);

/**
 * @swagger
 * /challenges/accept/{id}:
 *   post:
 *     summary: Accept a challenge
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the challenge to challenge
 *     responses:
 *       200:
 *         description: Challenge accepted successfully
 *       404:
 *         description: Challenge not found
 */
router.post('/challenges/accept/:id', cors(), acceptChallenge);

/**
 * @swagger
 * /accepted-challenges:
 *   get:
 *     summary: Get all accepted challenges
 *     responses:
 *       200:
 *         description: A list of accepted challenges
 */
router.get('/accepted-challenges', cors(), getAcceptedChallenges);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     responses:
 *       200:
 *         description: A list of notifications
 */
router.get('/notifications', cors(), getNotifications);

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get a specific notification by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the notification
 *     responses:
 *       200:
 *         description: A specific notification
 *       404:
 *         description: Notification not found
 */
router.get('/notifications/:id', cors(), getNotificationById);

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               challengeId:
 *                 type: string
 *             required:
 *               - title
 *               - message
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/notifications', cors(), createNotification);

export default router;
