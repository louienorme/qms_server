import { Request, Response } from 'express'

import ArchiveService from './service'
import { sendResponse } from '../_util/response';

const archiveService = new ArchiveService();

// GET ALL Records
const getAll = async ( req: Request, res: Response ) => {
    let result = await archiveService.getAllRecords();
    sendResponse(res, result);
}

export default { getAll }