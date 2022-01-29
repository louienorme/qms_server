import { Request, Response } from 'express';

import QueueService from './service';
import { sendResponse } from '../_util/response';

const queueService = new QueueService();

// Create Queue Step 1
const stepOneQueueCreation = async (req: Request, res: Response) => {
    let body = req.body;
    let result: any = await queueService.createQueueStepOne(body);
    sendResponse(res, result);
}

// Create Queue Step 2
const stepTwoQueueCreation = async (req: Request, res: Response) => {
    let name = req.params.queueName;
    let stations = req.body.stations;
    let result: any = await queueService.createQueueStepTwo(stations, name);
    sendResponse(res, result);
}

// Create Queue Last Step
const lastStepQueueCreation = async (req: Request, res: Response) => {
    let name = req.params.queueName;
    let result: any = await queueService.createQueueLastStep(name);
    sendResponse(res, result);
}

// GET All Queues
const queueGetAll = async (req: Request, res: Response) => {
    let result: any = await queueService.getAllQueues();
    sendResponse(res, result);
} 

// GET Queues
const queueGet = async (req: Request, res: Response) => {
    let name = req.params.queueName
    let result: any = await queueService.getQueue(name);
    sendResponse(res, result);
} 

// GET Stations
const stationsGet = async (req: Request, res: Response) => {
    let name = req.params.queueName;
    let result: any = await queueService.getStations(name);
    sendResponse(res, result);
} 

// GET Windows
const windowsGet = async (req: Request, res: Response) => {
    let name = req.params.queueName;
    let result: any = await queueService.getWindows(name);
    sendResponse(res, result);
} 

// DELETE Queue
const queueDelete = async (req: Request, res: Response) => {
    let name = req.params.queueName;
    let result: any = await queueService.deleteQueue(name);
    sendResponse(res, result);
}

export default { stepOneQueueCreation, stepTwoQueueCreation, lastStepQueueCreation,
    queueGetAll, queueGet, stationsGet, windowsGet, queueDelete }


