import express from 'express';
import controller from '../controllers/journeys.js';
const router = express.Router();

router.get('/count', controller.getCount);
router.get('/', controller.getJourneys);
router.post('/', controller.createJourney);
router.get('/:id', controller.getJourney);

export default router;
