import { useSelector } from 'react-redux';
import {
  Row,
  Col,
  Card,
  Avatar,
Button,
message,
Tooltip} from "antd";
import BgProfile from "../../assets/images/bg-signup.jpg";
import { useState } from 'react';
import { CopyTwoTone } from '@ant-design/icons';
export const UserCoverPage = () => {

  const [copied, setCopied] = useState(false);
  const handleCopyClick = () => {
    const referralCode = user.referral_code;
    const textArea = document.createElement('textarea');
    textArea.value = referralCode;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    message.success('Code copied to clipboard');
    
  };
  const { user } = useSelector(({ auth }) => auth);

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      />
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          //span={10} md={12} className="col-info"
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col >
              <Avatar.Group>
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{user.name}</h4>
                  <p>Point Balance {user?.balance?.INR ?? '0'} </p>
                </div>
              </Avatar.Group>
            </Col>
           

          <Col 
          style={{
            display: "flex",
            alignItems: "right",
            justifyContent: "flex-end",
            
          }}
          >
              <Avatar.Group>
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">Refer Code</h4>
                  <p >{user.referral_code} <span><CopyTwoTone onClick={handleCopyClick}/></span> </p>
                </div>
                
              </Avatar.Group>

            </Col>
            
          
          </Row>
        }
      />
      
    </>
  );
}

