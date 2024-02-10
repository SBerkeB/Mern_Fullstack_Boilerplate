import express, { Router, Request, Response } from "express"
import { registerUser, loginUser } from "../controllers/AuthControllers";
import UserModel from "../models/UserModel";
import { Collection } from "mongodb";
import { error } from "console";


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Authenticator = require('../controllers/Authenticator');


export const AuthRouter: Router = express.Router();


AuthRouter.post("/register", async (req: Request, res: Response) => {
    const usersCollection: Collection<UserModel> = req.app.locals.usersCollection;
    //Hashing the password
    bcrypt.hash(req.body.password, 10)
      .then(async (hashedPassword: any) => {
        
        req.body.password = hashedPassword;
        //Adding user to the database
        await registerUser(usersCollection)(req, res).then((result) => {
            res.status(201).send({
                message: "Success",
                result,
            });
        })
        //Database error handling
        .catch((error) => {
          res.status(500).send({
            message: error.message || "Some error occurred while creating the User.",
            error,
          });
        });
      }).catch((error: any) => {
        //Hash error handling
        res.status(500).send({
          message: error.message || "Some error occurred while creating the User.",
          error,
        });
      })
  });




AuthRouter.get("/login", async (req: Request, res: Response) => {
    const usersCollection: Collection<UserModel> = req.app.locals.usersCollection;
    const user = req.body;

    //Finding the user in the database
    await loginUser(usersCollection)(req, res).then((result) => {
        //Comparing the password
        bcrypt.compare(user.password, result.result.password).then((passwordMatch: any) => {
            if(passwordMatch){
                //Creating the auth token
                const token = jwt.sign(
                    {
                    userId: result.result._id,
                    userEmail: user.email,
                    },
                    "RANDOM-TOKEN", //TODO: Change this to a more secure token
                    { expiresIn: "24h" }
                );
                res.status(200).send({
                    message: "Login Successful",
                    email: user.email,
                    token,
                });

            } else {
                res.status(401).send({
                    message: "Password does not match",
                    result: false,
                });
            }

        })
        .catch((error: any) => {
            res.status(401).send({
                message: error.message,
                result: error,
            })
        });
        //Database error handling
    }).catch((error: any) => {
        res.status(500).send({
            message: error.message || "User Not Found",
            result: error,
        });
    });
});


AuthRouter.get("/test", Authenticator, (req: Request, res: Response) => {
    res.status(201).send({
        message: "You are authenticated",
    });
});