import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authChecker = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return res.status(403).send({ success: false, message: 'Not Authorized' });
    }

    // Get Auth token
    const token = authHeader && authHeader.split(' ')[1];

    // Verify token
    jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'helloworld', (err, decoded) => {
        if (err) {
            return res.status(403).send({ success: false, message: 'You are not authorized for this action' });
        }

        // Commented out for future use

        const decodedInfo = decoded;
        // append decoded info to the request body for other middleware usages
        // req.body = { ...req.body, userInfo: decodedInfo };
        req.body = { ...req.body, token };

        next();
    }) 

}

export { authChecker };