"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var index_1 = require("./index");
var checkToken_1 = require("../_util/checkToken");
var router = express_1.default.Router();
/**
 *  Account API is subjected with /api/accounts prefix
 *  Eg. /api/accounts/
 */
/**
 * Route to GET ALL Accounts
 *
 */
router.get('/', [checkToken_1.authChecker], index_1.accountController.accountsGetAll);
/**
* Route to GET Accounts
*
*/
router.get('/:type', [checkToken_1.authChecker], index_1.accountController.accountsGet);
/**
* Route to GET Account
*
*/
router.get('/get/:id', [checkToken_1.authChecker], index_1.accountController.accountGet);
/**

* Route to Update Accounts
*
*/
router.put('/update/:adminId', [checkToken_1.authChecker], index_1.accountController.accountsUpdate);
/**
* Route to Update Accounts
*
*/
router.delete('/delete/:id', [checkToken_1.authChecker], index_1.accountController.accountsDelete);
/**
* Route to Create Flashboard Accounts
*
*/
router.put('/flashboards/:queueName', [checkToken_1.authChecker], index_1.accountController.createFA);
/**
 * Route to GET Queue Window Accounts
 *
 */
router.get('/windows/:queueName', [checkToken_1.authChecker], index_1.accountController.windowAccountsGet);
/**
* Route to GET Queue Flashboards Accounts
*
*/
router.get('/flashboards/:queueName', [checkToken_1.authChecker], index_1.accountController.flashboardsGet);
/**
* Route to Create Flashboard Accounts
*
*/
router.put('/flashboards-create/:queueName', [checkToken_1.authChecker], index_1.accountController.createFA);
/**
* Route to Create Window Accounts
*
*/
router.put('/windows-create/:queueName', [checkToken_1.authChecker], index_1.accountController.createWA);
module.exports = router;
