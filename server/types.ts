import { Request, Response, NextFunction } from "express";

// Server.ts
export type ErrorObj = {
    log: string,
    status: number,
    message: {err: string}
};

// userController.ts
export type userController = {
    verifyUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateUserProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateUserPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};

export type KeyType = "email" | "firstName" | "lastName" | "password" | "confirmation" | "arn" | "region";

export type KeyTypeSettings = "firstName" | "lastName" | "arn" | "region";

export type KeyTypePassword = "password" | "confirmation";

// authController.ts
// Created an interface for verifyToken to store the token into the request
export interface getUserToken extends Request {
    token: string;
};

export type authController = {
    verifyToken: (req: getUserToken, res: Response, next: NextFunction) => Promise<void>;
    generateJWT: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
