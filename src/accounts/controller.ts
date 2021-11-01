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

export default { accountsGetAll, accountsGet };