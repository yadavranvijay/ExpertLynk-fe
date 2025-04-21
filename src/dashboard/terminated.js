import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

const Terminated = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Sorry, You Are Not Qualified for This Survey</h1>
      <p>Unfortunately, based on the information provided, you do not qualify for this survey.</p>
      <NavLink type="primary" to="dashboard">
        Try Another Survey
      </NavLink>
    </div>
  );
};

export default Terminated
;
