import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";

const Coordinator_details = () => {

  const [customerdata, setcustomerdata] = useState();
  //console.log("dataa", customerdata);
  // const [count, setcount] = useState();
  const [customerorderdata, setcustomerorderdata] = useState();
  const [ProductListfilter, setProductListfilter] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [balance, setbalance] = useState();
  let navigate = useNavigate();
  const [count, setCount] = useState();
  const [userlist, setUserlist] = useState([]);
  //   const [activePage, setActivePage] = useState(1);
  //   const [itemsPerPage, setItemsPerPage] = useState(10);

  let banneredit = () => {
    navigate();
    // navigate(`/Updatedeliveryman`);
  };

  //   let token = secureLocalStorage.getItem("adminidtoken");

  let deletebanner = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this User data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let deletebannerimage = () => {
          let options = {
            headers: {
              Authorization: token,
            },
          };
          axios
            .delete(
              `${process.env.REACT_APP_API_KEY}admin/banners/delete/${item}`,
              options
            )
            .then((res) => {
              GetUserList();
            })
            .catch((error) => {});
        };
        deletebannerimage();
        swal("Poof! Your user data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };

  useEffect(() => {
    GetUserList();
  }, [0]);

  let GetUserList = () => {
    let options = {
      headers: {
        token: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}customerList`, options)
      .then((res) => {
        console.log(res);
        setCount(res?.data?.data?.length);
        setUserlist(res?.data?.data);
        console.log("userlist",userlist)
      })
      .catch((error) => {});
  };
  console.log("userlist",userlist)
  
  const activedeactive = (item) => {
    const Data = {
      userId: item,
    };
    let options = {
      headers: {
        token: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}userBlock_unblock_api`,
        Data,
        options
      )
      .then((res) => {
        swal({
          title: res.data.message,

          icon: "success",
        });
        GetUserList();
      })
      .catch((error) => {});
  };

  //   const handleItemsPerPageChange = (event) => {
  //     setItemsPerPage(parseInt(event.target.value));
  //     setActivePage(1);
  //   };

  //   const handlePageChange = (pageNumber) => {
  //     setActivePage(pageNumber);
  //   };

  const renderuserData = (usersdata, index) => {
    // console.log(usersdata)
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr id={`data-${index}`}>
        <td className="text-center">{adjustedIndex}</td>
        <td>
          {usersdata?.userProfile === " " ||
          usersdata?.userProfile === null ||
          usersdata?.userProfile === undefined ? (
            <img
              style={{ width: "50%" }}
              src="./img/logo/blank-profile-picture.webp"
            />
          ) : usersdata?.userProfile?.startsWith("https://") ? (
            <img
              style={{ width: "50%" }}
              src={`${process.env.REACT_APP_IMG_URL}${usersdata?.userProfile}`}
              alt=""
            />
          ) : (
            <img
              style={{ width: "50%" }}
              src={`${process.env.REACT_APP_IMG_URL}${usersdata?.userProfile}`}
              alt=""
            />
          )}
        </td>
        <td className="text-center">
          <Link
            to="/customerdetails"
            onClick={() => {
              secureLocalStorage.setItem("userids", usersdata?._id);
            }}
          >
            {usersdata?.userName}
          </Link>
        </td>
        <td className="text-center">{usersdata?.countryName}</td>
        <td className="text-center">{usersdata?.email}</td>
        <td className="text-center">{usersdata?.uniqueName}</td>

        <td className="text-center">2024-05-14 04:40</td>
        <td className="text-center">2024-05-15 05:55</td>
        {usersdata?.userStatus !== 0 ? (
          <td className="text-center">
            <label className="badge badge-danger">BLOCKED</label>
          </td>
        ) : (
          <td className="text-center">
            <label className="badge badge-success">ACTIVE</label>
          </td>
        )}
        {usersdata?.userStatus !== 0 ? (
          <td className="text-center">
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher mx-auto">
                <input
                  type="checkbox"
                  className="switcher_input"
                  name="status"
                  onChange={() => activedeactive(usersdata?._id)}
                />
                <span className="switcher_control" />
              </label>
            </form>
          </td>
        ) : (
          <td className="text-center">
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher mx-auto">
                <input
                  id="coupon_status9"
                  name="status"
                  defaultValue={1}
                  defaultChecked
                  type="checkbox"
                  className="switcher_input"
                  onChange={() => activedeactive(usersdata?._id)}
                />
                <span className="switcher_control" />
              </label>
            </form>
          </td>
        )}

        <td>
          <div className="d-flex gap-10 justify-content-center">
            <span
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                banneredit(
                  secureLocalStorage.setItem("banner_id", usersdata?._id)
                );
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <a
              onClick={() => deletebanner()}
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </a>
            <Link
              to="/customerdetails"
              onClick={() => {
                secureLocalStorage.setItem("userids", usersdata?._id);
              }}
              title="View"
              className="btn btn-outline-info btn-sm square-btn"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </div>
        </td>
      </tr>
    );
  };
  const itemsPerPage = 5;
  let deleteproducts = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this banner?",
      icon: "success",
      dangerMode: true,
    });
  };
