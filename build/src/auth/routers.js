"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var index_1 = require("./index");
var checkToken_1 = require("../_util/checkToken");
var router = express_1.default.Router();
/**
 *  Auth API is subjected with /api/auth prefix
 *  Eg. /api/auth/login
 */
/**
 * Route to log in a user
 * @param { username, password } req
 *
 */
router.post('/login', [], index_1.authController.login);
/**
 *  Route to register a user
 */
router.post('/create', [], index_1.authController.register);
/**
*  Route to send email
*/
router.post('/send-email', [checkToken_1.authChecker], index_1.authController.emailSend);
/**
*  Route to send text
*/
router.post('/send-text', [checkToken_1.authChecker], index_1.authController.textSend);
/**
 *  Route to get Dashboard Data
 */
router.get('/data', [checkToken_1.authChecker], index_1.authController.getDashboardData);
module.exports = router;
