import { Request,Response, NextFunction } from 'express';
import joi from 'joi';
import { messageBuilder, cleaner } from '../_util/messages';

const adminId = joi.string()
    .required()
    .messages(messageBuilder({ field: 'adminId' }));

const roleId = joi.string()
    .required()
    .messages(messageBuilder({ field: 'roleId' }));

const username = joi.string()
    .required()
    .messages(messageBuilder({ field: 'Username' }));

const email = joi.string()
    .required()
    .messages(messageBuilder({ field: 'Email' }));

const password = joi.string()
    .required()
    .messages(messageBuilder({ field: 'Password' }));

const registerSchema = joi.object()
    .keys({
        email,
        username,
        password
    })
    .messages(messageBuilder({ field: '' }));

const loginSchema = joi.object()
    .keys({
        username,
        password
    })
    .messages(messageBuilder({ field: '' }));

const validateRegister = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = registerSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const cleanError = cleaner(error);
            return res.status(400).json(cleanError);
        }
        next();
    };
};

const validateLogin = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const cleanError = cleaner(error);
            return res.status(400).json(cleanError);
        }
        next();
    };
}

export { registerSchema, loginSchema, validateRegister, validateLogin }