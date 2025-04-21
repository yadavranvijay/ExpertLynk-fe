import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import { useDispatch } from "react-redux";
import { updateMe } from "../../redux/slice/authSlice";
import moment from "moment";
import "./details.css";

const EditUserDrawer = ({ setIsEditableDrawerOpen, reloadUser }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSaveSuccess = () => {
    setIsEditableDrawerOpen(false);
    reloadUser();
  };

  const onFinish = (values) => {
    const modifiedValues = {};

    // Filter out the fields that are not filled by the user
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        modifiedValues[key] = values[key];
      }
    });

    // Format the date of birth if it's provided
    if (modifiedValues.dob) {
      modifiedValues.dob = moment(modifiedValues.dob).format("DD MMM YYYY");
    }

    if (Object.keys(modifiedValues).length > 0) {
      // Dispatch only if there are filled values
      dispatch(updateMe(modifiedValues)).then(() => {
        onSaveSuccess();
      });
    }
  };

  const onClose = () => {
    setIsEditableDrawerOpen(false);
  };

  const validateAge = (_, value) => {
    if (value) {
      const selectedDate = moment(value);
      const currentDate = moment();
      const age = currentDate.diff(selectedDate, "years");

      if (age < 18) {
        return Promise.reject(new Error("Your age should be 18 or above."));
      }
    }
    return Promise.resolve();
  };

  return (
    <>
      <Drawer
        title="Edit Your Details"
        className="editUserDrawer"
        closable={false}
        onClose={onClose}
        open={true}
        placement="right"
        style={{ position: "fixed", right: 0 }}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button
              form="survey_submit_form"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <div className="drawer-content-container">
          <Form
            id="survey_submit_form"
            layout="vertical"
            hideRequiredMark
            form={form}
            onFinish={onFinish}
          >
            <Divider>Personal Information</Divider>
            <Row gutter={24}>
              <Col sm={12} xs={24}>
                <Form.Item name="name" label="Name">
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={12} xs={24}>
                <Form.Item
                  name="mobile"
                  label="Phone"
                  rules={[
                    
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="dob"
                  label="Date of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please select your date of birth",
                    },
                    {
                      validator: validateAge,
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Drawer>
    </>
  );
};

export default EditUserDrawer;
