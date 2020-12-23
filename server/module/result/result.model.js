import mongoose from "mongoose";


const schema = mongoose.Schema;


const resultSchema = new schema(
  {
    quiz: [{
      question: String,
      answer: String,
      correct: String,
      score: String
    }]
  }
);



const resultModel = mongoose.model("resultModel", resultSchema, "result");


export { resultModel };