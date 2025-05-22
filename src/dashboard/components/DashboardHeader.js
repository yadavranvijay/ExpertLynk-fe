import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/slice/sidebarSlice";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
const DashboardHeader = () => {
  const dispatch = useDispatch();
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // State for search input visibility
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  // State for user dropdown
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  // State for tool dropdowns
  const [isTrackingDropdownOpen, setIsTrackingDropdownOpen] = useState(false);
  const [isResearchDropdownOpen, setIsResearchDropdownOpen] = useState(false);

  // Toggle search input
  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Toggle user dropdown
  const handleUserClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Toggle tool dropdowns
  const handleTrackingClick = () => {
    setIsTrackingDropdownOpen(!isTrackingDropdownOpen);
  };

  const handleResearchClick = () => {
    setIsResearchDropdownOpen(!isResearchDropdownOpen);
  };

  return (
    <>
      <div className="dashboard-header-main">
      <div className="dash-content-wrapper dashboard-header">
        <div className="px-sm-5 px-3 n-wrapper d-flex align-items-center justify-content-between">
          <div className="dashboard-header-logo">
            <span className="">ExpertLynk</span>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <ul className="d-flex align-items-center list-unstyled m-0">
              <li className="position-relative me-3">
                <NavLink
                  className="d-flex align-items-center"
                  onClick={handleTrackingClick}
                  style={{ cursor: "pointer" }}
                >
                  Tracking Tools <FaChevronDown />
                </NavLink>
                {isTrackingDropdownOpen && (
                  <div className="d-header-dropdown position-absolute bg-white shadow-sm">
                    <a href="/tracking-tool1" className="dropdown-item">
                      Tool 1
                    </a>
                    <a href="/tracking-tool2" className="dropdown-item">
                      Tool 2
                    </a>
                    <a href="/tracking-tool3" className="dropdown-item">
                      Tool 3
                    </a>
                  </div>
                )}
              </li>
              <li className="position-relative me-3">
                <NavLink
                  className="d-flex align-items-center"
                  onClick={handleResearchClick}
                  style={{ cursor: "pointer" }}
                >
                  Research Tools <FaChevronDown />
                </NavLink>
                {isResearchDropdownOpen && (
                  <div className="d-header-dropdown position-absolute bg-white shadow-sm">
                    <a href="/research-tool1" className="dropdown-item">
                      Tool 1
                    </a>
                    <a href="/research-tool2" className="dropdown-item">
                      Tool 2
                    </a>
                    <a href="/research-tool3" className="dropdown-item">
                      Tool 3
                    </a>
                  </div>
                )}
              </li>
            </ul>
            <div className="search position-relative me-3">
              <FaSearch
                onClick={handleSearchClick}
                style={{ cursor: "pointer" }}
              />
              {isSearchVisible && (
                <div className="search-input position-absolute">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <button className="btn btn-primary ms-2">Search</button>
                </div>
              )}
            </div>

            <div className="user position-relative me-3">
              <div
                className="d-flex align-items-center"
                onClick={handleUserClick}
              >
                <div className="user-image me-2 ">
                  <img
                    src="/images/user.jpg"
                    alt="User"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <p className="user-name mb-0">John Doe</p>
              </div>
              {isUserDropdownOpen && (
                <div className="user-dropdown-menu position-absolute bg-white shadow-sm">
                  <a href="/user-info" className="dropdown-item">
                    User Info
                  </a>
                  <a href="/edit-profile" className="dropdown-item">
                    Edit
                  </a>
                  <a href="/logout" className="dropdown-item">
                    Logout
                  </a>
                  <a
                    href="/delete-account"
                    className="dropdown-item text-danger"
                  >
                    Delete Account
                  </a>
                </div>
              )}
            </div>

            <div className="sidenav-open" onClick={handleToggleSidebar}>
              <FaBarsStaggered />
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-header-bottom"></div>
</div>
      {/* CSS for styling */}
    </>
  );
};

export default DashboardHeader;
