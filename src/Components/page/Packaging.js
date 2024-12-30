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
const Packaging = () => {
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

  const [brandlist, setBrandlist] = useState([]);
  const [brandlistdetails, setBrandlistDetails] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [brand_name, setbrand_name] = useState();
  const handleDropdownToggle1 = () => {
    setBrandlistDetails(!brandlistdetails);
  };

  const handleBrandSelection = (selectedBrand) => {
    setbrand_name(selectedBrand);
    setBrandlistDetails(true);
  };

  const filteredBrandList = brandlist.filter((brandItem) =>
    brandItem?.brand?.some((brand) =>
      brand?.toLowerCase().includes(filterText.toLowerCase())
    )
  );

  useEffect(() => {
    getbrand_list();
  }, [0]);

  let getbrand_list = () => {
    let data = {
      categoryId: "65eddc05e73fd3071ed36c10",
    };

    axios
      .post(`http://103.104.74.215:3038/vender/api/brand_list`, data)
      .then((res) => {
        setBrandlist(res?.data?.data);
      })
      .catch((error) => {});
  };

  const renderProductData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr>
        <td>{adjustedIndex}</td>

        <td className="text-center">Via SMS</td>

        <td className="text-center">ERRR474</td>
        <td className="text-center">Jack</td>
        <td className="text-center">01241526374</td>
        <td className="text-center">142</td>
        <td className="text-center">Airtel</td>
        <td className="text-center">Sms</td>
        <td >WEERE7485</td>
        <td >41527485</td>
        <td>
<label class="badge badge-success">Success</label>
</td>
<td >rdd415274</td>
<td className="text-center">REFERANCE OPERATOR</td>
<td className="text-center">Something went wrong</td>
<td className="text-center">101.104.74.1745</td>
<td className="text-center">Port//111.124.51.2461</td>
<td className="text-center">2024-06-20 10:11 PM</td>
<td>
<label class="badge btn-primary">View</label>
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
                LATEST RECHARGE HISTORY
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
                    <h4 className="mb-3 text-capitalize">RECHARGE SUMMARY</h4>
                    <form>
                      <input type="hidden" />

                      <div className="row">
                        <div className="col-md-6 col-xl-6 col-sm-12 col-lg-6 d-flex gap-3">
                          <div className="w-100">
                            <div className="form-group">
                              <label htmlFor="name" className="title-color">
                                Date from to{" "}
                                <span className="text-danger">*</span>{" "}
                              </label>

                              <input type="date" className="form-control" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-6 col-sm-12 col-lg-6 d-flex gap-3">
                          <div className="w-100">
                            <div className="form-group">
                              <label htmlFor="name" className="title-color">
                                Date till <span className="text-danger">*</span>{" "}
                              </label>

                              <input type="date" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <button type="submit" className="btn btn--primary">
                          SEARCH
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
                        RECHARGE HISTORY
                          <span className="badge badge-soft-dark radius-50 fz-12">
                            {count}
                          </span>
                        </h5>
                      </div>
                      <div className="col-md-8 d-flex gap-3 flex-wrap flex-sm-nowrap justify-content-md-end">
                        <div className="form-group ">
                          <select className="form-control" id="itemsPerPage">
                            <option value="10">PDF</option>
                            <option value="25">EXCEL</option>
                            <option value="50">WORD</option>
                          </select>
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
                            <th>SL NO.</th>

                            <th>SOURCE</th>
                            <th>MEMBER ID</th>
                            <th>MEMBER NAME</th>
                            <th>NUMBER CA NUMBER</th>
                            <th>RECHARGE AMOUNT</th>
                            <th>OPERATOR</th>
                            <th>SERVICE TYPE</th>
                            <th>TX ID</th>
                            <th>API TX ID</th>
                            <th>STATUS</th>
                            <th>API ID</th>
                            <th>OPERATOR REFERANCE</th>
                            <th>ERROR MSG</th>
                            <th>IP ADDRESS</th>
                            <th>MAC ADDRESS</th>
                            <th>DATE&TIME</th>
                            <th>RECEIPT</th>
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

export default Packaging;
