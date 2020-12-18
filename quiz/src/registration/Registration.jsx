import React, { useState } from 'react';
import { Button, Form, Input, Radio, DatePicker, Upload, Select, Checkbox, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSignup } from '../redux/actions/auth/authentication';

const FormItem = Form.Item;
const { Option } = Select;

const Registration = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };


    const onFinish = (values) => {
        console.log("values", values)
        dispatch(userSignup(values))
            .then((res) => {
                notification.success({
                    message: 'Signup Success',
                    description: 'Signup Success',
                });
                props.history.push('/');
            })
            .catch((err) => {
                console.log('checkUserSignup err', err);
            });
    }
    return (
        <>
            <div className="auth d-md-flex align-items-center register-page">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-8 col-xl-8 auth-right bg-white">
                            <h2 className="text-primary h4 text-center">Registration</h2>
                            <Form form={form} name="form" onFinish={onFinish}>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label >First Name</label>
                                        <FormItem name="firstname" rules={[{ required: true, message: 'Firstname is required!' }]}>
                                            <Input className="form-control" placeholder="Fist Name" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">Last Name</label>
                                        <FormItem name="lastname" rules={[{ required: true, message: 'Lastname is required!' }]}>
                                            <Input className="form-control" placeholder="Last Name" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">Email</label>
                                        <FormItem name="email" rules={[{ required: true, message: 'Email is required!' }]}>
                                            <Input className="form-control" placeholder="Email" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">Mobile No</label>
                                        <FormItem name="mobileno" rules={[{ required: true, message: 'Mobile no is required!' }]}>
                                            <Input className="form-control" placeholder="Mobile No" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">Passowrd</label>
                                        <FormItem name="password" rules={[{ required: true, message: 'Password is required!' }]}>
                                            <Input className="form-control" type="password" placeholder="Password" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">Confirm Password</label>
                                        <FormItem name="confirmpwd" rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('The two passwords that you entered do not match!');
                                                },
                                            }),
                                        ]}>
                                            <Input className="form-control" placeholder="Confirm Password" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">Gender</label>
                                        <FormItem name="gender" rules={[{ required: true, message: 'Gender is required!' }]}>
                                            <Radio.Group>
                                                <Radio className="" value="male">Male</Radio>
                                                <Radio className="" value="female">Femaile</Radio>
                                            </Radio.Group>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">Photo</label>
                                        <FormItem
                                            name="upload"
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                        >
                                            <Upload name="logo" action="/upload.do" listType="picture">
                                                <Button className="form-control" icon={<UploadOutlined />}>Click to upload</Button>
                                            </Upload>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">Country</label>
                                        <FormItem name="country" rules={[{ required: true, message: 'Country is required!' }]}>
                                            <Select className="default-select" allowClear placeholder="Select Country">
                                                <Option value="1">Option 1</Option>
                                                <Option value="2">Option 2</Option>
                                                <Option value="3">Option 3</Option>
                                            </Select>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">State</label>
                                        <FormItem name="state" rules={[{ required: true, message: 'State is required!' }]}>
                                            <Select className="default-select" allowClear placeholder="Select State">
                                                <Option value="1">Option 1</Option>
                                                <Option value="2">Option 2</Option>
                                                <Option value="3">Option 3</Option>
                                            </Select>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">City</label>
                                        <FormItem name="city" rules={[{ required: true, message: 'City is required!' }]}>
                                            <Select className="default-select" allowClear placeholder="Select City">
                                                <Option value="1">Option 1</Option>
                                                <Option value="2">Option 2</Option>
                                                <Option value="3">Option 3</Option>
                                            </Select>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="">DOB</label>
                                        <FormItem name="dob" rules={[{ required: true, message: 'DOB is required!' }]}>
                                            <DatePicker className="form-control" placeholder="DOB" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-12  form-group">
                                        <label className="">Hobbies</label>
                                        <FormItem name="hobbies" rules={[{ required: true, message: 'Hobbies is required!' }]}>
                                            <Checkbox.Group>
                                                <Checkbox value="playing_cricket">Playing Cricket</Checkbox>
                                                <Checkbox value="swimmings">Swimmings</Checkbox>
                                                <Checkbox value="traveling">Traveling</Checkbox>
                                            </Checkbox.Group>
                                        </FormItem>
                                    </div>
                                    <FormItem className="col-md-12 mt-4 text-center">
                                        <Button htmlType="submit" className="btn btn-secondary">Registration</Button>
                                    </FormItem>
                                </div>
                            </Form>
                            <p className="text-center mt-3">Already have an account?<Link to={`/`} className="ml-1 pt-3">Login Here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registration;