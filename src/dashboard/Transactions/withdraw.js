import { Button, Card, Form, Input, Select, Space, Typography } from "antd";
import React, { useState } from "react";
import { withdrawRequestUser } from "../../redux/slice/rewardSlice";
import { useDispatch } from "react-redux";

const { Title } = Typography;

function Withdraw() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onFinish = (data) => {
    const withdrawDetails = {
      amount: data.amount,
      method: data.method,
      account_details: { number: data.number },
    };
  
    dispatch(withdrawRequestUser(withdrawDetails));
  };

  const validateAmount = (_, value) => {
    if (value && value < 1000) {
      setIsButtonDisabled(true);
      return Promise.reject(new Error("Minimum amount to be withdrawn is 1000"));
    }
    setIsButtonDisabled(false);
    return Promise.resolve();
  };

  return (
    <>
      <Card
        title={<Title level={4}>Withdraw your points</Title>}
        className="criclebox tablespace mb-24 withdraw-card"
        bordered={false}
      >
        <div style={{ margin: "20px" }}>
          <p style={{ fontSize: "13px", fontWeight: "bold" }}>
            Minimum Amount to be withdrawn is 1000
          </p>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="amount"
              label="Amount"
              key="amount"
              rules={[
                {
                  required: true,
                  message: "Please enter an amount",
                },
                {
                  validator: validateAmount,
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="method"
              label="Method"
              key="method"
              rules={[
                {
                  required: true,
                  message: "Please select a method",
                },
              ]}
            >
              <Select getPopupContainer={(trigger) => trigger.parentElement}>
                <Select.Option value="UPI">UPI</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="number"
              label="Phone Number"
              key="account_details.number"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                },
                {
                  len: 10,
                  message: "Phone number must be a 10-digit number",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" disabled={isButtonDisabled}>
                  Withdraw
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </>
  );
}

export default Withdraw;
