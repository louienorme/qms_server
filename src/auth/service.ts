// Dependencies
import jwt from 'jsonwebtoken';
import bscryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import faker from 'faker';
const sgMail = require('@sendgrid/mail');

// Models
import { AdminModel, FlashboardModel, WindowAccountsModel } from '../accounts';
import ArchiveModel from '../archive/model'
import QueueModel from '../queue/model'
import { DateTime, Duration } from 'luxon';

dotenv.config();

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

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
        let isExisting = await AdminModel.find({ contact: { email: adminInfo.contact.email }, isArchived: false });
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

        let admin = await AdminModel.find({ username: adminInfo.username, isArchived: false });
        let flashboard = await FlashboardModel.find({ username: adminInfo.username, isArchived: false });
        let window = await WindowAccountsModel.find({ username: adminInfo.username, isArchived: false });

        let account: any;

        if(admin.length > 0) {
            account = await AdminModel.findOne({ username: adminInfo.username, isArchived: false });
        }
        else if (flashboard.length > 0) {
            account = await FlashboardModel.findOne({ username: adminInfo.username, isArchived: false });
        }
        else if (window.length > 0) {
            account = await WindowAccountsModel.findOne({ username: adminInfo.username, isArchived: false });
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
                body: info.text,
                from: process.env.TWILIO_NUMBER,
                to: info.contact
              })
            return { success: true, code: 201, message: 'Text Sent Successfully' };
                
        }catch (error) {
            return { success: false, message: 'Text Sending Failed', deepLog: error, code: 400 };
        }
    }

    async getData() {
        try {
            
            let activeQueues: any = await QueueModel.find({ status: true })
            let ticketCreated: any = await ArchiveModel.distinct('ticket').find({ action: 'created' });
            let totalReturns: any = await ArchiveModel.distinct('ticket').find({ action: 'returned' });
            let totalCompleted: any = await ArchiveModel.distinct('ticket').find({ action: 'complete' });
            let durations: any = await ArchiveModel.find({ action: { $nin: ['created', 'acquired']  } },{ timeStarted: 1, timeEnded: 1 });
            
            let averageDuration = { hours: 0, minutes: 0, seconds: 0 }
            // Finding the Average Transaction Time Algorithm
            if (durations.length != 0) {
                let durationArray = [];

                for (let i = 0; i < durations.length; i++) {

                    // @ts-ignore
                    let start = DateTime.fromISO(durations[i].timeStarted);
                    // @ts-ignore
                    let end = DateTime.fromISO(durations[i].timeEnded);
                    let timeDiff = end.diff(start, ['hours',  'minutes', 'seconds']).toObject();
                    let duration = Duration.fromObject(timeDiff);

                    durationArray.push(duration.as('seconds'));
                }   

                let sum = 0;

                for (let j = 0; j < durationArray.length; j++) { 
                    
                    sum = sum + durationArray[j]
                }

                // @ts-ignore
                averageDuration = Duration.fromObject({ seconds: sum/durationArray.length })
                    .shiftTo('hours','minutes','seconds')
                    .toObject();
            } 

            let averageTicketsCompleted = ticketCreated.length / activeQueues.length; 
        
            let toSend = {
                activeQueues,
                ticketCreated,
                totalReturns,
                totalCompleted,
                averageDuration,
                averageTicketsCompleted,
            }
            return { success: true, data: toSend, code: 201, message: 'Data retrieved successfully' };    
        } catch (error) {
            return { success: false, message: 'FAILED TO GET Dashboard Data', deepLog: error, code: 400 };
        }
    }

};

export default AuthService;