//==============================Coordinator details part=================================================>
  let coordinatorids = secureLocalStorage.getItem("coordinatorids");
  let memberidof = secureLocalStorage.getItem("memberid");

  let token = secureLocalStorage.getItem("adminidtoken");
  useEffect(() => {
    getcustomerdata();
  }, [0]);
  let getcustomerdata = () => {
    const data = {
      coordinatorId: coordinatorids,
    };
    let options = {
      headers: {
        token: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}coordinatorDetails`,
        data,

        options
      )
      .then((res) => {
        setbalance(res?.data?.balance);
        setcustomerdata(res?.data?.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getcustomerorderdata();
  }, [0]);
  let getcustomerorderdata = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/transaction-history/getTransactionsByMemberId/${memberidof}`,

        options
      )
      .then((res) => {
        const reversedData = res?.data?.data?.reverse() || [];
        // setcount(reversedData?.length);
        setcustomerorderdata(reversedData);

        // setcount(res?.data?.data?.length);
        // setcustomerorderdata(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    setProductListfilter(customerorderdata);
  }, [customerorderdata]);
  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = customerorderdata?.filter(
      (item) =>
        item?.vendorName?.toLowerCase().includes(searchTerm) ||
        item?.transactionId?.toLowerCase().includes(searchTerm) ||
        item?.paymentMode?.toLowerCase().includes(searchTerm) ||
        item?.businessName?.toLowerCase().includes(searchTerm)
    );
    setProductListfilter(result);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderProductData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;

    return (
      <tr>
        <td>{adjustedIndex}</td>
        <td className="text-capitalize text-center">{data?.businessName}</td>
        <td className="text-capitalize text-center">{data?.vendorName}</td>
        <td className="text-center">
          <a href="#" className="title-color hover-c1">
            {data?.transactionId}
          </a>
        </td>
        <td className="text-center">{data?.amount}</td>
        <td className="text-center">{data?.paymentMode}</td>
        <td className="text-center">
          {data?.type ? data?.type : data?.transactionStatus}
        </td>
        <th className="text-center">{data?.transactionStatus}</th>
        <th>{data?.transactionDateTime}</th>
      </tr>
    );
  };
  return (
    <div>
      {/* <Header /> */}
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img width={20} src="assets/customer-service.png" alt="" />
              Coordinator Details
              <span className="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>
          <div className="row" id="printableArea">
            <div className="col-lg-8 mb-3 mb-lg-0">
              <div className="card">
                <div className="p-3">
                <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              {/* <img width={20} src="assets/customer-service.png" alt="" /> */}
              Team List
              {/* <span className="badge badge-soft-dark radius-50">{count}</span> */}
            </h2>
                  <div className="row justify-content-end">
                 
                    <div className="col-auto">
                      
                      <form>
                        
                        <div className="input-group input-group-merge input-group-custom">
                          <div className="input-group-prepend">
                            
                            <div className="input-group-text">
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </div>
                          </div>
                          <input
                            onChange={handleFilter}
                            id="datatableSearch_"
                            type="search"
                            name="searchValue"
                            className="form-control"
                            placeholder="Search here"
                            aria-label="Search orders"
                            required
                          />
                          <button type="submit" className="btn btn--primary">
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="table-responsive datatable-custom">
                  {/* {ProductListfilter?.length > 0 ? ( */}
                  <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                    <thead className="thead-light thead-50 text-capitalize">
                      <tr>
                        <th>SR NO.</th>
                        <th>TEAM IMAGE</th>
                        <th>TEAM NAME</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>Total Bat User</th>
                        <th>Total Money</th>
                        <th>Match Status Complite</th>
                        {/* <th>PAYMENT MODE</th>
                        <th>STATUS</th>
                        <th>TRANSACTION</th>
                        <th>DATE&TIME</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <img
                            style={{
                              width: "30%",
                              borderRadius: "50%", 
                            }}
                            src="./img/logo/blank-profile-picture.webp"
                          />
                          VS
                          <img
                            style={{ width: "30%",  borderRadius: "50%", }}
                            src="./img/logo/blank-profile-picture.webp"
                          />
                        </td>
                          
                        <td>
                        India VS Pakistan
                        </td>
                        <td>
                          16/Nov/2024
                          </td>

                          <td>
                          10:00 
                          </td>

                            <td>
                          1
                          </td>

                            <td>
                          2000
                          </td>

                            <td>
                          Yes
                          </td>

                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <img
                            style={{
                              width: "30%",
                              borderRadius: "50%", 
                            }}
                            src="./img/logo/blank-profile-picture.webp"
                          />
                          VS
                          <img
                            style={{ width: "30%",  borderRadius: "50%", }}
                            src="./img/logo/blank-profile-picture.webp"
                          />
                        </td>
                          
                        <td>
                        India VS Pakistan
                        </td>
                        <td>
                          16/Nov/2024
                          </td>

                          <td>
                          10:00 
                          </td>

                                 <td>
                          3
                          </td>

                            <td>
                          3000
                          </td>

                            <td>
                          Running
                          </td>

                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <img
                            style={{
                              width: "30%",
                              borderRadius: "50%", 
                            }}
                            src="./img/logo/blank-profile-picture.webp"
                          />
                          VS
                          <img
                            style={{ width: "30%",  borderRadius: "50%", }}
                            src="./img/logo/blank-profile-picture.webp"
                          />
                        </td>
                          
                        <td>
                        India VS Pakistan
                        </td>
                        <td>
                          16/Nov/2024
                          </td>

                          <td>
                          10:00 
                          </td>

                                 <td>
                          10
                          </td>

                            <td>
                          10000
                          </td>

                            <td>
                          Yes
                          </td>

                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <img
                            style={{
                              width: "30%",
                              borderRadius: "50%", 
                            }}
                            src="./img/logo/blank-profile-picture.webp"
                          />
                          VS
                          <img
                            style={{ width: "30%",  borderRadius: "50%", }}
                            src="./img/logo/blank-profile-picture.webp"
                          />
                        </td>
                          
                        <td>
                        India VS Pakistan
                        </td>
                        <td>
                          16/Nov/2024
                          </td>

                          <td>
                          10:00 
                          </td>

                                 <td>
                          5
                          </td>

                            <td>
                          5000
                          </td>

                            <td>
                          Pending
                          </td>

                      </tr>

                      {/* {ProductListfilter?.slice(
                                                    (activePage - 1) * itemsPerPage,
                                                    activePage * itemsPerPage
                                                ).map((data, index) => renderProductData(data, index))} 
                                                */}
                    </tbody>
                  </table>
                  {/* ) : ( */}
                  <div class="text-center p-4">
                    <img
                      class="mb-3 w-160"
                      src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                      alt="Image Description"
                    />
                    <p class="mb-0 order-stats__subtitle">No data found</p>
                  </div>
                  {/* )} */}
                  <div className="d-flex justify-content-center mt-4">
                    {ProductListfilter?.length > itemsPerPage && (
                      <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={ProductListfilter?.length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        itemClass="page-item"
              live           linkClass="page-link"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-4 d-flex align-items-center gap-2">
                    <img
                      src="https://6valley.6amtech.com/public/assets/back-end/img/seller-information.png"
                      alt=""
                    />
                    Coordinator
                  </h4>
                  <div className="media">
                    {/* <div className="mr-3">
                      {customerdata?.profileImageUrl ? (
                         <img
                         className="avatar rounded-circle avatar-70"
                         src={
                           `${process.env.REACT_APP_IMG_URL}` +
                           customerdata?.profileImageUrl
                         }
                         alt="Image"
                       />
                      ) : (
                        <img
                          className="avatar rounded-circle avatar-50"
                          src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
                          alt="Image"
                        />
                       
                      )}
                    </div> */}

                    <div className=" d-flex flex-column gap-1">
                      <span className="title-color hover-c1">
                        <strong className="text-capitalize">
                          Name : {customerdata?.coordinatorName?.slice(0, 10)}
                        </strong>
                      </span>
                      <span className="title-color hover-c1">
                        <strong className="text-capitalize">
                          UniqueName : {customerdata?.uniqueName?.slice(0, 10)}
                        </strong>
                      </span>
                      <span className="title-color hover-c1">
                        <strong className="text-capitalize">
                          Country : {customerdata?.countryName?.slice(0, 10)}
                        </strong>
                      </span>

                      <span className="title-color">
                        <strong>{count}0 </strong>Transaction
                      </span>
                      <span className="title-color">
                        <strong>
                          {customerdata?.coordinatorWallet?.toFixed(2)}{" "}
                        </strong>
                        Balance
                      </span>

                      <span className="title-color text-capitalize">
                        <strong>Email-id</strong> :{" "}
                        {customerdata?.email?.length > 20
                          ? customerdata?.email?.slice(0, 20) + `...`
                          : customerdata?.email}
                      </span>

                      {customerdata?.coordinatorStatus == 0 ? (
                        <label
                          style={{ fontSize: "100%" }}
                          className="text-center badge badge-success"
                        >
                          <strong>Currently</strong> : ACTIVE
                        </label>
                      ) : (
                        <label
                          style={{ fontSize: "100%" }}
                          className="text-center  badge badge-danger"
                        >
                          <strong>Currently</strong> : BLOCKED
                        </label>
                      )}
                    </div>
                    <div className="media-body text-right"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="table-responsive">
                  {userlist?.length > 0 ? (
                    <table
                      id="columnSearchDatatable"
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th className="pl-xl-5">SR NO.</th>

                          <th>USER NAME</th>
                          <th>COUNTRY NAME</th>
                          <th>EMAIL-ID</th>
                          <th>UNIQUENAME</th>
                          <th>CREATE DATE&TIME</th>
                          <th>LAST UPDATE DATE & TIME</th>
                          <th>STATUS</th>
                          <th>ACTIVATE&DEACTIVATE</th>
                          <th className="text-center">ACTION</th>
                          <th className="text-center">CONTROLS</th>
                        </tr>
                      </thead>

                      <tbody>
                        {userlist
                          .slice(
                            (activePage - 1) * itemsPerPage,
                            activePage * itemsPerPage
                          )
                          .map((usersdata, index) =>
                            renderuserData(usersdata, index)
                          )}
                      </tbody>
                    </table>
                  ) : (
                    <div class="text-center p-4">
                      <img
                        class="mb-3 w-160"
                        src="./logo/default.png"
                        alt="Image Description"
                      />
                      <p class="mb-0 order-stats__subtitle">No data found</p>
                    </div>
                  )}

                  <div className="d-flex justify-content-center mt-4">
                    {userlist.length > itemsPerPage && (
                      <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={userlist.length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Coordinator_details;
