import { Request, Response, NextFunction } from "express";
// import { config } from "dotenv";
import { Config } from '../envConfig/config';
import UserModel, {IUser} from "../models/userModel";
import jwt from "jsonwebtoken";

// config();
const JWT_TOKEN = Config.JWTSecret;

// this function is used to create token
const createToken = (id: string) => {
  return jwt.sign({ id }, JWT_TOKEN, {
    expiresIn: "1h", 
  });
};


const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user: IUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.redirect("/enter");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.redirect('/create'); 
    }

    const isValidPassword: boolean = await user.isValidPassword(password);

    if (!isValidPassword) {
      return res.status(400).send({ message: "Wrong password" });
    }
    const token = createToken(user._id);
 
    res.status(200)
      .cookie("jwt", token, { maxAge: 3600000 })
      .redirect("/url");
  } catch (err) {
    res.status(500).json(err);
  }
};

async function logOut(req: Request, res: Response) {
  try {
    res.clearCookie('jwt') 
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export { register, login, logOut };
