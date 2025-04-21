import ListReferralsTable from "../ReferTab/MyReferralTable";
import TransactionHistory from "./transactionhistory";
import Withdraw from "./withdraw";

function Transaction(){
  return(
    <>
    <div className="row">
      <div className="col-lg-12">
         <TransactionHistory></TransactionHistory>
         <div className="mt-5">
         <ListReferralsTable />
         </div>
      </div>
      
    </div>
    
    
    </>
  )
}
export default Transaction;
