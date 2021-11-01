// Dependencies
import jwt from 'jsonwebtoken';

// Models
import { AdminModel } from './index';

/**
 * Module Accounts
 * Account Management service
 * Handles the management of admin accounts
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
}

export default AccountService;