
import {
  Row,
  Col,Card} from "antd";


import ListReferralsTable from "./MyReferralTable";
import SendInvites from "./SendInvites";
import ApplyReferral from "./ApplyReferral";

function ReferTab() {

  return (
    <>
    <div className="row">
      <div className="col-md-6">
          <SendInvites />
      </div>
      <div className="col-md-6">
         <ApplyReferral />
      </div>
    </div>
      
      
      <Card   style={{ marginTop: "30px"}}  >
      <h2 className="h4 mb-5">Earn more by inviting friends</h2>
      <div className="row">
        <div className="col-12">
           <h3 className="h5" > 1)  Share your referral code</h3>
         <p> Invite your friends by sharing your referral code</p>
          
         <h3 className="h5 mt-3"> 2)  Get 10% of their earning</h3>
         <p>Get 10% of the money your friends make by completing surveys. There is no upper limit</p>
        </div>
        
      </div>
      
        </Card>
      
        <ListReferralsTable />
    
    </>
  )
}
export default ReferTab;