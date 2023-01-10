import express from 'express';
import controller from '../controllers/journeys.js';
const router = express.Router();

router.get('/', controller.getJourneys);
router.get('/:id', controller.getJourney);

export default router;
