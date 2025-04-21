import React, { useEffect } from "react";
import { Form, Radio, Button, Checkbox, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitCategoryData } from "../../redux/actions/profileActions";
import { Option } from "antd/lib/mentions";

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Survey = ({ categoryId, setIsSurveyModalOpen }) => {
  const dispatch = useDispatch();
  const categoryData = useSelector(
    ({ profile }) => profile.allCategoryData[categoryId]
  );
  const { questions = [] } = categoryData;

  const onSubmitSuccess = () => {
    setIsSurveyModalOpen(false);
  };

  const onFinish = (values) => {
    dispatch(submitCategoryData(categoryData, onSubmitSuccess));
  };

  const onOptionClick = (cb) => {
    cb.target.value.is_selected = cb.target.checked;
  };

  const onReset = () => {
    form.resetFields();
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (questions.length) {
      questions.forEach((ques) => {
        let opArray = [];
        ques.options.forEach((opt) => {
          if (opt.is_selected) {
            opArray.push(opt);
          }
        });
        form.setFieldValue(ques.id, opArray);
      });
    }
  }, []);


  return (
    <>
      {questions.length ? (
        <Form
          layout="vertical"
          name="questionDetails"
          style={{ margin: "0px 22px 10px 22px" }}
          onFinish={onFinish}
          form={form}
        >
          {questions.map((question, index) => {
            return (
              <Form.Item
                name={question.id}
                label={`${index + 1}. ${question.title}`}
                key={question.id}
              >
                {question.type === "checkbox" ? (

                  // <Checkbox.Group key={question.id}>
                  //   {question.options.map((option, i) => {
                  //     return (
                  //       /// defaultChecked is not working
                  //       <Checkbox
                  //         name={option.value}
                  //         value={option}
                  //         onChange={onOptionClick}
                  //       >
                  //         {option.label}
                  //       </Checkbox>
                  //     );
                  //   })}
                  // </Checkbox.Group>
                  <Select getPopupContainer={trigger => trigger.parentElement} key={question.id}>
                    {question.options.map((option, i) => {
                      return (
                        <Select.Group
                          getPopupContainer={trigger => trigger.parentElement}
                          name={option.value}
                          value={option}
                          onChange={onOptionClick}
                        >{option.label}</Select.Group>
                      );
                    })}

                  </Select>
                ) : (
                  <Radio.Group getPopupContainer={trigger => trigger.parentElement} key={question.id}>
                    <Radio value="a">item 1</Radio>
                    <Radio value="b">item 2</Radio>
                    <Radio value="c">item 3</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            );
          })}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              htmlType="button"
              onClick={onReset}
              style={{ marginLeft: 12 }}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div>No Question Found</div>
      )}
    </>
  );
};


export default Survey;
