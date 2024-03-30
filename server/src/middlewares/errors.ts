import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode?: number;
}

export const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    err.message ||= "Internal server error";
    err.statusCode ||= 500;

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};


export const TryCatch = (passedFun: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await passedFun(req, res, next)
    } catch (error) {
        next(error)
    }
}
