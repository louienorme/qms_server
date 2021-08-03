// Dependencies
import jwt from 'jsonwebtoken';
import bscryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import faker from 'faker';

// Models
import { AdminModel } from '../superAdmin/index';

dotenv.config();

/**
 * Module Auth
 * Authentication/Authorization service
 * Handles the authentication, registration and authorization of users
 * Changing passwords, restricting/providing access
 */

class AuthService {
    constructor() {};

    async adminRegister(adminInfo: any) {
         // Find for a duplicate account
         let isExisting = await AdminModel.find({ email: adminInfo.email });
         // Return if there is a duplicate
         if (isExisting.length > 0) return { success: false, message: 'Admin already exist', code: 400 };
         // Set a default password
         adminInfo.password = await bscryptjs.hash(process.env.DEFAULT_PASSWORD || 'qms123', 10);
         // Generate Random ID
         adminInfo.adminId = `${new Date().getFullYear()}-${faker.datatype.number(5)}`;
        try {
            const newUser = new AdminModel(adminInfo);
            await newUser.save();
            return { success: true, data: [], code: 201, message: 'Registration Successful' };

        } catch (error) {
            return { success: false, message: 'Registration Failed', deepLog: error, code: 400 };
        }
    }

    async adminLogin(adminInfo: any) {
        // Find if account exists
        let isExisting = await AdminModel.find({ userId: adminInfo.adminId });
        // Return if does not existsadmin
        if (isExisting.length === 0) return { success: false, message: ' does not exist', code: 400 };
        // Compare Password
        let admin: any = await AdminModel.findOne({ adminId: adminInfo.adminId });
        let isMatch = await bscryptjs.compare(adminInfo.password, admin.password);
        // Return if password was wrong
        if (!isMatch) return { success: false, message: 'Invalid Credentials', code: 400 };

        try {
            const token = jwt.sign(
                {
                    _id: admin._id,
                    adminId: admin.adminId,
                }, 
                process.env.JWT_ACCESS_SECRET || 'helloworld', 
                { expiresIn: process.env.JWT_ACCESS_DURATION }
                );
            
            let adminToken: any = await AdminModel.findOne({ adminId: adminInfo.adminId }, { password: 0 });
            let loginRes = { `Bearer ${token}`, ...adminToken };

            return { success: true, data: loginRes, code: 201, message: 'Login Successful' };
        } catch (error) {
            return { success: false, message: 'Login Failed', deepLog: error, code: 400 };
        }
    }


};

export default AuthService;