// Dependencies
import faker from 'faker';
import { DateTime } from 'luxon';
// Models
import { PoolsModel } from ".";
import { WindowAccountsModel } from '../accounts';
import { ArchiveModel } from '../archive';
import { QueueModel } from '../queue';

import AuthService from '../auth/service';

const authService = new AuthService();

/**
 * Module Pools
 * Queue Process service
 * Handles the Queing Process
 * 
 */

class PoolsService {
    constructor () {};

    async createNumber(queueName: string, body: any) {

        let isEmpty = await ArchiveModel.find({ queue: queueName });
        let isEmptyPool = await PoolsModel.find({ queue: queueName });
        try {

            let poolId = `T${new Date().getFullYear()}-${faker.datatype.number(99999)}`;

            if (isEmpty.length === 0) {

                let ticketOne = new PoolsModel({
                    poolId,
                    ticket: 1,
                    order: 1,
                    queue: queueName,
                    contact: body.contact,
                    user: body.user,
                    station: 2,
                    window: 0,
                    status: 'waiting',
                    timeStarted: DateTime.now().toISO(),
                    timeEnded: '',
                    createdBy: body.creator
                })
                ticketOne.save();

                let record = new ArchiveModel({
                    poolId,
                    ticket: 1,
                    queue: queueName,
                    user: body.user,
                    station: 1,
                    window: body.window,
                    action: 'created',
                    timeStarted: DateTime.now().toISO(),
                    timeEnded: DateTime.now().toISO(),
                    createdBy: body.creator
                })
                record.save();
            }
            else {

                let max = await ArchiveModel.find({ queue: queueName }).sort({ ticket: -1 }).limit(1);
                let maxNum = max[0].ticket;
                
                let orderMax = 0;

                if (isEmptyPool.length !== 0) {
                    let order = await PoolsModel.find({ queue: queueName }).sort({ order: -1 }).limit(1);
                    orderMax = order[0].order;
                } 

                let tickets = new PoolsModel({
                    poolId,
                    order: orderMax + 1,
                    ticket: maxNum + 1,
                    queue: queueName,
                    user: body.user,
                    contact: body.contact,
                    station: 2,
                    window: 0,
                    status: 'waiting',
                    timeStarted: DateTime.now().toISO(),
                    timeEnded: '',
                    createdBy: body.creator
                })
                tickets.save();

                let record = new ArchiveModel({
                    poolId,
                    ticket: maxNum + 1,
                    queue: queueName,
                    user: body.user,
                    station: 1,
                    window: body.window,
                    action: 'created',
                    timeStarted: DateTime.now().toISO(),
                    timeEnded: DateTime.now().toISO(),
                    createdBy: body.creator
                })
                record.save();
            }

            return { success: true, message: 'Number Created!', code: 200 }
        } catch (err) {
            return { success: false, message: 'FAILED to Create Number!', deepLog: err, code: 400 }
        }
    }

    async getNumber(details: any) {

        let isFilled = await PoolsModel.find(
            { 
                queue: details.queueName, 
                station: details.station, 
                window: details.window,
                status: 'transacting'
            }
        ).limit(5);

        if (isFilled.length > 0 ) return { success: false, message: 'Window is currently transacting', code: 400 };

        let isEmpty = await PoolsModel.find(
            { 
                queue: details.queueName, 
                station: details.station, 
                window: 0 
            }
        ).limit(5);

        if (isEmpty.length === 0 ) return { success: false, data: [], message: 'The Pool is empty', code: 400 };

        try {
            
            // Update Window Status
            await WindowAccountsModel.findOneAndUpdate(
                { 
                    queueName: details.queueName,
                    station: details.station,
                    window: details.window 
                }, 
                { status: 2 }
            )
             
            // Get Ticket from Pools
            let getTicket = await PoolsModel.find(
                { 
                    window: 0, 
                    station: details.station, 
                    queue: details.queueName 
                }
            ).sort({ order: 1 }).limit(1);
            
            // Update New Ticket Status
            let newTicket = {
                poolId: getTicket[0].poolId,
                order: getTicket[0].order,
                ticket: getTicket[0].ticket,
                user: getTicket[0].user,
                contact: getTicket[0].contact,
                queue: details.queueName,
                station: details.station,
                window: details.window,
                status: 'transacting',
                timeStarted: DateTime.now().toISO(),
                timeEnded: '',
                createdBy: getTicket[0].createdBy
            }

            await PoolsModel.findByIdAndUpdate({ _id: getTicket[0]._id }, newTicket);

            // Archive Old Ticket

            let archiveTicket = {
                poolId: getTicket[0].poolId,
                ticket: getTicket[0].ticket,
                user: getTicket[0].user,
                queue: getTicket[0].queue,
                station: getTicket[0].station,
                window: getTicket[0].window,
                action: 'acquired',
                timeStarted: getTicket[0].timeStarted,
                timeEnded: DateTime.now().toISO(),
                createdBy: getTicket[0].createdBy
            }

            let storeTicket = new ArchiveModel(archiveTicket);
            storeTicket.save();

            let sendText = {
                contact: getTicket[0].contact,
                text: `Greetings, We would like to notify you that your number is currently being served at SGSP Cashier's Office. We are on a BETA TESTING. Thank you for your cooperation. Keep safe Genevievian!`
            }

            authService.sendText(sendText)

            return { success: true, message: 'GET Ticket Successful', code: 200 }
        } catch (err) {
            return { success: false, message: 'FAILED to GET Number', deepLog: err, code: 400}
        }

    }

