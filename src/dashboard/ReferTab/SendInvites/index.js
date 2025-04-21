import { useDispatch } from "react-redux";
import "../MyReferralTable/index.css";
import { Card, Button, Form, Input, Space, Row, Col } from "antd";

import { inviteUserFriend } from "../../../redux/slice/rewardSlice";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function SendInvites() {
  const dispatch = useDispatch();
  const sendInvite = (emails) => {
    dispatch(inviteUserFriend(emails));
  };
  return (
    <Card>
      <h4 className="h5 mb-3">Invite your friends</h4>
      <Form
        name="Invite_Form"
        onFinish={sendInvite}
        autoComplete="off"
        layout="inline"
      >
        <Form.List name="emails">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                    marginRight: 20,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name]}
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input invitee E-mail!",
                      },
                    ]}
                  >
                    <Input placeholder="xyz@gmail.com" />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Row gutter={16}>
                  <Col>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      size="large"
                      style={{ fontSize: "15px" }}
                    >
                      Invite friend
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item className="send-btn">
          <Button type="primary" htmlType="submit">
            Send Invite
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
