import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, DatePicker, Upload, Select, Checkbox, notification, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSignup } from '../redux/actions/auth/authentication';
import Country from '../assets/country.json';

const FormItem = Form.Item;
const { Option } = Select;

const Registration = (props) => {
    const [form] = Form.useForm();
    const [isloading, setloading] = useState(false);
    const [imageUrl, setImageUrl] = useState(false);
    const dispatch = useDispatch();
    const [selectedCity, setSelectedCityId] = useState(undefined);


    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    useEffect(() => {
        console.log(imageUrl)
    })
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

    const state = [
        {
            stateID: 2,
            stateName: "Gujarat"
        },
        {
            stateID: 7,
            stateName: "Uttar Pradesh"
        }
    ];

    const city = [
        {
            stateID: 2,
            id: 1,
            cityName: "Ahmedabad"
        },
        {
            stateID: 2,
            id: 2,
            cityName: "Rajkot"
        },
        {
            stateID: 2,
            id: 3,
            cityName: "Surat"
        },
        {
            stateID: 2,
            id: 4,
            cityName: "Morbi"
        },
        {
            stateID: 7,
            cityName: "Kanpur",
            id: 5
        },
        {
            stateID: 7,
            id: 6,
            cityName: "Lucknow"
        },
        {
            stateID: 7,
            id: 7,
            cityName: "Faizabad"
        }
    ];
    const handleFormValuesChange = (changedValues) => {
        const formFieldName = Object.keys(changedValues)[0];
        if (formFieldName === "state") {
            setSelectedCityId(changedValues[formFieldName]);
            form.setFieldsValue({ city: undefined }); //reset product selection
        }
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setloading(!isloading);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (imageUrl) => {
                setImageUrl(imageUrl);
                setloading(isloading);
            });
        }
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        // this.setState({
        //   previewImage: file.url || file.preview,
        //   previewVisible: true,
        // });
    };
    return (
        <>
            <div className="auth d-md-flex align-items-center register-page">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-8 col-xl-8 auth-right bg-white">
                            <h2 className="text-primary h4 text-center">Registration</h2>
                            <Form form={form} name="form" onFinish={onFinish} onValuesChange={handleFormValuesChange}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label >First Name</label>
                                        <FormItem name="firstname" rules={[{ required: true, message: 'Firstname is required!' }]}>
                                            <Input className="form-control" placeholder="Fist Name" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="">Last Name</label>
                                        <FormItem name="lastname" rules={[{ required: true, message: 'Lastname is required!' }]}>
                                            <Input className="form-control" placeholder="Last Name" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="">Email</label>
                                        <FormItem name="email" rules={[{ required: true, message: 'Email is required!' }]}>
                                            <Input className="form-control" placeholder="Email" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="">Mobile No</label>
                                        <FormItem name="mobileno" rules={[{ required: true, message: 'Mobile no is required!' }]}>
                                            <Input className="form-control" placeholder="Mobile No" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="">Passowrd</label>
                                        <FormItem name="password" rules={[{ required: true, message: 'Password is required!' }]}>
                                            <Input className="form-control" type="password" placeholder="Password" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
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
                                            <Input className="form-control" type="password" placeholder="Confirm Password" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="">Gender</label>
                                        <FormItem name="gender" rules={[{ required: true, message: 'Gender is required!' }]}>
                                            <Radio.Group>
                                                <Radio className="" value="male">Male</Radio>
                                                <Radio className="" value="female">Femaile</Radio>
                                            </Radio.Group>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="">Photo</label>
                                        <FormItem
                                            name="upload"
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                        >
                                            <Upload name="avatar"
                                                listType="picture-card"
                                                showUploadList={false}
                                                onPreview={handlePreview}
                                                action="https://run.mocky.io/v3/160be572-6063-4210-86cd-7ab0d71cabeb"
                                                beforeUpload={beforeUpload}
                                                onChange={handleChange}>
                                                {imageUrl ? <img src={imageUrl} alt="avatar" className="w-100 rounded-circle" /> : <Button className="form-control" icon={<UploadOutlined />}></Button>}
                                                {/* <Button className="form-control" icon={<UploadOutlined />}>Click to upload</Button> */}
                                            </Upload>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="">Country</label>
                                        <FormItem name="country" rules={[{ required: true, message: 'Country is required!' }]}>
                                            <Select showSearch filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            } className="default-select" allowClear placeholder="Select Country">
                                                {Country && Country.map((value,) => (<>
                                                    <Option value={value.code}>{value.name}</Option>
                                                </>))}
                                            </Select>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="">State</label>
                                        <FormItem name="state" rules={[{ required: true, message: 'State is required!' }]}>
                                            <Select className="default-select" allowClear placeholder="Select State">
                                                {state.map((state) => (
                                                    <Option key={state.stateID} value={state.stateID}>
                                                        {state.stateName}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="">City</label>
                                        <FormItem name="city" rules={[{ required: true, message: 'City is required!' }]}>
                                            <Select className="default-select" allowClear placeholder="Select City">
                                                {city
                                                    .filter((city) => city.stateID === selectedCity)
                                                    .map((city) => (
                                                        <Option key={city.id} value={city.id}>
                                                            {city.cityName}
                                                        </Option>
                                                    ))}
                                            </Select>
                                        </FormItem>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="">DOB</label>
                                        <FormItem name="dob" rules={[{ required: true, message: 'DOB is required!' }]}>
                                            <DatePicker className="form-control" placeholder="DOB" />
                                        </FormItem>
                                    </div>
                                    <div className="col-md-12  ">
                                        {/* <label className="">Hobbies</label> */}
                                        <FormItem name="hobbies" label="Hobbies" rules={[{ required: true, message: 'Hobbies is required!' }]}>
                                            <Checkbox.Group>
                                                <Checkbox value="playing_cricket">Playing Cricket</Checkbox>
                                                <Checkbox value="swimmings">Swimmings</Checkbox>
                                                <Checkbox value="traveling">Traveling</Checkbox>
                                            </Checkbox.Group>
                                        </FormItem>
                                    </div>
                                    <FormItem className="col-md-12 text-center">
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