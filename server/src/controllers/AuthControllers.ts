import { Request, Response} from "express";
import { Collection } from "mongodb";
import UserModel from "../models/UserModel";
import ResponseModel from "../models/ResponseModel";

const jwt = require('jsonwebtoken');

export const registerUser = (usersCollection: Collection<UserModel>) => 
    async (req: Request, res: Response): Promise<ResponseModel> =>{
        const user = req.body;
        try {
            const result = await usersCollection.insertOne(user);
            
            return {
                message: "User Created Successfully",
                result: result.acknowledged,
            };
        } catch (err) {
            return {
                message: "Some error occurred while creating the User.",
                result: false,
            }
        }
}

export const loginUser = (usersCollection: Collection<UserModel>) => 
    async (req: Request, res: Response): Promise<ResponseModel> => {
        const user = req.body;
        try {
            const result = await usersCollection.findOne({emailAddress: user.identifier});
            if (result) {
                console.log(result);
                return {
                    message: "User Found",
                    result: result,
                };
            } else {
                const tryUsername = await usersCollection.findOne({username: user.identifier});

                if (tryUsername) {
                    return {
                        message: "User Found",
                        result: tryUsername,
                    };
                } else {
                    return {
                    message: "User Not Found",
                    result: result,
                    };
                }
            }
        } catch (err) {
            return {
                message: "Some error occurred while finding the User.",
                result: false,
            };
        }
    }

