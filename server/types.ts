import { Request, Response, NextFunction } from "express";

export type ErrorObj = {
    log: string,
    status: number,
    message: {err: string}
};

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

// Created an interface for verifyToken to store the token into the request
export interface getUserToken extends Request {
    token: string;
};

export type authController = {
    verifyToken: (req: getUserToken, res: Response, next: NextFunction) => Promise<void>;
    generateJWT: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};


export type Endpoint = {
    apiId: string;
    apiMethod: string;
    apiPath: string;
};

export type LambdaAPIs = {
    functionName: string;
    endpoints: (Endpoint | undefined)[];
};

export type API = {
    apiName: (string | undefined);
    apiId: (string | undefined);
    paths: (string | undefined)[] | undefined;
};

export type Relation = {
    apiName: string | undefined;
    endpoints: { [key: string]: { method: string, func: string }[] } | undefined;
};

export interface subMetrics {
    values: number[] | undefined
    timestamp: Date[] | undefined
};
  
export interface Metrics {
    invocations: subMetrics,
    errors: subMetrics,
    throttles: subMetrics,
    duration: subMetrics
};