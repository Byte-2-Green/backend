import express from 'express';
import { responseFoodForThought, updateFoodForThought, responseByIdFoodForThought, responseByCategoryExample } from '../controllers/foodForThoughtController.js'; // Adjust the path to your file
import { checkIfWork } from '../middleware/foodForThougthMiddelware.js';
import cors from 'cors';
const app = express();
const router = express.Router();

app.use(cors());

// Route to get all food for thought
router.get('/foodForThought', checkIfWork, responseFoodForThought);

// Route to add a new food for thought
router.post('/foodForThought', checkIfWork, updateFoodForThought);

// Route to get a specific food for thought by ID
router.get('/foodForThought/:id', checkIfWork, responseByIdFoodForThought);

// Route to get all food for thought by category
router.get('/foodForThought/category/:category', checkIfWork, responseByCategoryExample);

export default router;
