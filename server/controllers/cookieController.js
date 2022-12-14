"use strict";
// import { Request, Response, NextFunction } from "express";
// const cookie = require("cookie");
// const { v4: uuidv4 } = require("uuid");
// const User = require("../models/userModel");
// const cookieController = {};
// cookieController.setSSIDCookie = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const ssid = uuidv4();
//     // Cookie expires after a day
//     const maxAge = 1000 * 60 * 60 * 24;
//     if (res.locals.validPassword && res.locals.validUsername) {
//       res.cookie("ssid", ssid, {
//         maxAge,
//         httpOnly: true,
//       });
//     }
//     const { username } = req.body;
//     // Update user's ssid with the ssid we generated
//     User.findOneAndUpdate(
//       // How are we grabbing the username inside our controller?
//       { username: res.locals.username },
//       { ssid }
//     );
//   } catch (err) {
//     return next({
//       log: "Error caught in cookieController.setSSIDCookie middleware function",
//       status: 500,
//       message: {err: `Error inserting ssid to database`}
//     })
//   }
// };
// cookieController.validateSSID = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Check database to see if the user has an SSID
//     const 
//   } catch (err) {
//     return next({
//       log: "Error caught in cookieController.validateSSID middleware function",
//       status: 500,
//       message: {err: `Error validating session`}
//     })
//   }
// }
