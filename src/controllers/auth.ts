/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import models from "../models";
const authModel = models.auth;

class User {
  async Register(req: Request, res: any) {
    try {
      let createObj = {};
      Object.assign(createObj, { name: req.body.name });
      Object.assign(createObj, { email: req.body.email });
      Object.assign(createObj, { username: req.body.username });
      const hash = await argon2.hash(req.body.password);
      //   let uuid = await argon2.hash("password");
      Object.assign(createObj, { password: hash });
      let registeredUser: any = await authModel.create(createObj);
      registeredUser = registeredUser.toObject();
      delete registeredUser.password;
      delete registeredUser.__v;
      let token = jwt.sign(registeredUser, process.env.JSON_WEB_TOKEN || "");
      let uuid = await argon2.hash(JSON.stringify(registeredUser));
      delete registeredUser.isDeleted;
      delete registeredUser.createdAt;
      delete registeredUser.isActive;
      delete registeredUser.updatedAt;
      delete registeredUser.role;
      res.cookie("token", `Bearer ${token}`);
      res.success.success("Registration succesful", registeredUser);
      await authModel.updateOne(
        { _id: registeredUser._id },
        { uuid: uuid.substring(uuid.length / 1.32), token: token }
      );
      return;
    } catch (error: any) {
      console.log(error);
      if (error.code && error.code == 11000)
        return res.error.Unauthorized("Username already exists");
      return res.error.ServerError("Something went wrong");
    }
  }
  async Login(req: Request, res: any) {
    try {
      let createObj = {};
      Object.assign(createObj, { username: req.body.username });
      // Object.assign(createObj, { password: req.body.password });
      let loggedInUser: any = await authModel
        .findOne(createObj)
        .select("-__v -token -uuid");
      try {
        if (!loggedInUser._id) throw res.error.Unauthorized("User not found");
      } catch (error) {
        return res.error.Unauthorized("User not found");
      }
      let checklogged = await argon2.verify(
        loggedInUser.password,
        req.body.password
      );
      if (!checklogged) return res.error.Unauthorized("Passwords don't match");
      loggedInUser = loggedInUser.toObject();
      let token = jwt.sign(loggedInUser, process.env.JSON_WEB_TOKEN || "");
      loggedInUser.token = token;
      delete loggedInUser.password;
      delete loggedInUser.isDeleted;
      delete loggedInUser.createdAt;
      delete loggedInUser.isActive;
      delete loggedInUser.updatedAt;
      delete loggedInUser.role;
      res.cookie("token", `Bearer ${token}`);
      res.success.success("Login succesful", loggedInUser);
      await authModel.updateOne({ _id: loggedInUser._id }, { token: token });
      return;
    } catch (error) {
      console.log(error);
      return res.error.ServerError("Something went wrong");
    }
  }
  async GetUser(req: any, res: any) {
    try {
      console.log(req.user);
      let user = await authModel
        .findOne({ _id: req.user._id })
        .select("name username token email -_id");
      // console.log("req.user", req.user);
      return res.success.success("Details fetched", user);
    } catch (error) {
      console.log(error);
      return res.error.ServerError("Something went wrong");
    }
  }
  async UpdateUser(req: any, res: Response) {
    try {
      let update = {};
      if (req.body.name) Object.assign(update, { name: req.body.name });
      if (req.body.email) Object.assign(update, { email: req.body.email });
      await authModel.updateOne({ _id: req.user._id }, update);
      return res.status(200).send("updated");
    } catch (error) {
      console.log(error);
    }
  }
  async Logout(req: any, res: any) {
    try {
      await authModel.updateOne({ _id: req.user._id }, { token: "" });
      res.clearCookie("token");
      return res.success.success("Logout successful", "Logout successful");
    } catch (error) {
      console.log(error);
    }
  }
}

export default new User();
