import express from 'express';
import { authController } from './index';
import { authChecker } from '../_util/checkToken';

const router = express.Router();

/**
 *  Auth API is subjected with /api/auth prefix
 *  Eg. /api/auth/login
 */

/**
 * Route to log in a user
 * @param { username, password } req
 *
 */
 router.post('/login', [], authController.login);

 /**
  *  Route to register a user
  */
 router.post('/create', [], authController.register);

  /**
  *  Route to send email
  */
   router.post('/send-email', [ authChecker ], authController.emailSend);

  /**
  *  Route to send text
  */
   router.post('/send-text', [ authChecker ], authController.textSend);
 
 export = router;