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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authChecker = function (req, res, next) {
    var authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(403).send({ success: false, message: 'Not Authorized' });
    }
    // Get Auth token
    var token = authHeader && authHeader.split(' ')[1];
    // Verify token
    jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET || 'helloworld', function (err, decoded) {
        if (err) {
            return res.status(403).send({ success: false, message: 'You are not authorized for this action' });
        }
        // Commented out for future use
        var decodedInfo = decoded;
        // append decoded info to the request body for other middleware usages
        // req.body = { ...req.body, userInfo: decodedInfo };
        req.body = __assign(__assign({}, req.body), { token: token });
        next();
    });
};
exports.authChecker = authChecker;
