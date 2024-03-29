"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Models
var _1 = require(".");
/**
 * Module Archive
 * Archiving service
 * Handles the Records of Transactions
 *
 */
var ArchiveService = /** @class */ (function () {
    function ArchiveService() {
    }
    ;
    ArchiveService.prototype.getAllRecords = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isEmpty, records, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _1.ArchiveModel.find()];
                    case 1:
                        isEmpty = _a.sent();
                        if (isEmpty.length === 0)
                            return [2 /*return*/, { success: true, message: 'Archives is empty!', code: 200 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, _1.ArchiveModel.find()];
                    case 3:
                        records = _a.sent();
                        return [2 /*return*/, { success: true, data: records, code: 200 }];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET ALL Archive Records', deepLog: err_1, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ArchiveService.prototype.getStationOneData = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var ticketCount, lastNumberCreated, numbersCreated, recentNumbers, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, _1.ArchiveModel.distinct('ticket').find({ queue: info.queueName }).sort({ ticket: -1 }).limit(1)];
                    case 1:
                        ticketCount = _a.sent();
                        return [4 /*yield*/, _1.ArchiveModel.distinct('ticket').find({ queue: info.queueName, createdBy: info._id, action: 'created' }).sort({ ticket: -1 }).limit(1)];
                    case 2:
                        lastNumberCreated = _a.sent();
                        return [4 /*yield*/, _1.ArchiveModel.distinct('ticket').find({ queue: info.queueName, createdBy: info._id, action: 'created' })];
                    case 3:
                        numbersCreated = _a.sent();
                        return [4 /*yield*/, _1.ArchiveModel.distinct('ticket').find({ queue: info.queueName, createdBy: info._id, action: 'created' }).sort({ ticket: -1 }).limit(5)];
                    case 4:
                        recentNumbers = _a.sent();
                        response = {
                            ticketCount: ticketCount,
                            lastNumberCreated: lastNumberCreated,
                            numberCount: numbersCreated.length,
                            recentNumbers: recentNumbers
                        };
                        return [2 /*return*/, { success: true, data: response, code: 200 }];
                    case 5:
                        err_2 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET Station One Data', deepLog: err_2, code: 400 }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return ArchiveService;
}());
exports.default = ArchiveService;
