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

export default { numberCreate };