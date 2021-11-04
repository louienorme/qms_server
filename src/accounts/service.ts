// Dependencies
import bcryptjs from 'bcryptjs';
import faker from 'faker';

// Models
import { AdminModel, FlashboardModel } from './index';
import StationModel from '../station/model';
import QueueModel from '../queue/model';

/**
 * Module Accounts
 * Account Management service
 * Handles the management of accounts
 * 
 */

class AccountService {
    constructor () {};

    async getAllAccounts() {
        // Find if there is any account that exists
        let isExisting = await AdminModel.find();
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 };

        try {

            let accounts = await AdminModel.find();
            
            return { success: true, data: accounts, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET ALL Accounts', deepLog: err, code: 400 }
        }
    }

    async getAccounts(type: string) {
        // Find if there is any account that exists
        let isExisting = await AdminModel.find({ adminType: type })
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 };

        try {

            let accounts = await AdminModel.find({ adminType: type });

            return { success: true, data: accounts, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Accounts', deepLog: err, code: 400 }
        }

    }

    async createFlashboardAccounts(queueName: string) {
         // Check if there are stations created
         let isExisting = await StationModel.find({ queueName });
         // Return if none exists
         if (!isExisting) return { success: false, message: 'No Stations were created', code: 400 }

        try {
            
            let queue: any = await QueueModel.findOne({ name: queueName });
            let flashboardId = `${new Date().getFullYear()}-${faker.datatype.number(99999)}-FA`;
            let password = await bcryptjs.hash(process.env.DEFAULT_PASSWORD || 'qms123', 10);

            for (let i = 0; i < queue.numOfStations; i++) {
                let count = i + 1
                let flashboard = new FlashboardModel({
                    flashboardId,
                    queueName,
                    status: true,
                    station: count,
                    username: `Station-${count}_Flashboard`,
                    password
                })
                await flashboard.save()
            }

            return { success: true, message: 'Flashboard Accounts created', code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to CREATE Flashboard Accounts', deepLog: err, code: 400 }
        }
    }

    async createWindowAccounts(queueName: string) {
        // Check if there is a queue with the same name
        let isExisting = await QueueModel.findOne({ name: queueName });
        // Return if its exists 
        if (!isExisting) return { success: false, message: 'That queue does not exists!', code: 400 }

        try {
            
            let stations = await StationModel.find({ queueName });

            stations.forEach(async (station) => {
                for (let i = 0; i < station.numOfWindows; i++) {
                    let count = i + 1
                    let windowId = `${new Date().getFullYear()}-${faker.datatype.number(99999)}-WA`;
                    let username = `${queueName}_S${station.stationNumber}W${count}`;
                    let password = await bcryptjs.hash(process.env.DEFAULT_PASSWORD || 'qms123', 10);
                    let window = new AdminModel({
                        adminId: windowId,
                        adminType: 'Window',
                        username,
                        password
                    })
                    await window.save();
                }
            });
            
            return { success: true, message: 'Window Accounts created', code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to CREATE Window Accounts', deepLog: err, code: 400 }
        }
    }
}

export default AccountService;