import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import Pagination from "react-js-pagination";

const Earningstatement = () => {
  const [membertype, setmembertype] = useState();
  const [descriptions, setdescriptions] = useState();

  const [admincharges, setadmincharges] = useState();

  let token = secureLocalStorage.getItem("adminidtoken");
  const chagresdata = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", membertype);
    formData.append("amount", admincharges);
    formData.append("description", descriptions);
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}cashback/advertisement/save`,
        formData,
        options
      )
      .then((response) => {
        getBannerlist();
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error("You Entered Envlid Inoformation");
        }
      });
    setmembertype("");
    setadmincharges("");
    setdescriptions("");
  };

  const [bannerlist, setBannerlist] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [status, setstatus] = useState(false);

  const [idd, setidd] = useState();
  const [tpes, settypes] = useState();
  const [amount, setamount] = useState();
  const [descr, setdescr] = useState();

  let updatecharges = (e) => {
    e.preventDefault();

    const formData = {
      id: idd,
      type: tpes,
      description: descr,
      amount: amount,
    };
    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_API_KEY}cashback/advertisement/update`,
        formData,
        options
      )
      .then((response) => {
        setstatus(false);
        getBannerlist();
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
              `${process.env.REACT_APP_API_KEY}cashback/advertisement/deleteById/${item}`,
              options
            )
            .then((res) => {
              getBannerlist();
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

  useEffect(() => {
    getBannerlist();
  }, [0]);

  let getBannerlist = () => {
    let options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_API_KEY}cashback/advertisement/getAll`,
        options
      )
      .then((res) => {
        setBannerlist(res.data.data);
      })
      .catch((error) => {});
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const activedeactive = (item) => {
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}cashback/advertisement/changeStatus/${item}`,
        {},

        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getBannerlist();
      })
      .catch((error) => {});
  };
  const renderBannerData = (bannerdata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr id={`data-${index}`}>
        <td>{adjustedIndex}</td>
        <td>{bannerdata?.type}</td>

        <td>{bannerdata?.amount}</td>
        <td>{bannerdata?.description}</td>

        {bannerdata?.status != true ? (
          <td className="text-center">
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher mx-auto">
                <input
                  type="checkbox"
                  className="switcher_input"
                  name="status"
                  onChange={() => activedeactive(bannerdata?.id)}
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
                  onChange={() => activedeactive(bannerdata?.id)}
                />
                <span className="switcher_control" />
              </label>
            </form>
          </td>
        )}
        <td>
          <div className="d-flex gap-10 justify-content-center">
            <a
              href="#"
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                setidd(bannerdata?.id);
                settypes(bannerdata?.type);
                setamount(bannerdata?.amount);
                setdescr(bannerdata?.description);
                setstatus(true);
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </a>
            <a
              onClick={() => {
                deletebanner(bannerdata?.id);
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
      {/* <Header /> */}
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img width={20} src="assets/admin.png" alt="" />
              TEXT BANNER DETAILS{" "}
              <span className="badge badge-soft-dark radius-50">
                {bannerlist?.length}
              </span>
            </h2>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              {status === true ? (
                <form onSubmit={updatecharges}>
                  <input type="hidden" name="_token" autoComplete="off" />{" "}
                  <div className="card">
                    <div className="card-body">
                      <h5 className="mb-0 page-header-title d-flex align-items-center gap-2 border-bottom pb-3 mb-3">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        UPDATE BANNER DETAILS
                      </h5>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label
                              className="title-color d-flex"
                              htmlFor="f_name"
                            >
                              SELECT TYPE&nbsp;
                              <span class="text-danger">*</span>
                            </label>
                            <select
                              onChange={(e) => {
                                settypes(e.target.value);
                              }}
                              type="text"
                              value={tpes}
                              name="f_name"
                              className="form-control"
                              placeholder="First Name"
                            >
                              <option value="" selected>
                                SELECT TYPE
                              </option>
                              <option value="FLAT">FLAT</option>
                              <option value="PERCENT">PERCENT</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label
                              className="title-color d-flex"
                              htmlFor="exampleFormControlInput1"
                            >
                              AMOUNT&nbsp;
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              value={amount}
                              onChange={(e) => {
                                setamount(e.target.value);
                              }}
                              type="number"
                              name="l_name"
                              className="form-control"
                              placeholder="ENTER AMOUNT"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label
                              className="title-color d-flex"
                              htmlFor="exampleFormControlInput1"
                            >
                              DESCRIPTION&nbsp;
                              <span class="text-danger">*</span>
                            </label>

                            <input
                              value={descr}
                              onChange={(e) => {
                                setdescr(e.target.value);
                              }}
                              type="text"
                              name="phone"
                              className="form-control"
                              placeholder="ENTER DESCRIPTION"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex gap-3 justify-content-end">
                        <button type="submit" className="btn btn--primary px-4">
                          Update
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
                      ADD BANNER DETAILS
                    </h5>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            className="title-color d-flex"
                            htmlFor="f_name"
                          >
                            SELECT TYPE&nbsp;<span class="text-danger">*</span>
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
                              SELECT TYPE
                            </option>
                            <option value="FLAT">FLAT</option>
                            <option value="PERCENT">PERCENT</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            className="title-color d-flex"
                            htmlFor="exampleFormControlInput1"
                          >
                            AMOUNT&nbsp;
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            value={admincharges}
                            onChange={(e) => {
                              setadmincharges(e.target.value);
                            }}
                            type="number"
                            name="l_name"
                            className="form-control"
                            placeholder="ENTER AMOUNT"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label
                            className="title-color d-flex"
                            htmlFor="exampleFormControlInput1"
                          >
                            DESCRIPTION&nbsp;<span class="text-danger">*</span>
                          </label>

                          <input
                            value={descriptions}
                            onChange={(e) => {
                              setdescriptions(e.target.value);
                            }}
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="ENTER DESCRIPTION"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-3 justify-content-end">
                      <button type="submit" className="btn btn--primary px-4">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="px-3 py-4">
                  <div className="table-responsive">
                    {bannerlist?.length > 0 ? (
                      <table
                        id="columnSearchDatatable"
                        style={{ textAlign: "left" }}
                        className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                      >
                        <thead className="thead-light thead-50 text-capitalize">
                          <tr>
                            <th className="pl-xl-5">SR NO.</th>
                            <th>TYPE</th>
                            <th>AMOUNT</th>
                            <th>DESCRIPTION</th>
                            <th>STATUS</th>

                            <th className="text-center">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {bannerlist
                            .slice(
                              (activePage - 1) * itemsPerPage,
                              activePage * itemsPerPage
                            )
                            .map((bannerdata, index) =>
                              renderBannerData(bannerdata, index)
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
                      {bannerlist.length > itemsPerPage && (
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={itemsPerPage}
                          totalItemsCount={bannerlist.length}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earningstatement;
