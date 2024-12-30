import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const Sallerorder = () => {
  const [details, setdetails] = useState();

  const [count, setcount] = useState();

  let sellerid = secureLocalStorage.getItem("selleridgenrate");

  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    sellerdetails();
  }, [0]);

  const sellerdetails = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}vendor/transaction-history/get?vendorGenId=${sellerid}`,
        options
      )

      .then((res) => {

        setcount(res?.data?.data?.length);
        setdetails(res.data.data);
      })
      .catch((error) => {});
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
              <img width={20} src="assets/officer.png" alt />
              Vendor Details
            </h2>
          </div>
          <div className="flex-between d-sm-flex row align-items-center justify-content-between mb-2 mx-1">
            <div></div>
          </div>
          <div className="page-header">
            <div className="js-nav-scroller hs-nav-scroller-horizontal">
              <ul className="nav nav-tabs flex-wrap page-header-tabs">
                <li className="nav-item">
                  <Link className="nav-link " to="/sallerdetails">
                    Owerview
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/sallerorder">
                    Transaction
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sallerproducts">
                    Data
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sallersatting">
                    Setting
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/sallertransacation">
                    Transaction
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sallerreview">
                    Review
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content mb-3">
            <div
              className="tab-pane fade show active"
              style={{ backgroundColor: "white" }}
              id="order"
            >
              <div className="row pt-2">
                <div className="col-md-12">
                  <div className="card w-100">
                    <div className="card-header">
                      <h5 className="mb-0">
                        <div className="d-flex justify-content-end">
                          <button type="submit" className="btn btn--primary">
                            Avilable Amount {details?.walletBalance?.toFixed(2)}
                          </button>
                        </div>
                        <span class="badge badge-soft-dark radius-50 fz-12">
                          {count}
                        </span>
                      </h5>
                    </div>

                    <div
                      className="table-responsive datatable-custom"
                      style={{
                        overflow: "scroll",
                        scrollbarWidth: "none",
                        height: "250px",
                      }}
                    >
                      {details?.vendorTransactionWrapper?.length > 0 ? (
                        <table
                          id="datatable"
                          style={{ textAlign: "left" }}
                          className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                        >
                          <thead className="thead-light thead-50 text-capitalize">
                            <tr>
                              <th>SL</th>
                              <th>TRANSACTION ID</th>
                              <th className="text-center">DATE</th>
                              <th>VENDOR NAME</th>
                              <th>USER NAME</th>
                              <th>PAYMENT MODE</th>
                              <th>PAYMENT STATUS</th>
                              <th>TYPE</th>
                              <th>BILL AMOUNT</th>
                              <th>RECEIVED BALANCE</th>
                              <th>ADMIN CHARGE</th>
                            </tr>
                          </thead>
                          <tbody id="set-rows">
                            {details?.vendorTransactionWrapper?.map(
                              (listoforder, index) => {
                                return (
                                  <tr className="status class-all">
                                    <td>{index + 1}</td>
                                    <td className="text-center">
                                      <a
                                        href="#"
                                        className="title-color hover-c1"
                                      >
                                        {listoforder?.transactionId}
                                      </a>
                                    </td>
                                    <td>{listoforder?.dateTime}</td>
                                    <td className="text-center text-capitalize">
                                      {listoforder?.vendorName}
                                    </td>
                                    <td className="text-center text-capitalize">
                                      {listoforder?.userName}
                                    </td>
                                    <td className="text-center">
                                      {listoforder?.paymentMode}
                                    </td>
                                    <td className="text-center">
                                      {listoforder?.transactionStatus}
                                    </td>
                                    <td className="text-center">
                                      {listoforder?.transactionType}
                                    </td>
                                    <td className="text-center">
                                      {listoforder?.billedAmount}
                                    </td>
                                    <td className="text-center">
                                      {listoforder?.amount}
                                    </td>

                                    <td className="text-center">
                                      {listoforder?.adminReceived}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      ) : (
                        <div class="text-center p-4">
                          <img
                            class="mb-3 w-160"
                            src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                            alt="Image Description"
                          />
                          <p class="mb-0 order-stats__subtitle">
                            No data found
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="table-responsive mt-4">
                      <div className="px-4 d-flex justify-content-lg-end"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sallerorder;
