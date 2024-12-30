import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";

import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import Pagination from "react-js-pagination";
import QRCode from "react-qr-code";
const Refundapproved = () => {
  const [count, setcount] = useState();
  let token = secureLocalStorage.getItem("vendortoken");
  let shopid = secureLocalStorage.getItem("shopidofvendor");

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
            <div className="d-flex flex-wrap gap-2 align-items-center mb-3 mt-3 pl-2">
              <h2 className="h1 mb-0">
                <img
                  width={20}
                  src="assets/bills.png" className="mb-1 mr-1"
                  alt
                />
                <span className="page-header-title">PAYOUT SETTING</span>
              </h2>
              <span className="badge badge-soft-dark radius-50 fz-14">
                {count}
              </span>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form>
                      <input type="hidden" />

                      <div className="row">
                        <div className="col-md-6 col-xl-6 col-sm-12 col-lg-6 d-flex gap-3">
                          <div className="w-100">
                            <div className="form-group">
                              <label
                                className="title-color"
                                htmlFor="exampleFormControlInput1"
                              >
                                API ID
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="API ID"
                                className="form-control"
                              ></input>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-6 col-sm-12 col-lg-6 d-flex gap-3">
                          <div className="w-100">
                            <div className="form-group">
                              <label
                                className="title-color"
                                htmlFor="exampleFormControlInput1"
                              >
                                PIN
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="PIN"
                                className="form-control"
                              ></input>
                            </div>
                          </div>
                        </div>
                        
                      </div>

                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        

                        <button type="submit" className="btn btn--primary">
                          Submit
                        </button>
                      </div>
                    </form>
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

export default Refundapproved;
