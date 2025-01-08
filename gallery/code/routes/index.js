import express from 'express';
import { 
  addNewArt, 
  getAllGalleries, 
  getAllPlaceholders, 
  getArt, 
  getArtByUser, 
  getGallery, 
  getPlaceholder, 
  updateArt, 
  deleteArt 
} from '../controllers/GalleryController.js';
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
 * /galleries:
 *   get:
 *     summary: Get all galleries
 *     description: Retrieve a list of all galleries.
 *     responses:
 *       200:
 *         description: A list of galleries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gallery'
 */
router.get('/galleries', cors(), getAllGalleries);

/**
 * @swagger
 * /user/{id}/art:
 *   get:
 *     summary: Get all art by a user
 *     description: Retrieve a list of all art created by a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: A list of art.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Art'
 */
router.get('/user/:id/art', cors(), getArtByUser);

/**
 * @swagger
 * /placeholders:
 *   get:
 *     summary: Get all placeholders
 *     description: Retrieve a list of all placeholders.
 *     responses:
 *       200:
 *         description: A list of placeholders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Placeholder'
 */
router.get('/placeholders', cors(), getAllPlaceholders);

/**
 * @swagger
 * /gallery/{galleryId}/user/{userId}/art:
 *   post:
 *     summary: Add new art
 *     description: Add new art to a gallery.
 *     parameters:
 *       - in: path
 *         name: galleryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the gallery.
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *             required:
 *               - title
 *               - image
 *     responses:
 *       201:
 *         description: Art created successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/gallery/:galleryId/user/:userId/art', cors(), addNewArt);

/**
 * @swagger
 * /gallery/{id}:
 *   get:
 *     summary: Get a specific gallery by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the gallery.
 *     responses:
 *       200:
 *         description: A specific gallery.
 *       404:
 *         description: Gallery not found.
 */
router.get('/gallery/:id', cors(), getGallery);

/**
 * @swagger
 * /art/{id}:
 *   get:
 *     summary: Get a specific art piece by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the art.
 *     responses:
 *       200:
 *         description: A specific art piece.
 *       404:
 *         description: Art not found.
 */
router.get('/art/:id', cors(), getArt);

/**
 * @swagger
 * /placeholder/{id}:
 *   get:
 *     summary: Get a specific placeholder by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the placeholder.
 *     responses:
 *       200:
 *         description: A specific placeholder.
 *       404:
 *         description: Placeholder not found.
 */
router.get('/placeholder/:id', cors(), getPlaceholder);

/**
 * @swagger
 * /art/{id}:
 *   put:
 *     summary: Update an art piece by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the art.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *             required:
 *               - title
 *               - image
 *     responses:
 *       200:
 *         description: Art updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Art not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/art/:id', cors(), updateArt);

/**
 * @swagger
 * /art/{id}:
 *   delete:
 *     summary: Delete an art piece by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the art.
 *     responses:
 *       200:
 *         description: Art deleted successfully.
 *       404:
 *         description: Art not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/art/:id', cors(), deleteArt);

export default router;