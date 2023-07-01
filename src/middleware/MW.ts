import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Config } from '../envConfig/config';
import UserModel from '../models/userModel'


export interface RequestWithUser extends Request {
    user?: string
}
export const validateUserMW = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {  
      const token = req.cookies.jwt;
      if (!token) { 
        return res.redirect('/create');
      }
  
  
      const decodedToken: any = jwt.verify(token, Config.JWTSecret)
  
      const user = await UserModel.findOne({_id: decodedToken.id})
      if(!user){
        res.redirect('/enter')
      }
    req.user = user?._id
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };