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

 export = router;