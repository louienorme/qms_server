// Dependency
import faker from 'faker';

// Models
import { FlashboardModel, AdminModel } from "src/accounts";
import QueueModel from './model';
import StationModel from '../station/model';
import WindowModel from '../window/model';
import BranchModel from '../branch/model';

/**
 * Module Queue
 * Queue Management service
 * Handles the management of Queues, and Queue Creation
 * 
 */

class QueueService {
    constructor () {};

    async createQueueStepOne(queueInfo: any) {
        // Check if there is a queue with the same name
        let isExisting = await QueueModel.findOne({ name: queueInfo.name });
        // Return if its exists 
        if (isExisting) return { success: false, message: 'Queue name already exists!', code: 400 }

        try {
            let queueId = `Q${faker.datatype.number(99999)}-${new Date().getFullYear()}`;

            let queue = new QueueModel({ ...queueInfo, queueId, status: true });
            await queue.save();

            for (let i = 0; i < queueInfo.numOfStations; i++) {
            
                let stationId = `S${faker.datatype.number(99999)}-${new Date().getFullYear()}`
                let count = i + 1;
                let station = new StationModel({
                    queueName: queueInfo.name,
                    stationId,
                    status: true,
                    stationNumber: count
                })
                await station.save();
            }
            return { success: true, message: 'Queue Creation Step 1 Success', code: 200 }
        } catch (err) {
            return { success: false, message: 'Queue Creation Step 1 Failed', deepLog: err, code: 400 }
        }
    }

    async createQueueStepTwo(stations: Array<any>, queueName: string) {
        // Check if there are stations created
        let isExisting = await StationModel.find({ queueName });
        // Return if none exists
        if (!isExisting) return { success: false, message: 'No Stations were created', code: 400 }

        try {
            
            for (let i = 0; i < stations.length; i++) {
                let station: any = await StationModel.findOneAndUpdate({ _id: stations[i]._id }, {
                    ...stations[i],
                    queueName,
                    status: true
                });
                await station.save()
            }
            return { success: true, message: 'Queue Creation Step 2 Success', code: 200 }
        } catch (err) {
            return { success: false, message: 'Queue Creation Step 2 Failed', deepLog: err, code: 400 }
        }
    }

    async createQueueLastStep(queueName: string) {
        // Check if there are stations created
        let isExisting = await StationModel.find({ queueName });
        // Return if none exists
        if (!isExisting) return { success: false, message: 'No Stations were created', code: 400 }

        try {

            let stations = await StationModel.find({ queueName });

            stations.forEach(async (station) => {
                for (let i = 0; i < station.numOfWindows; i++ ) {
                    let windowId =`W${faker.datatype.number(99999)}-${new Date().getFullYear()}`
                    let count = i + 1
                    let window = new WindowModel({
                        windowId,
                        queueName,
                        status: true,
                        windowNumber: count
                    })
                    await window.save();
                }
            });

            return { success: true, message: 'Queue Creation Step 3 Success', code: 200 }
        } catch (err) {
            return { success: false, message: 'Queue Creation Step 3 Failed', deepLog: err, code: 400 }
        }
    }

    async getAllQueues() {
        // Check if there are queues created
        let isExisting = await QueueModel.find();
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 }

        try {
            
            let queues = await QueueModel.find();

            return { success: true, data: queues, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET ALL Queues', deepLog: err, code: 400 }
        }
    }

    async getQueue(queueName: string) {
        // Check if there are queues created
        let isExisting = await QueueModel.findOne({ name: queueName });
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 }

        try {
            
            let queue = await QueueModel.findOne({ name: queueName });

            return { success: true, data: queue, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Queue', deepLog: err, code: 400 }
        }
    }
    
    async getStations(queueName: string) {
        // Check if there are stations created
        let isExisting = await StationModel.find({ queueName });
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 }

        try {
            
            let stations = await StationModel.find({ queueName });

            return { success: true, data: stations, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Stations', deepLog: err, code: 400 }
        }
    }

    async getWindows(queueName: string) {
        // Check if there are windows created
        let isExisting = await WindowModel.find({ queueName });
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 }

        try {
            
            let windows = await WindowModel.find({ queueName });

            return { success: true, data: windows, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Windows', deepLog: err, code: 400 }
        }
    }
}

export default QueueService;

