import React, { useEffect, useState } from "react";
import { Button, Space, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { EditTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./details.css";
import { deleteAccount } from "../../redux/slice/authSlice";
import { fetchMe} from "../../redux/slice/authSlice";
import EditUserDrawer from "./editUserDrawer";

const { confirm } = Modal;

function Details() {
  const [isEditableDrawerOpen, setIsEditableDrawerOpen] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  const { personalDetail } = useSelector(({ auth }) => auth);
   

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reloadUser = () => {
    dispatch(fetchMe({}));
   
  };

  useEffect(() => {
    dispatch(fetchMe({}));
     updateLocalStorage()
  }, [dispatch]);

  const onEditClick = (userInformation) => {
    setIsEditableDrawerOpen(true);
    setUserInformation(userInformation);
  };

  const handleDeleteAccount = async () => {
    dispatch(deleteAccount())
    .unwrap()
    .then(() => {
      navigate("/sign-out");
    })
    .catch((err) => {
      console.error("Failed to delete account:", err);
    });
  };

  function showConfirm() {
    confirm({
      title: "Confirm Delete Account",
      content:
        "Once you delete your account we will not be able to recover your account and corresponding data",
      onOk() {
        handleDeleteAccount();
      },
      onCancel() {
        console.log("Account deletion canceled");
      },
    });
  }

  

  const updateLocalStorage = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const updatedUser = {
      ...storedUser,  
      data: {
        ...storedUser?.data,   
        user: {
          ...storedUser?.data?.user,   
          ...personalDetail,  
        },
      },
    };
  
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };
  let temp = personalDetail === undefined ? "Temp" : personalDetail?.name;

  return (
    <>
      <div className="page-content page-container" id="page-content">
        <div className="card radius overflow-hidden">
          <div className="row ">
            <div className="col-md-4 user-profil-bg">
              <div className="user-profil-wrapper">
                <div className="card-block text-center ">
                  <div className="user-profile text-dark">
                    <img
                      src={
                        personalDetail?.img ??
                        "https://img.icons8.com/bubbles/100/000000/user.png"
                      }
                      referrerPolicy="no-referrer"
                      className="img-radius"
                      alt="User-Profile-Image"
                    />
                  </div>
                  <h6 className="">Hello! {temp}</h6>
                  <p className="word-break">{personalDetail?.email}</p>
                  <Space className="d-flex align-items-center justify-content-center flex-wrap">
                    <button
                      className="profil-btn"
                      type="primary"
                      onClick={() => onEditClick(userInformation)}
                    >
                      Edit Profile
                    </button>
                    <Button onClick={showConfirm} type="danger">
                      Delete Account
                    </Button>
                  </Space>
                  <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-block">
                <h6 className="h5 m-b-20 p-b-5 b-b-default ">
                  Personal Information{" "}
                  <EditTwoTone onClick={() => onEditClick(userInformation)} />
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 ">Email</p>
                    <h6 className="text-muted f-w-400 word-break">
                      {personalDetail?.email}
                    </h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 ">Phone</p>
                    <h6 className="text-muted f-w-400">
                      {personalDetail?.mobile ?? "Not Available"}
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 ">Gender</p>
                    <h6 className="text-muted f-w-400">
                      {personalDetail?.gender}
                    </h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 ">DOB</p>
                    <h6 className="text-muted f-w-400">
                      {personalDetail?.dob ?? "Not Available"}
                    </h6>
                  </div>
                </div>
                <h6 className="h5 m-b-20 m-t-40 p-b-5 b-b-default ">
                  Account Information
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                   
<p  className="m-b-10 ">
                        {" "}
                        My Referral Code
                      </p>
                    <h6 className="text-muted f-w-400">
                      {personalDetail?.referral_code}
                    </h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 ">Current Balance </p>
                    <h6 className="text-muted f-w-400">
                      {personalDetail?.balance?.WSP ?? "0"}
                      WSP
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditableDrawerOpen && (
        <EditUserDrawer
          isEditableDrawerOpen={isEditableDrawerOpen}
          setIsEditableDrawerOpen={setIsEditableDrawerOpen}
          userInformation={userInformation}
          setUserInformation={setUserInformation}
          reloadUser={reloadUser}
        />
      )}
    </>
  );
}
export default Details;
