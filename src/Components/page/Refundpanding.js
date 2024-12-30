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
const Refundpanding = () => {
  const [membertype, setmembertype] = useState();
  const [startr, setstartr] = useState();
  const [endr, setendr] = useState();
  const [subchar, setsubchar] = useState();

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const [productlist, setproductlist] = useState([]);
  const [count, setcount] = useState();
  const [ProductListfilter, setProductListfilter] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [status, setstatus] = useState(false);
  const itemsPerPage = 10;
  let token = secureLocalStorage.getItem("adminidtoken");
  let shopid = secureLocalStorage.getItem("shopidofvendor");

  const chagresdata = (e) => {
    e.preventDefault();
    const formData = {
      type: membertype,
      startRange: startr,
      endRange: endr,
      subCharge: subchar,
      isFlat: isChecked,
    };
    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/payoutSubcharge/save`,
        formData,
        options
      )
      .then((response) => {
        getproductlist();
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Some issue is getting please try again later");
        }
      });
    setmembertype("");
    setstartr("");
    setendr("");
    setsubchar("");
    setIsChecked("");
  };

  const [idd, setidd] = useState();
  const [startrange, setstartrange] = useState();
  const [endrange, setendrange] = useState();
  const [surcharge, setsurcharge] = useState();
  const [flat, setflat] = useState();

  const handleCheckboxChange1 = (event) => {
    setflat(event.target.checked);
  };
  const handleCheckboxChange2 = (event) => {
    setflat(event.target.checked);
  };
  const [type, settype] = useState();

  let updatecharges = (e) => {
    e.preventDefault();
    const formData = {
      id: idd,
      startRange: startrange,
      endRange: endrange,
      subCharge: surcharge,
      isFlat: flat,
      type: type,
    };

    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/payoutSubcharge/update`,
        formData,
        options
      )
      .then((response) => {
        setstatus(false);
        getproductlist();
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error("You Entered Envlid Inoformation");
        }
      });
  };

  const resetdata = () => {
    setmembertype("");
    setstartr("");
    setendr("");
    setsubchar("");
    setIsChecked("");
  };
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
        `${process.env.REACT_APP_API_KEY}admin/payoutSubcharge/getAll`,
        options
      )

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

  let deletebanner = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
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
              `${process.env.REACT_APP_API_KEY}admin/payoutSubcharge/delete/${item}`,
              options
            )
            .then((res) => {
              getproductlist();
            })
            .catch((error) => {});
        };
        deletebannerimage();
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };
  const renderProductData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr>
        <td className="text-center">{adjustedIndex}</td>

        <td className="text-center">{data?.type}</td>
        <td className="text-center">{data?.startRange}</td>
        <td className="text-center">{data?.endRange}</td>
        <td className="text-center">{data?.subCharge}</td>
        <td className="text-center">
          {data?.isFlat === true ? <>YES</> : <>NO</>}
        </td>

        <td>
          <div className="d-flex gap-10 justify-content-center">
            <a
              href="#"
              onClick={() => {
                setidd(data?.id);
                setstartrange(data?.startRange);
                setendrange(data?.endRange);

                setsurcharge(data?.subCharge);
                setflat(data?.flat.toString());

                settype(data?.type);
                setstatus(true);
              }}
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </a>
            <a
              onClick={() => {
                deletebanner(data?.id);
              }}
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
              id={index + 1}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </a>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Toaster />
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
                  src="assets/bills.png"
                  className="mb-1 mr-1"
                  alt
                />
                <span className="page-header-title">
                  PAYOUT SURCHARGE SETTING
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
                    {status === true ? (
                      <form onSubmit={updatecharges}>
                        <input type="hidden" name="_token" autoComplete="off" />{" "}
                        <div className="card mb-3">
                          <div className="card-body">
                            <h5 className="mb-0 page-header-title d-flex align-items-center gap-2 border-bottom pb-3 mb-3">
                              <i class="fa fa-user" aria-hidden="true"></i>
                             UPDATE CHARGES DETAILS
                            </h5>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    className="title-color"
                                    htmlFor="exampleFormControlInput1"
                                  >
                                    SELECT TYPE
                                    <span className="text-danger">*</span>
                                  </label>

                                  <select
                                    onChange={(e) => {
                                      settype(e.target.value);
                                    }}
                                    type="text"
                                    value={type}
                                    name="f_name"
                                    className="form-control"
                                    placeholder="First Name"
                                    required
                                  >
                                    <option value="" selected>
                                      SELECT MEMBER TYPE
                                    </option>
                                    <option value="MEMBER">MEMBER</option>
                                    <option value="VENDOR">VENDOR</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    className="title-color"
                                    htmlFor="exampleFormControlInput1"
                                  >
                                    START RANGE
                                    <span className="text-danger">*</span>
                                  </label>

                                  <input
                                    value={startrange}
                                    onChange={(e) => {
                                      setstartrange(e.target.value);
                                    }}
                                    type="number"
                                    name="l_name"
                                    className="form-control"
                                    placeholder="START RANGE"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    className="title-color d-flex"
                                    htmlFor="exampleFormControlInput1"
                                  >
                                    END RANGE&nbsp;
                                    <span class="text-danger">*</span>
                                  </label>
                                  <input
                                    value={endrange}
                                    onChange={(e) => {
                                      setendrange(e.target.value);
                                    }}
                                    type="number"
                                    name="l_name"
                                    className="form-control"
                                    placeholder="END RANGE"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label
                                    className="title-color d-flex"
                                    htmlFor="exampleFormControlInput1"
                                  >
                                    SURCHARGE&nbsp;
                                    <span class="text-danger">*</span>
                                  </label>
                                  <input
                                    value={surcharge}
                                    onChange={(e) => {
                                      setsurcharge(e.target.value);
                                    }}
                                    type="number"
                                    name="l_name"
                                    className="form-control"
                                    placeholder="SURCHARGE"
                                    required
                                  />
                                </div>
                              </div>

                              {flat === "true" ? (
                                <div className="col-md-6">
                                  <div className="w-100">
                                    <div className="form-group d-flex gap-2">
                                      <input
                                        type="checkbox"
                                        name="modules[]"
                                        className=""
                                        id="dashboard"
                                        checked={flat}
                                        onChange={handleCheckboxChange1}
                                      />
                                      <label
                                        className="title-color mb-0"
                                        for="dashboard"
                                      >
                                        FLAT CHECK BOX
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="col-md-6">
                                  <div className="w-100">
                                    <div className="form-group d-flex gap-2">
                                      <input
                                        type="checkbox"
                                        name="modules[]"
                                        className=""
                                        id="dashboard"
                                        // checked={flat}

                                        onChange={handleCheckboxChange2}
                                      />
                                      <label
                                        className="title-color mb-0"
                                        for="dashboard"
                                      >
                                        FLAT CHECK BOX
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="d-flex gap-3 justify-content-end">
                              <button
                                type="submit"
                                className="btn btn--primary px-4"
                              >
                                UPDATE
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : null}
                    <form onSubmit={chagresdata}>
                      <input type="hidden" name="_token" autoComplete="off" />{" "}
                      <div className="card">
                        <div className="card-body">
                          <h5 className="mb-0 page-header-title d-flex align-items-center gap-2 border-bottom pb-3 mb-3">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            CHARGES DETAILS
                          </h5>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  className="title-color"
                                  htmlFor="exampleFormControlInput1"
                                >
                                  SELECT TYPE
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  onChange={(e) => {
                                    setmembertype(e.target.value);
                                  }}
                                  type="text"
                                  value={membertype}
                                  name="f_name"
                                  className="form-control"
                                  placeholder="First Name"
                                  required
                                >
                                  <option value="" selected>
                                    SELECT MEMBER TYPE
                                  </option>
                                  <option value="MEMBER">MEMBER</option>
                                  <option value="VENDOR">VENDOR</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  className="title-color"
                                  htmlFor="exampleFormControlInput1"
                                >
                                  START RANGE
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  value={startr}
                                  onChange={(e) => {
                                    setstartr(e.target.value);
                                  }}
                                  type="number"
                                  name="l_name"
                                  className="form-control"
                                  placeholder="START RANGE"
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  className="title-color d-flex"
                                  htmlFor="exampleFormControlInput1"
                                >
                                  END RANGE&nbsp;
                                  <span class="text-danger">*</span>
                                </label>
                                <input
                                  value={endr}
                                  onChange={(e) => {
                                    setendr(e.target.value);
                                  }}
                                  type="number"
                                  name="l_name"
                                  className="form-control"
                                  placeholder="END RANGE"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  className="title-color d-flex"
                                  htmlFor="exampleFormControlInput1"
                                >
                                  SURCHARGE&nbsp;
                                  <span class="text-danger">*</span>
                                </label>
                                <input
                                  value={subchar}
                                  onChange={(e) => {
                                    setsubchar(e.target.value);
                                  }}
                                  type="number"
                                  name="l_name"
                                  className="form-control"
                                  placeholder="SURCHARGE"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="w-100">
                                <div className="form-group d-flex gap-2">
                                  <input
                                    type="checkbox"
                                    name="modules[]"
                                    value="dashboard"
                                    className=""
                                    id="dashboard"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                  />
                                  <label
                                    className="title-color mb-0"
                                    for="dashboard"
                                  >
                                    FLAT CHECK BOX
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex flex-wrap gap-2 justify-content-end">
                            <div
                              onClick={resetdata}
                              class="btn btn-secondary px-5"
                            >
                              RESET
                            </div>

                            <button type="submit" className="btn btn--primary">
                              ADD
                            </button>
                          </div>
                        </div>
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
                          PAYOUT SURCHARGE
                          <span className="badge badge-soft-dark radius-50 fz-12">
                            {count}
                          </span>
                        </h5>
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
                            <th>TYPE</th>
                            <th>START RANGE</th>
                            <th>END RANGE</th>
                            <th>SURCHARGE</th>
                            <th>IS FLAT</th>

                            <th className="text-center">ACTION</th>
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

export default Refundpanding;
