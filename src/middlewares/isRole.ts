import { NextFunction, Response, Request } from "express";
function isRole(req: any, res: Response, next: NextFunction, role: String) {
  try {
    if (req.user.role !== role) throw res.status(403).send("Forbidden");
    next();
  } catch (error) {
    console.log("Error", error);
    return res.send(error);
  }
}

export default {
  isUser: function (req: any, res: Response, next: NextFunction) {
    isRole(req, res, next, "user");
    next();
  },
  isAdmin: function (req: any, res: Response, next: NextFunction) {
    isRole(req, res, next, "admin");
    next();
  },
  isRestaurant: function (req: any, res: Response, next: NextFunction) {
    isRole(req, res, next, "restaurant");
    next();
  },
};
