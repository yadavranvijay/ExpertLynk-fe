import {
  Col,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMe } from "../../redux/slice/authSlice";
import moment from "moment";

const ExtraInfo = () => {
  const [extraInfo, setExtraInfo] = useState(true);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const userInfo = user?.data?.user;
  const isDataComplete = userInfo?.gender && userInfo?.dob;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // useEffect(() => {
  //   if (userInfo?.country === "IN") {
  //     setShowMobile(true);
  //   }
  // }, [userInfo]);

  useEffect(() => {
    if (userInfo && isDataComplete) {
      setExtraInfo(false);  
    }
  }, [userInfo, isDataComplete]);

  const onFinish = (values) => { 
    if (values.dob) {
      values.dob = moment(values.dob).format("DD MMM YYYY");
    }
    dispatch(updateMe(values));

    const updatedUser = {
      ...user,  
      data: {
        ...user?.data,  
        user: {
          ...user?.data?.user,  
          gender: values.gender,  
          dob: values.dob,  
        },
      },
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setExtraInfo(false);
  };

  if (!extraInfo) {
    return null;
  }

  return (
    <div className="login-card-wrapper extra-info-card">
      <div className="card-shadow"></div>
      <div className="login-card">
        <div className="login-card-header mb-4 d-flex align-items-center justify-content-between">
          <h5 className="h5 mb-0">User Information</h5>
        </div>
        <div className="form-card">
          <Form
            id="survey_submit_form"
            layout="vertical"
            hideRequiredMark
            form={form}
            onFinish={onFinish}
          >
            <Row gutter={16}>
              {/* {showMobile && ( 
                <Col span={24}>
                  <Form.Item
                    name="mobile"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              )} */}
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: "Please select your gender",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Gender"
                    options={["MALE", "FEMALE", "OTHER"].map((option) => {
                      return { value: option, label: option };
                    })}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="dob"
                  label="Date of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please select your date of birth",
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item>
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ExtraInfo;
