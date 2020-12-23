import express from "express";
import { asyncWrapper } from "../../utils/asyncWrapper";
import { authRequired } from "../../config/auth";
import resultController from "./result.controller";

const resultRoutes = express.Router();

resultRoutes.get("/", function (req, res, next) {
  res.json({ message: "from index api" });
});

// Add Question
resultRoutes.post('/result', asyncWrapper(resultController.result));




export { resultRoutes };
