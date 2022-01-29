// Dependencies
import jwt from 'jsonwebtoken';
import bscryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import faker from 'faker';
const sgMail = require('@sendgrid/mail');
// Models
import { AdminModel, FlashboardModel, WindowAccountsModel } from '../accounts';

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
        let isExisting = await AdminModel.find({ contact: { email: adminInfo.contact.email } });
        // Return if there is a duplicate
        if (isExisting.length > 0) return { success: false, message: 'Admin already exist', code: 400 };
        // Set a default password
        adminInfo.password = await bscryptjs.hash(process.env.DEFAULT_PASSWORD || 'qms123', 10);
        // Generate Random ID
        let adminId;
        if (adminInfo.adminType == 'Super') {
            adminId = 
                `${new Date().getFullYear()}-${faker.datatype.number(99999)}-SA`;
        }
        if (adminInfo.adminType == 'Queue') {
            adminId = 
                `${new Date().getFullYear()}-${faker.datatype.number(99999)}-QA`;
        }
        if (adminInfo.adminType == 'Station') {
            adminId = 
                `${new Date().getFullYear()}-${faker.datatype.number(99999)}-STA`;
        }

        try {
            const body = {
                ...adminInfo,
                adminId,
                type: adminInfo.adminType,
                status: true
            }

            const newAdmin = new AdminModel(body);
            await newAdmin.save();
            return { success: true, data: newAdmin, code: 201, message: 'Account Creation Successful' };

        } catch (error) {
            return { success: false, message: 'Account Creation Failed', deepLog: error, code: 400 };
        }
    }

    async adminLogin(adminInfo: any) {

        let admin = await AdminModel.find({ username: adminInfo.username });
        let flashboard = await FlashboardModel.find({ username: adminInfo.username });
        let window = await WindowAccountsModel.find({ username: adminInfo.username });

        let account: any;

        if(admin.length > 0) {
            account = await AdminModel.findOne({ username: adminInfo.username });
        }
        else if (flashboard.length > 0) {
            account = await FlashboardModel.findOne({ username: adminInfo.username });
        }
        else if (window.length > 0) {
            account = await WindowAccountsModel.findOne({ username: adminInfo.username });
        } 
        else {
            return { success: false, message: 'Username does not exist', code: 400 };
        }

        let isMatch = await bscryptjs.compare(adminInfo.password, account.password);
        // Return if password was wrong
        if (!isMatch) return { success: false, message: 'Invalid Credentials', code: 400 };

        try {  

            let adminObject = {
                _id: account._id,
                username: account.username,
                type: account.type,
                permissions: account.permissions
            }
            
            const token = jwt.sign(
                adminObject,
                process.env.JWT_ACCESS_SECRET || 'helloworld', 
                { expiresIn: process.env.JWT_ACCESS_DURATION }
                );

            return { success: true, data: `Bearer ${token}`, code: 201, message: 'Login Successful' };
        } catch (error) {
            return { success: false, message: 'Login Failed', deepLog: error, code: 400 };
        }
    }

    async sendEmail(email:any) {

        sgMail.setApiKey(process.env.API_KEY);
        
        try{
            const message = {
                to: email,
                from: {name: 'QUEUE MANAGER', email: 'verkiperta@vusra.com'},
                subject: 'Hello',
                text: 'Hello Eric!',
                html: '<h1>Hello Eric HAHA!</h1>',
            };

            sgMail.send(message)
            return { success: true, code: 201, message: 'Login Successful' };
                
        }catch (error) {
            return { success: false, message: 'Login Failed', deepLog: error, code: 400 };
        }
    }

};

export default AuthService;