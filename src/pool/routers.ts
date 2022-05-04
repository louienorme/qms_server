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
router.post('/getTicket/:queueName', [ authChecker ], poolsController.numberCreate);

/**
 * Route to Get a Ticket from Pools
 *  
 */
router.post('/getTicket', [ authChecker ], poolsController.numberGet);

/**
 * Route to move Ticket to next station
 * 
 */
router.post('/nextTicket', [ authChecker ], poolsController.numberNext);

/**
 * Route to return ticket to pool
 * 
 */
router.post('/returnTicket', [ authChecker ], poolsController.numberReturn);

/**
 * Check if there is number in window
 * 
 */
router.post('/windowTicket', [ authChecker ], poolsController.numberCheck);

/**
 * Get Pool Numbers
 * 
 */
router.post('/getTickets', [ authChecker ], poolsController.ticketsGet);

/**
 * Get Window Numbers
 * 
 */
 router.post('/getWindowTickets', [ authChecker ], poolsController.windowTicketsGet);

export = router;