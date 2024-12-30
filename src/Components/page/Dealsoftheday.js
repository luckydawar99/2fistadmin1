import React, { useEffect, useState } from "react";
import Header from "../Header";
import "../sidebar.css";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import Pagination from "react-js-pagination";
const Dealsoftheday = () => {
  const [productlist, setproductlist] = useState([]);
  const [ProductListfilter, setProductListfilter] = useState([]);
  const [count, setcount] = useState();
  const [activePage, setActivePage] = useState(1);
  const [brandlist, setBrandlist] = useState([]);
  const [filteredSellerList, setFilteredSellerList] = useState([]);

  const [vendorid, setvendorid] = useState();

  const [commision, setcommision] = useState();
  const [commision1, setcommision1] = useState();

  const handleFilter52 = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const result = brandlist.filter(
      (item) =>
        item.mobileNumber?.toLowerCase().includes(searchTerm) ||
        item.email?.toLowerCase().includes(searchTerm) ||
        item?.businessName?.toLowerCase().includes(searchTerm) ||
        item.name?.toLowerCase().includes(searchTerm)
    );
    setFilteredSellerList(result);
    setActivePage(1);
  };

  useEffect(() => {
    getbrand_list();
  }, [0]);

  let getbrand_list = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/vendor/getList`, options)
      .then((res) => {
        setBrandlist(res?.data?.data);
        setFilteredSellerList(res.data.data);
      })
      .catch((error) => {});
  };
  const itemsPerPage = 10;

  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    getproductlist();
  }, [0]);

  let getproductlist = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/vendor/commission/getAllCommission`,
        options
      )
      .then((res) => {
        setcount(res?.data?.data?.length);
        setproductlist(res.data.data);
      })
      .catch((error) => {});
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = productlist?.filter((item) =>
      item?.vendorName?.toLowerCase().includes(searchTerm)
    );
    setProductListfilter(result);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    setProductListfilter(productlist);
  }, [productlist]);

  const remove = () => {
    setvendorid("");
    setcommision("");
    setcommision1("");
    setvendornamea("");
  };
  const datasubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!vendorid) {
      toast.error("Please select Vendor");
      return;
    }
    formData.append("vendorId", vendorid);
    formData.append("commissionZero", commision);
    formData.append("commissionOne", commision1);

    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/vendor/commission/save`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getproductlist();
      })
      .catch((error) => {});
    setcommision("");
    setcommision1("");
    setvendorid("");
    setvendornamea("");
  };

  const changestatus = (item) => {
    const formData = new FormData();
    formData.append("vendorId", item);

    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/vendor/commission/changeFlatOrPercentForLevelZero`,
        formData,
        options
      )
      .then((res) => {
        getproductlist();
        toast.success(res.data.message);
      })
      .catch((error) => {});
  };

  const changestatus1 = (item) => {
    const formData = new FormData();
    formData.append("vendorId", item);

    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/vendor/commission/changeFlatOrPercentForLevelOne`,
        formData,
        options
      )
      .then((res) => {
        getproductlist();
        toast.success(res.data.message);
      })
      .catch((error) => {});
  };
  const [vendornamea, setvendornamea] = useState("");

  const [status, setstatus] = useState(false);
  const renderProductData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">
          <Link
            style={{ color: "#677788" }}
            to="/sellerdetails"
            onClick={() => {
              secureLocalStorage.setItem("sellerid", data?.vendorId);
            }}
          >
            {data?.vendorId}
          </Link>
        </td>
        <td className="text-center text-capitalize">
          <Link
            style={{ color: "#677788" }}
            to="/sellerdetails"
            onClick={() => {
              secureLocalStorage.setItem("sellerid", data?.vendorId);
            }}
          >
            {data?.vendorName}
          </Link>
        </td>
        <td className="text-center cursor-pointer">
          <div className="form-control d-flex gap-2">0 LEVEL</div>
          <div className="form-control d-flex gap-2">1 LEVEL</div>
        </td>

        <td className="text-center cursor-pointer">
          <div className="form-control d-flex gap-2">
            {data?.commissionZero}
            {data?.checkForZero === false ? (
              <input
                onClick={() => {
                  changestatus(data?.vendorId);
                }}
                className="gap-5"
                type="checkbox"
              />
            ) : (
              <input
                onClick={() => {
                  changestatus(data?.vendorId);
                }}
                value={1}
                defaultChecked
                className="gap-5"
                type="checkbox"
              />
            )}
            Is Flat
          </div>
          <div className="form-control d-flex gap-2">
            {data?.commissionOne}
            {data?.checkForOne === false ? (
              <input
                onClick={() => {
                  changestatus1(data?.vendorId);
                }}
                className="gap-5"
                type="checkbox"
              />
            ) : (
              <input
                onClick={() => {
                  changestatus1(data?.vendorId);
                }}
                value={1}
                defaultChecked
                className="gap-5"
                type="checkbox"
              />
            )}
            Is Flat
          </div>
        </td>
        <td className="text-center">2024-05-12 11:14 PM</td>
        <td className="text-center">2024-04-11 09:10 AM</td>
      </tr>
    );
  };

  return (
    <div>
      {/* <Header /> */}
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-3">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img width={20} src="assets/commission.png" alt="" />
              VENDOR SPONSOR COMMISSION
              <span class="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-3">ADD VENDOR SPONSOR COMMISSION</h4>
                  <form onSubmit={datasubmit}>
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="YFPrIbFYlUsgcs6Ht4EEyCysWGBq8lmpLaBUW0q6"
                    />{" "}
                    <div className="row">
                      <div className="col-md-6 col-lg-6 col-xl-6">
                        <div className="col-md-12 col-lg-12 col-xl-12 mb-8 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="name" className="title-color">
                              SELECT VENDOR{" "}
                              <span className="text-danger">*</span> &nbsp;{" "}
                              {vendornamea}
                            </label>

                            <div className="" name="sub_category_id">
                              <p
                                className="form-control text-capitalize"
                                onClick={() => {
                                  setstatus(true);
                                }}
                              >
                                Search&select
                              </p>
                              {status === true ? (
                                <div
                                  className=""
                                  style={{
                                    overflow: "scroll",
                                    height: "160px",
                                    scrollbarWidth: "none",
                                    backgroundColor: "rgb(255, 254, 253)",
                                  }}
                                >
                                  <input
                                    placeholder="Search here..."
                                    style={{ width: "" }}
                                    type="text"
                                    id="categoryFilter"
                                    className="form-control"
                                    onChange={handleFilter52}
                                  />
                                  {filteredSellerList?.length === 0 ? (
                                    <li className="form-control"> No data</li>
                                  ) : (
                                    filteredSellerList?.map((brandItem) => {
                                      return (
                                        <>
                                          <li
                                            onClick={() => {
                                              setvendorid(brandItem?.vendorId);
                                              setstatus(false);
                                              setvendornamea(
                                                brandItem?.businessName,
                                                brandItem?.name
                                              );
                                            }}
                                            className="form-control text-capitalize"
                                            style={{ cursor: "pointer" }}
                                          >
                                            {brandItem?.businessName} (
                                            {brandItem?.name} {brandItem?.vendorId})
                                          </li>
                                        </>
                                      );
                                    })
                                  )}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 form-group">
                          <label
                            htmlFor="name"
                            className="title-color text-capitalize"
                          >
                            0 LEVEL COMMISION{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            required
                            value={commision}
                            onChange={(e) => {
                              setcommision(e.target.value);
                            }}
                            type="number"
                            name="title"
                            className="form-control"
                            id="title"
                            placeholder="COMMISION"
                          />
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 form-group">
                          <label
                            htmlFor="name"
                            className="title-color text-capitalize"
                          >
                            1 LEVEL COMMISION{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            required
                            value={commision1}
                            onChange={(e) => {
                              setcommision1(e.target.value);
                            }}
                            type="number"
                            name="title"
                            className="form-control"
                            id="title"
                            placeholder="COMMISION"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end flex-wrap gap-10">
                      <button
                        onClick={remove}
                        type="reset"
                        className="btn btn-secondary px-4"
                      >
                        Reset
                      </button>
                      <button type="submit" className="btn btn--primary px-4">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-20 mb-5">
            <div className="col-md-12">
              <div className="card">
                <div className="px-3 py-4">
                  <div className="row align-items-center">
                    <div className="col-lg-4">
                      <form action="#" method="GET">
                        <div className="input-group input-group-merge input-group-custom">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </div>
                          </div>
                          <input
                            type="search"
                            name="search"
                            className="form-control"
                            placeholder="Search by vendorid & commission"
                            onChange={handleFilter}
                          />
                          <button type="submit" className="btn btn--primary">
                            Search
                          </button>
                        </div>
                      </form>
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
                          <th className="text-center">SR NO.</th>
                          <th className="text-center">VENDORID</th>
                          <th className="text-center">VENDOR NAME</th>
                          <th className="text-center">LEVEL</th>
                          <th className="text-center">COMMISSION</th>
                          <th className="text-center">ADD DATE&TIME </th>
                          <th className="text-center">LAST UPDATE DATE&TIME</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ProductListfilter.slice(
                          (activePage - 1) * itemsPerPage,
                          activePage * itemsPerPage
                        ).map((productlist, index) =>
                          renderProductData(productlist, index)
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
                      <p class="mb-0 order-stats__subtitle">No data found</p>
                    </div>
                  )}
                  <div className="d-flex justify-content-center mt-4">
                    {ProductListfilter.length > itemsPerPage && (
                      <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={ProductListfilter.length}
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
  );
};

export default Dealsoftheday;
