import express from 'express';
import { test} from '../controllers/challengesController.js';
import cors from 'cors';
const app = express();
const router = express.Router();

router.get('/challenges', cors(), test);

export default router;
