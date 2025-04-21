import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  Input,
  notification} from "antd";

import { saveRefferalCode } from '../../../redux/slice/rewardSlice';



export default function ApplyReferral() {
  
  const dispatch = useDispatch();
  const { myRefferalData = {}, fetching } = useSelector(({ reward }) => reward);
 
  const { Search } = Input;

  const { user } = useSelector(({ auth }) => auth);

  const onFinish = (referCode) => {
    if(referCode===user.referral_code)
    {
      notification.error({
        message: "Please add different referral code",
      });
    }
    else
    dispatch(saveRefferalCode({code:referCode}));
  };
  return (
    <>
    {!myRefferalData.is_referral_applied &&
      <Card >
        <h4 className='h5 mb-3'>Apply your friends referrral code</h4>
        <Search
          placeholder="XXX-XXX-XXX"
          enterButton="Apply Refer Code"
          size="large"
          onSearch={onFinish}
        />
      </Card>
    }
    </>
  )
}