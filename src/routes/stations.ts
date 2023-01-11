import express from 'express';
import controller from '../controllers/stations.js';
const router = express.Router();

router.get('/', controller.getStations);
router.post('/', controller.createStation);
router.get('/:id', controller.getStation);

export default router;