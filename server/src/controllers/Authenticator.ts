import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

module.exports = async (req: Request, res: Response, next: any) => {

        try {
            const token = await req.headers.authorization?.split(" ")[1];
            const decodedToken = await jwt.verify(
                token,
                "RANDOM-TOKEN"
            );
            req.body = await decodedToken;

            next();
        } catch (error) {
            res.status(401).json({
                error: new Error("Invalid request!"),
            });
        }
    }