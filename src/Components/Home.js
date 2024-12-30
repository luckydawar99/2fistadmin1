import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./LivePfogressBar.css";
import "./sidebar.css";
import "./ScrollBar-Home.css";
import { Link } from "react-router-dom";
import Sidebarr from "./Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import ChartComponent from "./page/ChartComponent";
import { GoDotFill } from "react-icons/go";

import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [most, setmost] = useState();
  const [topcustomerdetails, settopcustomerdetails] = useState();
  const [mostpopular, setmostpopular] = useState();
  const [topsellingstore, settopsellingstore] = useState();
  const [topsellingprod, settopsellingprod] = useState();
  const [mostpopproducts, setmostpopproducts] = useState();
  const [dashboarddata, setdashboarddata] = useState();
  const [earndata, setearndata] = useState();

  const [amount, setamount] = useState();
  const [dashboardbalance, setdashboardbalance] = useState();
  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    getmost();
  }, [0]);
  let getmost = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/most_rated_products`)
      .then((res) => {
        setmost(res?.data?.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    topcustomer();
  }, [0]);
  let topcustomer = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/topCustomer_list`)
      .then((res) => {
        settopcustomerdetails(res?.data?.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    mostpopularr();
  }, [0]);
  let mostpopularr = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/mostPopular_storelist`)
      .then((res) => {
        setmostpopular(res?.data?.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    topsellings();
  }, [0]);
  let topsellings = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/topSelling_stores`)
      .then((res) => {
        settopsellingstore(res?.data?.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    topsellingproduct();
  }, [0]);
  let topsellingproduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/topSelling_products`)
      .then((res) => {
        settopsellingprod(res?.data?.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    mostpopproduct();
  }, [0]);
  let mostpopproduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/mostPopular_products`)
      .then((res) => {
        setmostpopproducts(res?.data?.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    Dashboard();
  }, [0]);
  let Dashboard = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/dashboardData`)
      .then((res) => {
        setdashboarddata(res?.data?.data);
      })
      .catch((error) => {});
  };

  let adminidd = secureLocalStorage.getItem("adminid");

  useEffect(() => {
    adminearning();
  }, [0]);
  const adminearning = () => {
    const data = {
      adminId: adminidd,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/adminWallet_details`,
        data
      )
      .then((res) => {
        setearndata(res?.data?.data);
      })
      .catch((error) => {});
  };

  const paymentrequest = (e) => {
    e.preventDefault();
    const data = {
      adminId: adminidd,
      amount: amount,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}admin/api/withdrawRequest`, data)
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Invalid Data Entered by you.");
        }
      });
  };

  useEffect(() => {
    Dashboarddata();
  }, [0]);
  let Dashboarddata = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}dashboard/getTotalCommissionAndTotalAdminCharge`,
        options
      )
      .then((res) => {
        setdashboardbalance(res?.data?.data);
      })
      .catch((error) => {});
  };

  // --------------------------Dashobard Live match Data Start----------------------------->
  useEffect(() => {
    Getdashdata();
  }, []);
  let [dashData, setDashData] = useState({});
  const Getdashdata = async () => {
    try {
      const options = {
        headers: {
          token: token,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}dashboardData_api`,
        options
      );

      const dashdata = response?.data?.data;
      setDashData(dashdata);
      // const newdatafiler = dashdata.filter((items) => items?.userStatus === 1);
      // setUserlist(newdatafiler);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
  console.log("dashData", dashData);
  // --------------------------Dashobard Data End----------------------------->
  useEffect(() => {
    GetUserList();
  }, [0]);

  let [Userlist, setUserlist] = useState([]);
  let [totalUserlist, settotalUserlist] = useState([]);
  let GetUserList = () => {
    let options = {
      headers: {
        token: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}customerList`, options)
      .then((res) => {
        // console.log(res)
        settotalUserlist(res?.data?.data);
        let newdatafiler = res?.data?.data.filter((items) => {
          return items?.userStatus == 1;
        });
        setUserlist(newdatafiler);
      })
      .catch((error) => {});
  };

  // All coordinator details show start

  let [showcoordinatorList, setcoordinatorList] = useState([]);
  const liveMatchCountProgress = showcoordinatorList?.activeStatus || 0;
  useEffect(() => {
    get_coordinatorList();
  }, []);

  let get_coordinatorList = () => {
    let options = {
      headers: {
        token: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}coordinatorList`, options)
      .then((res) => {
        console.log(res?.data?.data);
        if (res?.data?.result == "true") {
          setcoordinatorList(res?.data?.data);
        }
      })
      .catch((error) => {});
  };
  console.log("show coordinator", showcoordinatorList);

  // let [showcoordinatorList, setcoordinatorList] = useState([]);
  // let [un_up_showcoordinatorList, setun_up_showcoordinatorList] = useState([]);

  // useEffect(() => {
  //   get_coordinatorList();
  // }, []);

  // let get_coordinatorList = () => {
  //   let options = {
  //     headers: {
  //       token: token,
  //     },
  //   };
  //   axios
  //     .get(`${process.env.REACT_APP_API_KEY}coordinatorList`, options)
  //     .then((res) => {
  //       if (res.data.result == "true") {
  //         let newfilterdata = res?.data?.data.filter((items) => {
  //           return items?.coordinatorStatus == 1;
  //         });
  //         setcoordinatorList(newfilterdata);

  //         let un_up_newfilterdata = res?.data?.data.filter((items) => {
  //           return items.Status === 0;
  //         });
  //         setun_up_showcoordinatorList(un_up_newfilterdata);
  //       }
  //     })
  //     .catch((error) => { });
  // };
  // console.log("showcoordinatorList",showcoordinatorList)
  // console.log("un_up_showcoordinatorList",un_up_showcoordinatorList)

  return (
    <div>
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}>
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="page-header pb-0 border-0 mb-3 mt-3 ">
              <div className="flex-between row align-items-center mx-1">
                <div>
                  <h2 className="page-header-title">Dashboard</h2>
                  {/* <div className="text-capitalize">Hello {secureLocalStorage.getItem("adminemail")}</div> */}
                </div>
              </div>
            </div>
            {/* ==========================Total User Start======================================= */}
            <div className="row g-2" id="order_stats">
              <div className="col-sm-3 col-lg-3">
                <Link to={"/customerlist"}>
                  <div
                    className="business-analytics"
                    style={{ borderColor: "#4634ff" }}>
                    <h5 className="business-analytics__subtitle">Total User</h5>
                    <h2 className="business-analytics__title">
                      {dashData?.userCount || "0"}
                      {/* {totalUserlist?.length} */}
                    </h2>
                    <img
                      width={30}
                      height={30}
                      src="assets/team.png"
                      className="business-analytics__img"
                      alt
                    />
                  </div>
                </Link>
              </div>

              <div className="col-sm-3 col-lg-3">
                <Link to="#">
                  <div
                    className="business-analytics"
                    style={{ borderColor: "#28c76f" }}>
                    <h5 className="business-analytics__subtitle">
                      Total App Commission
                    </h5>
                    <h2 className="business-analytics__title">
                      {dashData?.totalAppCommission}
                    </h2>
                    <img
                      src="assets/profit.png"
                      width={30}
                      height={30}
                      className="business-analytics__img"
                      alt
                    />
                  </div>
                </Link>
              </div>

              <div className="col-sm-3 col-lg-3">
                <Link to="/unApprovalCoordenaitor">
                  <div
                    className="business-analytics"
                    style={{ borderColor: "#eb2222" }}>
                    <h5 className="business-analytics__subtitle">
                      Total <br /> Coordinator
                    </h5>
                    <h2 className="business-analytics__title">
                      {dashData?.coordinatorCount || "0"}
                      {/* {un_up_showcoordinatorList?.length || "00"} */}
                    </h2>
                    <img
                      width={30}
                      height={30}
                      src="assets/team.png"
                      className="business-analytics__img"
                      alt
                    />
                  </div>
                </Link>
              </div>

              <div className="col-sm-3 col-lg-3">
                <Link to="/Unverfiedcordintor">
                  <div
                    className="business-analytics"
                    style={{ borderColor: "#ff9f43" }}>
                    <h5 className="business-analytics__subtitle">
                      Verified Coordinator
                    </h5>
                    <h2 className="business-analytics__title">
                      {dashData?.verifiedCoordinatorCount || "0"}
                    </h2>
                    {/* <h2 className="business-analytics__title">
                      {showcoordinatorList?.length || "0"}
                    </h2> */}
                    <img
                      width={30}
                      height={30}
                      src="assets/team.png"
                      className="business-analytics__img"
                      alt
                    />
                  </div>
                </Link>
              </div>

              {/* <div className="col-sm-3 col-lg-3">
                <Link to="/emailunverified_user">
                  <div
                    className="business-analytics"
                    style={{ borderColor: "#eb2222" }}
                  >
                    <h5 className="business-analytics__subtitle">
                      Unverified <br /> Users
                    </h5>
                    <h2 className="business-analytics__title">
                      {Userlist?.length || "00"}
                    </h2>
                    <img
                      width={30}
                      height={30}
                      src="assets/team.png"
                      className="business-analytics__img"
                      alt
                    />
                  </div>
                </Link>
              </div> */}
            </div>
            <br /> <br /> <br />
            {/* ==========================Live Match Start======================================= */}
            <div className="row g-2" id="order_stats">
              <div className="col-sm-6 col-lg-3 ">
                <Link
                  className="order-stats order-stats_pending"
                  to="/livematch">
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}>
                    <span
                      style={{
                        lineHeight: "12px",
                        color: "red",
                        border: "1px solid red",
                        padding: "5px",
                      }}
                      className="d-inline-flex ">
                      Live <GoDotFill />
                    </span>

                    <h6 className="order-stats__subtitle">Live Matches</h6>
                  </div>
                  <span className="order-stats__title">
                    {" "}
                    {dashData?.liveMatchCount || "0"}
                  </span>
                </Link>
              </div>

              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_confirmed"
                  to="/Complete">
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}>
                    <img width={20} src="img/check.png" alt />
                    <h6 className="order-stats__subtitle">Complate Matches</h6>
                  </div>
                  <span className="order-stats__title">
                    {dashData?.completedMatchCount || "0"}
                  </span>
                </Link>
              </div>
              {/* <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_packaging"
                  to="/rejected"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img width={20} src="img/package.png" alt />
                    <h6 className="order-stats__subtitle">Rejected Matches</h6>
                  </div>
                  <span className="order-stats__title">44</span>
                </Link>
              </div> */}

              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_canceled cursor-pointer"
                  to="/cancelmatch">
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}>
                    <img width={20} src="img/cancel.png" alt />
                    <h6 className="order-stats__subtitle">Canceled Matches</h6>
                  </div>
                  <span className="order-stats__title h3">
                    {dashData?.cancelledMatchCount || "0"}
                  </span>
                </Link>
              </div>

              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_returned cursor-pointer"
                  to="/tomorrowmatch">
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}>
                    <img width={20} src="img/return.png" alt />
                    <h6 className="order-stats__subtitle">UpComing Matches</h6>
                  </div>
                  <span className="order-stats__title h3">
                    {dashData?.upcomingMatchCount}
                  </span>
                  {/* <span className="order-stats__title h3">
                    {dashboarddata?.return}
                  </span> */}
                </Link>
              </div>
            </div>
            {/* ===============================All Coordinator Details Start============================== */}
            <div className="row mt-3  ">
              <div className="col-lg-6 col-md-6 col-xl-6">
                <div className="card h-100 remove-card-shadow">
                  <div className="card-header">
                    <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                      <img width={20} src="img/rank.png" alt />
                      All Coordinator
                    </h4>
                  </div>

                  <div className="card-body">
                    <div
                      className="grid-card-wrap"
                      style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {/* {topcustomerdetails?.map((topdata) => {
                        return (

                          <Link
                            to="/Customerdetails"
                            onClick={() => {
                              secureLocalStorage.setItem("customerid", topdata?._id);
                            }}>

                            <div
                              className="cursor-pointer"
                              onclick="location.href='https://6valley.6amtech.com/admin/customer/view/2'"
                            >
                              <div className="grid-card basic-box-shadow">
                                <div className="text-center">
                                  {
                                    topdata?.user_profile === " " || topdata?.user_profile === undefined ? (
                                      <img
                                        src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
                                        className="avatar rounded-circle"
                                        alt=""
                                        width={40}
                                      />
                                    ) : topdata?.user_profile?.startsWith("https://") ? (
                                      <img
                                        src={topdata?.user_profile}
                                        className="avatar rounded-circle"
                                        alt=""
                                        width={40}
                                      />
                                    ) : (
                                      <img
                                        src={`${process.env.REACT_APP_API_KEY}uploads/${topdata?.user_profile}`}
                                        className="avatar rounded-circle"
                                        alt=""
                                        width={40}
                                      />
                                    )
                                  }
                                </div>
                                <h5 className="mb-0">{topdata?.first_name}</h5>
                                <div className="orders-count d-flex gap-1">
                                  <div>Orders : </div>
                                  <div>{topdata?.count}</div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })} */}
                      {showcoordinatorList.map((data, index) => (
                        <Link key={index} to="/sellerlist">
                          <div className="cursor-pointer">
                            <div className="grid-card basic-box-shadow">
                              <div className="text-center">
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "start",
                                    marginRight: "100px",
                                  }}>
                                  {showcoordinatorList.activeStatu || 0 ? (
                                    <div>
                                      <span
                                        style={{
                                          lineHeight: "12px",
                                          backgroundColor: "red",
                                          color: "white",
                                          border: "1px solid red",
                                          padding: "0px 5px",
                                          borderRadius: "3px",
                                          display: "inline-flex",
                                          alignItems: "center",
                                        }}>
                                        <GoDotFill /> Live
                                      </span>
                                    </div>
                                  ) : (
                                    <div>
                                      <div
                                        style={{
                                          position: "relative",
                                          width: "100%",
                                          height: "5px",
                                          overflow: "hidden",
                                          marginBottom: "3px",
                                        }}>
                                        <div
                                          style={{
                                            position: "absolute",
                                            top: "0",
                                            left: "0",
                                            height: "100%",
                                            width: "100%",
                                            backgroundColor: "red",
                                            animation:
                                              "progressBarAnimation 2s infinite linear",
                                          }}></div>
                                      </div>
                                      <span
                                        style={{
                                          fontSize: "8px",
                                          fontWeight: "bold",
                                          color: "red",
                                          display: "block",
                                        }}>
                                        Coming Soon
                                      </span>
                                    </div>
                                  )}
                                </div>
                                {data?.coordinatorProfile === " " ||
                                data?.coordinatorProfile === null ||
                                data?.coordinatorProfile === undefined ? (
                                  <img
                                    src="./game-vs.jpg"
                                    // src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
                                    className="avatar rounded-circle"
                                    alt=""
                                    width={40}
                                  />
                                ) : data?.coordinatorProfile?.startsWith(
                                    "https://"
                                  ) ? (
                                  <img
                                    src={`${process.env.REACT_APP_IMG_URL}${data?.coordinatorProfile}`}
                                    className="avatar rounded-circle"
                                    alt=""
                                    width={40}
                                  />
                                ) : (
                                  <img
                                    src={`${process.env.REACT_APP_IMG_URL}${data?.coordinatorProfile}`}
                                    className="avatar rounded-circle"
                                    alt=""
                                    width={40}
                                  />
                                )}
                              </div>
                              <h5 className="mb-0">{data?.coordinatorName}</h5>
                              {/* <div className="orders-count d-flex gap-1">
                                <div>{data?.fcmId}</div>
                              </div> */}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* ========================All User Start Part===================================== */}

              <div className="col-md-6 col-lg-6 col-xl-6">
                <div className="card h-100 remove-card-shadow">
                  <div className="card-header gap-10">
                    <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                      <img width={20} src="img/like.png" alt />
                      All Users
                    </h4>
                  </div>
                  <div className="card-body">
                    <div
                      className="grid-item-wrap"
                      style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {/* {mostpopular?.map((mostpop) => {
                        return (
                          <Link onClick={() => {
                            secureLocalStorage.setItem("sellerid", mostpop?.shopId);
                          }}
                            to="/sallerdetails"
                            className="grid-item basic-box-shadow"
                          >
                            <div className="d-flex align-items-center gap-10">
                              <img
                                src={
                                  mostpop?.shop_logo
                                    ? `${process.env.REACT_APP_API_KEY}uploads/${mostpop?.shop_logo}`
                                    : "https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png"
                                }
                                className="avatar rounded-circle avatar-sm"
                              />
                              <h5 className="shop-name">{mostpop?.shopname}{mostpop?._id}</h5>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <h5 className="shop-sell c2">{mostpop?.count}</h5>
                              <img
                                src="https://6valley.6amtech.com/public/assets/back-end/img/love.png"
                                alt
                              />
                            </div>
                          </Link>
                        );
                      })} */}
                      {totalUserlist.map((user, index) => (
                        <>
                          <Link
                            key={index}
                            to="/sallerdetails"
                            className="grid-item basic-box-shadow">
                            <div className="d-flex align-items-center gap-10">
                              {user?.userProfile === " " ||
                              user?.userProfile === null ||
                              user?.userProfile === undefined ? (
                                <img
                                  src="./img/logo/blank-profile-picture.webp"
                                  className="avatar rounded-circle avatar-sm"
                                />
                              ) : user?.userProfile?.startsWith("https://") ? (
                                <img
                                  src={`${process.env.REACT_APP_IMG_URL}${user?.userProfile}`}
                                  alt=""
                                  className="avatar rounded-circle avatar-sm"
                                />
                              ) : (
                                <img
                                  src={`${process.env.REACT_APP_IMG_URL}${user?.userProfile}`}
                                  alt=""
                                  className="avatar rounded-circle avatar-sm"
                                />
                              )}

                              {/* <img
                                src={
                                  "https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png"
                                }
                                className="avatar rounded-circle avatar-sm"
                              /> */}
                              <h5 className="shop-name">{user?.userName}</h5>
                            </div>
                            <div className="d-flex align-items-center ml-5 justify-content-center gap-5">
                              <h5 className="shop-name  text-center">
                                {user?.email}
                              </h5>
                            </div>
                            <div className="d-flex align-items-center ">
                              <span className="order-stats__title text-center ">
                                ${user?.userWallet}
                              </span>
                              {/* <h5 className="text-center">
                               
                              </h5> */}
                              {/* <h5 className="shop-sell c2">96</h5>
                              <img
                                src="https://6valley.6amtech.com/public/assets/back-end/img/love.png"
                                alt
                              /> 
                              */}
                            </div>
                          </Link>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*=========================Deposit part Start=============================  */}
            <div className="card mt-3 mb-3 remove-card-shadow">
              <div className="card-body">
                <div className="row justify-content-between align-items-center g-2 mb-3">
                  <div className="col-sm-6">
                    <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                      <img
                        width={20}
                        height={20}
                        src="assets/bitcoin.png"
                        className="mb-1"
                        alt
                      />
                      Deposit
                    </h4>
                  </div>
                </div>
                <div className="row" id="order_stats">
                  <div className="d-flex flex-nowrap gap-2">
                    <div className="col-md-6 col-lg-6">
                      <div className="card card-body h-100 justify-content-center">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <h3 className="mb-1 fz-24">
                              Rs.{earndata?.pendingwithdraw}23000
                            </h3>
                            <div className="text-capitalize mb-0">
                              Total Deposit
                            </div>
                          </div>
                          <div>
                            <img
                              className="mb-2"
                              width={40}
                              src="assets/preorder.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-6">
                      <div className="card card-body h-100 justify-content-center">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <h3 className="mb-1 fz-24">
                              Rs.{dashboardbalance?.totalCommission}7500
                            </h3>
                            <div className="text-capitalize mb-0">
                              Pending Deposit
                            </div>
                          </div>
                          <div>
                            <img
                              width={40}
                              src="assets/commission.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-6">
                      <div className="card card-body h-100 justify-content-center">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <h3 className="mb-1 fz-24">
                              Rs.{earndata?.allreadywithdraw_amount}3000
                            </h3>
                            <div className="text-capitalize mb-0">
                              Rejected Deposits
                            </div>
                          </div>
                          <div>
                            <img
                              width={40}
                              src="assets/cash-withdrawal.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3 g-2">
                <div className="d-flex flex-nowrap gap-2">
                  {/* <div className="col-lg-6 col-md-6">
                <div className="card h-100 remove-card-shadow">
                  <div className="card-header">
                    <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                      <img
                        width={20}
                        src="https://6valley.6amtech.com/public/assets/back-end/img/top-selling-product.png"
                        alt
                      />
                      Top selling products
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="grid-item-wrap">
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/49'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-10-12-6346670e3427e.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="women's shoes image"
                            />
                            <span className="title-color">women's shoes </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/9'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64882fd48c1c9.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="LM Washable and Light-Weight Men's Shoe image"
                            />
                            <span className="title-color">
                              LM Washable and Ligh ...
                            </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/50'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-648847880d064.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="Super Portable Electric Iron - Multicolor -007 image"
                            />
                            <span className="title-color">
                              Super Portable Elect ...
                            </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/47'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-6488413bebea3.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="Premium Business presentation file image"
                            />
                            <span className="title-color">
                              Premium Business pre ...
                            </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/53'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64884db79d7af.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="Klash Flash Melting Matte Waterproof Lip Stick - P09 image"
                            />
                            <span className="title-color">
                              Klash Flash Melting ...
                            </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/51'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-10-12-6346833cd4973.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="Ladies Bag image"
                            />
                            <span className="title-color">Ladies Bag </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                  {/* <div className="col-lg-6 col-md-6">
                <div className="card h-100 remove-card-shadow">
                  <div className="card-header">
                    <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                      <img
                        width={20}
                        src="https://6valley.6amtech.com/public/assets/back-end/img/most-popular-product.png"
                        alt
                      />
                      Most popular products
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="grid-card-wrap">
                          {mostpopproducts?.map((mostpop)=>{
                            return(
                              <Link to="/productsdetails"
                              onClick={() => {
                                secureLocalStorage.setItem("productid", mostpop?.productId);
                              }}>
                            <div
                              className="cursor-pointer grid-card basic-box-shadow"
                              onclick="location.href='https://6valley.6amtech.com/seller/product/view/47'"
                            >
                              <div className>
                                <img
                                  className="avatar avatar-bordered border-gold avatar-60 rounded"
                                  src={mostpop?.image1 ? `${process.env.REACT_APP_API_KEY}uploads/${mostpop?.image1}` : "https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-6488413bebea3.png"}

                                  alt="Premium Business presentation file image"
                                />
                              </div>
                              <div className="fz-12 title-color text-center">
                                {mostpop?.product_name}
                              </div>
                              <div className="d-flex align-items-center gap-1 fz-10">
                                <span className="rating-color d-flex align-items-center font-weight-bold gap-1">
                                <img src="https://6valley.6amtech.com/public/assets/back-end/img/love.png"/> {mostpop?.count}
                                </span>
                                
                              </div>
                            </div>
                            </Link>)
                          })}
                          
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                  {/* <div className="col-lg-6 col-md-6">
                <div className="card h-100 remove-card-shadow">
                  <div className="card-header">
                    <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                      <img
                        src="https://6valley.6amtech.com/public/assets/back-end/img/top-customers.png"
                        alt
                      />
                      Top Delivery Man
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="grid-card-wrap">
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/delivery-man/earning-statement/6'"
                      >
                        <div className="grid-card basic-box-shadow">
                          <div className="text-center">
                            <img
                              className="avatar rounded-circle avatar-lg"
                              onclick="location.href='https://6valley.6amtech.com/seller/delivery-man/earning-statement/6'"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg'"
                              src="https://6valley.6amtech.com/storage/app/public/delivery-man/2022-10-12-634667a5d9df0.png"
                            />
                          </div>
                          <h5 className="mb-0">Delivery</h5>
                          <div className="orders-count d-flex gap-1">
                            <div>Delivered : </div>
                            <div>0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/delivery-man/earning-statement/2'"
                      >
                        <div className="grid-card basic-box-shadow">
                          <div className="text-center">
                            <img
                              className="avatar rounded-circle avatar-lg"
                              onclick="location.href='https://6valley.6amtech.com/seller/delivery-man/earning-statement/2'"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg'"
                              src="https://6valley.6amtech.com/storage/app/public/delivery-man/2022-03-17-6233134e41746.png"
                            />
                          </div>
                          <h5 className="mb-0">supplier</h5>
                          <div className="orders-count d-flex gap-1">
                            <div>Delivered : </div>
                            <div>0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                </div>
              </div>
            </div>
            <div className="card mt-3 mb-3 remove-card-shadow">
              <div className="card-body">
                <div className="row justify-content-between align-items-center g-2 mb-3">
                  <div className="col-sm-6">
                    <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                      <img
                        width={20}
                        height={20}
                        src="assets/bitcoin.png"
                        className="mb-1"
                        alt
                      />
                      Withdrawals
                    </h4>
                  </div>
                </div>
                <div className="row" id="order_stats">
                  <div className="row g-2">
                    <div className="d-flex flex-nowrap gap-2">
                      <div className="col-md-6 col-lg-6">
                        <div className="card card-body h-100 justify-content-center">
                          <div className="d-flex gap-2 justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start">
                              <h3 className="mb-1 fz-24">
                                Rs.{earndata?.pendingwithdraw}00
                              </h3>
                              <div className="text-capitalize mb-0">
                                Total Withdrawals
                              </div>
                            </div>
                            <div>
                              <img
                                className="mb-2"
                                width={40}
                                src="assets/preorder.png"
                                alt
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="card card-body h-100 justify-content-center">
                          <div className="d-flex gap-2 justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start">
                              <h3 className="mb-1 fz-24">
                                Rs.{dashboardbalance?.totalCommission}00
                              </h3>
                              <div className="text-capitalize mb-0">
                                Pending Withdrawals
                              </div>
                            </div>
                            <div>
                              <img width={40} src="assets/commission.png" alt />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="card card-body h-100 justify-content-center">
                          <div className="d-flex gap-2 justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start">
                              <h3 className="mb-1 fz-24">
                                Rs.{earndata?.allreadywithdraw_amount}00
                              </h3>
                              <div className="text-capitalize mb-0">
                                Rejected Withdrawals
                              </div>
                            </div>
                            <div>
                              <img
                                width={40}
                                src="assets/cash-withdrawal.png"
                                alt
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-6 col-lg-6">
                      <div className="card card-body h-100 justify-content-center">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <h3 className="mb-1 fz-24">Rs.{dashboardbalance?.totalAdminCharge}00</h3>
                            <div className="text-capitalize mb-0">
                              Deposit Withdrawals
                            </div>
                          </div>
                          <div>
                            <img
                              width={40}
                              src="assets/money-bag.png"
                              alt
                            />
                          </div>
                        </div>
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>
                {/* <ChartComponent/> */}

                {/* <div className="col-lg-12 mb-3">
                <div className="card h-100 remove-card-shadow">
                  <div className="card-body">
                    <div className="row g-2 align-items-center">
                      <div className="col-md-6">
                        <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                          <img
                            src="https://6valley.6amtech.com/public/assets/back-end/img/earning_statictics.png"
                            alt
                          />
                          Earning statistics
                        </h4>
                      </div>
                      <div className="col-md-6 d-flex justify-content-md-end">
                        <ul className="option-select-btn">
                          <li>
                            <label className="basic-box-shadow">
                              <input
                                type="radio"
                                name="statistics2"
                                hidden
                                defaultChecked
                              />
                              <span
                                data-earn-type="yearEarn"
                                onclick="earningStatisticsUpdate(this)"
                              >
                                This Year
                              </span>
                            </label>
                          </li>
                          <li>
                            <label className="basic-box-shadow">
                              <input type="radio" name="statistics2" hidden />
                              <span
                                data-earn-type="MonthEarn"
                                onclick="earningStatisticsUpdate(this)"
                              >
                                This Month
                              </span>
                            </label>
                          </li>
                          <li>
                            <label className="basic-box-shadow">
                              <input type="radio" name="statistics2" hidden />
                              <span
                                data-earn-type="WeekEarn"
                                onclick="earningStatisticsUpdate(this)"
                              >
                                This Week
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <ChartComponent/>
                  </div>
                </div>
              </div> */}
              </div>

              <div className="row mt-3 g-2">
                {/* <div className="col-lg-6 col-md-6">
                <div className="card h-100 remove-card-shadow">
                  <div className="card-header">
                    <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                      <img
                        width={20}
                        src="https://6valley.6amtech.com/public/assets/back-end/img/top-selling-product.png"
                        alt
                      />
                      Top selling products
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="grid-item-wrap">
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/49'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-10-12-6346670e3427e.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="women's shoes image"
                            />
                            <span className="title-color">women's shoes </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/9'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64882fd48c1c9.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="LM Washable and Light-Weight Men's Shoe image"
                            />
                            <span className="title-color">
                              LM Washable and Ligh ...
                            </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/50'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-648847880d064.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="Super Portable Electric Iron - Multicolor -007 image"
                            />
                            <span className="title-color">
                              Super Portable Elect ...
                            </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/47'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-6488413bebea3.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="Premium Business presentation file image"
                            />
                            <span className="title-color">
                              Premium Business pre ...
                            </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/53'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64884db79d7af.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="Klash Flash Melting Matte Waterproof Lip Stick - P09 image"
                            />
                            <span className="title-color">
                              Klash Flash Melting ...
                            </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/product/view/51'"
                      >
                        <div className="grid-item bg-transparent basic-box-shadow">
                          <div className="d-flex align-items-center gap-10">
                            <img
                              className="avatar avatar-lg rounded avatar-bordered"
                              src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-10-12-6346833cd4973.png"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img2.jpg'"
                              alt="Ladies Bag image"
                            />
                            <span className="title-color">Ladies Bag </span>
                          </div>
                          <div className="orders-count py-2 px-3 d-flex gap-1">
                            <div>Sold :</div>
                            <div className="sold-count">0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                {/* <div className="col-lg-6 col-md-6">
                <div className="card h-100 remove-card-shadow">
                  <div className="card-header">
                    <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                      <img
                        width={20}
                        src="https://6valley.6amtech.com/public/assets/back-end/img/most-popular-product.png"
                        alt
                      />
                      Most popular products
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="grid-card-wrap">
                          {mostpopproducts?.map((mostpop)=>{
                            return(
                              <Link to="/productsdetails"
                              onClick={() => {
                                secureLocalStorage.setItem("productid", mostpop?.productId);
                              }}>
                            <div
                              className="cursor-pointer grid-card basic-box-shadow"
                              onclick="location.href='https://6valley.6amtech.com/seller/product/view/47'"
                            >
                              <div className>
                                <img
                                  className="avatar avatar-bordered border-gold avatar-60 rounded"
                                  src={mostpop?.image1 ? `${process.env.REACT_APP_API_KEY}uploads/${mostpop?.image1}` : "https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-6488413bebea3.png"}

                                  alt="Premium Business presentation file image"
                                />
                              </div>
                              <div className="fz-12 title-color text-center">
                                {mostpop?.product_name}
                              </div>
                              <div className="d-flex align-items-center gap-1 fz-10">
                                <span className="rating-color d-flex align-items-center font-weight-bold gap-1">
                                <img src="https://6valley.6amtech.com/public/assets/back-end/img/love.png"/> {mostpop?.count}
                                </span>
                                
                              </div>
                            </div>
                            </Link>)
                          })}
                          
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                {/* <div className="col-lg-6 col-md-6">
                <div className="card h-100 remove-card-shadow">
                  <div className="card-header">
                    <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                      <img
                        src="https://6valley.6amtech.com/public/assets/back-end/img/top-customers.png"
                        alt
                      />
                      Top Delivery Man
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="grid-card-wrap">
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/delivery-man/earning-statement/6'"
                      >
                        <div className="grid-card basic-box-shadow">
                          <div className="text-center">
                            <img
                              className="avatar rounded-circle avatar-lg"
                              onclick="location.href='https://6valley.6amtech.com/seller/delivery-man/earning-statement/6'"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg'"
                              src="https://6valley.6amtech.com/storage/app/public/delivery-man/2022-10-12-634667a5d9df0.png"
                            />
                          </div>
                          <h5 className="mb-0">Delivery</h5>
                          <div className="orders-count d-flex gap-1">
                            <div>Delivered : </div>
                            <div>0</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onclick="location.href='https://6valley.6amtech.com/seller/delivery-man/earning-statement/2'"
                      >
                        <div className="grid-card basic-box-shadow">
                          <div className="text-center">
                            <img
                              className="avatar rounded-circle avatar-lg"
                              onclick="location.href='https://6valley.6amtech.com/seller/delivery-man/earning-statement/2'"
                              onerror="this.src='https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg'"
                              src="https://6valley.6amtech.com/storage/app/public/delivery-man/2022-03-17-6233134e41746.png"
                            />
                          </div>
                          <h5 className="mb-0">supplier</h5>
                          <div className="orders-count d-flex gap-1">
                            <div>Delivered : </div>
                            <div>0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
            <div className="row g-2" id="order_stats">
              <div className="col-sm-6 col-lg-6">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">Total Played</h5>
                  <h2 className="business-analytics__title">
                    {dashboarddata?.totalSales}00
                  </h2>
                  <img
                    src="assets/profit.png"
                    width={30}
                    height={30}
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div>
              <div className="col-sm-6 col-lg-6">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">Total Win</h5>
                  <h2 className="business-analytics__title">
                    {dashboarddata?.stores}00
                  </h2>
                  <img
                    width={30}
                    height={30}
                    src="assets/store.png"
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div>
              <div className="col-sm-6 col-lg-6">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">Total Loss</h5>
                  <h2 className="business-analytics__title">
                    {dashboarddata?.products}00
                  </h2>
                  <img
                    width={30}
                    height={30}
                    src="assets/packaging.png"
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div>
              <div className="col-sm-6 col-lg-6">
                <Link to="/customerlist">
                  <div className="business-analytics">
                    <h5 className="business-analytics__subtitle">
                      Total Profit
                    </h5>
                    <h2 className="business-analytics__title">
                      {dashboarddata?.users}00
                    </h2>
                    <img
                      width={30}
                      height={30}
                      src="assets/team.png"
                      className="business-analytics__img"
                      alt
                    />
                  </div>
                </Link>
              </div>

              {/* <div className="col-sm-6  col-lg-3">
                <Link to="/overviewsale">
                  <div className="business-analytics">
                    <h5 className="business-analytics__subtitle">
                      Sales Overview
                    </h5>
                    <h2 className="business-analytics__title">0</h2>
                    <img
                      src="./sign.png"
                      className="business-analytics__img"
                      alt
                    />
                  </div>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">
                    Current sales{" "}
                  </h5>
                  <h2 className="business-analytics__title">0</h2>
                  <img
                    src="./graph.png"
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div> */}
              {/* <div className="col-sm-6 col-lg-3">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">
                    Today’s sales
                  </h5>
                  <h2 className="business-analytics__title">0</h2>
                  <img
                    src="./acquisition.png"
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div> */}

              {/* <hr /> */}

              {/* <div className="col-sm-6 col-lg-3 ">
                <Link className="order-stats order-stats_pending" to="/panding">
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20} height={20}
                      src="assets/clock.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Pending</h6>
                  </div>
                  <span className="order-stats__title">{dashboarddata?.pending}</span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_confirmed"
                  to="/confrimproducts"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20} height={20}
                      src="assets/success.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Success</h6>
                  </div>
                  <span className="order-stats__title">{dashboarddata?.confirm}</span>
                </Link>
              </div> */}
              {/* <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_packaging"
                  to="/packaging"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/packaging.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Packaging</h6>
                  </div>
                  <span className="order-stats__title">{dashboarddata?.packing}</span>
                </Link>
              </div> */}
              {/* <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_out-for-delivery"
                  to="/outfordelivery"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/out-of-delivery.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Shipped</h6>
                  </div>
                  <span className="order-stats__title">{dashboarddata?.shipped}</span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_delivered cursor-pointer"
                  to="/delivered"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/delivered.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Delivered</h6>
                  </div>
                  <span className="order-stats__title">{dashboarddata?.delivered}</span>
                </Link>
              </div> */}
              {/* <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_canceled cursor-pointer"
                  to="/canceled"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20} height={20}
                      src="assets/no-data.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Canceled</h6>
                  </div>
                  <span className="order-stats__title h3">{dashboarddata?.cancel}</span>
                </Link>
              </div> */}
              {/* <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_returned cursor-pointer"
                  to="/returned"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/returned.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Returned</h6>
                  </div>
                  <span className="order-stats__title h3">{dashboarddata?.return}</span>
                </Link>
              </div> */}
              {/* <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_failed cursor-pointer"
                  to="/failedtodelivery"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20} height={20}
                      src="assets/cancel.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">
                    Failed
                    </h6>
                  </div>
                  <span className="order-stats__title h3">{dashboarddata?.not_delivered}</span>
                </Link>
              </div> */}
            </div>
            <div className="row g-2 mb-3" id="order_stats">
              <div className="col-sm-6 col-lg-6">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">
                    Live Streaming
                  </h5>
                  <h2 className="business-analytics__title">
                    {dashboarddata?.totalSales}00
                  </h2>
                  <img
                    src="assets/profit.png"
                    width={30}
                    height={30}
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div>
              <div className="col-sm-6 col-lg-6">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">
                    Bet Placement
                  </h5>
                  <h2 className="business-analytics__title">
                    {dashboarddata?.stores}00
                  </h2>
                  <img
                    width={30}
                    height={30}
                    src="assets/store.png"
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div>

              {/* <ChartComponent /> */}
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="balance-modal"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content" style={{ textAlign: "left" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Withdraw Request
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <form onSubmit={paymentrequest}>
                <div className="modal-body">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="ogOCpmdAJJ38pWdY4o8txAvCPH58PO03n5rkZpRx"
                  />{" "}
                  {/* <div className>
                        <select
                          className="form-control"
                          id="withdraw_method"
                          name="withdraw_method"
                          required
                        >
                          <option value={1} selected>
                            VISA Card
                          </option>
                          <option value={2}>bkash</option>
                          <option value={3}>Bank</option>
                        </select>
                      </div> */}
                  <div className id="method-filed__div"></div>
                  <div className="mt-1">
                    <label
                      htmlFor="recipient-name"
                      className="col-form-label fz-16">
                      Amount : {earndata?.withdrawable_amount}
                    </label>
                    <input
                      required
                      value={amount}
                      onChange={(e) => {
                        setamount(e.target.value);
                      }}
                      type="number"
                      name="amount"
                      step=".01"
                      placeholder={earndata?.withdrawable_amount}
                      className="form-control"
                      id
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn--primary">
                    Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
