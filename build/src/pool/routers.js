"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var _1 = require(".");
var checkToken_1 = require("../_util/checkToken");
var router = express_1.default.Router();
/**
 *  Pools API is subjected with /api/pools prefix
 *  Eg. /api/pools/
 */
/**
 * Route to Create Ticket
 *
 */
router.post('/getTicket/:queueName', [checkToken_1.authChecker], _1.poolsController.numberCreate);
/**
 * Route to Get a Ticket from Pools
 *
 */
router.post('/getTicket', [checkToken_1.authChecker], _1.poolsController.numberGet);
/**
 * Route to move Ticket to next station
 *
 */
router.post('/nextTicket', [checkToken_1.authChecker], _1.poolsController.numberNext);
/**
 * Route to return ticket to pool
 *
 */
router.post('/returnTicket', [checkToken_1.authChecker], _1.poolsController.numberReturn);
/**
 * Check if there is number in window
 *
 */
router.post('/windowTicket', [checkToken_1.authChecker], _1.poolsController.numberCheck);
/**
 * Get Pool Numbers
 *
 */
router.post('/getTickets', [checkToken_1.authChecker], _1.poolsController.ticketsGet);
/**
 * Get Window Numbers
 *
 */
router.post('/getWindowTickets', [checkToken_1.authChecker], _1.poolsController.windowTicketsGet);
module.exports = router;
