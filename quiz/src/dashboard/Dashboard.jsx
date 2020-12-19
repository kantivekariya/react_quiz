import React, { useEffect } from 'react';
import { Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/actions/auth/authentication';

const Dashboard = (props) => {
    console.log("Dashboard", props)
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.Auth.userInfo);
    const todayDate = new Date();
    useEffect(() => {
        if(moment(userInfo && userInfo.dob).format("MMM Do") === moment(todayDate).format("MMM Do")){
            console.log("Happy")
        }
    })

    const onLogout = () => {
        dispatch(userLogout()).then((res) => {
            console.log("process.env.PUBLIC_URL", process.env.PUBLIC_URL)
            window.location.href = process.env.PUBLIC_URL;
        });
    }

    return (
        <>
            <div className="auth d-md-flex align-items-center register-page">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-10 col-xl-10 auth-right bg-white">
                            <div className="text-center">
                                <Avatar size={64} icon={<UserOutlined />} />
                            </div>
                            <h2 className="text-primary h4 text-center mb-5 mt-5">Wel Come {userInfo && userInfo.first_name + ' ' + userInfo.last_name}</h2>
                            <h1 className="mt-5">{moment(userInfo && userInfo.dob).format("MMM Do") === moment(todayDate).format("MMM Do") ? 'Xongolab Wishing You a Happy Birthday' : ''}</h1>
                            <Button className="btn btn-primary mt-5" onClick={() => props.history.push('/quiz')}>Start Quiz</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;