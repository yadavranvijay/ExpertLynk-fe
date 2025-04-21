import { Col, Row, Typography, Progress } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategoryData } from "../../redux/slice/profileSlice";
import ProfileSurveyCategory from "./Category";
import { ProfileSurveyContainer } from "./style";
import { Spin } from "antd";
const { Title, Paragraph } = Typography;

const ProfileSurvey = () => {
  const dispatch = useDispatch();
  const {
    allCategoryData = {},
    is_success,
    isLoading,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchAllCategoryData());
  }, [dispatch]);
  let total = 0;
  let responded = 0;
  let completePercent = 0;
  if (is_success === true) {
    const responseCounts = Object.values(Object.values(allCategoryData)[0]).map(
      (categoryData) => categoryData.response_count || 0
    );
    const questionCounts = Object.values(Object.values(allCategoryData)[0]).map(
      (categoryData) => categoryData.questions_count || 0
    );

    responded = responseCounts.reduce((acc, current) => acc + current, 0);
    total = questionCounts.reduce((acc, current) => acc + current, 0);
  }
  completePercent = total > 0 ? parseInt((responded / total) * 100) : 0;

  return (
    <ProfileSurveyContainer>
      <Title level={2}>Profile Surveys</Title>
      <Progress
        percent={completePercent}
        style={{ width: "90%" }}
        format={(percent) => <Title level={5}>{percent}% Completed</Title>}
      />
      <Paragraph className="mb-5">
        Completing and ensuring your profile surveys remain up to date will
        increase your chances of being matched to highly-rewarding projects,
        tailored just for you.
      </Paragraph>
      {isLoading ? (
        <div className="text-center">
          {" "}
          <Spin size="large" />{" "}
        </div>
      ) : (
        <Row gutter={[16, 24]}>
          {is_success === true &&
            Object.values(Object.values(allCategoryData)[0]).map(
              (categoryData) => (
                <Col xl={6} lg={6} md={8} sm={12} xs={12} key={categoryData.id}>
                  <ProfileSurveyCategory categoryData={categoryData} />
                </Col>
              )
            )}
        </Row>
      )}
    </ProfileSurveyContainer>
  );
};

export default ProfileSurvey;
