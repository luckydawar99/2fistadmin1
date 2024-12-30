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

const Addnewemployetype = () => {
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [dateofbirth, setdateofbirth] = useState();
  const [city, setcity] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [frontid, setfrontid] = useState();
  const [backid, setbackid] = useState();
  const [vehicleimage, setvehicleimage] = useState();
  const [vehicleregistrastion, setvehicleregistrastion] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const Navigate = useNavigate();
  const deliverydata = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fname", firstname);
    formData.append("lname", lastname);
    formData.append("dob", dateofbirth);
    formData.append("city", city);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("conform_password", confirmpassword);
    formData.append("fcm_id", "123456");

    formData.append("frontId_iamge", frontid);
    formData.append("backId_iamge", backid);
    formData.append("vehical_iamge", vehicleimage);
    formData.append("document", vehicleregistrastion);
    axios
      .post(`${process.env.REACT_APP_API_KEY}admin/api/driverAdd`, formData)
      .then((response) => {
        setTimeout(() => {
          Navigate("/deliverymanlist");
        }, 3000);
        toast.success(
          `Congratulations ${response?.data?.data?.fname} ! You are now registered on innt as a rider`
        );
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("You Entered Envlid Inoformation");
        }
      });
  };

  let navigate = useNavigate();
  const [bannerlist, setBannerlist] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  let banneredit = () => {
    navigate(`/editbannerlist`);
  };

  let token = secureLocalStorage.getItem("adminidtoken");

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

  let add_banner = () => {
    navigate(`/add_banner`);
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
      .get(`http://157.66.191.24:3038/admin/api/userQueryList`, options)
      .then((res) => {
        setBannerlist(res.data.data);
      })
      .catch((error) => {});
  };

  const activedeactive = (item) => {
    const Data = {
      bannerId: item,
    };
    let options = {
      headers: {
        token: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/activeDeactive_banner`,
        Data,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getBannerlist();
      })
      .catch((error) => {});
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderBannerData = (bannerdata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr id={`data-${index}`}>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">GOLD</td>
        <td className="text-center">{bannerdata?.title}</td>

        <td className="text-center">0000000000</td>
        <td className="text-center">xxxyy@gmail.com</td>
        <td className="text-center">EMPLOYEE LOGIN NOW </td>
       
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
              <img
                width={20}
                src="assets/businessman.png"
                alt=""
              />
              ADD EMPLOYEE TYPE
            </h2>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <form onSubmit={deliverydata}>
                <input type="hidden" name="_token" autoComplete="off" />{" "}
                <div className="card">
                  <div className="card-body">
                    <h5 className="mb-0 page-header-title d-flex align-items-center gap-2 border-bottom pb-3 mb-3">
                      <i class="fa fa-user" aria-hidden="true"></i>
                     EMPLOYEE TYPE
                    </h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="title-color d-flex"
                            htmlFor="exampleFormControlInput1"
                          >
                            EMPLOYEE TYPE NAME&nbsp;
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            value={lastname}
                            onChange={(e) => {
                              setlastname(e.target.value);
                            }}
                            type="text"
                            name="l_name"
                            className="form-control"
                            placeholder="EMPLOYEE TYPE NAME"
                            required
                          />
                        </div>
                      </div>
                     
                    </div>

                    <div className="d-flex gap-3 justify-content-end">
                      <a href="#" class="btn btn-secondary px-5">
                        Reset
                      </a>
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
                  <div className="row gy-2 align-items-center">
                    <div className="col-sm-4 col-md-4 col-lg-4">
                      <h5 className="page-header-title">
                        EMPLOYEE TYPE LIST{" "}
                        <span className="badge badge-soft-dark radius-50 fz-12">
                          {0}{" "}
                        </span>
                      </h5>
                    </div>

                    <div className="col-sm-8 col-md-8 col-lg-8 d-flex justify-content-end flex-wrap">
                      <div className="form-group ">
                        <select
                          className="form-control"
                          id="itemsPerPage"
                          value={itemsPerPage}
                          onChange={handleItemsPerPageChange}
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option value="1000">1000</option>
                        </select>
                      </div>
                      &nbsp;
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
                  {bannerlist?.length > 0 ? (
                    <table
                      id="columnSearchDatatable"
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th className="pl-xl-5">SR NO.</th>
                          <th>EMPLOYEE TYPE</th>
                          <th>EMPLOYEE NAME</th>

                          <th>MOBILE</th>
                          <th>EMAIL</th>
                          <th>VIEW LOGIN DETAILS</th>
                          
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
  );
};

export default Addnewemployetype;

