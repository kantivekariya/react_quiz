import httpStatus from "../../utils/httpStatus";
import { quizModel } from "./quiz.model";

const quizController = {};


quizController.question = async (req, res) => {
  try {
    let question = await quizModel.create({
      question: req.body.question,
      answer: req.body.answer,
      correct: req.body.correct
    });
    return res.status(httpStatus.CREATED).json(question)
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ "error": error })
  }
};

quizController.findAll = async (req, res) => {
  try {
    const questions = await quizModel.find()
    return res.status(httpStatus.OK).json(questions)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ "error": error })
  }
}

quizController.findOne = async (req, res) => {
  try {
    const _id = req.params.id
    const question = await quizModel.findOne({ _id })
    if (!question) {
      return res.status(httpStatus.NOT_FOUND).json({})
    } else {
      return res.status(httpStatus.OK).json(question)
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ "error": error })
  }
}


export default quizController;
