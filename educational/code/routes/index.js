import express from 'express';
import { responseFoodForThought, updateFoodForThought, responseByIdFoodForThought, responseByCategoryExample } from '../controllers/foodForThoughtController.js'; // Adjust the path to your file
import { checkIfWork } from '../middleware/foodForThougthMiddelware.js';
import cors from 'cors';
const app = express();
const router = express.Router();

// Route to get all food for thought
router.get('/foodForThought', cors(), checkIfWork, responseFoodForThought);

// Route to add a new food for thought
router.post('/foodForThought', cors(), checkIfWork, updateFoodForThought);

// Route to get a specific food for thought by ID
router.get('/foodForThought/:id', cors(), checkIfWork, responseByIdFoodForThought);

// Route to get all food for thought by category
router.get('/foodForThought/category/:category', cors(), checkIfWork, responseByCategoryExample);

export default router;
