import mongoose from "mongoose";


const schema = mongoose.Schema;


const quizSchema = new schema(
  {
    question: String,
    answer: [
      {
        text: {
          type: String,
          required: true,
          unique: true
        },
        id: {
          type: String,
          required: true,
        }
      }
    ],
    correct: {
      type: String,
      required: true
    }
  }
);



const quizModel = mongoose.model("quizModel", quizSchema, "quiz");


export { quizModel };