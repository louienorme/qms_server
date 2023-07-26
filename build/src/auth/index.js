"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validateLogin = exports.authController = exports.authService = void 0;
var controller_1 = __importDefault(require("./controller"));
exports.authController = controller_1.default;
var service_1 = __importDefault(require("./service"));
exports.authService = service_1.default;
var schema_1 = require("./schema");
Object.defineProperty(exports, "validateRegister", { enumerable: true, get: function () { return schema_1.validateRegister; } });
Object.defineProperty(exports, "validateLogin", { enumerable: true, get: function () { return schema_1.validateLogin; } });
