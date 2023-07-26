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
// Dependencies
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var dotenv_1 = __importDefault(require("dotenv"));
var faker_1 = __importDefault(require("faker"));
var sgMail = require('@sendgrid/mail');
// Models
var accounts_1 = require("../accounts");
var model_1 = __importDefault(require("../archive/model"));
var model_2 = __importDefault(require("../queue/model"));
var luxon_1 = require("luxon");
dotenv_1.default.config();
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
/**
 * Module Auth
 * Authentication/Authorization service
 * Handles the authentication, registration and authorization of users
 * Changing passwords, restricting/providing access
 */
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    ;
    AuthService.prototype.adminRegister = function (adminInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var isExisting, _a, adminId, body, newAdmin, emailContent, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, accounts_1.AdminModel.find({ contact: { email: adminInfo.contact.email }, isArchived: false })];
                    case 1:
                        isExisting = _b.sent();
                        // Return if there is a duplicate
                        if (isExisting.length > 0)
                            return [2 /*return*/, { success: false, message: 'Admin already exist', code: 400 }];
                        // Set a default password
                        _a = adminInfo;
                        return [4 /*yield*/, bcryptjs_1.default.hash(process.env.DEFAULT_PASSWORD || 'qms123', 10)];
                    case 2:
                        // Set a default password
                        _a.password = _b.sent();
                        if (adminInfo.adminType == 'Super') {
                            adminId =
                                "".concat(new Date().getFullYear(), "-").concat(faker_1.default.datatype.number(99999), "-SA");
                        }
                        if (adminInfo.adminType == 'Queue') {
                            adminId =
                                "".concat(new Date().getFullYear(), "-").concat(faker_1.default.datatype.number(99999), "-QA");
                        }
                        if (adminInfo.adminType == 'Station') {
                            adminId =
                                "".concat(new Date().getFullYear(), "-").concat(faker_1.default.datatype.number(99999), "-STA");
                        }
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        body = __assign(__assign({}, adminInfo), { username: adminId, adminId: adminId, type: adminInfo.adminType, status: true });
                        newAdmin = new accounts_1.AdminModel(body);
                        return [4 /*yield*/, newAdmin.save()];
                    case 4:
                        _b.sent();
                        emailContent = {
                            email: adminInfo.contact.email,
                            accountname: adminInfo.fullName.firstName,
                            username: adminId,
                            password: process.env.DEFAULT_PASSWORD
                        };
                        this.sendEmail(emailContent);
                        return [2 /*return*/, { success: true, data: newAdmin, code: 201, message: 'Account Creation Successful' }];
                    case 5:
                        error_1 = _b.sent();
                        return [2 /*return*/, { success: false, message: 'Account Creation Failed', deepLog: error_1, code: 400 }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.adminLogin = function (adminInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, flashboard, window, account, isMatch, adminObject, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, accounts_1.AdminModel.find({ username: adminInfo.username, isArchived: false })];
                    case 1:
                        admin = _a.sent();
                        return [4 /*yield*/, accounts_1.FlashboardModel.find({ username: adminInfo.username, isArchived: false })];
                    case 2:
                        flashboard = _a.sent();
                        return [4 /*yield*/, accounts_1.WindowAccountsModel.find({ username: adminInfo.username, isArchived: false })];
                    case 3:
                        window = _a.sent();
                        if (!(admin.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, accounts_1.AdminModel.findOne({ username: adminInfo.username, isArchived: false })];
                    case 4:
                        account = _a.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        if (!(flashboard.length > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, accounts_1.FlashboardModel.findOne({ username: adminInfo.username, isArchived: false })];
                    case 6:
                        account = _a.sent();
                        return [3 /*break*/, 10];
                    case 7:
                        if (!(window.length > 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, accounts_1.WindowAccountsModel.findOne({ username: adminInfo.username, isArchived: false })];
                    case 8:
                        account = _a.sent();
                        return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, { success: false, message: 'Username does not exist', code: 400 }];
                    case 10: return [4 /*yield*/, bcryptjs_1.default.compare(adminInfo.password, account.password)];
                    case 11:
                        isMatch = _a.sent();
                        // Return if password was wrong
                        if (!isMatch)
                            return [2 /*return*/, { success: false, message: 'Invalid Credentials', code: 400 }];
                        try {
                            adminObject = {
                                _id: account._id,
                                username: account.username,
                                type: account.type,
                                permissions: account.permissions
                            };
                            token = jsonwebtoken_1.default.sign(adminObject, process.env.JWT_ACCESS_SECRET || 'helloworld', { expiresIn: process.env.JWT_ACCESS_DURATION });
                            return [2 /*return*/, { success: true, data: "Bearer ".concat(token), code: 201, message: 'Login Successful' }];
                        }
                        catch (error) {
                            return [2 /*return*/, { success: false, message: 'Login Failed', deepLog: error, code: 400 }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.sendEmail = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                // Test API
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                try {
                    message = {
                        to: info.email,
                        from: { name: 'Queue Management System', email: 'emailservice.qms@gmail.com' },
                        subject: 'Account Creation',
                        text: 'Hello',
                        html: "<html>\n                            <div>\n                                <p>Hi ".concat(info.accountname, "!</p> \n                                <p>Here are your designated credentials in order to use the Queue Management System</p>    \n                                <ul>\n                                    <li>Username: ").concat(info.username, " </li>\n                                    <li>Password: ").concat(info.password, "</li>\n                                </ul>\n                                <p>Please contact us thru this email for any concerns</p>\n                                <br/>\n                                <p>Have a great day!</p>\n                                <br/>\n                                <p>Administrator</p>\n                            </div>\n                        </html>"),
                    };
                    sgMail.send(message);
                    return [2 /*return*/, { success: true, code: 201, message: 'Email Sent Successfully' }];
                }
                catch (error) {
                    return [2 /*return*/, { success: false, message: 'Email Sending Failed', deepLog: error, code: 400 }];
                }
                return [2 /*return*/];
            });
        });
    };
    AuthService.prototype.sendText = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    client.messages.create({
                        body: info.text,
                        from: process.env.TWILIO_NUMBER,
                        to: info.contact
                    });
                    return [2 /*return*/, { success: true, code: 201, message: 'Text Sent Successfully' }];
                }
                catch (error) {
                    return [2 /*return*/, { success: false, message: 'Text Sending Failed', deepLog: error, code: 400 }];
                }
                return [2 /*return*/];
            });
        });
    };
    AuthService.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var activeQueues, ticketCreated, totalReturns, totalCompleted, durations, averageDuration, durationArray, i, start, end, timeDiff, duration, sum, j, averageTicketsCompleted, toSend, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, model_2.default.find({ status: true })];
                    case 1:
                        activeQueues = _a.sent();
                        return [4 /*yield*/, model_1.default.distinct('ticket').find({ action: 'created' })];
                    case 2:
                        ticketCreated = _a.sent();
                        return [4 /*yield*/, model_1.default.distinct('ticket').find({ action: 'returned' })];
                    case 3:
                        totalReturns = _a.sent();
                        return [4 /*yield*/, model_1.default.distinct('ticket').find({ action: 'complete' })];
                    case 4:
                        totalCompleted = _a.sent();
                        return [4 /*yield*/, model_1.default.find({ action: { $nin: ['created', 'acquired'] } }, { timeStarted: 1, timeEnded: 1 })];
                    case 5:
                        durations = _a.sent();
                        averageDuration = { hours: 0, minutes: 0, seconds: 0 };
                        // Finding the Average Transaction Time Algorithm
                        if (durations.length != 0) {
                            durationArray = [];
                            for (i = 0; i < durations.length; i++) {
                                start = luxon_1.DateTime.fromISO(durations[i].timeStarted);
                                end = luxon_1.DateTime.fromISO(durations[i].timeEnded);
                                timeDiff = end.diff(start, ['hours', 'minutes', 'seconds']).toObject();
                                duration = luxon_1.Duration.fromObject(timeDiff);
                                durationArray.push(duration.as('seconds'));
                            }
                            sum = 0;
                            for (j = 0; j < durationArray.length; j++) {
                                sum = sum + durationArray[j];
                            }
                            // @ts-ignore
                            averageDuration = luxon_1.Duration.fromObject({ seconds: sum / durationArray.length })
                                .shiftTo('hours', 'minutes', 'seconds')
                                .toObject();
                        }
                        averageTicketsCompleted = ticketCreated.length / activeQueues.length;
                        toSend = {
                            activeQueues: activeQueues,
                            ticketCreated: ticketCreated,
                            totalReturns: totalReturns,
                            totalCompleted: totalCompleted,
                            averageDuration: averageDuration,
                            averageTicketsCompleted: averageTicketsCompleted,
                        };
                        return [2 /*return*/, { success: true, data: toSend, code: 201, message: 'Data retrieved successfully' }];
                    case 6:
                        error_2 = _a.sent();
                        return [2 /*return*/, { success: false, message: 'FAILED TO GET Dashboard Data', deepLog: error_2, code: 400 }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
;
exports.default = AuthService;
