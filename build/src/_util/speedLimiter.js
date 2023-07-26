"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slowDown = require("express-slow-down");
var speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 500 // begin adding 500ms of delay per request above 100:
    // request # 101 is delayed by  500ms
    // request # 102 is delayed by 1000ms
    // request # 103 is delayed by 1500ms
    // etc.
});
exports.default = speedLimiter;
