import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";
import { WiTime2 } from "react-icons/wi";
import { Spin } from "antd";

const SurveyList = ({ surveys, fetching }) => {
  const [isIphone, setIsIphone] = useState(true);
  const [visibleSurveys, setVisibleSurveys] = useState([]); 

  const { items = [] } = surveys;

  useEffect(() => {
    const isAppleMobileDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsIphone(isAppleMobileDevice);


    setVisibleSurveys(items);
  }, [items]);

  const ipDetail = JSON.parse(localStorage.getItem("ip_details") || "{}");

  const openInNewTab = (url, index) => {
    window.open(
      `${url}&ip=${ipDetail.ip}&country=${ipDetail.country}`,
      "_blank",
      "noopener,noreferrer"
    );


    const updatedSurveys = visibleSurveys.filter((_, i) => i !== index);
    setVisibleSurveys(updatedSurveys);
  };

  return (
    <>
      {fetching ? (
        <div className="loader-container d-flex align-items-center justify-content-center">
          <Spin size="large" />
        </div>
      ) : visibleSurveys.length > 0 ? (
        <div className="site-card-wrapper">
          <h2 className="h3 mb-4">Surveys Assigned</h2>
          <div className="cards-container row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-5">
            {visibleSurveys.map((item, index) => (
              <div className="col mb-4" key={index}>
                <div
                  className="survey-card"
                  onClick={() => openInNewTab(item.survey.url, index)}
                >
                  <span className="loi">
                    <WiTime2 /> {item.survey.loi} min
                  </span>
                  <p>
                    Earn - {item.survey.respondent_cpi}
                    {item.survey.respondent_currency}
                  </p>
                  <span className="start-btn">
                    <MdDoubleArrow />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card p-3 ">
          <div className="no-surveys">
            <div className="row d-flex ">
              <div className="col-md-6">
                <div className="wrapper text-start mt-5">
                  <h1 className="mb-4 h2">
                    Ready to Start Earning? Update Your Profile Surveys.
                  </h1>
                  <p>
                    <small>
                      Complete your profile to get matched with even more
                      relevant surveys and start earning more. The more
                      information you provide, the better we can tailor surveys
                      to your interests.
                    </small>
                  </p>
                  <NavLink className="btn" to="/profile-survey">
                    Profile Survey
                  </NavLink>
                </div>
              </div>
              <div className="col-md-6">
                <div className="wrapper">
                  {isIphone ? (
                    <img src="./images/fillingSurvey.jpg" alt="fillingSurvey" />
                  ) : (
                    <video className="w-100" loop autoPlay muted playsInline>
                      <source
                        src="./images/fillingSurvey.mp4"
                        type="video/mp4"
                      />
                    </video>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SurveyList;
