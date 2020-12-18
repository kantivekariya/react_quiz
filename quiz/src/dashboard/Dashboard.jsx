import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogout } from '../redux/actions/auth/authentication';

const Dashboard = () => {
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(userLogout()).then((res) => {
            console.log("process.env.PUBLIC_URL", process.env.PUBLIC_URL)
            window.location.href = process.env.PUBLIC_URL;
        });
    }
    return (
        <>
            <h1>Dashboard</h1>
            <button className="btn btn-secondary" onClick={() => onLogout()}>Logout</button>
        </>
    )
}

export default Dashboard;