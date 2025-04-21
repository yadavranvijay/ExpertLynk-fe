import React from "react";
import { useDispatch } from "react-redux";
import { withdrawRequestUser } from "../../redux/slice/rewardSlice";
import { IoClose } from "react-icons/io5";

const Redeem = ({ reward, redeemtoggle }) => {
  const dispatch = useDispatch();
  const onFinish = () => {
    const withdrawDetails = {
      amount:reward.points,
    method:reward.title,
    account_details:{  
        gift_card_type:reward.title 
    }
    };
    dispatch(withdrawRequestUser(withdrawDetails));
    redeemtoggle();  
  };

  return (
    <div className="login-card-wrapper redeem-info-card">
      <div className="card-shadow"></div>
      <div className="login-card">
        <span className="close-btn" onClick={redeemtoggle}>
          <IoClose />
        </span>
        <div className="login-card-header mb-4 d-flex align-items-center justify-content-between">
          <h6 className="h6 mb-0 text-center">
            Your gift card will be delivered to your inbox within 7 days.
          </h6>
        </div>
        <p>If you agree, please click on the Send button</p>
        <button className="btn" onClick={onFinish}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Redeem;
