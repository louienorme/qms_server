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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var faker_1 = __importDefault(require("faker"));
// Models
var index_1 = require("./index");
var model_1 = __importDefault(require("../station/model"));
var model_2 = __importDefault(require("../queue/model"));
/**
 * Module Accounts
 * Account Management service
 * Handles the management of accounts
 *
 */
var AccountService = /** @class */ (function () {
    function AccountService() {
    }
    ;
    AccountService.prototype.getAllAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, accounts, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.AdminModel.find({ isArchived: false })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: true, data: [], code: 200 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, index_1.AdminModel.find({ isArchived: false })];
                    case 3:
                        accounts = _a.sent();
                        return [2 /*return*/, { success: true, data: accounts, code: 200 }];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET ALL Accounts', deepLog: err_1, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AccountService.prototype.getAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var account, admin, flash, window_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        account = void 0;
                        return [4 /*yield*/, index_1.AdminModel.find({ _id: id, isArchived: false })];
                    case 1:
                        admin = _a.sent();
                        return [4 /*yield*/, index_1.FlashboardModel.find({ _id: id, isArchived: false })];
                    case 2:
                        flash = _a.sent();
                        return [4 /*yield*/, index_1.WindowAccountsModel.find({ _id: id, isArchived: false })];
                    case 3:
                        window_1 = _a.sent();
                        if (admin.length > 0) {
                            account = admin;
                        }
                        else if (flash.length > 0) {
                            account = flash;
                        }
                        else if (window_1.length > 0) {
                            account = window_1;
                        }
                        else {
                            return [2 /*return*/, { success: false, message: 'Id does not exists', code: 400 }];
                        }
                        return [2 /*return*/, { success: true, data: account, code: 200 }];
                    case 4:
                        err_2 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET Account', deepLog: err_2, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AccountService.prototype.getAccounts = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, accounts, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.AdminModel.find({ type: type, isArchived: false })
                        // Return if none exists
                    ];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: true, data: [], code: 200 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, index_1.AdminModel.find({ type: type, isArchived: false })];
                    case 3:
                        accounts = _a.sent();
                        return [2 /*return*/, { success: true, data: accounts, code: 200 }];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET Accounts', deepLog: err_3, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AccountService.prototype.updateAccounts = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, isExistingEmail, account, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.AdminModel.find({ _id: id, isArchived: false })
                        // Return if none exists
                    ];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: true, data: [], code: 200 }];
                        return [4 /*yield*/, index_1.AdminModel.find({ _id: { $ne: id }, contact: { email: body.contact.email }, isArchived: false })];
                    case 2:
                        isExistingEmail = _a.sent();
                        // Return if there is a duplicate
                        if (isExistingEmail.length > 0)
                            return [2 /*return*/, { success: false, message: 'Email is already used!', code: 400 }];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, index_1.AdminModel.findOneAndUpdate({ _id: id, isArchived: false }, body)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, index_1.AdminModel.findOne({ _id: id })];
                    case 5:
                        account = _a.sent();
                        return [2 /*return*/, { success: true, data: account, message: 'Accounts successfully UPDATED', code: 200 }];
                    case 6:
                        err_4 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to UPDATE Accounts', deepLog: err_4, code: 400 }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AccountService.prototype.getWindowAccounts = function (queueName) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, hasAccounts, accounts, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_2.default.find({ name: queueName })
                        // Return if none exists
                    ];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: false, message: 'Queue does not exist', code: 400 }];
                        return [4 /*yield*/, index_1.WindowAccountsModel.find({ queueName: queueName, isArchived: false })
                            // Return if none exists
                        ];
                    case 2:
                        hasAccounts = _a.sent();
                        // Return if none exists
                        if (!hasAccounts)
                            return [2 /*return*/, { success: false, message: 'No existing window in this queue', code: 400 }];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, index_1.WindowAccountsModel.find({ queueName: queueName, isArchived: false })];
                    case 4:
                        accounts = _a.sent();
                        return [2 /*return*/, { success: true, data: accounts, code: 200 }];
                    case 5:
                        err_5 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET Window Accounts', deepLog: err_5, code: 400 }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AccountService.prototype.deleteAccounts = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.AdminModel.findById({ _id: id, isArchived: false })
                        // Return if none exists
                    ];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: true, data: [], code: 200 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, index_1.AdminModel.findByIdAndUpdate({ _id: id }, { isArchived: true })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { success: true, message: 'Accounts successfully Deleted', code: 200 }];
                    case 4:
                        err_6 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to DELETE Accounts', deepLog: err_6, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AccountService.prototype.getFlashboards = function (queueName) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, accounts, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.FlashboardModel.find({ queueName: queueName, isArchived: false })
                        // Return if none exists
                    ];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: false, message: 'No Flashboard Accounts created for this queue', code: 400 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, index_1.FlashboardModel.find({ queueName: queueName, isArchived: false })];
                    case 3:
                        accounts = _a.sent();
                        return [2 /*return*/, { success: true, data: accounts, code: 200 }];
                    case 4:
                        err_7 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to GET Accounts', deepLog: err_7, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AccountService.prototype.createFlashboardAccounts = function (queueName) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, queue, flashboardId, password, i, count, flashboard, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.default.find({ queueName: queueName })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if none exists
                        if (!isExisting)
                            return [2 /*return*/, { success: false, message: 'No Stations were created', code: 400 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 9, , 10]);
                        return [4 /*yield*/, model_2.default.findOne({ name: queueName })];
                    case 3:
                        queue = _a.sent();
                        flashboardId = "".concat(new Date().getFullYear(), "-").concat(faker_1.default.datatype.number(99999), "-FA");
                        return [4 /*yield*/, bcryptjs_1.default.hash(process.env.DEFAULT_PASSWORD || 'qms123', 10)];
                    case 4:
                        password = _a.sent();
                        i = 1;
                        _a.label = 5;
                    case 5:
                        if (!(i < queue.numOfStations)) return [3 /*break*/, 8];
                        count = i + 1;
                        flashboard = new index_1.FlashboardModel({
                            flashboardId: flashboardId,
                            type: 'Flashboard',
                            queueName: queueName,
                            status: true,
                            station: count,
                            username: "".concat(queueName, "-Station-").concat(count, "_Flashboard"),
                            password: password
                        });
                        return [4 /*yield*/, flashboard.save()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/, { success: true, message: 'Flashboard Accounts created', code: 200 }];
                    case 9:
                        err_8 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to CREATE Flashboard Accounts', deepLog: err_8, code: 400 }];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    AccountService.prototype.createWindowAccounts = function (queueName) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, stations, err_9;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_2.default.findOne({ name: queueName })];
                    case 1:
                        isExisting = _a.sent();
                        // Return if its exists 
                        if (!isExisting)
                            return [2 /*return*/, { success: false, message: 'That queue does not exists!', code: 400 }];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, model_1.default.find({ queueName: queueName })];
                    case 3:
                        stations = _a.sent();
                        stations.forEach(function (station) { return __awaiter(_this, void 0, void 0, function () {
                            var i, count, windowId, username, password, window_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < station.numOfWindows)) return [3 /*break*/, 5];
                                        count = i + 1;
                                        windowId = "".concat(new Date().getFullYear(), "-").concat(faker_1.default.datatype.number(99999), "-WA");
                                        username = "".concat(queueName, "_S").concat(station.stationNumber, "W").concat(count);
                                        return [4 /*yield*/, bcryptjs_1.default.hash(process.env.DEFAULT_PASSWORD || 'qms123', 10)];
                                    case 2:
                                        password = _a.sent();
                                        window_2 = new index_1.WindowAccountsModel({
                                            adminId: windowId,
                                            type: 'Window',
                                            queueName: queueName,
                                            status: 1,
                                            station: station.stationNumber,
                                            window: count,
                                            username: username,
                                            password: password
                                        });
                                        return [4 /*yield*/, window_2.save()];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, { success: true, message: 'Window Accounts created', code: 200 }];
                    case 4:
                        err_9 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'Failed to CREATE Window Accounts', deepLog: err_9, code: 400 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AccountService;
}());
exports.default = AccountService;
