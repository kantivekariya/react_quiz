import httpStatus from "../../utils/httpStatus";
import { resultModel } from "./result.model";

const resultController = {};


resultController.result = async (req, res) => {
  try {
    let result = await resultModel.create({
      question: req.body.question,
      wrongans: req.body.wrongans,
      correct: req.body.correct
    });
    return res.status(httpStatus.CREATED).json(result)
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ "error": error })
  }
};



export default resultController;
