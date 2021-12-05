import express from 'express';
import { queueController } from './index'
import { authChecker } from '../_util/checkToken';

const router = express.Router();

/**
 *  Queue API is subjected with /api/queue prefix
 *  Eg. /api/queue/
 */

/**
 * Route to GET All Queues
 *
 */
router.get('/', [ authChecker ], queueController.queueGetAll);

/**
 * Route to GET Queue
 * 
 */
router.get('/:queueName', [ authChecker ], queueController.queueGet);

 /**
 * Route to GET Stations within a Queue
 * 
 */
router.get('/stations/:queueName', [ authChecker ], queueController.stationsGet);

 /**
 * Route to GET Windows within a Queue
 * 
 */
router.get('/windows/:queueName', [ authChecker ], queueController.windowsGet);

 /**
 * Route for Queue Creation Step 1
 * 
 */
router.post('/createStepOne', [ authChecker ], queueController.stepOneQueueCreation);

 /**
 * Route for Queue Creation Step 2
 * 
 */
router.post('/createStepTwo/:queueName', [ authChecker ], queueController.stepTwoQueueCreation);

/**
 * Route for Queue Creation Step 3
 * 
 */
 router.put('/createStepThree/:queueName', [ authChecker ], queueController.lastStepQueueCreation);

export = router