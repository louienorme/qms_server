"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountController = exports.UserModel = exports.WindowAccountsModel = exports.FlashboardModel = exports.AdminModel = void 0;
var model_1 = __importDefault(require("./admin/model"));
exports.AdminModel = model_1.default;
var model_2 = __importDefault(require("./flashboard/model"));
exports.FlashboardModel = model_2.default;
var model_3 = __importDefault(require("./window/model"));
exports.WindowAccountsModel = model_3.default;
var model_4 = __importDefault(require("./user/model"));
exports.UserModel = model_4.default;
var controller_1 = __importDefault(require("./controller"));
exports.accountController = controller_1.default;
