
import express from 'express';
import { responseFoodForThought, updateFoodForThought, responseByIdFoodForThought, responseByCategoryExample } from '../controllers/foodForThoughtController.js';
import swaggerUi from "swagger-ui-express";
import { checkIfWork } from '../middleware/foodForThougthMiddelware.js';
import swaggerSpec from "./swagger-config.js";
import cors from 'cors';

const app = express();
const router = express.Router();

// Serve the Swagger UI at /api-docs
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /foodForThought:
 *   get:
 *     summary: Get all food for thought
 *     responses:
 *       200:
 *         description: A list of food for thought items
 */
router.get('/foodForThought', cors(), checkIfWork, responseFoodForThought);

/**
 * @swagger
 * /foodForThought:
 *   post:
 *     summary: Add a new food for thought
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Food for thought created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/foodForThought', cors(), checkIfWork, updateFoodForThought);

/**
 * @swagger
 * /foodForThought/{id}:
 *   get:
 *     summary: Get a specific food for thought by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the food for thought
 *     responses:
 *       200:
 *         description: A specific food for thought item
 *       404:
 *         description: Food for thought not found
 */
router.get('/foodForThought/:id', cors(), checkIfWork, responseByIdFoodForThought);

/**
 * @swagger
 * /foodForThought/category/{category}:
 *   get:
 *     summary: Get food for thought by category
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category of food for thought
 *     responses:
 *       200:
 *         description: A list of food for thought items in the specified category
 *       404:
 *         description: No items found for the specified category
 */
router.get('/foodForThought/category/:category', cors(), checkIfWork, responseByCategoryExample);

export default router;
