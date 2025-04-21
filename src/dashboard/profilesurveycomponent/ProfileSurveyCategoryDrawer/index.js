import {
  Button,
  Drawer,
  Form,
  Space,
  Select,
  Divider,
} from "antd";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { submitCategoryData, fetchAllCategoryData } from "../../../redux/slice/profileSlice";


const ProfileSurveyCategoryDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  categoryData
}) => {
  const [form] = Form.useForm();
  console.log("categoryData",categoryData)

  const { questions = [] } = categoryData;

  let optionSelected = {};
  let payload = {};


  const onClose = () => {
    setIsDrawerOpen(false);
  };

  const dispatch = useDispatch();
  const onFinish = (data) => {
    Object.values(data).forEach((options) => {
      if (Array.isArray(options)) {
        options.forEach((option) => {
          payload[option] = true
        });
      } else {
        payload[options] = true
      }
    });
    dispatch(submitCategoryData({ categoryData: payload }));
    dispatch(fetchAllCategoryData())
    setIsDrawerOpen(false);
   
  };

  useEffect(() => {
    if (questions.length) {
      questions.forEach((ques) => {
        let opArray = [];
        optionSelected[ques.id] = [];
        ques.options.forEach((opt) => {
          if (opt.is_selected) {
            opArray.push(opt.id);
            optionSelected[ques.id].push(opt.id)
          }
          payload[opt.id] = false
        });
        form.setFieldValue(ques.id, opArray);
      });
    }
  }, []);

  const heading = (
    <div className="d-flex align-items-center">
      <div>
        <img src={categoryData.img} alt="heading" height={50} />
      </div>
      <div style={{ paddingLeft: 15 }}>
        <h3 style={{ marginBottom: 0 }}> {categoryData.name}</h3>
      </div>
    </div>
  );

  

  return (
    <>
      <Drawer
      className="profile-drawer"
        title={heading}
        closable={false}
        onClose={onClose}
        open={isDrawerOpen}
        placement="right"
        style={{ position: "fixed", right: 0 }}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button form="profile_question_submit_form" key="submit" htmlType="submit" type="primary">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        {questions.length ? (
          <Form
            id="profile_question_submit_form"
            layout="vertical"
            name="questionDetails"
            style={{ margin: "0px 22px 10px 22px" }}
            onFinish={onFinish}
            form={form}
          >
            {questions.map((question, index) => {
              return (
                <>
                  <Form.Item
                    name={question.id}
                    label={<h3>{index + 1}. {question.title}</h3>}
                    key={question.id}
                  >
                    {question.type === "checkbox" ? (
                      <Select getPopupContainer={trigger => trigger.parentElement}
                        key={`${index + 1}. ${question.title}_option`}
                        mode="multiple"
                        options={question.options.map((opt) => { return { label: opt.label, value: opt.id } })}
                        style={{
                          width: '80%'
                        }}
                        onChange={(val) => { optionSelected[question.id] = val; }}
                        placeholder="Please select choices"
                      />
                    ) : (
                      <Select
                        getPopupContainer={trigger => trigger.parentElement}
                        options={question.options.map((opt) => { return { label: opt.label, value: opt.id } })}
                        style={{ width: '80%' }}
                        onChange={(val) => { optionSelected[question.id] = [val]; }}
                        placeholder="Please select choice"
                      />
                    )}
                  </Form.Item>
                  <Divider />
                  
                </>
              );
            })}
          </Form>
        ) : (
          <div>No Question Found</div>
        )}
      </Drawer>
    </>
  );
};


export default ProfileSurveyCategoryDrawer;