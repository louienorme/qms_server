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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
var faker_1 = __importDefault(require("faker"));
var luxon_1 = require("luxon");
// Models
var _1 = require(".");
var accounts_1 = require("../accounts");
var archive_1 = require("../archive");
var queue_1 = require("../queue");
var service_1 = __importDefault(require("../auth/service"));
var authService = new service_1.default();
/**
 * Module Pools
 * Queue Process service
 * Handles the Queing Process
 *
 */
var PoolsService = /** @class */ (function () {
    function PoolsService() {
    }
    ;
    PoolsService.prototype.createNumber = function (queueName, body) {
        return __awaiter(this, void 0, void 0, function () {
            var isEmpty, isEmptyPool, poolId, ticketOne, record, max, maxNum, orderMax, order, tickets, record, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, archive_1.ArchiveModel.find({ queue: queueName })];
                    case 1:
                        isEmpty = _a.sent();
                        return [4 /*yield*/, _1.PoolsModel.find({ queue: queueName })];
                    case 2:
                        isEmptyPool = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 9, , 10]);
                        poolId = "T".concat(new Date().getFullYear(), "-").concat(faker_1.default.datatype.number(99999));
                        if (!(isEmpty.length === 0)) return [3 /*break*/, 4];
                        ticketOne = new _1.PoolsModel({
                            poolId: poolId,
                            ticket: 1,
                            order: 1,
                            queue: queueName,
                            contact: body.contact,
                            user: body.user,
                            station: 2,
                            window: 0,
                            status: 'waiting',
                            timeStarted: luxon_1.DateTime.now().toISO(),
                            timeEnded: '',
                            createdBy: body.creator
                        });
                        ticketOne.save();
                        record = new archive_1.ArchiveModel({
                            poolId: poolId,
                            ticket: 1,
                            queue: queueName,
                            user: body.user,
                            station: 1,
                            window: body.window,
                            action: 'created',
                            timeStarted: luxon_1.DateTime.now().toISO(),
                            timeEnded: luxon_1.DateTime.now().toISO(),
                            createdBy: body.creator
                        });
                        record.save();
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, archive_1.ArchiveModel.find({ queue: queueName }).sort({ ticket: -1 }).limit(1)];
                    case 5:
                        max = _a.sent();
                        maxNum = max[0].ticket;
                        orderMax = 0;
                        if (!(isEmptyPool.length !== 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, _1.PoolsModel.find({ queue: queueName }).sort({ order: -1 }).limit(1)];
                    case 6:
                        order = _a.sent();
                        orderMax = order[0].order;
                        _a.label = 7;
                    case 7:
                        tickets = new _1.PoolsModel({
                            poolId: poolId,
                            order: orderMax + 1,
                            ticket: maxNum + 1,
                            queue: queueName,
                            user: body.user,
                            contact: body.contact,
                            station: 2,
                            window: 0,
                            status: 'waiting',
                            timeStarted: luxon_1.DateTime.now().toISO(),
                            timeEnded: '',
                            createdBy: body.creator
                        });
                        tickets.save();
                        record = new archive_1.ArchiveModel({
                            poolId: poolId,
                            ticket: maxNum + 1,
                            queue: queueName,
                            user: body.user,
                            station: 1,
                            window: body.window,
                            action: 'created',
                            timeStarted: luxon_1.DateTime.now().toISO(),
                            timeEnded: luxon_1.DateTime.now().toISO(),
                            createdBy: body.creator
                        });
                        record.save();
                        _a.label = 8;
                    case 8: return [2 /*return*/, { success: true, message: 'Number Created!', code: 200 }];
                    case 9:
                        err_1 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'FAILED to Create Number!', deepLog: err_1, code: 400 }];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    PoolsService.prototype.getNumber = function (details) {
        return __awaiter(this, void 0, void 0, function () {
            var isFilled, isEmpty, getTicket, newTicket, archiveTicket, storeTicket, sendText, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _1.PoolsModel.find({
                            queue: details.queueName,
                            station: details.station,
                            window: details.window,
                            status: 'transacting'
                        }).limit(5)];
                    case 1:
                        isFilled = _a.sent();
                        if (isFilled.length > 0)
                            return [2 /*return*/, { success: false, message: 'Window is currently transacting', code: 400 }];
                        return [4 /*yield*/, _1.PoolsModel.find({
                                queue: details.queueName,
                                station: details.station,
                                window: 0
                            }).limit(5)];
                    case 2:
                        isEmpty = _a.sent();
                        if (isEmpty.length === 0)
                            return [2 /*return*/, { success: false, data: [], message: 'The Pool is empty', code: 400 }];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        // Update Window Status
                        return [4 /*yield*/, accounts_1.WindowAccountsModel.findOneAndUpdate({
                                queueName: details.queueName,
                                station: details.station,
                                window: details.window
                            }, { status: 2 })
                            // Get Ticket from Pools
                        ];
                    case 4:
                        // Update Window Status
                        _a.sent();
                        return [4 /*yield*/, _1.PoolsModel.find({
                                window: 0,
                                station: details.station,
                                queue: details.queueName
                            }).sort({ order: 1 }).limit(1)];
                    case 5:
                        getTicket = _a.sent();
                        newTicket = {
                            poolId: getTicket[0].poolId,
                            order: getTicket[0].order,
                            ticket: getTicket[0].ticket,
                            user: getTicket[0].user,
                            contact: getTicket[0].contact,
                            queue: details.queueName,
                            station: details.station,
                            window: details.window,
                            status: 'transacting',
                            timeStarted: luxon_1.DateTime.now().toISO(),
                            timeEnded: '',
                            createdBy: getTicket[0].createdBy
                        };
                        return [4 /*yield*/, _1.PoolsModel.findByIdAndUpdate({ _id: getTicket[0]._id }, newTicket)];
                    case 6:
                        _a.sent();
                        archiveTicket = {
                            poolId: getTicket[0].poolId,
                            ticket: getTicket[0].ticket,
                            user: getTicket[0].user,
                            queue: getTicket[0].queue,
                            station: getTicket[0].station,
                            window: getTicket[0].window,
                            action: 'acquired',
                            timeStarted: getTicket[0].timeStarted,
                            timeEnded: luxon_1.DateTime.now().toISO(),
                            createdBy: getTicket[0].createdBy
                        };
                        storeTicket = new archive_1.ArchiveModel(archiveTicket);
                        storeTicket.save();
                        sendText = {
                            contact: getTicket[0].contact,
                            text: "Greetings, We would like to notify you that your number is currently being served at SGSP Cashier's Office. We are on a BETA TESTING. Thank you for your cooperation. Keep safe Genevievian!"
                        };
                        authService.sendText(sendText);
                        return [2 /*return*/, { success: true, message: 'GET Ticket Successful', code: 200 }];
                    case 7:
                        err_2 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'FAILED to GET Number', deepLog: err_2, code: 400 }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    PoolsService.prototype.nextNumber = function (details) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, isLast, newTicket, archiveTicket, storeTicket, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        // Update Window Status
                        return [4 /*yield*/, accounts_1.WindowAccountsModel.findOneAndUpdate({
                                queueName: details.queueName,
                                station: details.station,
                                window: details.window
                            }, { status: 1 })
                            // Get Ticket Details
                        ];
                    case 1:
                        // Update Window Status
                        _a.sent();
                        return [4 /*yield*/, _1.PoolsModel.findById({ _id: details.id })];
                    case 2:
                        ticket = _a.sent();
                        return [4 /*yield*/, queue_1.QueueModel.findOne({ name: details.queueName })];
                    case 3:
                        isLast = _a.sent();
                        if (!(isLast.numOfStations === details.station)) return [3 /*break*/, 5];
                        // Delete Ticket if Station is Last
                        return [4 /*yield*/, _1.PoolsModel.findByIdAndDelete({ _id: details.id })];
                    case 4:
                        // Delete Ticket if Station is Last
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        newTicket = {
                            poolId: ticket.poolId,
                            order: ticket.order,
                            ticket: ticket.ticket,
                            user: ticket.user,
                            contact: ticket.contact,
                            queue: details.queueName,
                            station: details.station + 1,
                            window: 0,
                            status: 'waiting',
                            timeStarted: luxon_1.DateTime.now().toISO(),
                            timeEnded: '',
                            createdBy: ticket.createdBy
                        };
                        return [4 /*yield*/, _1.PoolsModel.findByIdAndUpdate({ _id: details.id }, newTicket)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        archiveTicket = {
                            poolId: ticket.poolId,
                            ticket: ticket.ticket,
                            user: ticket.user,
                            queue: ticket.queue,
                            station: ticket.station,
                            window: ticket.window,
                            action: 'complete',
                            timeStarted: ticket.timeStarted,
                            timeEnded: luxon_1.DateTime.now().toISO(),
                            createdBy: ticket.createdBy
                        };
                        storeTicket = new archive_1.ArchiveModel(archiveTicket);
                        storeTicket.save();
                        return [2 /*return*/, { success: true, message: 'Transaction Completed', code: 200 }];
                    case 8:
                        err_3 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'FAILED to move ticket to next station', deepLog: err_3, code: 400 }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    PoolsService.prototype.returnNumber = function (details) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, order, orderMax, newTicket, archiveTicket, storeTicket, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // Update Window Status
                        return [4 /*yield*/, accounts_1.WindowAccountsModel.findOneAndUpdate({
                                queueName: details.queueName,
                                station: details.station,
                                window: details.window
                            }, { status: 1 })
                            // Get Ticket Details
                        ];
                    case 1:
                        // Update Window Status
                        _a.sent();
                        return [4 /*yield*/, _1.PoolsModel.findById({ _id: details.id })];
                    case 2:
                        ticket = _a.sent();
                        return [4 /*yield*/, _1.PoolsModel.find({ queue: details.queueName }).sort({ order: -1 }).limit(1)];
                    case 3:
                        order = _a.sent();
                        orderMax = order[0].order;
                        newTicket = {
                            poolId: ticket.poolId,
                            order: orderMax + 1,
                            ticket: ticket.ticket,
                            user: ticket.user,
                            contact: ticket.contact,
                            queue: details.queueName,
                            station: details.station,
                            window: 0,
                            status: 'waiting',
                            timeStarted: luxon_1.DateTime.now().toISO(),
                            timeEnded: '',
                            createdBy: ticket.createdBy
                        };
                        return [4 /*yield*/, _1.PoolsModel.findByIdAndUpdate({ _id: details.id }, newTicket)];
                    case 4:
                        _a.sent();
                        archiveTicket = {
                            poolId: ticket.poolId,
                            ticket: ticket.ticket,
                            user: ticket.user,
                            queue: ticket.queue,
                            station: ticket.station,
                            window: ticket.window,
                            action: 'returned',
                            timeStarted: ticket.timeStarted,
                            timeEnded: luxon_1.DateTime.now().toISO(),
                            createdBy: ticket.createdBy
                        };
                        storeTicket = new archive_1.ArchiveModel(archiveTicket);
                        storeTicket.save();
                        return [2 /*return*/, { success: true, message: 'Ticket returned to the pool', code: 200 }];
                    case 5:
                        err_4 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'FAILED to return ticket to pool', code: 400 }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PoolsService.prototype.checkNumber = function (details) {
        return __awaiter(this, void 0, void 0, function () {
            var windowTicket, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _1.PoolsModel.findOne({
                                queue: details.queueName,
                                station: details.station,
                                window: details.window
                            })];
                    case 1:
                        windowTicket = _a.sent();
                        if (!windowTicket)
                            return [2 /*return*/, { success: true, data: [], message: 'No Ticket on window', code: 200 }];
                        return [2 /*return*/, { success: true, data: windowTicket, code: 200 }];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'FAILED to check ticket on window', code: 400 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PoolsService.prototype.getTickets = function (details) {
        return __awaiter(this, void 0, void 0, function () {
            var isEmpty, tickets, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _1.PoolsModel.find({ queue: details.queueName, station: details.station, status: 'waiting' }).limit(5)];
                    case 1:
                        isEmpty = _a.sent();
                        if (isEmpty.length === 0)
                            return [2 /*return*/, { success: true, data: [], message: 'The Pool is empty', code: 200 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, _1.PoolsModel.find({ queue: details.queueName, station: details.station, status: 'waiting' }).sort("order").limit(5)];
                    case 3:
                        tickets = _a.sent();
                        return [2 /*return*/, { success: true, data: tickets, code: 200 }];
                    case 4:
                        err_6 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'FAILED to GET Tickets', code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PoolsService.prototype.getWindowTickets = function (details) {
        return __awaiter(this, void 0, void 0, function () {
            var isEmpty, windowStatus, tickets, windows_1, _loop_1, i, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _1.PoolsModel.find({ queue: details.queueName, station: details.station, })];
                    case 1:
                        isEmpty = _a.sent();
                        if (isEmpty.length === 0)
                            return [2 /*return*/, { success: true, data: [], message: 'Windows are Empty', code: 200 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        windowStatus = [];
                        return [4 /*yield*/, _1.PoolsModel.find({ queue: details.queueName, station: details.station, }).limit(5)];
                    case 3:
                        tickets = _a.sent();
                        return [4 /*yield*/, accounts_1.WindowAccountsModel.find({ queueName: details.queueName, station: details.station }).limit(5)];
                    case 4:
                        windows_1 = _a.sent();
                        _loop_1 = function (i) {
                            var number = 0;
                            var status_1 = 'waiting';
                            var timeStarted = '00:00:00';
                            tickets.forEach(function (ticket) {
                                if (ticket.window === windows_1[i].window) {
                                    number = ticket.ticket;
                                    status_1 = ticket.status;
                                    timeStarted = ticket.timeStarted;
                                }
                                if (windows_1[i].status === 0) {
                                    status_1 = 'inactive';
                                }
                            });
                            var stat = {
                                queue: details.queueName,
                                station: details.station,
                                window: i + 1,
                                ticket: number,
                                status: status_1,
                                timeStarted: timeStarted
                            };
                            windowStatus.push(stat);
                        };
                        for (i = 0; i < windows_1.length; i++) {
                            _loop_1(i);
                        }
                        return [2 /*return*/, { success: true, data: windowStatus, code: 200 }];
                    case 5:
                        err_7 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'FAILED to GET Window Tickets', code: 400 }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return PoolsService;
}());
exports.default = PoolsService;
