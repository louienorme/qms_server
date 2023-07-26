"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = exports.loginSchema = exports.registerSchema = void 0;
var joi_1 = __importDefault(require("joi"));
var messages_1 = require("../_util/messages");
var adminId = joi_1.default.string()
    .required()
    .messages((0, messages_1.messageBuilder)({ field: 'Admin ID' }));
var username = joi_1.default.string()
    .required()
    .messages((0, messages_1.messageBuilder)({ field: 'Username' }));
var email = joi_1.default.string()
    .required()
    .messages((0, messages_1.messageBuilder)({ field: 'Email' }));
var password = joi_1.default.string()
    .required()
    .messages((0, messages_1.messageBuilder)({ field: 'Password' }));
var registerSchema = joi_1.default.object()
    .keys({
    email: email,
    username: username,
    password: password
})
    .messages((0, messages_1.messageBuilder)({ field: '' }));
exports.registerSchema = registerSchema;
var loginSchema = joi_1.default.object()
    .keys({
    username: username,
    password: password
})
    .messages((0, messages_1.messageBuilder)({ field: '' }));
exports.loginSchema = loginSchema;
var validateRegister = function () {
    return function (req, res, next) {
        var error = registerSchema.validate(req.body, { abortEarly: false }).error;
        if (error) {
            var cleanError = (0, messages_1.cleaner)(error);
            return res.status(400).json(cleanError);
        }
        next();
    };
};
exports.validateRegister = validateRegister;
var validateLogin = function () {
    return function (req, res, next) {
        var error = loginSchema.validate(req.body, { abortEarly: false }).error;
        if (error) {
            var cleanError = (0, messages_1.cleaner)(error);
            return res.status(400).json(cleanError);
        }
        next();
    };
};
exports.validateLogin = validateLogin;
