import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategoryData } from "../../redux/slice/profileSlice";
import ProfileSurveyCategory from "../profilesurveycomponent/Category";

const ProfileSurvey = () => {
  const dispatch = useDispatch();
  const { data = {}, is_success } = useSelector((state) => state.profile.allCategoryData);

  useEffect(() => {
    dispatch(fetchAllCategoryData());
  }, [dispatch]);
  return (
    <div className="card p-3 mt-5">
        <h2 className="h3 mb-4">Profile Survey</h2>
         <Row gutter={[16, 24]}>
      {is_success &&
        Object.values(data)
          .slice(0, 4)
          .map((categoryData) => (
            <Col xl={6} lg={6} md={8} sm={12} xs={12} key={categoryData.id}>
              <ProfileSurveyCategory categoryData={categoryData} />
            </Col>
          ))}
    </Row>
    </div>
   
  );
};

export default ProfileSurvey;
