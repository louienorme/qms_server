"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var index_1 = require("./index");
var checkToken_1 = require("../_util/checkToken");
var router = express_1.default.Router();
/**
 *  Queue API is subjected with /api/queue prefix
 *  Eg. /api/queue/
 */
/**
 * Route to GET All Queues
 *
 */
router.get('/', [checkToken_1.authChecker], index_1.queueController.queueGetAll);
/**
 * Route to GET Queue
 *
 */
router.get('/:queueName', [checkToken_1.authChecker], index_1.queueController.queueGet);
/**
* Route to GET Stations within a Queue
*
*/
router.get('/stations/:queueName', [checkToken_1.authChecker], index_1.queueController.stationsGet);
/**
* Route to GET All Stations assigned to a Station Admin
*
*/
router.get('/stations/admin/:id', [checkToken_1.authChecker], index_1.queueController.adminStationsGet);
/**
 * Route to GET All Station Windos assigned to a Station Admin
 *
 */
router.get('/stations/windows/:id', [checkToken_1.authChecker], index_1.queueController.windowStationsGet);
/**
* Route to GET Windows within a Queue
*
*/
router.get('/windows/:queueName', [checkToken_1.authChecker], index_1.queueController.windowsGet);
/**
* Route for Queue Creation Step 1
*
*/
router.post('/createStepOne', [checkToken_1.authChecker], index_1.queueController.stepOneQueueCreation);
/**
* Route for Queue Creation Step 2
*
*/
router.post('/createStepTwo/:queueName', [checkToken_1.authChecker], index_1.queueController.stepTwoQueueCreation);
/**
 * Route for Queue Creation Step 3
 *
 */
router.put('/createStepThree/:queueName', [checkToken_1.authChecker], index_1.queueController.lastStepQueueCreation);
/**
 * Route for Delelete Queues
 *
 */
router.delete('/delete/:queueName', [checkToken_1.authChecker], index_1.queueController.queueDelete);
module.exports = router;
