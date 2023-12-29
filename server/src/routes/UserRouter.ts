import express, { Router, Request, Response } from "express"
import { getAllUsers, createUser } from "../controllers/UserController";
import UserModel from "../models/UserModel";
import { Collection } from "mongodb";

export const UserRouter: Router = express.Router();

UserRouter.get("/", (req: Request, res: Response) => {
  const usersCollection: Collection<UserModel> = req.app.locals.usersCollection;
  getAllUsers(usersCollection)(req, res);
});

UserRouter.post("/create", (req: Request, res: Response) => {
  const usersCollection: Collection<UserModel> = req.app.locals.usersCollection;
  createUser(usersCollection)(req, res);
});