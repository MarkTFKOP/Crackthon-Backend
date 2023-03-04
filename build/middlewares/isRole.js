"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isRole(req, res, next, role) {
    try {
        if (req.user.role !== role)
            throw res.status(403).send("Forbidden");
        next();
    }
    catch (error) {
        console.log("Error", error);
        return res.send(error);
    }
}
exports.default = {
    isUser: function (req, res, next) {
        isRole(req, res, next, "user");
        next();
    },
    isAdmin: function (req, res, next) {
        isRole(req, res, next, "admin");
        next();
    },
    isRestaurant: function (req, res, next) {
        isRole(req, res, next, "restaurant");
        next();
    },
};
