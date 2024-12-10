
import express from 'express';
import { getAllStatistics, getStatsByUserId, getStatsById } from '../controllers/UserController.js';
import swaggerUi from "swagger-ui-express";
import { checkIfWork } from '../middleware/UserMiddelware.js';
import swaggerSpec from "./swagger-config.js";
import cors from 'cors';

const app = express();
const router = express.Router();

// Serve the Swagger UI at /api-docs
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Enable CORS
router.use(cors());



/**
 * @swagger
 * /stats:
 *  get:
 *   summary: Get all statistics
 *  description: Get all statistics from the database
 *  responses:
 *   200:
 *   description: A list of statistics
 */
router.get('/stats', getAllStatistics);

/**
 * @swagger
 * /stats/{userId}:
 * get:
 * summary: Get statistics by user ID
 * description: Get statistics from the database by user ID
 * parameters:
 * - in: path
 * name: userId
 * required: true
 * 
 */
router.get('/stats/user/:userId', getStatsByUserId);

/**
 * @swagger
 * /stats/{statId}:
 * get:
 * summary: Get statistics by ID
 * description: Get statistics from the database by ID
 * parameters:
 * - in: path
 * name: statId
 * required: true
 */
router.get('/stats/:statId', getStatsById);

export default router;
