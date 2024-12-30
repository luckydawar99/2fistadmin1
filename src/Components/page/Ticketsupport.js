import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import swal from "sweetalert";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import ReactPlayer from "react-player";

const Ticketsupport = () => {
  let navigate = useNavigate();
  const [bannerlist, setBannerlist] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [valueof, setvalueof] = useState();

  const [count, setcount] = useState();

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
  }, [valueof]);

  let getBannerlist = () => {
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/ticket/getAllTickets`,
        options
      )
      .then((res) => {

        let filteredData = [];

        if (valueof == "CLOSE") {
          filteredData = res.data.data.filter((item) => item?.active === false);
        } else if (valueof == "REOPEN TICKET") {
          filteredData = res.data.data.filter((item) => item?.active === true);
        } else {
          filteredData = res.data.data;
        }

        setcount(filteredData?.length);
        setBannerlist(filteredData);
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

  const renderBannerData = (bannerdata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr id={`data-${index}`}>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">{bannerdata?.ticketId}</td>
        <td className="text-center">{bannerdata?.memberId}</td>
        <td className="text-center">Member name missing</td>
        <td className="text-center text-capitalize">{bannerdata?.subject}</td>
        <td className="text-capitalize" style={{ whiteSpace: "break-spaces", textAlign: "justify" }}>
          {bannerdata?.message.length>14 ? bannerdata?.message.slice(0,14)+`...` : bannerdata?.message}
        </td>
        <td className="text-center">{bannerdata?.depName}</td>
        <td className="text-center">{bannerdata?.priority}</td>
        <td className="text-center">{bannerdata?.solutionTime}</td>
        <td className="text-center">
          {bannerdata?.active === true ? (
            <Link
              to="/chatwithadmin"
              onClick={() => {
                secureLocalStorage.setItem("tiketid", bannerdata?.ticketId);
              }}
              class="badge badge-soft-primary cursor-pointer fz-12 font-weight-bold px-2 radius-50"
            >
              Open
            </Link>
          ) : (
            <Link
              onClick={() => {
                secureLocalStorage.setItem("tiketid", bannerdata?.ticketId);
              }}
              to="/chatwithadmin"
              class="badge badge-soft-success cursor-pointer fz-12 font-weight-bold px-2 radius-50"
            >
              Close
            </Link>
          )}
        </td>
        <td className="text-center">
          {bannerdata?.createdDateString}
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
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
              <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
                <img width={20} src="assets/ticket.png" alt="Banner icon" />
                PENDING TICKET{" "}
                <span className="badge badge-soft-dark radius-50">{count}</span>
              </h2>
            </div>

            <div className="row" id="banner-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-3">
                    <div className="row gy-2 align-items-center">
                      <div className="col-sm-4 col-md-4 col-lg-4">
                        MANAGE SUPPORT TICKETS{" "}
                        <span className="badge badge-soft-dark radius-50 fz-12">
                          {count}
                        </span>
                      </div>

                      <div className="col-sm-8 col-md-8 col-lg-8 d-flex justify-content-end flex-wrap">
                        <div className="form-group ">
                          <label>SELECT NO.</label>
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
                          <label>TICKET SEARCH</label>
                          <select
                            name="withdraw_status_filter"
                            onChange={(e) => {
                              setvalueof(e.target.value);
                            }}
                            className="form-control"
                          >
                            <option value="all">All</option>
                            <option value="CLOSE">CLOSE</option>
                            <option value="REOPEN TICKET">REOPEN TICKET</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table
                      id="columnSearchDatatable"
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th className="pl-xl-5">SR NO.</th>
                          <th>TICKET ID</th>
                          <th>MEMBER ID</th>
                          <th>MEMBER NAME</th>
                          <th>SUBJECT</th>
                          <th>MESSAGE</th>
                          <th>DEPATMENT NAME</th>
                          <th>PRIORITY</th>
                          <th>SOLUTION TIME (IN HOURS)</th>
                          <th>STATUS</th>
                          <th>CREATE DATE&TIME</th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td className="pl-xl-5">1</td>
                          <td>87676866DFF</td>
                          <td>VHGCGRDF55</td>
                          <td>GTSKY</td>
                          <td>PLAYER</td>
                          <td>NO</td>
                          <td>BATTING</td>
                          <td>FIGH</td>
                          <td>23</td>
                          <td>PENDING</td>
                          <td>22/12/24</td>
                        </tr>
                      

                        {bannerlist
                          .slice(
                            (activePage - 1) * itemsPerPage,
                            activePage * itemsPerPage
                          )
                          .map((bannerdata, index) => {
                            return renderBannerData(bannerdata, index);
                          })}
                      </tbody>
                    </table>
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

export default Ticketsupport;
