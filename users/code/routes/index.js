import express from 'express';
import { getAllUsers, getUserById, createUser, updateTotalCo2, getCo2Saved, getTotalCo2Saved, login } from '../controllers/UserController.js';
import swaggerUi from "swagger-ui-express";
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
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 */
router.get('/users', getAllUsers);
 
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post('/login', login);
 
/**
 * @swagger
 * /users/co2saved:
 *   get:
 *     summary: Get total CO2 saved by all users combined
 *     description: Retrieve the total CO2 saved by all users combined
 *     responses:
 *       200:
 *         description: The total CO2 saved by all users combined
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCO2:
 *                   type: number
 *                   description: The total CO2 saved by all users combined
 */
router.get('/users/co2saved', getTotalCo2Saved);
 
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The user with the specified ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/users/:id', getUserById);
 
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the specified details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password for the user
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid user details
 *       500:
 *         description: Internal Server Error
 */
router.post('/users', createUser);
 
/**
 * @swagger
 * /users/{id}/co2saved:
 *   put:
 *     summary: Update Total_Co2_saved for a user
 *     description: Update the Total_Co2_saved for a user with the specified ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               co2ToAdd:
 *                 type: number
 *                 description: The amount of CO2 to add to the user's Total_Co2_saved
 *     responses:
 *       200:
 *         description: Total CO2 saved updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 newTotal:
 *                   type: number
 *                   description: The new Total_Co2_saved for the user
 *               required:
 *                 - message
 *                 - newTotal
 *       400:
 *         description: Invalid CO2 value
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/users/:id/co2saved', updateTotalCo2);
 
/**
 * @swagger
 * /users/{id}/co2saved:
 *   get:
 *     summary: Get CO2 saved by user
 *     description: Retrieve the total CO2 saved by a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The total CO2 saved by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 co2Saved:
 *                   type: number
 *                   description: The total CO2 saved by the user
 */
router.get('/users/:id/co2saved', getCo2Saved);
 
router.get('/user/:userId', cors(), getUserById);
 
export default router;