import { Request, Response } from 'express'

import ArchiveService from './service'
import { sendResponse } from '../_util/response';

const archiveService = new ArchiveService();

// GET ALL Records
const getAll = async ( req: Request, res: Response ) => {
    let result = await archiveService.getAllRecords();
    sendResponse(res, result);
}

// GET Data for Station One
const getStationOne = async ( req: Request, res: Response ) => {
    let body = req.body
    let result = await archiveService.getStationOneData(body);
    sendResponse(res, result);
}

export default { getAll, getStationOne }