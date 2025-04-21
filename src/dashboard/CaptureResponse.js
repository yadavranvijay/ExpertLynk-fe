import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Footer, Content } = Layout;

const CaptureResponse = () => {
  const [second, setSecond] = useState(5); 
  const search = useLocation().search;
  const surveyStatus = new URLSearchParams(search).get("status");
  const navigate = useNavigate();

  const statusMap = {
    completed: {
      text: "Success",
      img: "https://ik.imagekit.io/websamp/Undraw/undraw_Completing_re_i7ap.png",
    },
    security: {
      text: "Your Survey is not completed",
      img: "https://ik.imagekit.io/websamp/Undraw/undraw_Cancel_re_pkdm.png",
    },
    quota: {
      text: "Your Survey is not completed",
      img: "https://ik.imagekit.io/websamp/Undraw/undraw_Cancel_re_pkdm.png",
    },
    terminated: {
      text: "Your Survey is not completed",
      img: "https://ik.imagekit.io/websamp/Undraw/undraw_Cancel_re_pkdm.png",
    },
    null: {
      text: "Invalid Redirection",
      img: "https://ik.imagekit.io/websamp/Undraw/undraw_Cancel_re_pkdm.png",
    },
  };

  
  const status = statusMap[surveyStatus] || statusMap[null];


  useEffect(() => {
    if (second === 0) {
      navigate("/dashboard"); 
    } else {
      const timer = setTimeout(() => {
        setSecond(second - 1); 
      }, 1000);

      
      return () => clearTimeout(timer);
    }
  }, [second, navigate]); 

  return (
    <>
      <Layout className="layout-default layout-signin" style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="center" style={{ padding: "50px 20px" }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 10, offset: 1 }}
              md={{ span: 12 }}
              style={{ textAlign: "center", padding: "20px" }}
            >
              <Title level={1} style={{ color: "#1890ff", marginBottom: "20px" }}>
                Post Survey Page
              </Title>
              <Title level={2} style={{ color: "#333", marginBottom: "10px" }}>
                {surveyStatus}
              </Title>
              <Paragraph style={{ fontSize: "16px", color: "#555" }}>
                This page will redirect to your home page in <span style={{ fontWeight: "bold" }}>{second}</span> seconds.
              </Paragraph>
            </Col>
            <Col
              className="sign-img"
              style={{ textAlign: "center", padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img
                src={status.img}
                alt="Survey Status"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              />
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#001529", color: "#fff", padding: "10px 0" }}>
          <p className="copyright">
            Copyright © 2024{" "}
            <a href="#pablo" style={{ color: "#1890ff" }}>
              Continumm insights
            </a>
            . All rights reserved.
          </p>
        </Footer>
      </Layout>
    </>
  );
};

export default CaptureResponse;
