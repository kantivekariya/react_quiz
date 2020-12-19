import express from "express";
import userController from "./auth.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { authRequired } from "../../config/auth";

const authRoutes = express.Router();

authRoutes.get("/", function(req, res, next) {
  res.json({ message: "from index api" });
});

// Create
authRoutes.post("/register", asyncWrapper(userController.register));

// Login
authRoutes.post("/login", asyncWrapper(userController.login));

// 
// authRoutes.get("/:email",authRequired, asyncWrapper(userController.findOne));

// me
authRoutes.get("/me", authRequired, asyncWrapper(userController.me));

// Logout
authRoutes.get("/logout", authRequired, asyncWrapper(userController.logout));


export { authRoutes };
