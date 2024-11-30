import express from 'express';
import cors from 'cors';
import { 
  responseFoodForThought, 
  updateFoodForThought, 
  responseByIdFoodForThought, 
  responseByCategoryExample 
} from '../controllers/foodForThoughtController.js';
import { checkIfWork } from '../middleware/foodForThougthMiddelware.js';

const app = express();
const router = express.Router();


app.use(cors());

app.use(express.json());

router.get('/foodForThought', checkIfWork, responseFoodForThought);

router.post('/foodForThought', checkIfWork, updateFoodForThought);

router.get('/foodForThought/:id', checkIfWork, responseByIdFoodForThought);

router.get('/foodForThought/category/:category', checkIfWork, responseByCategoryExample);

export default router;
