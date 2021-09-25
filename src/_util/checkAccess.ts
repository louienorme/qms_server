import { Request, Response, NextFunction, response } from 'express'
import { request } from 'http';
import PermissionSchema from '../permissions/model';

const checkAccess = (scopes: Array<String>) => {
    return async (req: Request, res: Response, next: NextFunction) => {

    }
};

const checkIfSuper = (req: Request, res: Response, next: NextFunction) => {


    next();
}

const checkIfQueue = (req: Request, res: Response, next: NextFunction) => {


    next();
}

const checkIfStation = (req: Request, res: Response, next: NextFunction) => {


    next();
}

const checkIfWindow = (req: Request, res: Response, next: NextFunction) => {


    next();
}

export { checkAccess, checkIfSuper, checkIfQueue, checkIfStation, checkIfWindow };