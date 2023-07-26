"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var index_1 = require("./index");
var checkToken_1 = require("../_util/checkToken");
var router = express_1.default.Router();
/**
 *  Archive API is subjected with /api/archives prefix
 *  Eg. /api/archives/
 */
/**
 * Route to GET ALL Records
 *
 *
 */
router.get('/', [checkToken_1.authChecker], index_1.archiveController.getAll);
/**
* Route to GET Data for Station 1 Windows
*
*
*/
router.post('/station-one', [checkToken_1.authChecker], index_1.archiveController.getStationOne);
module.exports = router;
