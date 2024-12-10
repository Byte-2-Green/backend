
import express from 'express';
import { } from '../controllers/UserController.js';
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

export default router;
