import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Radio, Form } from 'antd';
import Timer from '../timer/Timer';
import { getAllQuestion } from '../redux/actions/quiz/quiz.action';

const Quiz = (props) => {
    const [form] = Form.useForm();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const question = useSelector((state) => state.questionReducer.question);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuestion()).then((res) => {
            console.log("Get All", res)
        });
    }, [])


    const onFinish = values => {
        console.log('Received values of form: ', values);
        if (values.ans) {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < question.data.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowScore(true);
            }
            form.resetFields();
        }
    };

    const NextQuestion = (e) => {
            // const nextQuestion = currentQuestion + 1;
            // if (nextQuestion < question.data.length) {
            //     setCurrentQuestion(nextQuestion);
            // } else {
            //     setShowScore(true);
            // }
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
                                    <Timer duration={10} timeoutFn={NextQuestion} />
                                </div>
                                <div>
                                    {showScore ? (
                                        <div className=''>
                                            You scored {score} out of {question.data.length}
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
                                            </>
                                        )}
                                </div>
                                <div>
                                    <Button htmlType="submit" className="mr-3">Submit</Button>
                                    <Button onClick={onReset}>Reset</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quiz;

