import express from 'express';
import { accountController } from './index'
import { authChecker } from '../_util/checkToken';

const router = express.Router();

/**
 *  Account API is subjected with /api/accounts prefix
 *  Eg. /api/accounts/
 */

/**
 * Route to GET ALL Accounts
 *
 */
router.get('/', [ authChecker ], accountController.accountsGetAll);

 /**
 * Route to GET Accounts
 *
 */
router.get('/:type', [ authChecker ], accountController.accountsGet);

 /**

 * Route to Update Accounts
 *
 */

router.put('/update/:adminId', [ authChecker ], accountController.accountsUpdate); 

 /**
 * Route to Update Accounts
 *
 */

router.delete('/delete/:adminId', [ authChecker ], accountController.accountsDelete); 

 /**
 * Route to Create Flashboard Accounts
 *
 */

router.put('/flashboards/:queueName', [ authChecker ], accountController.createFA);
 
/** 
 * Route to GET Queue Window Accounts
 *
 */
router.get('/windows/:queueName', [ authChecker ], accountController.windowAccountsGet);

   /**
 * Route to GET Queue Flashboards Accounts
 *
 */
router.get('/flashboards/:queueName', [ authChecker ], accountController.flashboardsGet);

  /**
 * Route to Create Flashboard Accounts
 *
 */
router.put('/flashboards-create/:queueName', [ authChecker ], accountController.createFA);

  /**
 * Route to Create Window Accounts
 *
 */
router.put('/windows-create/:queueName', [ authChecker ], accountController.createWA);


 export = router;