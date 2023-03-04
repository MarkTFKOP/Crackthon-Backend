import express from "express";
import { config } from "dotenv";
import loader from "./loaders/express";

config();
loader(express);
