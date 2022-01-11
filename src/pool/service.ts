// Dependencies
import faker from 'faker';
import { DateTime } from 'luxon';
// Models
import { PoolsModel } from ".";

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

    async nextNumber() {

    }

    async recallNumber() {

    }

    async returnNumber() {
        
    }

}

export default PoolsService;