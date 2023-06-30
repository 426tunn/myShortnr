import { Request, Response } from "express";

const home = async (req: Request, res: Response) => {
  res.render("index");
};

const create = async (req: Request, res: Response) => {
  res.render("create");
};

const enter = async (req: Request, res: Response) => {
  res.render("enter");
};

const urlpage = async (req: Request, res: Response) => {
  res.render("urlpage");
};


export { create, home, enter, urlpage };
