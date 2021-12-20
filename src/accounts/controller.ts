import { Request, Response } from 'express'

import AccountService from './service'
import { sendResponse } from '../_util/response';

const accountService = new AccountService();

// GET ALL Accounts
const accountsGetAll = async ( req: Request, res: Response ) => {
    let result: any = await accountService.getAllAccounts();
    sendResponse(res, result);
};

// GET Accounts
const accountsGet = async ( req: Request, res: Response ) => {
    let type = req.params.type;
    let result: any = await accountService.getAccounts(type);
    sendResponse(res, result);
}

// UPDATE Accounts 
const accountsUpdate = async (req: Request, res: Response) => {
    let id = req.params.adminId;
    let body = req.body;
    let result: any = await accountService.updateAccounts(id, body);
    sendResponse(res, result);
}

// DELETE Accounts 
const accountsDelete = async (req: Request, res: Response) => {
    let id = req.params.adminId;
    let body = req.body;
    let result: any = await accountService.deleteAccounts(id, body);=======
// GET Queue Window Accounts
const windowAccountsGet = async ( req: Request, res: Response ) => {
    let name = req.params.queueName;
    let result: any = await accountService.getWindowAccounts(name);
    sendResponse(res, result);
}

// GET Queue Flashboard Accounts
const flashboardsGet = async ( req: Request, res: Response ) => {
    let name = req.params.queueName;
    let result: any = await accountService.getFlashboards(name);

    sendResponse(res, result);
}

// CREATE Flashboard Accounts
const createFA = async ( req: Request, res: Response ) => {
    let name = req.params.queueName;
    let result: any = await accountService.createFlashboardAccounts(name);
    sendResponse(res, result);
}

// CREATE Window Accounts
const createWA = async ( req: Request, res: Response ) => {
    let name = req.params.queueName;
    let result: any = await accountService.createWindowAccounts(name);
    sendResponse(res, result);
}

export default { accountsGetAll, accountsGet, windowAccountsGet,
    flashboardsGet, createFA, createWA };

