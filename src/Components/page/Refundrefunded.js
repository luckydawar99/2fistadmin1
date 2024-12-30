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
const Refundrefunded = () => {
  const [productlist, setproductlist] = useState([]);
  const [count, setcount] = useState();
  const [ProductListfilter, setProductListfilter] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  let token = secureLocalStorage.getItem("vendortoken");
  let shopid = secureLocalStorage.getItem("shopidofvendor");

  useEffect(() => {
    getproductlist();
  }, [0]);
  let getproductlist = () => {
    const data = {
      status: "0",
    };
    const options = {
      headers: {
        token: token,
      },
    };
    axios
      .post(`http://103.104.74.215:3038/admin/api/orderList`, data, options)
      .then((res) => {
        setcount(res?.data?.data?.length);
        setproductlist(res?.data?.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    setProductListfilter(productlist);
  }, [productlist]);
  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = productlist.filter((item) =>
      item?.product_name?.toLowerCase().includes(searchTerm)
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
        
        <td ><input
                                type="checkbox"
                                name="modules[]"
                                value="dashboard"
                                class="module-permission"
                                id="dashboard"
                              /></td>
                              <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">
          ERR484
        </td>
        <td className="text-center">
          Yes Bank 
        </td>
        <td className="text-center">
         74857474474 
        </td>
        <td className="text-center">
         474 
        </td>
        <td className="text-center">
         474wer747
        </td>
        <td className="text-center">
         This is convey of details
        </td>

        <td>
          
            
              Dangler earrings elegantly            
            
          
        </td>
        <td className="text-center">
        <label className="badge badge-soft-- btn btn-success">ACTIVE</label>
        </td>
        <td className="text-center">
         4150
        </td>
        <td className="text-center">
         50
        </td>
        <td className="text-center">
        2024-05-10 03:45 PM
        </td>
        <td className="text-center">
        <button className="btn btn-primary">VIEW</button>
        </td>
        
        <td className="text-center">
          <div className="d-inline-flex flex-column gap-1">
            <span className="badge badge-soft-- btn btn-primary">CHECKED</span>
          </div>
        </td>
       
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
            <div className="d-flex flex-wrap gap-2 align-items-center mb-3 mt-3 pl-2">
              <h2 className="h1 mb-0">
                <img
                  width={20}
                  src="assets/bills.png" className="mb-1 mr-1"
                  alt
                />
                <span className="page-header-title">
                  PAYOUT TRANSACTION HISTORY
                </span>
              </h2>
              <span className="badge badge-soft-dark radius-50 fz-14">
                {count}
              </span>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h4 className="mb-3 text-capitalize">
                      TRANSACTION DETAILS
                    </h4>
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
                                START DATE
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
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
                                END DATE
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
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
                                SELECT
                                <span className="text-danger">*</span>
                              </label>
                              <select className="form-control">
                                {" "}
                                <option value="" disabled>
                                  SELECT
                                </option>
                                <option value="ACCEPTED">ACCEPTED</option>
                                <option value="FAILED">FAILED</option>
                                <option value="SUCCESS">SUCCESS</option>
                                <option value="REFUND">REFUND</option>
                                <option value="ON HOLD">ON HOLD</option>
                                <option value="PENDING">PENDING</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <button type="submit" className="btn btn--primary">
                          FILTER
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-20 mb-3">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-4 light-bg">
                    <div className="row g-2 align-items-center flex-grow-1">
                      <div className="col-md-4">
                        <h5 className="text-capitalize d-flex gap-1">
                          PAYOUT TRANSACTION HISTORY
                          <span className="badge badge-soft-dark radius-50 fz-12">
                            {count}
                          </span>
                        </h5>
                      </div>
                      <div className="col-md-8 d-flex gap-3 flex-wrap flex-sm-nowrap justify-content-md-end">
                        <form>
                          <div className="input-group input-group-merge input-group-custom">
                            <input
                              id="datatableSearch_"
                              onChange={handleFilter}
                              type="search"
                              name="search"
                              className="form-control"
                              placeholder="Search by product name"
                              aria-label="Search orders"
                              required
                            />
                            <button type="submit" className="btn btn--primary">
                              Search
                            </button>
                          </div>
                        </form>
                        <div className="form-group ">
                          <select className="form-control" id="itemsPerPage">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="1000">1000</option>
                          </select>
                        </div>

                        <div className="form-group ">
                          <select className="form-control" id="itemsPerPage">
                            <option value="10">PDF</option>
                            <option value="25">EXCEL</option>
                            <option value="50">WORD</option>
                          </select>
                        </div>
                        <div className="dropdown">
                          <ul className="dropdown-menu dropdown-menu-right">
                            <li>
                              <a
                                className="dropdown-item"
                                href="https://6valley.6amtech.com/seller/orders/export-order-data/all?date_type=this_year"
                              >
                                <img
                                  width={14}
                                  src="https://6valley.6amtech.com/public/assets/back-end/img/excel.png"
                                  alt
                                />
                                Excel
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    {ProductListfilter?.length > 0 ? (
                      <table
                        style={{ textAlign: "left" }}
                        className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                      >
                        <thead className="thead-light thead-50 text-capitalize">
                          <tr>
                            <th>CHECK BOX</th>
                            <th>SL NO.</th>
                            <th>MEMBER ID</th>
                            <th>BANK DETAILS</th>
                            <th>TRANSACTION ID</th>
                            <th>RRN NO</th>
                            <th>API ID</th>
                            <th>NARRATION</th>
                            <th>MSG</th>
                            <th>STATUS</th>
                            <th>NET AMOUNT</th>
                            <th>API CHARGE AMT</th>
                            <th>DATE&TIME</th>
                            <th>VIEW RECEIPT</th>
                            <th>CHECK STATUS TAB</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                          {ProductListfilter.slice(
                            (activePage - 1) * itemsPerPage,
                            activePage * itemsPerPage
                          ).map((data, index) =>
                            renderProductData(data, index)
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
                          No details found
                        </p>
                      </div>
                    )}
                    <div className="d-flex justify-content-center mt-4">
                      {ProductListfilter?.length > itemsPerPage && (
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={itemsPerPage}
                          totalItemsCount={ProductListfilter?.length}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      )}
                    </div>
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
  );
};

export default Refundrefunded;
