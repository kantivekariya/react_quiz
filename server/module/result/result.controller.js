import httpStatus from "../../utils/httpStatus";
import { resultModel } from "./result.model";

const resultController = {};


resultController.result = async (req, res) => {
  console.log(req.body)
  try {
    let result = await resultModel.create({
      quiz: req.body.quiz
    });
    return res.status(httpStatus.CREATED).json(result)
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ "error": error })
  }
};



export default resultController;
