import { Request, Response} from "express";
import { Collection } from "mongodb";
import UserModel from "../models/UserModel";

export const getAllUsers = (usersCollection: Collection<UserModel>) => 
  async (req: Request, res: Response): Promise<void> => {
    console.log("getAllUsers");
    //console.log(usersCollection); // Add this line
    try {
      const users = await usersCollection.find({}).toArray();
      console.log(users);
      res.json(users);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
}

export const createUser = (usersCollection: Collection<UserModel>) => 
  async (req: Request, res: Response): Promise<void> => {
    const user = req.body;
    try {
      const result = await usersCollection.insertOne(user);
      res.json((result as any).acknowledged);
    } catch (err) {
      res.json(err);
    }
}
