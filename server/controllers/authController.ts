// import { Request, Response, NextFunction } from "express";
// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// const jwt = require('jsonwebtoken')
// require('dotenv').config();

// type authController = {
//   verifyToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
// }

// const authController: authController = {
//   async verifyToken (req, res, next) {
//     try {
//       // VERIFY THAT THE TOKEN IS IN THE REQ HEADERS
//       const authHeader = req.headers.authorization
//       // token should be BEARER TOKEN NUMBER so we want to split bearer and token and take the token if it exists
//       const token = authHeader && authHeader.split(' ')[1]
//       if (!token) {
//         return res.status(401).json('Unable to verify token');
//       }
//       // Figure out what jwt.verify returns
//       const verified = await jwt.verify(token, ACCESS_TOKEN_SECRET)
//       return next();
//     } catch (err) {
//       return next({
//         log: "Error caught in userController.verifyJWT middleware function",
//         status: 500,
//         message: {err: `Error verifying JWT`}
//       })
//     }
//   }
// }