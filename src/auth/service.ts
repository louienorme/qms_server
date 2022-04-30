// Dependencies
import jwt from 'jsonwebtoken';
import bscryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import faker from 'faker';
const sgMail = require('@sendgrid/mail');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')('AC07a53648f130e426823985b9ea8b014b', '7ec34e8f9c3ba3d918d9031dfd9cdaea');
// Models
import { AdminModel, FlashboardModel, WindowAccountsModel } from '../accounts';
import ArchiveModel from '../archive/model'
import QueueModel from '../queue/model'

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
                username: adminId,
                adminId,
                type: adminInfo.adminType,
                status: true
            }

            const newAdmin = new AdminModel(body);
            await newAdmin.save();

            const emailContent = {
                email: adminInfo.contact.email,
                accountname: adminInfo.fullName.firstName,
                username: adminId,
                password: process.env.DEFAULT_PASSWORD
            }

            this.sendEmail(emailContent)

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

    async sendEmail( info: any ) {

        // Test API

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
           
        try{
            const message = {
                to: info.email,
                from: {name: 'Queue Management System', email: 'emailservice.qms@gmail.com'},
                subject: 'Account Creation',
                text: 'Hello',
                html: `<html>
                            <div>
                                <p>Hi ${info.accountname}!</p> 
                                <p>Here are your designated credentials in order to use the Queue Management System</p>    
                                <ul>
                                    <li>Username: ${info.username} </li>
                                    <li>Password: ${info.password}</li>
                                </ul>
                                <p>Please contact us thru this email for any concerns</p>
                                <br/>
                                <p>Have a great day!</p>
                                <br/>
                                <p>Administrator</p>
                            </div>
                        </html>`,
            };

            sgMail.send(message)
            return { success: true, code: 201, message: 'Email Sent Successfully' };
                
        }catch (error) {
            return { success: false, message: 'Email Sending Failed', deepLog: error, code: 400 };
        }
    }

    async sendText( info: any ) {

        try{
            client.messages.create({
                body: 'This is my first text message from twilio',
                from: '+19803032319',
                to: info.text
              })
            return { success: true, code: 201, message: 'Text Sent Successfully' };
                
        }catch (error) {
            return { success: false, message: 'Text Sending Failed', deepLog: error, code: 400 };
        }
    }

    async getData() {
        try {
            
            let activeQueues = await QueueModel.find({ status: true })
            let archiveData = await ArchiveModel.distinct('ticket').find();

            const toSend = {
                activeQueues,
                archiveData
            }

            return { success: true, data: toSend, code: 201, message: 'Data retrieved successfully' };    
        } catch (error) {
            return { success: false, message: 'FAILED TO GET Dashboard Data', deepLog: error, code: 400 };
        }
    }

};

export default AuthService;