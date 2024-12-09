import express from 'express';
import { test, getNotificationByChallengeId, getNotificationById, getNotifications, createNotification, denyChallenge, getDeniedChallenges } from '../controllers/challengesController.js';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger-config.js";

const router = express.Router();

// Serve Swagger UI at /api-docs
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

router.post('/challenges/deny/:id', cors(), denyChallenge);

router.get('/denied-challenges', cors(), getDeniedChallenges);

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
 * /notifications/challenge/{id}:
 *   get:
 *     summary: Get notifications by challenge ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The challenge ID to filter notifications
 *     responses:
 *       200:
 *         description: A list of notifications related to the specified challenge
 *       404:
 *         description: No notifications found for this challenge
 */
router.get('/notifications/challenge/:id', cors(), getNotificationByChallengeId);

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
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/notifications', cors(), createNotification);

export default router;

