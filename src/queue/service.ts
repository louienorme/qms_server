// Dependency
import faker from 'faker';

// Models
import { AdminModel, FlashboardModel, WindowAccountsModel } from "../accounts";
import { PoolsModel } from "../pool"
import QueueModel from './model';
import StationModel from '../station/model';
import WindowModel from '../window/model';
import ArchiveModel from '../archive/model';

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
            
            let queue = new QueueModel({ 
                ...queueInfo, 
                queueId, 
                numOfStations: 0,
                status: true 
            });
            await queue.save();
            return { success: true, message: 'Queue Creation Step 1 Success', code: 200 }
        } catch (err) {
            console.log(err)
            return { success: false, message: 'Queue Creation Step 1 Failed', deepLog: err, code: 400 }
        }
    }

    async createQueueStepTwo(stations: Array<any>, queueName: string) {
        // Check if there are stations created
        let isExisting = await QueueModel.findOne({ name: queueName });
        // Return if none exists
        if (!isExisting) return { success: false, message: 'Stations were not created yet', code: 400 }

        try {

            await QueueModel.findOneAndUpdate({ name: queueName }, { numOfStations: stations.length });
            
            for (let i = 0; i < stations.length; i++) {
                let stationId = `S${faker.datatype.number(99999)}-${new Date().getFullYear()}`;

                const stationNew = { 
                    stationId, 
                    queueName,
                    stationNumber: i + 1, 
                    ...stations[i] 
                } 

                let station: any = new StationModel(stationNew);
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
                for (let i = 0; i < station.numOfWindows; i++) {
                    let windowId =`W${faker.datatype.number(99999)}-${new Date().getFullYear()}`
                    let count = i + 1
                    let window = new WindowModel({
                        windowId,
                        stationNumber: station.stationNumber,
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
        if (!isExisting) return { success: false, data: [], code: 400 }

        try {
            
            let stations = await StationModel.find({ queueName });

            return { success: true, data: stations, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Stations', deepLog: err, code: 400 }
        }
    }

    async getAdminStations(id: string) {
        // Check if there are stations created
        let isExisting = await AdminModel.find({ adminId: id });
        // Return if none exists
        if (!isExisting) return { success: false, message: 'Admin does not exists' , code: 400 }

        try {
            
            let stations = await StationModel.find({ admin: { $in: [ id ] } });

            return { success: true, data: stations, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Admin Stations', deepLog: err, code: 400 }
        }
    }

    async getWindowStations(id: string) {
        // Check if there are stations created
        let isExisting = await AdminModel.find({ adminId: id });
        // Return if none exists
        if (!isExisting) return { success: false, message: 'Admin does not exists' , code: 400 }

        try {
            
            let windowArray = [];

            let stations = await StationModel.find({ admin: { $in: [ id ] } });

            // initial Details
            for (let i = 0; i < stations.length; i++) {


                for (let j = 0; j < stations[i].numOfWindows; j++) {

                    let windows = await WindowAccountsModel.find({  
                        queueName: stations[i].queueName, 
                        station: stations[i].stationNumber,
                        window: j + 1 
                    })

                    let pools = await PoolsModel.find({  
                        queue: stations[i].queueName, 
                        station: stations[i].stationNumber,
                        window: j + 1 
                    })

                    windowArray.push({ windowState: { windows, poolsData: pools}})
                }

            }

            return { success: true, data: windowArray, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Window Stations', deepLog: err, code: 400 }
        }
    }

    async getWindows(queueName: string) {
        // Check if there are windows created
        let isExisting = await StationModel.find({ queueName });
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 }

        try {
            
            let windows = await WindowModel.find({ queueName });

            return { success: true, data: windows, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Windows', deepLog: err, code: 400 }
        }
    }

    async deleteQueue(name: string) {
        // Check if there are Queue created
        let isExisting = await QueueModel.find({ name });
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 }

        try {
            await WindowModel.deleteMany({ queueName: name});
            await StationModel.deleteMany({ queueName: name });
            await FlashboardModel.deleteMany({ queueName: name });
            await WindowAccountsModel.deleteMany({ queueName: name });
            await PoolsModel.deleteMany({ queue: name });
            await QueueModel.findOneAndDelete({ name }); 
            await ArchiveModel.deleteMany({ queue: name });

            return { success: true, message: 'Successfully DELETED Queue', code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to Delete Queue', deepLog: err, code: 400 }
        }
    }
}

export default QueueService;

