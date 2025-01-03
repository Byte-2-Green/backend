
import express from 'express';
import { getAllGalleries, getAllPlaceholders, getArt, getArtByUser, getGallery, getPlaceholder, updateArt, deleteArt } from '../controllers/GalleryController.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger-config.js";
import cors from 'cors';

const app = express();
const router = express.Router();

// Serve the Swagger UI at /api-docs
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Enable CORS
router.use(cors());

// Routes for testing purposes
router.get('/galleries', cors(), getAllGalleries);
router.get('/user/:id/art', cors(), getArtByUser);
router.get('/placeholders', cors(), getAllPlaceholders);

// Logic for the actual app
router.get('/gallery/:id', cors(), getGallery);
router.get('/art/:id', cors(), getArt);
router.get('/placeholder/:id', cors(), getPlaceholder);
router.put('/art/:id', cors(), updateArt);
router.delete('/art/:id', cors(), deleteArt);

export default router;
