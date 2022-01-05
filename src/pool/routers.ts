import express from 'express'
import { poolsController } from '.'
import { authChecker } from '../_util/checkToken';

const router = express.Router();

/**
 *  Pools API is subjected with /api/pools prefix
 *  Eg. /api/pools/
 */

/**
 * Route to Create Ticker
 *
 */
 router.get('/create', [ authChecker ], poolsController.numberCreate);

 export = router;