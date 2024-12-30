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

const Smslist = () => {
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
        <td className="text-center">QWERT74747</td>
        <td className="text-center">SMSAPIN</td>

        <td className="text-center">http://SMSURL</td>
        <td className="text-center">QW1</td>
        <td className="text-center">QW2</td>
        <td className="text-center">QW3</td>
        <td className="text-center">QW4</td>
        <td className="text-center">QW5</td>
        <td className="text-center">QW6</td>
        <td className="text-center">QW7</td>
        <td className="text-center">QW8</td>
        <td className="text-center">2024-05-10 01:10PM</td>
        <td className="text-center">2024-05-12 09:10AM</td>
        <td className="text-center">Setting for TEMPLATE</td>
        <td className="text-center">Setting for sms</td>
        <td className="text-center">API DATA API</td>
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
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <a
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
              <img
                width={20}
                src="assets/mail.png"
                alt=""
              />
              SMS LIST DATA
            </h2>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="px-3 py-4">
                  <div className="row gy-2 align-items-center">
                    <div className="col-sm-4 col-md-4 col-lg-4">
                      <h5 className="page-header-title">
                        SMS LIST{" "}
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
                          <th>API ID</th>
                          <th>API NAME</th>

                          <th>SMS URL</th>
                          <th>PRM1</th>
                          <th>PRM2</th>
                          <th>PRM3</th>
                          <th>PRM4</th>
                          <th>PRM5</th>
                          <th>PRM6</th>
                          <th>PRM7</th>
                          <th>PRM8</th>
                          <th>CREATE DATE&TIME</th>
                          <th>LAST UPDATE DATE&TIME</th>
                          <th>TEMPLATE SETTING</th>
                          <th>SMS DATA SETTING</th>
                          <th>VIEW THIS API</th>
                          <th>STATUS</th>
                          <th>ACTIVE&DEACTIVE</th>
                          <th>SWITCH</th>
                          <th>ACTION</th>
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

export default Smslist;
