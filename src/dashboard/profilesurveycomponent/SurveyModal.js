import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearQuestionDetailsData,
  questionsInformation,
} from "../../redux/actions/profileActions";
import Survey from "./survey";

const ModalSurvey = ({
  isSurveyModalOpen,
  setIsSurveyModalOpen,
  categoryData,
}) => {
  const handleOk = () => {
    setTimeout(() => {
      setIsSurveyModalOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setIsSurveyModalOpen(false);
  };

  const heading = (
    <div style={{ display: "flex" }}>
      <div>
        <img src={categoryData.img} alt="heading" height={40} width={40} />
      </div>
      <div style={{ paddingLeft: 12 }}>
        <h4 style={{ marginBottom: 0 }}> {categoryData.name}</h4>
        <p style={{ marginBottom: 0 }}>{categoryData.description}</p>
      </div>
    </div>
  );

  return (
    <Modal
      open={isSurveyModalOpen}
      title={heading}
      onOk={handleOk}
      width={800}
      onCancel={handleCancel}
      footer={null}
    >
      <Survey
        categoryId={categoryData.id}
        setIsSurveyModalOpen={setIsSurveyModalOpen}
      />
    </Modal>
  );
};

export default ModalSurvey;
