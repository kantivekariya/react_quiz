import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Radio, Form } from 'antd';
import Timer from '../timer/Timer';
import { createQuiz, getAllQuestion } from '../redux/actions/quiz/quiz.action';
var arr = [];

const Quiz = (props) => {
    const [form] = Form.useForm();
    const [result, setResult] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionNo, setQuestionNo] = useState(0);
    const [showScore, setShowScore] = useState(false);
    let [score, setScore] = useState(0);
    const question = useSelector((state) => state.questionReducer.question);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuestion()).then((res) => {
            console.log("Get All", res)
        });
        // const shuffledAnswerOptions = question.data.map((question) => this.shuffleArray(question.answers));
    }, [])



    const uniqueRandoms = (qty, min, max) => {
        var rnd, arr = [];
        do {
            do { rnd = Math.floor(Math.random() * max) + min }
            while (arr.includes(rnd))
            arr.push(rnd);
        } while (arr.length < qty)
        return arr;
    }

    const onFinish = async values => {
        console.log('Received values of form: ', values.ans);
        const nextQuestion = currentQuestion + 1;
        console.log(currentQuestion)
        if (values.ans && question.data && question.data[currentQuestion]) {
            console.log(question.data && question.data[currentQuestion].question)
            console.log('A', question.data && question.data[currentQuestion].correct)
            let correct = question.data && question.data[currentQuestion].answer.filter((ans) => ans.id === (question.data && question.data[currentQuestion].correct));
            console.log("Correct Ans", correct)
            const data = question.data && question.data[currentQuestion].answer.filter((ans) => ans.id === values.ans);
            console.log("Your Ans", data)
            if (correct[0].id === data[0].id) {
                console.log('work')
                score = score + 10
                setScore(score)
            }
            const d = {
                question: question.data && question.data[currentQuestion].question,
                correct: correct[0].text,
                answer: data[0].text,
                score: score
            }
            arr.push(d)
            dispatch(createQuiz(d)).then(() => { })
            console.log("Array", arr)
            // question.data && question.data[currentQuestion].answer.map((value, index) => {
            //     if (question.data && question.data.correct == values.ans) {
            //         console.log("True", value.text)
            //         setScore(10 + 10)
            //         console.log(10 + 10)
            //     } else if (value.id === values.ans) {
            //         console.log("Your Ans", value.text)
            //     }
            // })
            if (nextQuestion < 10) {
                setCurrentQuestion(nextQuestion);
                form.resetFields();

            } else {
                setShowScore(true);
            }
        }

    };

    const finishQuiz = () => {
        console.log("Final Array", arr)
        
    }

    const onReset = () => {
        form.resetFields();
    }

    return (
        <>
            <div className="auth d-md-flex align-items-center register-page">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-10 col-xl-10 auth-right bg-white">
                            <Form form={form} onFinish={onFinish}>
                                <div className="text-right">
                                    {/* <Timer duration={10} timeoutFn={NextQuestion} /> */}
                                </div>
                                <div>
                                    {showScore ? (
                                        <div className=''>
                                            You scored {score} out of 100
                                        </div>
                                    ) : (
                                            <>
                                                <div className=''>
                                                    <div className=''><span className="mr-2">Q- {currentQuestion + 1}</span>{question.data && question.data[currentQuestion] && question.data[currentQuestion].question}</div>
                                                </div>
                                                <div className='ml-2 mt-4'>
                                                    <Form.Item name="ans">
                                                        <Radio.Group>
                                                            {question.data[currentQuestion] && question.data[currentQuestion].answer.map((answerOption, index) => (
                                                                <Col key={index}><Radio value={answerOption.id}>{answerOption.text}</Radio></Col>
                                                            ))}
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                                <div>
                                                    <Button htmlType="submit" className="mr-3">Submit</Button>
                                                    <Button onClick={onReset}>Reset</Button>
                                                </div>
                                            </>
                                        )}
                                </div>
                                <Button onClick={() => finishQuiz()}>Finish</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quiz;

