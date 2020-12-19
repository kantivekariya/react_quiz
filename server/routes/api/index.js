import express from "express";
import { authRequired } from "../../config/auth";
import { authRoutes } from "../../module/auth/auth.routes";
import { quizRoutes } from "../../module/quiz/quiz.routes";
import { resultRoutes } from "../../module/result/result.routes";


const apiRoutes = express.Router();

apiRoutes.get("/", function (req, res, next) {
  res.json({ message: "from index api" });
});

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/quiz", authRequired, quizRoutes);
apiRoutes.use("/result", authRequired, resultRoutes);

export default apiRoutes;
