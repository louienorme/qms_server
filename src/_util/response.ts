import { Response } from 'express';

/**
 *
 * @param res  { Takes the res variable from express to enable sending the data to client }
 * @param result { takes the returned result from the service with the data tied from the process }
 * @returns { Object with {  success: Boolean, message: String, data: Body, deepLog: Object } }
 */
const sendResponse = (res: Response, result: any) => {
    // Checks if it fails
    // Stops the Code execution and sends response
    //  400s Error Only
    if (!result.success) {
        return res.status(result.code).send(result);
    }

    res.status(200).send(result);
};

export { sendResponse };