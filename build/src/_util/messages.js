"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleaner = exports.messageBuilder = void 0;
/*
*   Custom message builder
*/
var messageBuilder = function (opts) {
    var field = opts.field, field2 = opts.field2, min = opts.min, max = opts.max, length = opts.length, greater = opts.greater;
    var message = {
        'boolean.base': "".concat(field, " must be boolean"),
        'string.base': "".concat(field, " must be a string"),
        'string.empty': "".concat(field, " must not be empty"),
        'string.min': "".concat(field, " length must be between ").concat(min, " and ").concat(max),
        'string.max': "".concat(field, " length must be between ").concat(min, " and ").concat(max),
        'string.length': "".concat(field, " length must be ").concat(length, " characters long "),
        'string.email': "Email invalid",
        'any.empty': "".concat(field, " is required"),
        'any.required': "".concat(field, " is required"),
        'any.custom': "".concat(field, " not a valid ID"),
        'object.base': "".concat(field, " must be an object"),
        'object.unknown': "Field not allowed",
        'array.base': "".concat(field, " must be a list"),
        'array.unique': "".concat(field, " must be unique"),
        'array.includesRequiredUnknowns': "".concat(field, " are required"),
        'number.base': "".concat(field, " must be a number"),
        'number.greater': "".concat(field, " must be greater than ").concat(greater),
        'number.min': "".concat(field, " must be greater than or equal to ").concat(field2),
        'date.base': "".concat(field, " must be a valid date")
    };
    return message;
};
exports.messageBuilder = messageBuilder;
//  This function will remove all unneccesary details from the JOI Validation
var cleaner = function (error) {
    var errors = {};
    // Gets all details from the error
    var details = error.details;
    // Loops through the error then gets the path and message
    details.map(function (detail) {
        var attribute = detail.path.join('.');
        if (!errors[attribute]) {
            errors[attribute] = detail.message;
        }
    });
    return errors;
};
exports.cleaner = cleaner;
