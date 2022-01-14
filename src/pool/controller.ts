import { Request, Response } from 'express'

import PoolsService from './service'
import { sendResponse } from '../_util/response';

const poolsService = new PoolsService();

// Create Number
const numberCreate = async ( req: Request, res: Response ) => {
    let queue = req.params.queueName;
    let result: any = await poolsService.createNumber(queue);
    sendResponse(res, result);
}

// Get Number
const numberGet = async ( req: Request, res: Response ) => {
    let body = req.body;
    let result: any = await poolsService.getNumber(body);
    sendResponse(res, result);
}

// Next Number 
const numberNext = async ( req: Request, res: Response ) => {
    let body = req.body 
    let result: any = await poolsService.nextNumber(body);
    sendResponse(res, result);
}

// Return Number 
const numberReturn = async ( req: Request, res: Response ) => {
    let body = req.body 
    let result: any = await poolsService.returnNumber(body);
    sendResponse(res, result);
}

// Check Number
const numberCheck = async ( req: Request, res: Response ) => {
    let body = req.body 
    let result: any = await poolsService.checkNumber(body);
    sendResponse(res, result);
}

export default { numberCreate, numberNext, numberGet, numberReturn, numberCheck };