    async nextNumber(details: any) {

        try {

            // Update Window Status
            await WindowAccountsModel.findOneAndUpdate(
                { 
                    queueName: details.queueName,
                    station: details.station,
                    window: details.window 
                }, 
                { status: 1 }
            )   

            // Get Ticket Details
            let ticket: any = await PoolsModel.findById({ _id: details.id });

            let isLast: any = await QueueModel.findOne({ name: details.queueName });
            if (isLast.numOfStations === details.station) {
                // Delete Ticket if Station is Last
                await PoolsModel.findByIdAndDelete({ _id: details.id });
            }
            else {  

                // Update New Ticket Status
                let newTicket = {
                    poolId: ticket.poolId,
                    order: ticket.order,
                    ticket: ticket.ticket,
                    user: ticket.user,
                    contact: ticket.contact,
                    queue: details.queueName,
                    station: details.station + 1,
                    window: 0,
                    status: 'waiting',
                    timeStarted: DateTime.now().toISO(),
                    timeEnded: '',
                    createdBy: ticket.createdBy
                }

                await PoolsModel.findByIdAndUpdate({ _id: details.id }, newTicket);

            }

            // Store Ticket to Archives
            let archiveTicket = {
                poolId: ticket.poolId,
                ticket: ticket.ticket,
                user: ticket.user,
                queue: ticket.queue,
                station: ticket.station,
                window: ticket.window,
                action: 'complete',
                timeStarted: ticket.timeStarted,
                timeEnded: DateTime.now().toISO(),
                createdBy: ticket.createdBy
            }
            
            let storeTicket = new ArchiveModel(archiveTicket);
            storeTicket.save();

            return { success: true, message: 'Transaction Completed', code: 200 }
        } catch (err) {
            return { success: false, message: 'FAILED to move ticket to next station', deepLog: err, code: 400 }
        }

    }

    async returnNumber(details: any) {
        
        try {

            // Update Window Status
            await WindowAccountsModel.findOneAndUpdate(
                { 
                    queueName: details.queueName,
                    station: details.station,
                    window: details.window 
                }, 
                { status: 1 }
            )   

            // Get Ticket Details
            let ticket: any = await PoolsModel.findById({ _id: details.id });
            
            // Return to stack 
            let order = await PoolsModel.find({ queue: details.queueName }).sort({ order: -1 }).limit(1);
            let orderMax = order[0].order;
            
            // Update New Ticket Status
            let newTicket = {
                poolId: ticket.poolId,
                order: orderMax + 1,
                ticket: ticket.ticket,
                user: ticket.user,
                contact: ticket.contact,
                queue: details.queueName,
                station: details.station,
                window: 0,
                status: 'waiting',
                timeStarted: DateTime.now().toISO(),
                timeEnded: '',
                createdBy: ticket.createdBy
            }

            await PoolsModel.findByIdAndUpdate({ _id: details.id }, newTicket);

            // Store Ticket to Archives
            let archiveTicket = {
                poolId: ticket.poolId,
                ticket: ticket.ticket,
                user: ticket.user,
                queue: ticket.queue,
                station: ticket.station,
                window: ticket.window,
                action: 'returned',
                timeStarted: ticket.timeStarted,
                timeEnded: DateTime.now().toISO(),
                createdBy: ticket.createdBy
            }
            
            let storeTicket = new ArchiveModel(archiveTicket);
            storeTicket.save();


            return { success: true, message: 'Ticket returned to the pool', code: 200 }
        } catch (err) { 
            return { success: false, message: 'FAILED to return ticket to pool', code: 400 }
        }
    }

    async checkNumber (details: any) {
        try {

            let windowTicket = await PoolsModel.findOne(
                {
                    queue: details.queueName,
                    station: details.station,
                    window: details.window
                }
            )

            if (!windowTicket) return { success: true, data:[], message: 'No Ticket on window', code: 200 }

            return { success: true, data: windowTicket, code: 200 }
        } catch (err) {
            return { success: false, message: 'FAILED to check ticket on window', code: 400 }
        }
    }

    async getTickets (details: any) {

        let isEmpty = await PoolsModel.find({ queue: details.queueName, station: details.station, status: 'waiting' }).limit(5);
        
        if (isEmpty.length === 0) return { success: true, data: [], message: 'The Pool is empty', code: 200 }

        try {

            let tickets = await PoolsModel.find({ queue: details.queueName, station: details.station, status: 'waiting'}).sort("order").limit(5);

            return { success: true, data: tickets, code: 200 }
        } catch (err) {
            return { success: false, message: 'FAILED to GET Tickets', code: 400 }
        }
    }

    async getWindowTickets (details: any) {

        let isEmpty = await PoolsModel.find({ queue: details.queueName, station: details.station, });
        
        if (isEmpty.length === 0) return { success: true, data: [], message: 'Windows are Empty', code: 200 }

        try {

            let windowStatus: any = [];

            let tickets = await PoolsModel.find({ queue: details.queueName, station: details.station,}).limit(5);
            let windows = await WindowAccountsModel.find({ queueName: details.queueName, station: details.station }).limit(5);

            for( let i = 0; i < windows.length; i++ ) {
                let number = 0;
                let status = 'waiting'
                let timeStarted = '00:00:00'
                tickets.forEach( ticket => {

                    if(ticket.window === windows[i].window) {
                        number = ticket.ticket
                        status = ticket.status
                        timeStarted = ticket.timeStarted
                    } 

                    if(windows[i].status === 0) {
                        status = 'inactive'
                    }

                })


                let stat = {
                    queue: details.queueName,
                    station: details.station,
                    window: i + 1,
                    ticket: number,
                    status,
                    timeStarted
                }

                windowStatus.push(stat)
            }

            return { success: true, data: windowStatus, code: 200 }
        } catch (err) {
            return { success: false, message: 'FAILED to GET Window Tickets', code: 400 }
        }
    }

}

export default PoolsService;