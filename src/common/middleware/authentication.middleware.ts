import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { UserService } from "src/user/user.service";
import { RequestService } from "../request.service";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(private readonly requestService: RequestService, private readonly userService: UserService) { }
    private readonly logger = new Logger(AuthenticationMiddleware.name)
    async use(req: Request, res: Response, next: NextFunction,) {
        //Authenticate the request
        const userId: any = req?.headers.userid;
        // console.log('userId', userId)
        const secretKey = process.env.JWT_SECRET;
        // const secretKey = 'Jisha';
        // console.log('secretKey',secretKey)
        const userExists = await this.userService.doesUserExist(userId);
        // console.log('userExists', userExists)
        const authToken = this.decodeToken(req?.headers.authorization, secretKey);
        // console.log('authToken', authToken)
        // console.log('authToken1', req?.headers.authorization)
        if ((!userExists || !authToken || (parseInt(userId) !== authToken.id))) {
            return res.status(401).json({ error: 'Unauthorized: Missing userId or authToken' });
        }
        this.requestService.setUserId(userId);
        next();
    }

    decodeToken(token: string, secretKey: string): any {
        try {
            const decoded = jwt.verify(token, secretKey);
            return decoded;
        } catch (error) {
            // Token is invalid or expired
            return false;
        }
    }
}
