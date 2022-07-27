// Dependencies
import bcryptjs, { compareSync } from 'bcryptjs';
import faker from 'faker';

// Models
import { accountController, AdminModel, FlashboardModel, WindowAccountsModel } from './index';
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
        let isExisting = await AdminModel.find({ isArchived: false });
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 };

        try {

            let accounts = await AdminModel.find({ isArchived: false });
            
            return { success: true, data: accounts, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET ALL Accounts', deepLog: err, code: 400 }
        }
    }

    async getAccount(id: string) {

        try {

            let account: any;

            let admin: any = await AdminModel.find({ _id: id, isArchived: false });
            let flash: any = await FlashboardModel.find({ _id: id, isArchived: false });
            let window: any = await WindowAccountsModel.find({ _id: id, isArchived: false });

            if(admin.length > 0) {
                account = admin
            } 
            else if(flash.length > 0) {
                account = flash
            } 
            else if(window.length > 0) {
                account = window
            }
            else {
                return { success: false, message: 'Id does not exists', code: 400 }
            }


            return { success: true, data: account, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Account', deepLog: err, code: 400 }
        }

    }

    async getAccounts(type: string) {
        // Find if there is any account that exists
        let isExisting = await AdminModel.find({ type, isArchived: false })
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 };

        try {

            let accounts = await AdminModel.find({ type, isArchived: false });

            return { success: true, data: accounts, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Accounts', deepLog: err, code: 400 }
        }

    }


    async updateAccounts(id: string, body: any) {
        // Find if there is any account that exists
        let isExisting = await AdminModel.find({ _id: id, isArchived: false })
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 };

        // Find for a duplicate account
        let isExistingEmail = await AdminModel.find({ contact: { email: body.contact.email } });
        // Return if there is a duplicate
        if (isExistingEmail.length > 0) return { success: false, message: 'Email is already used!', code: 400 };

        try {

           await AdminModel.findOneAndUpdate({ _id: id, isArchived: false }, body);   
           const account = await AdminModel.findOne({ _id: id });

            return { success: true , data: account, message: 'Accounts successfully UPDATED', code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to UPDATE Accounts', deepLog: err, code: 400 }
        }
    }
  
    async getWindowAccounts(queueName: string) {
        // Find if there is any queue that exists
        let isExisting = await QueueModel.find({ name: queueName })
        // Return if none exists
        if (!isExisting) return { success: false, message: 'Queue does not exist', code: 400 };
        // Find if there is any account that exists
        let hasAccounts = await WindowAccountsModel.find({ queueName, isArchived: false })
        // Return if none exists
        if (!hasAccounts) return { success: false, message: 'No existing window in this queue', code: 400 };

        try {

            let accounts = await WindowAccountsModel.find({ queueName, isArchived: false });

            return { success: true, data: accounts, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Window Accounts', deepLog: err, code: 400 }
        }

    }

    async deleteAccounts(id: string) {
        // Find if there is any account that exists
        let isExisting = await AdminModel.findById({ _id: id, isArchived: false },)
        // Return if none exists
        if (!isExisting) return { success: true, data: [], code: 200 };

        try {

            await AdminModel.findByIdAndUpdate({ _id: id }, { isArchived: true });   

            return { success: true, message: 'Accounts successfully Deleted', code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to DELETE Accounts', deepLog: err, code: 400 }
        } 
    }
          
    async getFlashboards(queueName: string) {
        // Find if there is any account that exists
        let isExisting = await FlashboardModel.find({ queueName, isArchived: false })
        // Return if none exists
        if (!isExisting) return { success: false, message: 'No Flashboard Accounts created for this queue', code: 400 };

        try {

            let accounts = await FlashboardModel.find({ queueName, isArchived: false });

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

            for (let i = 1; i < queue.numOfStations; i++) {
                let count = i + 1
                let flashboard = new FlashboardModel({
                    flashboardId,
                    type: 'Flashboard',
                    queueName,
                    status: true,
                    station: count,
                    username: `${queueName}-Station-${count}_Flashboard`,
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
                    let window = new WindowAccountsModel({
                        adminId: windowId,
                        type: 'Window',
                        queueName,
                        status: 1,
                        station: station.stationNumber,
                        window: count,
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