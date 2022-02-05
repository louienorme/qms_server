// Models
import { ArchiveModel } from '.';
import { PoolsModel } from '../pool'
/**
 * Module Archive
 * Archiving service
 * Handles the Records of Transactions
 * 
 */

class ArchiveService {
    constructor () {};

    async getAllRecords() {
        
        let isEmpty = await ArchiveModel.find();

        if (isEmpty.length === 0) return { success: true, message: 'Archives is empty!', code: 200 };

        try {

            let records = await ArchiveModel.find();

            return { success: true, data: records, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET ALL Archive Records', deepLog: err, code: 400 }
        }
    }

    async getStationOneData (info: any) {

        let isEmpty = await ArchiveModel.find({ queue: info.queueName });

        if (isEmpty.length === 0) return { success: true, data: [], code: 200 }

        try {  

            let ticketCount = await ArchiveModel.distinct('ticket').find({ queue: info.queueName }).sort({ ticket: -1 }).limit(1);
            let lastNumberCreated = await ArchiveModel.distinct('ticket').find({ queue: info.queueName, createdBy: info._id, action: 'created' }).sort({ ticket: -1 }).limit(1);
            let numbersCreated = await ArchiveModel.distinct('ticket').find({ queue: info.queueName, createdBy: info._id, action: 'created' });
            let recentNumbers = await ArchiveModel.distinct('ticket').find({ queue: info.queueName, createdBy: info._id, action: 'created' }).sort({ ticket: -1 }).limit(5);

            const response = {
                ticketCount,
                lastNumberCreated,
                numberCount: numbersCreated.length,
                recentNumbers
            }

            return { succesS: true, data: response, code: 200 }
        } catch (err) {
            return { success: false, message: 'Failed to GET Station One Data', deepLog: err, code: 400 }
        }
    }

}

export default ArchiveService;