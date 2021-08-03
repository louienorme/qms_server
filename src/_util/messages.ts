/*
*   Custom message builder
*/
const messageBuilder = (opts : any) => {
    const { field, field2, min, max, length, greater } = opts;

    const message = {
        'boolean.base': `${field} must be boolean`,
        'string.base': `${field} must be a string`,
        'string.empty': `${field} must not be empty`,
        'string.min': `${field} length must be between ${min} and ${max}`,
        'string.max': `${field} length must be between ${min} and ${max}`,
        'string.length': `${field} length must be ${length} characters long `,
        'string.email': `Email invalid`,
        'any.empty': `${field} is required`,
        'any.required': `${field} is required`,
        'any.custom': `${field} not a valid ID`,
        'object.base': `${field} must be an object`,
        'object.unknown': `Field not allowed`,
        'array.base': `${field} must be a list`,
        'array.unique': `${field} must be unique`,
        'array.includesRequiredUnknowns': `${field} are required`,
        'number.base': `${field} must be a number`,
        'number.greater': `${field} must be greater than ${greater}`,
        'number.min': `${field} must be greater than or equal to ${field2}`,
        'date.base': `${field} must be a valid date`
    };

    return message;
};

//  This function will remove all unneccesary details from the JOI Validation
const cleaner = (error : any) => {
    const errors: any = {};
    // Gets all details from the error
    const details = error.details;
    // Loops through the error then gets the path and message
    details.map((detail: any) => {
        let attribute = detail.path.join('.');
        if  (!errors[attribute]) {
            errors[attribute] =  detail.message;
        }
    });

    return errors;
};

export { messageBuilder, cleaner }