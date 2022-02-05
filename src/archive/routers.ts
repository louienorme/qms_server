import express from 'express';
import { archiveController } from './index';
import { authChecker } from '../_util/checkToken';

const router = express.Router();

/**
 *  Archive API is subjected with /api/archives prefix
 *  Eg. /api/archives/
 */

/**
 * Route to GET ALL Records
 * 
 *
 */
 router.get('/', [ authChecker ], archiveController.getAll);

 /**
 * Route to GET Data for Station 1 Windows
 * 
 *
 */
  router.post('/station-one', [ authChecker ], archiveController.getStationOne);

 export = router;