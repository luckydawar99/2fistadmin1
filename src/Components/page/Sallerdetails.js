import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const Sallerdetails = () => {
  const [details, setdetails] = useState();

  let sellerid = secureLocalStorage.getItem("sellerid");
  console.log("sallerid current",sellerid)

  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    sellerdetails();
  }, [0]);

  const sellerdetails = () => {
    const sellerdata = {
      sallerId: sellerid,
    };

    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/vendor/getVendorById/${sellerid}`,
        options
      )
      .then((res) => {
        setdetails(res?.data?.data);
      })
      .catch((error) => {});
  };
console.log("details",details)
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
              Vendor details
            </h2>
          </div>
          <div className="page-header border-0 mb-4">
            <div className="js-nav-scroller hs-nav-scroller-horizontal">
              <ul className="nav nav-tabs flex-wrap page-header-tabs">
                <li className="nav-item">
                  <Link className="nav-link active" to="/sallerdetails">
                    Owerview
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/sallerorder">
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

          <div className="card mt-3 mb-5">
            <div className="card-body">
              <div className="d-flex flex-wrap gap-3 justify-content-between">
                <div className="media flex-column flex-sm-row gap-3">
                  {details?.memberImageUrl === null ? (
                    <img
                      className="avatar avatar-170 rounded-10"
                      src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f140b5c50.png"
                      alt="image"
                    />
                  ) : (
                    <img
                      className="avatar avatar-170 rounded-10"
                      src={
                        `${process.env.REACT_APP_IMG_URL}` +
                        details?.memberImageUrl
                      }
                      alt="image"
                    />
                  )}
                  <div className="media-body">
                    <div className="d-block">
                      <h2 className="mb-2 pb-1 text-capitalize">
                        {details?.name}
                      </h2>
                      <div className="d-flex gap-3 flex-wrap mb-3 lh-1">
                        <div className="review-hover position-relative cursor-pointer d-flex gap-2 align-items-center">
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <span>{details?.average_ratings}0</span>
                          <div className="review-details-popup">
                            <h6 className="mb-2">Rating</h6>
                            <div className>
                              <ul className="list-unstyled list-unstyled-py-2 mb-0">
                                <li className="d-flex align-items-center font-size-sm">
                                  <span className="mr-3">5 Star</span>
                                  <div className="progress flex-grow-1">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "0%" }}
                                      aria-valuenow={0}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                  <span className="ml-3">0</span>
                                </li>
                                <li className="d-flex align-items-center font-size-sm">
                                  <span className="mr-3">4 Star</span>
                                  <div className="progress flex-grow-1">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "0%" }}
                                      aria-valuenow={0}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                  <span className="ml-3">0</span>
                                </li>
                                <li className="d-flex align-items-center font-size-sm">
                                  <span className="mr-3">3 Star</span>
                                  <div className="progress flex-grow-1">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "0%" }}
                                      aria-valuenow={0}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                  <span className="ml-3">0</span>
                                </li>
                                <li className="d-flex align-items-center font-size-sm">
                                  <span className="mr-3">2 Star</span>
                                  <div className="progress flex-grow-1">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "0%" }}
                                      aria-valuenow={0}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                  <span className="ml-3">0</span>
                                </li>
                                <li className="d-flex align-items-center font-size-sm">
                                  <span className="mr-3">1 Star</span>
                                  <div className="progress flex-grow-1">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "0%" }}
                                      aria-valuenow={0}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                  <span className="ml-3">0</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <span className="border-left" />
                        <a href="#" className="text-dark">
                          {details?.raters_count}0 Ratings
                        </a>
                        <span className="border-left" />
                        <a href="#" className="text-dark">
                          {details?.view_count}0 Reviews
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-sm-end flex-wrap gap-2 mb-3">
                  <form className="d-inline-block">
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="syfKyDoYJ3mCIdT6gR7YRHkRYnQRfWf2KcUadmlv"
                    />{" "}
                    <input type="hidden" name="id" defaultValue={1} />
                    <input
                      type="hidden"
                      name="status"
                      defaultValue="suspended"
                    />
                    {/* <button type="submit" className="btn btn-danger px-5">
                      Suspend this Vendor
                    </button> */}
                  </form>
                </div>
              </div>

              <hr />
              <div className="d-flex gap-3 flex-wrap flex-lg-nowrap">
                <div className="border p-3 w-170">
                  <div className="d-flex flex-column mb-1">
                    <h5 className="font-weight-normal">Wallet Balance :</h5>
                    <h3 className="text-primary fs-18">
                         
                      {details?.walletBalance?.toFixed(2)}
                    </h3>
                  </div>
                  {/* <div className="d-flex flex-column">
                    <h6 className="font-weight-normal">Total count :</h6>
                    <h3 className="text-primary fs-18">
                      {details?.sales_count}
                    </h3>
                  </div> */}
                </div>
                <div className="row gy-3 flex-grow-1 w-100">
                  <div className="col-sm-6 col-xxl-3">
                    <h4 className="mb-3 text-capitalize">
                      Business information
                    </h4>
                    <div className="pair-list">
                      <div>
                        <span className="key text-nowrap">Business name</span>
                        <span>:</span>
                        <span className="value text-capitalize">
                          {details?.businessName}
                        </span>
                      </div>

                      <div>
                        <span className="key">Phone</span>
                        <span>:</span>
                        <span className="value">{details?.businessMobile}</span>
                      </div>

                      {/* <div>
                        <span className="key">Open Time</span>
                        <span>:</span>
                        <span className="value">
                          {details?.workHours?.map((data) => {
                            return (
                              <div>
                                {data?.day_name}{" "}
                                {data?.open_time ? (
                                  <>{data?.open_time}</>
                                ) : (
                                  <> - CLosed</>
                                )}{" "}
                                {data?.close_time}
                              </div>
                            );
                          })}

                          
                        </span>
                      </div> */}

                      <div>
                        <span className="key">Address</span>
                        <span>:</span>
                        <span className="value text-capitalize">
                          {details?.city} {details?.state} {details?.country}{" "}
                          {details?.businessAddress}
                        </span>
                      </div>
                      <div>
                        <span className="key">Status</span>
                        <span>:</span>
                        <span className="value">
                          {details?.active == true ? (
                            <span className="badge badge-success">Active</span>
                          ) : (
                            <span className="badge badge-danger">Pending</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xxl-3">
                    <h4 className="mb-3 text-capitalize">
                      {details?.active}Vendor information
                    </h4>
                    <div className="pair-list">
                      <div>
                        <span className="key">Name</span>
                        <span>:</span>
                        <span className="value text-capitalize">
                          {details?.name}
                        </span>
                      </div>
                      <div>
                        <span className="key">Email</span>
                        <span>:</span>
                        <span className="value text-capitalize">
                          {details?.email}
                        </span>
                      </div>
                      <div>
                        <span className="key">Phone</span>
                        <span>:</span>
                        <span className="value">{details?.mobileNumber}</span>
                      </div>
                      <div>
                        <span className="key">MemberId</span>
                        <span>:</span>
                        <span className="value">{details?.memberId}</span>
                      </div>

                      <div>
                        <span className="key">Adhar Number</span>
                        <span>:</span>
                        <span className="value">{details?.adharNumber}</span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-xxl-6">
                    <div className="bg-light p-3 border border-primary-light rounded">
                      <h4 className="mb-3 text-capitalize">Bank information</h4>
                      <div className="d-flex gap-5">
                        <div className="pair-list">
                          <div>
                            <span className="key text-nowrap">Bank name</span>
                            <span className="px-2">:</span>
                            <span className="value ">{details?.bank_name}</span>
                          </div>
                          <div>
                            <span className="key text-nowrap">Swift code</span>
                            <span className="px-2"> : </span>
                            <span className="value">{details?.swift_code}</span>
                          </div>
                        </div>
                        <div className="pair-list">
                          <div>
                            <span className="key text-nowrap">Holder name</span>
                            <span className="px-2">:</span>
                            <span className="value">
                              {details?.bankAccount_name}
                            </span>
                          </div>
                          <div>
                            <span className="key text-nowrap">A/C No</span>
                            <span className="px-2">:</span>
                            <span className="value">{details?.acc_number}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-3 mb-5">
            <div className="card-body">
              <div className="row justify-content-between align-items-center g-2 mb-3">
                <div className="col-sm-6">
                  <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
                    <img
                      width={20}
                      className="mb-1"
                      src="assets/bitcoin.png"
                      alt
                    />
                    Vendor Wallet
                  </h4>
                </div>
              </div>
              <div className="row g-2" id="order_stats">
                <div className="col-lg-4">
                  <div className="card h-100 d-flex justify-content-center align-items-center">
                    <div className="card-body d-flex flex-column gap-10 align-items-center justify-content-center">
                      <img
                        width={48}
                        className="mb-2"
                        src="assets/atm.png"
                        alt
                      />
                      <h3 className="for-card-count mb-0 fz-24">$000000</h3>
                      <div className="font-weight-bold text-capitalize mb-20">
                        Withdrawable balance
                      </div>
                      <div className="d-flex  justify-content-center align-items-center  ">
                        <button className="btn btn-danger p-1 pl-3 pr-3  m-1  ">Hold</button>
                        <button className="btn btn-primary p-1 m-1">Release</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="row g-2">
                    <div className="col-md-6">
                      <div className="card card-body h-100 justify-content-center">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <h3 className="mb-1 fz-24">$000000</h3>
                            <div className="text-capitalize mb-0">
                              Pending Withdraw
                            </div>
                          </div>
                          <div>
                            <img
                              width={40}
                              className="mb-2"
                              src="assets/preorder.png"
                              alt
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card card-body h-100 justify-content-center">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <h3 className="mb-1 fz-24">$000000</h3>
                            <div className="text-capitalize mb-0">
                              Total Commission given
                            </div>
                          </div>
                          <div>
                            <img width={40} src="assets/commission.png" alt />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card card-body h-100 justify-content-center">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <h3 className="mb-1 fz-24">$00000</h3>
                            <div className="text-capitalize mb-0">
                              Aready Withdrawn
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
                    <div className="col-md-6">
                      <div className="card card-body h-100 justify-content-center">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <h3 className="mb-1 fz-24">$000000</h3>
                            <div className="text-capitalize mb-0">
                              Total delivery charge earned
                            </div>
                          </div>
                          <div>
                            <img width={40} src="assets/money-bag.png" alt />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card card-body h-100 justify-content-center">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <h3 className="mb-1 fz-24">$000000</h3>
                            <div className="text-capitalize mb-0">
                              Total tax given
                            </div>
                          </div>
                          <div>
                            <img width={40} src="assets/money.png" alt />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card card-body h-100 justify-content-center">
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <h3 className="mb-1 fz-24">$000000</h3>
                            <div className="text-capitalize mb-0">
                              Collected cash
                            </div>
                          </div>
                          <div>
                            <img width={40} src="assets/self-collect.png" alt />
                          </div>
                        </div>
                      </div>
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

export default Sallerdetails;
