"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependency
var faker_1 = __importDefault(require("faker"));
// Models
var accounts_1 = require("../accounts");
var pool_1 = require("../pool");
var model_1 = __importDefault(require("./model"));
var model_2 = __importDefault(require("../station/model"));
var model_3 = __importDefault(require("../window/model"));
var model_4 = __importDefault(require("../archive/model"));
/**
 * Module Queue
 * Queue Management service
 * Handles the management of Queues, and Queue Creation
 *
 */
var QueueService = /** @class */ (function () {
    function QueueService() {
    }
    ;
    QueueService.prototype.createQueueStepOne = function (queueInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, queueId, queue, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.default.findOne({ name: queueInfo.name })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if its exists 
                        if (isExisting)
                            return [2 /*return*/, { success: false, message: 'Queue name already exists!', code: 400 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        queueId = "Q".concat(faker_1.default.datatype.number(99999), "-").concat(new Date().getFullYear());
                        queue = new model_1.default(__assign(__assign({}, queueInfo), { queueId: queueId, numOfStations: 0, status: true }));
                        return [4 /*yield*/, queue.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { success: true, message: 'Queue Creation Step 1 Success', code: 200 }];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, { success: false, message: 'Queue Creation Step 1 Failed', deepLog: err_1, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    QueueService.prototype.createQueueStepTwo = function (stations, queueName) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, i, stationId, stationNew, station, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.default.findOne({ name: queueName })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: false, message: 'Stations were not created yet', code: 400 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        return [4 /*yield*/, model_1.default.findOneAndUpdate({ name: queueName }, { numOfStations: stations.length })];
                    case 3:
                        _a.sent();
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < stations.length)) return [3 /*break*/, 7];
                        stationId = "S".concat(faker_1.default.datatype.number(99999), "-").concat(new Date().getFullYear());
                        stationNew = __assign({ stationId: stationId, queueName: queueName, stationNumber: i + 1 }, stations[i]);
                        station = new model_2.default(stationNew);
                        return [4 /*yield*/, station.save()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, { success: true, message: 'Queue Creation Step 2 Success', code: 200 }];
                    case 8:
                        err_2 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Queue Creation Step 2 Failed', deepLog: err_2, code: 400 }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    QueueService.prototype.createQueueLastStep = function (queueName) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, stations, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_2.default.find({ queueName: queueName })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: false, message: 'No Stations were created', code: 400 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, model_2.default.find({ queueName: queueName })];
                    case 3:
                        stations = _a.sent();
                        stations.forEach(function (station) { return __awaiter(_this, void 0, void 0, function () {
                            var i, windowId, count, window_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < station.numOfWindows)) return [3 /*break*/, 4];
                                        windowId = "W".concat(faker_1.default.datatype.number(99999), "-").concat(new Date().getFullYear());
                                        count = i + 1;
                                        window_1 = new model_3.default({
                                            windowId: windowId,
                                            stationNumber: station.stationNumber,
                                            queueName: queueName,
                                            status: true,
                                            windowNumber: count
                                        });
                                        return [4 /*yield*/, window_1.save()];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, { success: true, message: 'Queue Creation Step 3 Success', code: 200 }];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Queue Creation Step 3 Failed', deepLog: err_3, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    QueueService.prototype.getAllQueues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, queues, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.default.find()];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: true, data: [], code: 200 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, model_1.default.find()];
                    case 3:
                        queues = _a.sent();
                        return [2 /*return*/, { success: true, data: queues, code: 200 }];
                    case 4:
                        err_4 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET ALL Queues', deepLog: err_4, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    QueueService.prototype.getQueue = function (queueName) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, queue, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.default.findOne({ name: queueName })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: true, data: [], code: 200 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, model_1.default.findOne({ name: queueName })];
                    case 3:
                        queue = _a.sent();
                        return [2 /*return*/, { success: true, data: queue, code: 200 }];
                    case 4:
                        err_5 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET Queue', deepLog: err_5, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    QueueService.prototype.getStations = function (queueName) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, stations, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_2.default.find({ queueName: queueName })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: false, data: [], code: 400 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, model_2.default.find({ queueName: queueName })];
                    case 3:
                        stations = _a.sent();
                        return [2 /*return*/, { success: true, data: stations, code: 200 }];
                    case 4:
                        err_6 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET Stations', deepLog: err_6, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    QueueService.prototype.getAdminStations = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, stations, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, accounts_1.AdminModel.find({ adminId: id })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: false, message: 'Admin does not exists', code: 400 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, model_2.default.find({ admin: { $in: [id] } })];
                    case 3:
                        stations = _a.sent();
                        return [2 /*return*/, { success: true, data: stations, code: 200 }];
                    case 4:
                        err_7 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET Admin Stations', deepLog: err_7, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    QueueService.prototype.getWindowStations = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, windowArray, stations, i, j, windows, pools, ticket, timeStarted, body, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, accounts_1.AdminModel.find({ adminId: id })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: false, message: 'Admin does not exists', code: 400 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 11, , 12]);
                        windowArray = [];
                        return [4 /*yield*/, model_2.default.find({ admin: { $in: [id] } })];
                    case 3:
                        stations = _a.sent();
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < stations.length)) return [3 /*break*/, 10];
                        j = 0;
                        _a.label = 5;
                    case 5:
                        if (!(j < stations[i].numOfWindows)) return [3 /*break*/, 9];
                        return [4 /*yield*/, accounts_1.WindowAccountsModel.find({
                                queueName: stations[i].queueName,
                                station: stations[i].stationNumber,
                                window: j + 1
                            })];
                    case 6:
                        windows = _a.sent();
                        return [4 /*yield*/, pool_1.PoolsModel.find({
                                queue: stations[i].queueName,
                                station: stations[i].stationNumber,
                                window: j + 1
                            })];
                    case 7:
                        pools = _a.sent();
                        ticket = 0;
                        timeStarted = 'N/A';
                        if (pools.length !== 0) {
                            ticket = pools[j].ticket;
                            timeStarted = pools[j].timeStarted;
                        }
                        body = {
                            queueName: stations[i].queueName,
                            station: stations[i].stationNumber,
                            window: j + 1,
                            ticket: ticket,
                            status: windows[0].status,
                            timeStarted: timeStarted
                        };
                        windowArray.push(body);
                        _a.label = 8;
                    case 8:
                        j++;
                        return [3 /*break*/, 5];
                    case 9:
                        i++;
                        return [3 /*break*/, 4];
                    case 10: return [2 /*return*/, { success: true, data: windowArray, code: 200 }];
                    case 11:
                        err_8 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET Window Stations', deepLog: err_8, code: 400 }];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    QueueService.prototype.getWindows = function (queueName) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, windows, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_2.default.find({ queueName: queueName })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: true, data: [], code: 200 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, model_3.default.find({ queueName: queueName })];
                    case 3:
                        windows = _a.sent();
                        return [2 /*return*/, { success: true, data: windows, code: 200 }];
                    case 4:
                        err_9 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET Windows', deepLog: err_9, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    QueueService.prototype.deleteQueue = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.default.find({ name: name })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: true, data: [], code: 200 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 10, , 11]);
                        return [4 /*yield*/, model_3.default.deleteMany({ queueName: name })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, model_2.default.deleteMany({ queueName: name })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, accounts_1.FlashboardModel.deleteMany({ queueName: name })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, accounts_1.WindowAccountsModel.deleteMany({ queueName: name })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, pool_1.PoolsModel.deleteMany({ queue: name })];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, model_1.default.findOneAndDelete({ name: name })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, model_4.default.deleteMany({ queue: name })];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, { success: true, message: 'Successfully DELETED Queue', code: 200 }];
                    case 10:
                        err_10 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to Delete Queue', deepLog: err_10, code: 400 }];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return QueueService;
}());
exports.default = QueueService;
