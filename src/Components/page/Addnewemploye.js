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

const Addnewemploye = () => {
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
        <td className="text-center">41EER41</td>
        <td className="text-center">{bannerdata?.title}</td>

        <td className="text-center">2024-05-14 04:40</td>
        <td className="text-center">2024-05-15 05:55</td>

        <td className="text-center">
          <label className="badge badge-success">ACTIVE</label>
        </td>
        <td>
          <form
            action="https://6valley.6amtech.com/vendor/products/status-update"
            method="post"
            data-from="product-status"
            id="product-status54-form"
            className="admin-product-status-form"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="2nohFUff9chQ6XVV3eOZHrzANIB1CpRwY18RYsMm"
              autoComplete="off"
            />{" "}
            <input type="hidden" name="id" defaultValue={54} />
            <label className="switcher mx-auto">
              <input
                type="checkbox"
                className="switcher_input toggle-switch-message"
                name="status"
                id="product-status54"
                defaultValue={1}
                defaultChecked
                data-modal-id="toggle-status-modal"
                data-toggle-id="product-status54"
                data-on-image="product-status-on.png"
                data-off-image="product-status-off.png"
                data-on-title="Want to Turn ON Secret Covered in Sand Comic book pdf Status"
                data-off-title="Want to Turn OFF Secret Covered in Sand Comic book pdf Status"
                data-on-message="<p>If enabled this product will be available on the website and customer app</p>"
                data-off-message="<p>If disabled this product will be hidden from the website and customer app</p>"
              />
              <span className="switcher_control" />
            </label>
          </form>
        </td>

        <td>
          <div className="d-flex gap-10 justify-content-center">
            <span
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                banneredit(
                  secureLocalStorage.setItem("banner_id", bannerdata?.id)
                );
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <a
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
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
              <img
                width={20}
                src="assets/businessman.png"
                alt=""
              />
              ADD EMPLOYEE
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
                      EMPLOYEE DETAILS
                    </h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="title-color d-flex"
                            htmlFor="exampleFormControlInput1"
                          >
                            EMPLOYEE NAME&nbsp;
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
                            placeholder="EMPLOYEE NAME"
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
                            AGE&nbsp;<span class="text-danger">*</span>
                          </label>
                          <input
                            value={lastname}
                            onChange={(e) => {
                              setlastname(e.target.value);
                            }}
                            type="text"
                            name="l_name"
                            className="form-control"
                            placeholder="AGE"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="title-color d-flex"
                            htmlFor="f_name"
                          >
                            EMPLOYEE TYPE&nbsp;
                            <span class="text-danger">*</span>
                          </label>
                          <select
                            onChange={(e) => {
                              setfirstname(e.target.value);
                            }}
                            type="text"
                            value={firstname}
                            name="f_name"
                            className="form-control"
                            placeholder="First Name"
                            required
                          >
                            <option value="" selected>
                              SELECT EMPLOYEE TYPE
                            </option>
                            <option value="TELECALLER">TELECALLER</option>
                            <option value="SALES">SALES</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="title-color d-flex"
                            htmlFor="exampleFormControlInput1"
                          >
                            EMAIL&nbsp;<span class="text-danger">*</span>
                          </label>
                          <input
                            value={lastname}
                            onChange={(e) => {
                              setlastname(e.target.value);
                            }}
                            type="email"
                            name="l_name"
                            className="form-control"
                            placeholder="EMAIL"
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
                            LOGIN ID&nbsp;
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            value={dateofbirth}
                            onChange={(e) => {
                              setdateofbirth(e.target.value);
                            }}
                            type="text"
                            name="l_name"
                            className="form-control"
                            placeholder="LOGIN ID"
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
                            PASSWORD&nbsp;
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            value={city}
                            onChange={(e) => {
                              setcity(e.target.value);
                            }}
                            type="password"
                            name="l_name"
                            className="form-control"
                            placeholder="PASSWORD"
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
                            MOBILE NO&nbsp;<span class="text-danger">*</span>
                          </label>

                          <input
                            value={phone}
                            onChange={(e) => {
                              setphone(e.target.value);
                            }}
                            maxLength={10}
                            minLength={10}
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="MOBILE NO"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mt-3">
                        <div class="d-flex gap-4 flex-wrap">
                          <label
                            for="name"
                            class="title-color font-weight-bold mb-0"
                          >
                            ALL SERVICES PERMISSION
                          </label>
                          <div class="form-group d-flex gap-2">
                            <input
                              type="checkbox"
                              id="select-all"
                              class="cursor-pointer"
                            />
                            <label
                              class="title-color mb-0 cursor-pointer text-capitalize"
                              for="select-all"
                            >
                              Select all
                            </label>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-6 col-lg-6">
                            <div class="form-group d-flex gap-2">
                              <input
                                type="checkbox"
                                name="modules[]"
                                value="dashboard"
                                class="module-permission"
                                id="dashboard"
                              />
                              <label class="title-color mb-0" for="dashboard">
                                Dashboard
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-6 col-lg-6">
                            <div class="form-group d-flex gap-2">
                              <input
                                type="checkbox"
                                name="modules[]"
                                value="pos_management"
                                class="module-permission"
                                id="pos_management"
                              />
                              <label
                                class="title-color mb-0"
                                for="pos_management"
                              >
                                Pos management
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-6 col-lg-6">
                            <div class="form-group d-flex gap-2">
                              <input
                                type="checkbox"
                                class="module-permission"
                                name="modules[]"
                                value="order_management"
                                id="order"
                              />
                              <label
                                class="title-color mb-0 text-capitalize"
                                for="order"
                              >
                                Order management
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-6 col-lg-6">
                            <div class="form-group d-flex gap-2">
                              <input
                                type="checkbox"
                                class="module-permission"
                                name="modules[]"
                                value="product_management"
                                id="product"
                              />
                              <label
                                class="title-color mb-0 text-capitalize"
                                for="product"
                              >
                                Product management
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-6 col-lg-6">
                            <div class="form-group d-flex gap-2">
                              <input
                                type="checkbox"
                                class="module-permission"
                                name="modules[]"
                                value="promotion_management"
                                id="promotion_management"
                              />
                              <label
                                class="title-color mb-0 text-capitalize"
                                for="promotion_management"
                              >
                                Promotion management
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-6 col-lg-6">
                            <div class="form-group d-flex gap-2">
                              <input
                                type="checkbox"
                                name="modules[]"
                                class="module-permission"
                                value="support_section"
                                id="support_section"
                              />
                              <label
                                class="title-color mb-0 text-capitalize"
                                for="support_section"
                              >
                                Help &amp; support section
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-6 col-lg-6">
                            <div class="form-group d-flex gap-2">
                              <input
                                type="checkbox"
                                class="module-permission"
                                name="modules[]"
                                value="report"
                                id="report"
                              />
                              <label
                                class="title-color mb-0 text-capitalize"
                                for="report"
                              >
                                Reports &amp; analytics
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-6 col-lg-6">
                            <div class="form-group d-flex gap-2">
                              <input
                                type="checkbox"
                                class="module-permission"
                                name="modules[]"
                                value="user_section"
                                id="user_section"
                              />
                              <label
                                class="title-color mb-0 text-capitalize"
                                for="user_section"
                              >
                                User management
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-6 col-lg-6">
                            <div class="form-group d-flex gap-2">
                              <input
                                type="checkbox"
                                class="module-permission"
                                name="modules[]"
                                value="system_settings"
                                id="system_settings"
                              />
                              <label
                                class="title-color mb-0 text-capitalize"
                                for="system_settings"
                              >
                                System settings
                              </label>
                            </div>
                          </div>
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
                        EMPLOYEE LIST{" "}
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
                          <th>EMPLOYEE TYPE ID</th>
                          <th>EMPLOYEE TYPE NAME</th>

                          <th>CREATE DATE&TIME</th>
                          <th>LAST UPDATE DATE & TIME</th>
                          <th>STATUS</th>
                          <th>ACTIVATE&DEACTIVATE</th>

                          <th className="text-center">ACTION</th>
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

export default Addnewemploye;
