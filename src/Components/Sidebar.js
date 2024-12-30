import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import "./manubar.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaCommentSms } from "react-icons/fa6";
import { GiMasterOfArms } from "react-icons/gi";
import {
  MdFeedback,
  MdLocalOffer,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { MdDiscount } from "react-icons/md";
import { GrTransaction, GrUserWorker } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import { MdSubscriptions } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { FaRocketchat } from "react-icons/fa";
import { BiCategory, BiMoneyWithdraw } from "react-icons/bi";
import { CiBank } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { TbBrandProducthunt } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { PiFlagBannerFill } from "react-icons/pi";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const Sidebarr = (props) => {
  let navigate = useNavigate();
  const [randomResult, setRandomResult] = useState("hello");
  let [opcount, setopcount] = useState();
  let manubaricon = () => {
    setopcount(1);
  };

  let manubarcrossicon = () => {
    setopcount(0);
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to update screen width
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    updateScreenWidth();

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [screenWidth]);

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [screenWidth]);

  const handleDropdownChange = (event) => {
    let linkvalue = event.target.value;

    if (linkvalue === "message") {
      navigate("/message");
    } else if (linkvalue === "chatdeliveryman") {
      navigate("/chatdeliveryman");
    } else if (linkvalue === "chatwithadmin") {
      navigate("/chatwithadmin");
    }
  };

  const [sidebarStatus, setSidebarStatus] = useState(() => {
    return localStorage.getItem("setstatus");
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setSidebarStatus(localStorage.getItem("setstatus"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <div>
      {screenWidth >= 767 ? (
        <aside
          className="sidenav"
          style={{ textAlign: "left", paddingLeft: "0px", marginTop: "60px" }}
        >
          <div className="navbar-vertical-container ">
            <div className="navbar-vertical-footer-offset pb-0">
              <div className="">
                <ul className="navbar-nav navbar-nav-lg nav-tabs pb-10">
                  <li className="navbar-vertical-aside-has-menu ">
                    <Sidebar className="bg-info example">
                      <Menu style={{ width: "100%" }}>
                      {/*DESHBOARD */}
                        <MenuItem
                          component={<Link to="/home" />}
                          icon={
                            <i
                              class="fa fa-home"
                              style={{ color: "white", fontSize: "20px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                          }}
                        >
                          {" "}
                          DASHBOARD{" "}
                        </MenuItem>
                         {/*  MEMBER MANAGEMENT */}
                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                            height: "39px",
                          }}
                        >
                          {" "}
                          MEMBER MANAGEMENT{" "}
                        </MenuItem>

                               {/* USERS */}
                        <SubMenu
                          label="USERS"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaUser style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/customerlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            USER LIST{" "}
                          </MenuItem>
                          {/* <MenuItem
                            component={<Link to="/customerreview" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Members Reviews
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/loyaltyreport" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Loyalty Points
                          </MenuItem> */}
                        </SubMenu>

                        {/* COORDINATOR */}
                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <TbBrandProducthunt style={{ fontSize: "20px" }} />
                          }
                          label="COORDINATOR"
                        >
                          {/* <MenuItem
                            component={<Link to="/addnewseller" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Add New Vendor{" "}
                          </MenuItem> */}

                                  {/* COOEDINATOR LIST */}
                          <MenuItem
                            component={<Link to="/sellerlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            COOEDINATOR LIST{" "}
                          </MenuItem>

                            {/*UN-COOEDINATOR LIST */}
                          <MenuItem
                            component={<Link to="/unApprovalCoordenaitor" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            UN-COOEDINATOR LIST{" "}
                          </MenuItem>
                          {/* <MenuItem
                            component={<Link to="/withdrow" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Withdraws{" "}
                          </MenuItem>*/}
                          {/* <MenuItem
                            component={<Link to="/commissionapproval" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            COORDINATOR DATA{" "}
                          </MenuItem> */}
                        </SubMenu>
              
                              
                         
                   {/*  MEMBER MANAGEMENT */}
                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          MATCH MANAGEMENT{" "}
                        </MenuItem>
                      
                      
                         {/* ALL MATCH */}
                        <SubMenu
                          label="All Match"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                          }}
                          icon={
                            <i
                              class="fa fa-credit-card"
                              style={{ fontSize: "15px" }}
                              aria-hidden="true"
                            ></i>
                          }
                        >
                          <MenuItem
                            component={<Link to="/livematch" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white", height: '33px'
                            }}
                          >
                            {" "}
                            Live Matches{" "}
                          </MenuItem>
                          
                          <MenuItem
                          component={<Link to="/tomorrowmatch" />}
                          icon={
                            <i
                              class="fa fa-circle"
                              style={{ color: "white", fontSize: "5px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          style={{
                            paddingLeft: "20px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white", height: '33px'
                          }}
                        >
                          {" "}
                          Tomorrow  Matches  {" "}
                        </MenuItem>

                          <MenuItem
                            component={<Link to="/approved" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white", height: '33px'
                            }}
                          >
                            {" "}
                            Approved Matches{" "}
                          </MenuItem>
                          {/* <MenuItem
                            component={<Link to="/refund" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white", height: '33px'
                            }}
                          >
                            {" "}
                            Refunded Matches{" "}
                          </MenuItem> */}
                          <MenuItem
                            component={<Link to="/rejected" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white", height: '33px'
                            }}
                          >
                            {" "}
                            Rejected Matches {" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/cancelmatch" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white", height: '33px'
                            }}
                          >
                            {" "}
                            Canceled  Matches  {" "}
                          </MenuItem>

                        
                        </SubMenu>
                        {/* <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<IoMdSettings style={{ fontSize: "22px" }} />}
                          label="ADMIN CHARGES SETTING"
                        >
                          <MenuItem
                            component={<Link to="/addnewdeliveryman" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            ADMIN CHARGES{" "}
                          </MenuItem>

                           <MenuItem
                            component={<Link to="/deliverywithdraw" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Withdraws{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/emergencycontact" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Emergency Contact{" "}
                          </MenuItem> 
                        </SubMenu> */}

                        {/* <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<GrUserWorker style={{ fontSize: "20px" }} />}
                          label="EMPLOYEE"
                        >
                          <MenuItem
                            component={<Link to="/addnewemploye" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            ADD EMPLOYEE{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/addnewemployetype" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            ADD EMPLOYEE TYPE{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/deliverymanlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            EMPLOYEE MASTER{" "}
                          </MenuItem>
                        </SubMenu> */}

                        {/* <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaCommentSms style={{ fontSize: "20px" }} />}
                          label="SMS"
                        >
                          <MenuItem
                            component={<Link to="/smslist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            SMS LIST{" "}
                          </MenuItem>
                        </SubMenu> */}
                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          MAIN MANAGEMENT{" "}
                        </MenuItem>



                        <SubMenu
                          label="CATEGORY"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<BiCategory style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/cetagory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            CATEGORY{" "}
                          </MenuItem>
                          {/* <MenuItem
                            component={<Link to="/subbcetagory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            SUBCATEGORY{" "}
                          </MenuItem> */}
                        </SubMenu>

                        {/* <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/SystemSetting" />}
                          icon={
                            <PiFlagBannerFill style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          SYSTEMSETTING{" "}
                        </MenuItem> */}

                        {/* <SubMenu
                          label="BANK"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<CiBank style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/subcetagory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            BANk LIST
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/subsubcetagory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            MEMBER BANKER
                          </MenuItem>
                        </SubMenu> */}

                        {/* <SubMenu
                          label="MASTER SECTION"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<GiMasterOfArms style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/addnewcolor" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            COUNTRY MASTER{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/addnewbrands" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            STATE MASTER{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/addnewsize" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            CITY MASTER{" "}
                          </MenuItem>
                        </SubMenu> */}

                        {/* <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <TbBrandProducthunt style={{ fontSize: "20px" }} />
                          }
                          label="CASH BACK REQUEST"
                        >
                          <MenuItem
                            component={<Link to="/newproductsrequest" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            NEW CASH BACK REQUESTS{" "}
                          </MenuItem>

                           <MenuItem
                            component={<Link to="/vendorapprovedproductlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Approved Products{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/vendordeniedproductlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Denied Products{" "}
                          </MenuItem> 
                        </SubMenu> */}

                        {/* <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          SUPPORT SYSTEM{" "}
                        </MenuItem> */}
                        {/* <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              style={{ fontSize: "20px" }}
                              class="fa fa-question-circle"
                              aria-hidden="true"
                            ></i>
                          }
                          label="SUPPORT TICKET"
                        >
                          <MenuItem
                            component={<Link to="/ticketsupport" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            PENDING TICKET{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/supportdepartment" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            CLOSED TICKET{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/supporprority" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ANSWERD TICKET{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/addcallsupport" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ALL TICKET{" "}
                          </MenuItem>
                        </SubMenu> */}

                        {/* <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          PAYOUT MANAGEMENT{" "}
                        </MenuItem> */}


                        {/* <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-id-card"
                              aria-hidden="true"
                              style={{ fontSize: "18px" }}
                            ></i>
                          }
                          label="RECHARGE HISTORY"
                        >
                          <MenuItem
                            component={<Link to="/packaging" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            RECHARGE HISTORY{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/outForDelivery" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            RECHARGE SUMMARY DAY WISE{" "}
                          </MenuItem>
                        </SubMenu> */}



                        {/* <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-credit-card-alt"
                              style={{ fontSize: "16px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          label="MEMBER FUND TRANSAFER"
                        >
                          <MenuItem
                            component={<Link to="/failedToDelivery" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ADD FUND
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/coupanupdate" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            DEDUCT FUND
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/coupan" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ADD FUND REPORT
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-credit-card-alt"
                              style={{ fontSize: "16px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          label="VENDOR FUND TRANSAFER"
                        >
                          <MenuItem
                            component={<Link to="/loyaltyreport" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ADD FUND
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/editproducts" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            DEDUCT FUND
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/productattribute" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ADD FUND REPORT
                          </MenuItem>
                        </SubMenu> */}

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          PAYMENT MANAGEMENT{" "}
                        </MenuItem>

                        <SubMenu
                          label="PAYOUT MODE SETTING"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-credit-card"
                              style={{ fontSize: "18px" }}
                              aria-hidden="true"
                            ></i>
                          }
                        >
                          {/* <MenuItem
                            component={<Link to="/products_list" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            PAYOUT MODE{" "}
                          </MenuItem> */}


                          <MenuItem
                            component={<Link to="/Withdraw_req" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            WITHDRAW REQUEST{" "}
                          </MenuItem>


                          <MenuItem
                            component={<Link to="/products_list" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            ALL TRANSACTION{" "}
                          </MenuItem>

                 

                        </SubMenu>
                        {/* <SubMenu
                          label="PAYOUT SETTING"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-credit-card"
                              style={{ fontSize: "18px" }}
                              aria-hidden="true"
                            ></i>
                          }
                        >
                          <MenuItem
                            component={<Link to="/refundpanding" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            PAYOUT SURCHARGE SETTING{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/refundapproved" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            PAYOUT SETTING{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/refundrefunded" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            PAYOUT TRANSACTION HISTORY{" "}
                          </MenuItem>
                        </SubMenu> */}
                        {/* <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-money"
                              style={{ fontSize: "18px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          label="WALLET SYSTEM"
                        >
                          <MenuItem
                            component={<Link to="/delivered" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            WALLET SUMMARY LATEST{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/returned" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            WALLET SUMMARY ID WISE
                          </MenuItem>
                        </SubMenu> */}

                       
                        {/* <MenuItem
                          component={<Link to="/deliverycharge" />}
                          icon={<MdFeedback style={{ fontSize: "20px" }} />}
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          MINIMUM WITHDRAWAL AMOUNT SETTING{" "}
                        </MenuItem> */}
                        {/* <MenuItem
                          component={<Link to="/bannerlist" />}
                          icon={
                            <PiFlagBannerFill style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          BANNERS{" "}
                        </MenuItem> */}
                        {/* <MenuItem
                          component={<Link to="/userorderlist" />}
                          icon={
                            <PiFlagBannerFill style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                         VENDOR BANNERS{" "}
                        </MenuItem> */}
                        {/* <MenuItem
                          component={<Link to="/earningstatement" />}
                          icon={
                            <PiFlagBannerFill style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          TEXT BANNERS{" "}
                        </MenuItem> */}
                        {/* <MenuItem
                          component={<Link to="/editmaincategory" />}
                          icon={
                            <PiFlagBannerFill style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          CATEGORY BANNERS{" "}
                        </MenuItem> */}
                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<MdLocalOffer style={{ fontSize: "20px" }} />}
                          label="COMMISSION MASTER"
                        >
                          <MenuItem
                            component={<Link to="/addadvertisment" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            COORDINATOR REFERRAL COMMISSION MASTER{" "}
                          </MenuItem>
                          {/* <MenuItem
                            component={<Link to="/dealsoftheday" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            VENDOR SPONSOR COMMISSION{" "}
                          </MenuItem> */}
                        </SubMenu>

                        {/* <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<MdLocalOffer style={{ fontSize: "20px" }} />}
                          label="REFERRAL & VENDOR COMMISSION SETTING"
                        >
                          <MenuItem
                            component={<Link to="/addnewproducttype" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            REFERRAL REWARD SETTING{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/deliverywithdraw" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            RECHARGE&BBPS COMMISSION{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/emergencycontact" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            VENDOR COMMISSION SETTING{" "}
                          </MenuItem>
                        </SubMenu> */}


                        {/* <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          CHAT DETAILS{" "}
                        </MenuItem> */}

                        {/* <SubMenu
                          label="Chat"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <IoChatboxEllipses style={{ fontSize: "20px" }} />
                          }
                        >
                          <MenuItem
                            component={<Link to="/vendorchat" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Customer Chat{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/message" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Delivery-Man Chat{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/chatwithadmin" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Vendor Chat{" "}
                          </MenuItem>
                        </SubMenu> */}


                       

                        



                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          SETTING MANAGEMENT{" "}
                        </MenuItem>
                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<IoMdSettings style={{ fontSize: "20px" }} />}
                          label="SETTING"
                        >
                          <MenuItem
                            component={<Link to="/aboutus" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            ABOUT US{" "}
                          </MenuItem>

                          {/* <MenuItem
                            component={<Link to="/termcondition" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            TERM & CONDITION{" "}
                          </MenuItem> */}
                          {/* <MenuItem
                            component={<Link to="/returnpolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Return Policy{" "}
                          </MenuItem> */}

                          {/* <MenuItem
                            component={<Link to="/cancellaionpolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Cancellation Policy{" "}
                          </MenuItem> */}
                          {/* <MenuItem
                            component={<Link to="/refundpolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            REFUND POLICY{" "}
                          </MenuItem> */}
                          <MenuItem
                            component={<Link to="/privacypolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            PRIVACY & POLICY{" "}
                          </MenuItem>

                          {/* <MenuItem
                            component={<Link to="/faq" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Faq{" "}
                          </MenuItem> */}
                          <MenuItem
                            component={<Link to="/contactus" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            CONTACT US{" "}
                          </MenuItem>
                          <MenuItem
                          component={<Link to="/suggestion" />}
                          icon={<MdFeedback style={{ fontSize: "20px" }} />}
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          Suggestion{" "}
                        </MenuItem>
                        </SubMenu>
                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <IoMdNotifications style={{ fontSize: "20px" }} />
                          }
                          label="Notification"
                        >
                          <MenuItem
                            component={<Link to="/sendnotification" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Send Notification{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/sendnotification" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Push Notification{" "}
                          </MenuItem>
                        </SubMenu>

                       


                      </Menu>
                    </Sidebar>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      ) : null}

      {sidebarStatus == "true" ? (
        <aside
          className="sidenav1"
          style={{
            textAlign: "left",
            paddingLeft: "0px",
            marginTop: "60px",
            opacity: `${opcount}`,
          }}
        >
          <div className="navbar-vertical-container ">
            <div className="navbar-vertical-footer-offset pb-0">
              <div className="">
                <ul
                  style={{ overflow: "scroll", height: "450px" }}
                  className="navbar-nav navbar-nav-lg nav-tabs pb-10"
                >
                  <li className="navbar-vertical-aside-has-menu ">
                    <Sidebar className="bg-info example">
                      <Menu style={{ width: "100%" }}>
                        <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/home" />}
                          icon={
                            <i
                              class="fa fa-home"
                              style={{ color: "white", fontSize: "20px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                          }}
                        >
                          {" "}
                          DASHBOARD{" "}
                        </MenuItem>
                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                            height: "39px",
                          }}
                        >
                          {" "}
                          MEMBER MANAGEMENT{" "}
                        </MenuItem>
                        <SubMenu
                          label="MEMBERS"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaUser style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/customerlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            MEMBERS LIST{" "}
                          </MenuItem>
                          {/* <MenuItem
                            component={<Link to="/customerreview" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Members Reviews
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/loyaltyreport" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Loyalty Points
                          </MenuItem> */}
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <TbBrandProducthunt style={{ fontSize: "20px" }} />
                          }
                          label="VENDOR"
                        >
                          {/* <MenuItem
                            component={<Link to="/addnewseller" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Add New Vendor{" "}
                          </MenuItem> */}
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/sellerlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            VENDOR LIST{" "}
                          </MenuItem>
                          {/* <MenuItem
                            component={<Link to="/withdrow" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Withdraws{" "}
                          </MenuItem>*/}
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/commissionapproval" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            COMMISION APPROVAL{" "}
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<IoMdSettings style={{ fontSize: "22px" }} />}
                          label="ADMIN CHARGES SETTING"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/addnewdeliveryman" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            ADMIN CHARGES{" "}
                          </MenuItem>

                          {/* <MenuItem
                            component={<Link to="/deliverywithdraw" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Withdraws{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/emergencycontact" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Emergency Contact{" "}
                          </MenuItem> */}
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<GrUserWorker style={{ fontSize: "20px" }} />}
                          label="EMPLOYEE"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/addnewemploye" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            ADD EMPLOYEE{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/addnewemployetype" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            ADD EMPLOYEE TYPE{" "}
                          </MenuItem>

                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/deliverymanlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            EMPLOYEE MASTER{" "}
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaCommentSms style={{ fontSize: "20px" }} />}
                          label="SMS"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/smslist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            SMS LIST{" "}
                          </MenuItem>
                        </SubMenu>
                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          MAIN MANAGEMENT{" "}
                        </MenuItem>

                        {/* <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/SystemSetting" />}
                          icon={
                            <i
                              class="fa fa-home"
                              style={{ color: "white", fontSize: "20px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                          }}
                        >
                          {" "}
                          SYSTEM SETTING{" "}
                        </MenuItem> */}

                        <SubMenu
                          label="CATEGORY"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<BiCategory style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/cetagory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            CATEGORY{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/subbcetagory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            SUBCATEGORY{" "}
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          label="BANK"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<CiBank style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/subcetagory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            BANk LIST
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/subsubcetagory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            MEMBER BANKER
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          label="MASTER SECTION"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<GiMasterOfArms style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/addnewcolor" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            COUNTRY MASTER{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/addnewbrands" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            STATE MASTER{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/addnewsize" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            CITY MASTER{" "}
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <TbBrandProducthunt style={{ fontSize: "20px" }} />
                          }
                          label="CASH BACK REQUEST"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/newproductsrequest" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            NEW CASH BACK REQUESTS{" "}
                          </MenuItem>

                          {/* <MenuItem
                            component={<Link to="/vendorapprovedproductlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Approved Products{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/vendordeniedproductlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Denied Products{" "}
                          </MenuItem> */}
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          SUPPORT SYSTEM{" "}
                        </MenuItem>
                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              style={{ fontSize: "20px" }}
                              class="fa fa-question-circle"
                              aria-hidden="true"
                            ></i>
                          }
                          label="SUPPORT"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/ticketsupport" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            TICKET SUPPORT{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/supportdepartment" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            SUPPORT DEPARTMENTS{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/supporprority" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            SUPPORT PRIORITY MASTER{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/addcallsupport" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ADD CALL SUPPORT{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          PAYOUT MANAGEMENT{" "}
                        </MenuItem>
                        {/* 
                        <SubMenu
                          label="PAYOUT MODE SETTING"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-credit-card"
                              style={{ fontSize: "18px" }}
                              aria-hidden="true"
                            ></i>
                          }
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/products_list" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            PAYOUT MODE{" "}
                          </MenuItem>
                        </SubMenu> */}

                        <SubMenu
                          label="PAYOUT SETTING"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-credit-card"
                              style={{ fontSize: "18px" }}
                              aria-hidden="true"
                            ></i>
                          }
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/refundpanding" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            PAYOUT SURCHARGE SETTING{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/refundapproved" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            PAYOUT SETTING{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/refundrefunded" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            PAYOUT TRANSACTION HISTORY{" "}
                          </MenuItem>
                        </SubMenu>
                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-id-card"
                              aria-hidden="true"
                              style={{ fontSize: "18px" }}
                            ></i>
                          }
                          label="RECHARGE HISTORY"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/packaging" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            RECHARGE HISTORY{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/outForDelivery" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            RECHARGE SUMMARY DAY WISE{" "}
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-money"
                              style={{ fontSize: "18px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          label="WALLET SYSTEM"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/delivered" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            WALLET SUMMARY LATEST{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/returned" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            WALLET SUMMARY ID WISE
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-credit-card-alt"
                              style={{ fontSize: "16px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          label="MEMBER FUND TRANSAFER"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/failedToDelivery" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ADD FUND
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/coupanupdate" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            DEDUCT FUND
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/coupan" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ADD FUND REPORT
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <i
                              class="fa fa-credit-card-alt"
                              style={{ fontSize: "16px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          label="VENDOR FUND TRANSAFER"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/loyaltyreport" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ADD FUND
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/editproducts" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            DEDUCT FUND
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/productattribute" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            ADD FUND REPORT
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          OTHER MANAGEMENT{" "}
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/Withdrow" />}
                          icon={
                            <BiMoneyWithdraw style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          WITHDRAW REQUEST{" "}
                        </MenuItem>
                        {/* <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/deliverycharge" />}
                          icon={<MdFeedback style={{ fontSize: "20px" }} />}
                          style={{
                            paddingLeft: "7px", 
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          MINIMUM WITHDRAWAL AMOUNT SETTING{" "}
                        </MenuItem> */}
                        <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/bannerlist" />}
                          icon={
                            <PiFlagBannerFill style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          BANNERS{" "}
                        </MenuItem>


                        <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/userorderlist" />}
                          icon={
                            <PiFlagBannerFill style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          VENDOR BANNERS{" "}
                        </MenuItem>


                        <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/earningstatement" />}
                          icon={
                            <PiFlagBannerFill style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          TEXT BANNERS{" "}
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/editmaincategory" />}
                          icon={
                            <PiFlagBannerFill style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          CATEGORY BANNERS{" "}
                        </MenuItem>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<MdLocalOffer style={{ fontSize: "20px" }} />}
                          label="COMMISSION MASTER"
                        >
                          {/* <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/addadvertisment" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            MEMBER REFERRAL COMMISSION MASTER{" "}
                          </MenuItem> */}
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/addadvertisment" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            VENDOR SPONSOR COMMISSION{" "}
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<MdLocalOffer style={{ fontSize: "20px" }} />}
                          label="REFERRAL & VENDOR COMMISSION SETTING"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/addnewproducttype" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            REFERRAL REWARD SETTING{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/deliverywithdraw" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            RECHARGE&BBPS COMMISSION{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/emergencycontact" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            VENDOR COMMISSION SETTING{" "}
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <IoMdNotifications style={{ fontSize: "20px" }} />
                          }
                          label="Notification"
                        >
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/sendnotification" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Send Notification{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/sendnotification" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Push Notification{" "}
                          </MenuItem>
                        </SubMenu>

                        {/* <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          CHAT DETAILS{" "}
                        </MenuItem> */}

                        {/* <SubMenu
                          label="Chat"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <IoChatboxEllipses style={{ fontSize: "20px" }} />
                          }
                        >
                          <MenuItem
                            component={<Link to="/vendorchat" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Customer Chat{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/message" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Delivery-Man Chat{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/chatwithadmin" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Vendor Chat{" "}
                          </MenuItem>
                        </SubMenu> */}

                        <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/suggestion" />}
                          icon={<MdFeedback style={{ fontSize: "20px" }} />}
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          Suggestion{" "}
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            const currentStatus =
                              localStorage.getItem("setstatus");
                            const newStatus =
                              currentStatus === "true" ? "false" : "true";
                            localStorage.setItem("setstatus", newStatus);
                            window.dispatchEvent(new Event("storage"));
                          }}
                          component={<Link to="/alltransication" />}
                          icon={
                            <BiMoneyWithdraw style={{ fontSize: "20px" }} />
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                        >
                          {" "}
                          ALL TRANSACTION{" "}
                        </MenuItem>



                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          OTHER MANAGEMENT{" "}
                        </MenuItem>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "rgb(5, 15, 77)",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<IoMdSettings style={{ fontSize: "20px" }} />}
                          label="SETTING"
                        >
                          {/* <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/aboutus" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            About us{" "}
                          </MenuItem> */}

                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/termcondition" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            TERM & CONDITION{" "}
                          </MenuItem>
                          {/* <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/returnpolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Return Policy{" "}
                          </MenuItem> */}

                          {/* <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/cancellaionpolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Cancellation Policy{" "}
                          </MenuItem> */}
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/refundpolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            REFUND POLICY{" "}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/privacypolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            PRIVACY & POLICY{" "}
                          </MenuItem>

                          {/* <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/faq" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Faq{" "}
                          </MenuItem> */}
                          <MenuItem
                            onClick={() => {
                              const currentStatus =
                                localStorage.getItem("setstatus");
                              const newStatus =
                                currentStatus === "true" ? "false" : "true";
                              localStorage.setItem("setstatus", newStatus);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            component={<Link to="/contactus" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "rgb(5, 15, 77)",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Contact us{" "}
                          </MenuItem>
                        </SubMenu>
                      </Menu>
                    </Sidebar>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
};

export default Sidebarr;
