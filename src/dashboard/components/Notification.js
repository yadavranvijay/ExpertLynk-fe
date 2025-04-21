import React, { useEffect, useState } from 'react';
import { Button, notification, Space } from 'antd';

const DobNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const [user, setUser] = useState(null);
  // Function to open the notification

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Complete your personal detail',
      description:
        'Dear User, to help us serve you better, please take a moment to complete your personal details. Once done, you can fill out the survey and start earning points! Don’t miss out on this opportunity to boost your rewards!',
    });
  };
useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const userInfo = user?.data?.user;
  const isDataComplete =userInfo?.dob;

  useEffect(() => {
    openNotificationWithIcon('info');
    
  }, []);


  return (
    <>
      {contextHolder}
      
    </>
  );
};

export default DobNotification;
