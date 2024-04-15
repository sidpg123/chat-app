import { Request, Response, NextFunction } from "express";
import { TryCatch } from "./errors";
import { ErrorHandler } from "../utils/utils";
import jwt from "jsonwebtoken";
// import { adminSecretKey } from "..";

export interface CustomRequest extends Request {
  user: any; // Or a more specific type for decoded user data
}


export const isAuthenticated = TryCatch((req: CustomRequest, res: Response, next: NextFunction) => {
  const token: string = req.cookies['chat-cookie'];

  if (!token) return next(new ErrorHandler(401, "Please login to access this route"));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);
  
  req.user = decodedData;
  //console.log(req.user)

  next();
})


export const isAuthenticatedAdmin  = TryCatch((req: CustomRequest, res: Response, next: NextFunction) => {
  const token: string = req.cookies['chat-app-admin'];

  if (!token) return next(new ErrorHandler(401, "Only Adin can access this route"));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET as string);
  const adminSecretKey = process.env.ADMIN_SECRET_KEY;
  const isMatch = secretKey === adminSecretKey; 
  
  if (!isMatch) return next(new ErrorHandler(401, "Only Adin can access this route"));
//console.log(req.user)

  next();
})