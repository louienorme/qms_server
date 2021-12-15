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

// UPDATE Flashboard Accounts
const updateFA = async ( req: Request, res: Response) => {
    let name = req.params.queueName;
    let result: any = await accountService.UpdateFlashboardAccounts(name);
    sendResponse(res, result);
}

// UPDATE Window Accounts
const updateWA = async ( req: Request, res: Response) => {
    let name = req.params.queueName;
    let result: any = await accountService.UpdateWindowAccounts(name);
    sendResponse(res, result);
}

//DELETE Flashboard Accounts
const deleteFA = async ( req: Request, res: Response) => {
    let name = req.params.queueName;
    let result: any = await accountService.DeleteFlashboardAccounts(name);
    sendResponse(res, result);
}

// DELETE Window Accounts
const deleteWA = async ( req: Request, res: Response) => {
    let name = req.params.queueName;
    let result: any = await accountService.DeleteWindowAccounts(name);
    sendResponse(res, result);
}


export default { accountsGetAll, accountsGet, createFA, createWA, updateFA, updateWA, deleteFA, deleteWA, accountsUpdate };