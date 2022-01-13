import express from 'express'
import { poolsController } from '.'
import { authChecker } from '../_util/checkToken';

const router = express.Router();

/**
 *  Pools API is subjected with /api/pools prefix
 *  Eg. /api/pools/
 */

/**
 * Route to Create Ticket
 *
 */
router.put('/getTicket/:queueName', [ authChecker ], poolsController.numberCreate);

/**
 * Route to Get a Ticket from Pools
 *  
 */
router.post('/getTicket', [ authChecker ], poolsController.numberGet);


export = router;