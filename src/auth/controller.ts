import { Request, Response } from 'express';
// Services and Utilities
import AuthService from './service';
import { sendResponse } from '../_util/response';

const authService = new AuthService();

// Logs the Admin In
const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    let result: any =  await authService.adminLogin({username, password});
    sendResponse(res, result);
};
// Registers the User
const register = async (req: Request, res: Response) => {
    let body = req.body;
    let result: Object =  await authService.adminRegister(body);
    sendResponse(res, result);
};

// Send Email
const emailSend = async (req: Request, res: Response) => {
    let body = req.body;
    let result =  await authService.sendEmail(body);
    sendResponse(res, result);
};

// Send Text
const textSend = async (req: Request, res: Response) => {
    let body = req.body;
    let result =  await authService.sendText(body);
    sendResponse(res, result);
};

export default { login, register, emailSend, textSend };