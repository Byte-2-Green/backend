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
 *     description: Retrieve a list of all food for thought items.
 *     responses:
 *       200:
 *         description: A list of food for thought items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FoodForThought'
 *       500:
 *         description: Internal Server Error.
 */
router.get('/foodForThought', cors(), checkIfWork, responseFoodForThought);

/**
 * @swagger
 * /foodForThought:
 *   post:
 *     summary: Add a new food for thought
 *     description: Create a new food for thought item with the provided title and description.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the food for thought.
 *               description:
 *                 type: string
 *                 description: The description of the food for thought.
 *             required:
 *               - title
 *               - description
 *     responses:
 *       201:
 *         description: Food for thought created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 foodForThought:
 *                   $ref: '#/components/schemas/FoodForThought'
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/foodForThought', cors(), checkIfWork, updateFoodForThought);

/**
 * @swagger
 * /foodForThought/{id}:
 *   get:
 *     summary: Get a specific food for thought by ID
 *     description: Retrieve a food for thought item by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the food for thought.
 *     responses:
 *       200:
 *         description: A specific food for thought item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodForThought'
 *       404:
 *         description: Food for thought not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/foodForThought/:id', cors(), checkIfWork, responseByIdFoodForThought);

/**
 * @swagger
 * /foodForThought/category/{category}:
 *   get:
 *     summary: Get food for thought by category
 *     description: Retrieve a list of food for thought items filtered by category.
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category of food for thought.
 *     responses:
 *       200:
 *         description: A list of food for thought items in the specified category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FoodForThought'
 *       404:
 *         description: No items found for the specified category.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/foodForThought/category/:category', cors(), checkIfWork, responseByCategoryExample);

export default router;