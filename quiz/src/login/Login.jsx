import React, { useEffect } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/auth/authentication';

const FormItem = Form.Item;

const Login = (props) => {
    console.log("Login", props)
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.isAuthenticated) {
            props.history.push('/dashboard');
        }
    })

    const onFinish = (values) => {
        console.log("onFinish", values)
        dispatch(userLogin(values))
            .then((res) => {
                notification.success({
                    message: 'Login Success',
                    description: 'Login Success',
                });
                props.history.push('/dashboard');
            })
            .catch((err) => {
                console.log('userLogin err', err);
            });
    }
    return (
        <>
            <div className="auth d-md-flex align-items-center register-page">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-6 col-xl-6 auth-right bg-white">
                            <h2 className="text-primary h4 text-center">Login</h2>
                            <Form form={form} name="form" onFinish={onFinish}>
                                <div className="row">
                                    <label className="col-md-12 mt-4">Mobile No</label>
                                    <FormItem className="form-group col-md-12" name="mobileno" rules={[{ required: true, message: 'Email is required!' }]}>
                                        <Input className="form-control" placeholder="Mobile No" />
                                    </FormItem>
                                    <label className="col-md-12 mt-4">Password</label>
                                    <FormItem className="form-group col-md-12 pb-4" name="password" rules={[{ required: true, message: 'Passowrd is required!' }]}>
                                        <Input className="form-control" placeholder="Password" type="password" />
                                    </FormItem>
                                    <FormItem className="col-md-12 mt-4">
                                        <Button className="btn btn-secondary" htmlType="submit">Login</Button>
                                    </FormItem>
                                </div>
                            </Form>
                            <p className="text-center">Don't have an account ?<Link to={`/register`} className="ml-1 pt-3">Create One</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;