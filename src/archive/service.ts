// Models
import { ArchiveModel } from '.';

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

}

export default ArchiveService;