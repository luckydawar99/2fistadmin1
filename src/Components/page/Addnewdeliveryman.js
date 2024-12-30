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
import ReactPlayer from "react-player";

const Addnewdeliveryman = () => {
  const [membertype, setmembertype] = useState();
  const [pantds, setpantds] = useState();
  const [withouttds, setwithouttds] = useState();
  const [admincharges, setadmincharges] = useState();
  const [othercharges, setothercharges] = useState();
  let token = secureLocalStorage.getItem("adminidtoken");
  const chagresdata = (e) => {
    e.preventDefault();
    const formData = {
      memberType: membertype,
      panTds: pantds,
      withOutPanTds: withouttds,
      adminCharge: admincharges,
      otherCharge: othercharges,
    };
    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/charges/add`,
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
    setpantds("");
    setwithouttds("");
    setadmincharges("");
    setothercharges("");
  };

  const [bannerlist, setBannerlist] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [status, setstatus] = useState(false);

  const [idd, setidd] = useState();
  const [tpes, settypes] = useState();
  const [patds, setpatds] = useState();
  const [withou, setwithou] = useState();
  const [admncharge, setadmncharge] = useState();
  const [otheschar, setotheschar] = useState();
  let updatecharges = (e) => {
    e.preventDefault();
    const formData = {
      id: idd,
      memberType: tpes,
      panTds: patds,
      withOutPanTds: withou,
      adminCharge: admncharge,
      otherCharge: otheschar,
    };
    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/charges/updateCharge`,
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
      text: "Once deleted, you will not be able to recover this banner file!",
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
              getBannerlist();
            })
            .catch((error) => {});
        };
        deletebannerimage();
        swal("Poof! Your banner file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your banner is safe!");
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
      .get(
        `${process.env.REACT_APP_API_KEY}admin/charges/getAllCharges`,
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

  const renderBannerData = (bannerdata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr id={`data-${index}`}>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">{bannerdata?.panTds}</td>
        <td className="text-center">{bannerdata?.withOutPanTds}</td>
        <td className="text-center">{bannerdata?.adminCharge}</td>
        <td className="text-center">{bannerdata?.otherCharge}</td>
        <td className="text-center">{bannerdata?.memberType}</td>
        <td className="text-center">2024-05-14 04:40</td>
        <td className="text-center">2024-05-15 05:55</td>

        <td>
          <div className="d-flex gap-10 justify-content-center">
            <a
              href="#"
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                setidd(bannerdata?.id);
                settypes(bannerdata?.memberType);
                setpatds(bannerdata?.panTds);
                setwithou(bannerdata?.withOutPanTds);
                setadmncharge(bannerdata?.adminCharge);
                setotheschar(bannerdata?.otherCharge);
                setstatus(true);
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
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
              ADD ADMIN CHARGES
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
                        UPDATE CHARGES
                      </h5>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              className="title-color d-flex"
                              htmlFor="f_name"
                            >
                              MEMBER TYPE&nbsp;
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
                              className="title-color d-flex"
                              htmlFor="exampleFormControlInput1"
                            >
                              PAN TDS&nbsp;<span class="text-danger">*</span>
                            </label>
                            <input
                              value={patds}
                              onChange={(e) => {
                                setpatds(e.target.value);
                              }}
                              type="text"
                              name="l_name"
                              className="form-control"
                              placeholder="PAN TDS"
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
                              WITHOUT PAN TDS&nbsp;
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              value={withou}
                              onChange={(e) => {
                                setwithou(e.target.value);
                              }}
                              type="text"
                              name="l_name"
                              className="form-control"
                              placeholder="WITHOUT PAN TDS"
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
                              ADMIN CHARGE&nbsp;
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              value={admncharge}
                              onChange={(e) => {
                                setadmncharge(e.target.value);
                              }}
                              type="text"
                              name="l_name"
                              className="form-control"
                              placeholder="ADMIN CHARGE"
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
                              OTHER CHARGE&nbsp;
                              <span class="text-danger">*</span>
                            </label>

                            <input
                              value={otheschar}
                              onChange={(e) => {
                                setotheschar(e.target.value);
                              }}
                              type="text"
                              name="phone"
                              className="form-control"
                              placeholder="OTHER CHARGE"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex gap-3 justify-content-end">
                        <button type="submit" className="btn btn--primary px-4">
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
                            className="title-color d-flex"
                            htmlFor="f_name"
                          >
                            MEMBER TYPE&nbsp;<span class="text-danger">*</span>
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
                            className="title-color d-flex"
                            htmlFor="exampleFormControlInput1"
                          >
                            PAN TDS&nbsp;<span class="text-danger">*</span>
                          </label>
                          <input
                            value={pantds}
                            onChange={(e) => {
                              setpantds(e.target.value);
                            }}
                            type="text"
                            name="l_name"
                            className="form-control"
                            placeholder="PAN TDS"
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
                            WITHOUT PAN TDS&nbsp;
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            value={withouttds}
                            onChange={(e) => {
                              setwithouttds(e.target.value);
                            }}
                            type="text"
                            name="l_name"
                            className="form-control"
                            placeholder="WITHOUT PAN TDS"
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
                            ADMIN CHARGE&nbsp;
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            value={admincharges}
                            onChange={(e) => {
                              setadmincharges(e.target.value);
                            }}
                            type="text"
                            name="l_name"
                            className="form-control"
                            placeholder="ADMIN CHARGE"
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
                            OTHER CHARGE&nbsp;<span class="text-danger">*</span>
                          </label>

                          <input
                            value={othercharges}
                            onChange={(e) => {
                              setothercharges(e.target.value);
                            }}
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="OTHER CHARGE"
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
              <div className="card">
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
                            <th>PAN TDS</th>
                            <th>WITOUT PAN TDS</th>
                            <th>ADMIN CHARGES</th>
                            <th>OTHER CHARGES</th>

                            <th>MEMBER TYPE</th>
                            <th>CREATE DATE&TIME</th>
                            <th>LAST UPDATE DATE & TIME</th>
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

export default Addnewdeliveryman;
