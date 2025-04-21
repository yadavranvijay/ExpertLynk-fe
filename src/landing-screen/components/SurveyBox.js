import React, { useState } from 'react';

const PollComponent = ({ question, options }) => {
  const [votes, setVotes] = useState(options.reduce((acc, option) => {
    acc[option] = 0;
    return acc;
  }, {}));

  const [selectedOption, setSelectedOption] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedOption) {
      alert('Please select an option before voting.');
      return;
    }

    const updatedVotes = { ...votes, [selectedOption]: votes[selectedOption] + 1 };
    setVotes(updatedVotes);
    setShowResults(true);
  };

  const totalVotes = Object.values(votes).reduce((total, count) => total + count, 0);

  // Function to generate a light random color
  const getRandomColor = () => {
    const letters = '89ABCDEF'; // Only light colors
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  return (
    <div className="poll-container h-100 mb-4">
      <h3 className="h6">{question}</h3>
      <hr className="divider" />
      {!showResults ? (
        <form className="poll-form" onSubmit={handleSubmit}>
          {options.map((option, index) => (
            <label key={index} className="poll-option">
              <input
                type="radio"
                name="language"
                value={option}
                onChange={handleOptionChange}
              />
              <span className="ps-3 border-start">{option}</span>
            </label>
          ))}
          <hr className="divider" />
          <div className="d-flex align-items-center justify-content-between mt-0">
            <div className="poll-footer">
              <p className="mb-0">Total Votes: {totalVotes} </p>
            </div>
            <button type="submit" className="vote-button">
              Vote Now
            </button>
          </div>
        </form>
      ) : (
        <div id="results" className="poll-results">
          {options.map((option, index) => {
            const percent = Math.round((votes[option] / totalVotes) * 100); // Round to nearest whole number
            const color = getRandomColor(); // Get a light random color
            return (
              <div key={index} className="result-item">
                <div className="progress-bar mx-4">
                  <div
                    className="progress"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: color, // Apply light random color
                    }}
                  >
                    <span className="result-label">{option}</span>
                  </div>
                </div>
                <span className="result-percent">{percent}%</span>
              </div>
            );
          })}
          <hr className="divider" />
          <div className="poll-footer">
            <p className="h5 mt-4">Total Votes: {totalVotes} </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollComponent;
