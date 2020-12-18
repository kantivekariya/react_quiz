import express from "express";
import quizController from "./quiz.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";

const quizRoutes = express.Router();

quizRoutes.get("/", function(req, res, next) {
  res.json({ message: "from index api" });
});

// Add Question
quizRoutes.post('/question', asyncWrapper(quizController.question));

// Get All Question
quizRoutes.get('/question', asyncWrapper(quizController.findAll));

// Get Byid Question
quizRoutes.get('/question/:id', asyncWrapper(quizController.findOne));


export { quizRoutes };
