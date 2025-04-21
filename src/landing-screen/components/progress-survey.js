import React, { useState } from "react";
import { Progress, Radio, Space } from "antd";

const questions = [
  {
    question: "What is your biggest concern about AI development?",
    options: ["Job displacement", "Privacy breaches", "Misinformation", "Ethical implications", "Other"],
  },
  {
    question: "How often do you use AI tools in your daily life?",
    options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
  },
  // {
  //   question: "What actions are you taking to reduce your carbon footprint?",
  //   options: ["Recycling", "Using public transport", "Reducing meat consumption", "Energy-efficient appliances", "Other"],
  // },
  // {
  //   question: "How important is climate change to you personally?",
  //   options: ["Very important", "Somewhat important", "Not very important", "Not at all important"],
  // },
  // {
  //   question: "What is your opinion on the increasing cost of living?",
  //   options: ["Government should intervene", "Individuals should manage", "Economic system needs overhaul", "Other"],
  // },
  // {
  //   question: "How concerned are you about global political instability?",
  //   options: ["Very concerned", "Somewhat concerned", "Not very concerned", "Not at all concerned"],
  // },
  // {
  //   question: "What is your primary motivation for exercising?",
  //   options: ["Weight loss", "Stress relief", "Overall health", "Building muscle", "Other"],
  // },
  // {
  //   question: "How satisfied are you with your mental health support options?",
  //   options: ["Very satisfied", "Somewhat satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
  // },
  // {
  //   question: "What is your favorite streaming platform?",
  //   options: ["Netflix", "Disney+", "Amazon Prime", "Hulu", "Other"],
  // },
  // {
  //   question: "How do you prefer to consume entertainment content?",
  //   options: ["Streaming", "Television", "Movies", "Social media", "Other"],
  // },
];

const ProgressSurvey = () => {
  const [votes, setVotes] = useState(() =>
    questions.reduce((acc, q) => {
      q.options.forEach((option) => (acc[option] = 0));
      return acc;
    }, {})
  );
  const [totalVotes, setTotalVotes] = useState(() =>
    questions.reduce((acc, q) => ({ ...acc, [q.question]: 0 }), {})
  );
  const [selectedOptions, setSelectedOptions] = useState(() =>
    questions.reduce((acc, q) => ({ ...acc, [q.question]: null }), {})
  );

  const handleVote = (question, option) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [option]: prevVotes[option] + 1,
    }));

    setTotalVotes((prevTotal) => ({
      ...prevTotal,
      [question]: prevTotal[question] + 1,
    }));

    setSelectedOptions((prevSelected) => ({
      ...prevSelected,
      [question]: option,
    }));
  };

  const calculatePercentage = (option, question) => {
    return totalVotes[question] === 0 ? 0 : ((votes[option] / totalVotes[question]) * 100).toFixed(2);
  };

  return (
    <>
    <div className="row">
      <div className="col-md-12">
        
      </div>
      {questions.map((q, i) => (
        
          <div className="col-md-6 mt-4" key={i}>
            <Space
              className="poll-survey h-100"
              direction="vertical"
              size="large"
              style={{ width: "100%" }}
            >
              <h4>{q.question}</h4>
              <Radio.Group
                className="w-100"
                onChange={(e) => handleVote(q.question, e.target.value)}
                value={selectedOptions[q.question]}
              >
                {q.options.map((option, index) => (
                  <div className="d-flex align-items-center pro-cover mb-4" key={index}>
                    <Radio value={option} id={`${q.question}-${option}`} />
                    <label
                      htmlFor={`${q.question}-${option}`}
                      className="progress-wrapper flex-grow-1 ms-3"
                      style={{ cursor: "pointer" }}
                    >
                      <p>{option}</p>
                      <Progress percent={calculatePercentage(option, q.question)} />
                    </label>
                  </div>
                ))}
              </Radio.Group>
            </Space>
          </div>
     
      ))}
      </div>
    </>
  );
};

export default ProgressSurvey;
 
