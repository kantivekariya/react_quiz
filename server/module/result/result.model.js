import mongoose from "mongoose";


const schema = mongoose.Schema;


const resultSchema = new schema(
  {
    question: String,
    wrongans: String,
    correct: String
  }
);



const resultModel = mongoose.model("resultModel", resultSchema, "result");


export { resultModel };