// Dependencies
import faker from 'faker';
import { DateTime } from 'luxon';
// Models
import { PoolsModel } from ".";
import { WindowAccountsModel } from '../accounts';
import ArchiveModel from '../archive/model';

/**
 * Module Pools
 * Queue Process service
 * Handles the Queing Process
 * 
 */

class PoolsService {
    constructor () {};

    async createNumber(queueName: string) {

        try {

            let isEmpty = await PoolsModel.find();
            let poolId = `T${new Date().getFullYear()}-${faker.datatype.number(99999)}`;

            if (isEmpty.length === 0) {

                let ticketOne = new PoolsModel({
                    poolId,
                    ticket: 1,
                    queue: queueName,
                    user: '',
                    station: 2,
                    window: 0,
                    status: 'waiting',
                    timeStarted: DateTime.now().toISO(),
                    timeEnded: ''
                })
                ticketOne.save();
            }
            else {

                let max = await PoolsModel.find().sort({ ticket: -1 }).limit(1);
                let maxNum = max[0].ticket;

                let tickets = new PoolsModel({
                    poolId,
                    ticket: maxNum + 1,
                    queue: queueName,
                    user: '',
                    station: 2,
                    window: 0,
                    status: 'waiting',
                    timeStarted: DateTime.now().toISO(),
                    timeEnded: ''
                })
                tickets.save();
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
        );

        if (isFilled.length > 0 ) return { success: false, message: 'Window is currently transacting', code: 400 };

        let isEmpty = await PoolsModel.find(
            { 
                queue: details.queueName, 
                station: details.station, 
                window: 0 
            }
        );

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
            ).sort({ ticket: 1 }).limit(1);
            
            // Update New Ticket Status
            let newTicket = {
                poolId: getTicket[0].poolId,
                ticket: getTicket[0].ticket,
                user: getTicket[0].user,
                queue: details.queueName,
                station: details.station,
                window: details.window,
                status: 'transacting',
                timeStarted: DateTime.now().toISO(),
                timeEnded: '',
            }

            let ticketNew = await PoolsModel.findByIdAndUpdate({ _id: getTicket[0]._id }, newTicket);

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
            }

            let storeTicket = new ArchiveModel(archiveTicket);
            storeTicket.save();

            return { success: true, message: 'GET Ticket Successful', code: 200 }
        } catch (err) {
            
            console.log(err)
            return { success: false, message: 'FAILED to GET Number', deepLog: err, code: 400}
        }

    }

    async nextNumber(details: any) {

    }

    async recallNumber() {

    }

    async returnNumber() {
        
    }

}

export default PoolsService;