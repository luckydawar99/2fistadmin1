import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Pagination from "react-js-pagination";
import toast, { Toaster } from "react-hot-toast";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
const Commissionapproval = () => {
  const [count, setcount] = useState();
  const [sellerlist, setSellerlist] = useState([]);
  const [filteredSellerList, setFilteredSellerList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusofapp, setstatusofapp] = useState(null);

  let token = secureLocalStorage.getItem("adminidtoken");

  let unblockseller = () => {
    swal({
      title: "Seller Status Changed",
      icon: "success",
    });
  };


  const tableData = [
    { SR: 1, TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 2, TeamName: "Indore vs dewas", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 3, TeamName: "ujjain vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 4, TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 5, TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },


    ,
  ];


  const [callid, setcallid] = useState();
  const [callnumber, setcallnumber] = useState();
  const [statuss, setstatuss] = useState(true);

  const updated = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("vendorId", callid);
    formData.append("commission", callnumber);

    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/vendor/commission/approval/update/commission`,
        formData,
        options
      )

      .then((res) => {
        getsellerlist();
        setstatuss(true);
        toast.success(res.data.message);
      })
      .catch((error) => { });
    setcallid("");
    setcallnumber("");
  };

  let deletebanner = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this vendor commission!",
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
              `${process.env.REACT_APP_API_KEY}admin/vendor/commission/approval/deleteCommissionRequest/${item}`,
              options
            )
            .then((res) => {
              getsellerlist();
            })
            .catch((error) => { });
        };
        deletebannerimage();
        swal("Poof! Your vendor commission has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your vendor commission is safe!");
      }
    });
  };

  const [status, setStatus] = useState("");

  const activedeactive = (vendorId, status) => {
    const formData = new FormData();
    formData.append("vendorId", vendorId);
    formData.append("status", status);

    let options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/vendor/commission/approval/updateStatusApproveOrDissApprove`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getsellerlist();
      })
      .catch((error) => { });
  };

  useEffect(() => {
    getsellerlist();
  }, [0]);

  let getsellerlist = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/vendor/commission/approval/getALlVendorCommissionRequest`,
        options
      )
      .then((res) => {
        setcount(res?.data?.data?.length);
        setSellerlist(res.data.data);
        setFilteredSellerList(res.data.data);
      })
      .catch((error) => { });
  };

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const result = sellerlist.filter(
      (item) =>
        item.vendor?.user?.userName?.toLowerCase().includes(searchTerm) ||
        item.vendor?.user?.email?.toLowerCase().includes(searchTerm) ||
        item.vendor?.state?.toLowerCase().includes(searchTerm) ||
        item.vendor?.businessName?.toLowerCase().includes(searchTerm) ||
        item.vendor?.vendorGenId?.toLowerCase().includes(searchTerm)
    );
    setFilteredSellerList(result);
    setActivePage(1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setActivePage(1);
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const exportToExcel = () => {
    const dataSet = filteredSellerList.map((seller, index) => ({
      "Sr No.": (activePage - 1) * itemsPerPage + index + 1,
      Name: `${seller?.vendor?.user?.userName} (${seller.vendor?.vendorGenId})`,
      "Bussiness Name": seller?.vendor?.businessName,
      Commission: seller?.commission,
      Email: seller?.vendor?.user?.email,
      "Mobile No.": seller?.vendor?.user?.mobileNumber,

      Address: `${seller?.vendor?.city} (${seller?.vendor?.state})`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataSet);
    const workbook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "commission_list.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Sr No.",
      "Name",
      "Bussiness Name",
      "Commission",
      "Email",
      "Mobile No.",
      "Address",
    ];
    const tableRows = [];

    filteredSellerList.forEach((seller, index) => {
      const commission = [
        (activePage - 1) * itemsPerPage + index + 1,
        `${seller?.vendor?.user?.userName} (${seller.vendor?.vendorGenId})`,
        seller?.vendor?.businessName,
        seller?.commission,
        seller?.vendor?.user?.email,
        seller?.vendor?.user?.mobileNumber,
        `${seller?.vendor?.city} (${seller?.vendor?.state})`,
      ];
      tableRows.push(commission);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Commission List", 14, 15);
    doc.save("commission_list.pdf");
  };

  const renderSellerData = (seller, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>
        <td>{seller?.vendor?.vendorGenId}</td>

        <td className="text-capitalize">
          <Link
            to="/sellerdetails"
            onClick={() => {
              secureLocalStorage.setItem("sellerid", seller?.vendor?.vendorId);
            }}
            title="View"
            className="title-color"
          >
            {seller?.vendor?.user?.userName?.length > 10
              ? seller?.vendor?.user?.userName?.slice(0, 10) + `...`
              : seller?.vendor?.user?.userName}
          </Link>
        </td>

        <td>
          <a
            className="title-color hover-c1"
            href={`tel:${seller?.vendor?.user?.mobileNumber}`}
          >
            {seller?.vendor?.user?.mobileNumber}
          </a>
        </td>
        <td className="text-capitalize">
          <div className="mb-1">
            <strong>
              <a
                className="title-color hover-c1"
                href={`mailto:${seller?.vendor?.user?.email}`}
              >
                {seller?.vendor?.user?.email?.length > 10
                  ? seller?.vendor?.user?.email?.slice(0, 10) + `...`
                  : seller?.vendor?.user?.email}
              </a>
            </strong>
          </div>
        </td>
        <td className="text-center">{seller?.commission}</td>
        <td className="text-capitalize text-center">
          {seller?.vendor?.businessName?.length > 20
            ? seller?.vendor?.businessName?.slice(0, 20) + `...`
            : seller?.vendor?.businessName}
        </td>
        <td className="text-capitalize text-center">{seller?.vendor?.city}</td>
        <td className="text-capitalize">{seller?.vendor?.state} </td>
        <td>
          {seller?.status === "Disapprove" ? (
            <div class="text-center">
              <div class="btn btn-danger btn-sm update-status">
                {seller?.status}
              </div>
            </div>
          ) : seller?.status === "Approve" ? (
            <div class="text-center">
              <div class="btn btn--primary btn-sm update-status">
                {seller?.status}
              </div>
            </div>
          ) : seller?.status === "Deleted" ? (
            <div class="text-center">
              <div class="btn btn-danger btn-sm update-status">
                {seller?.status}
              </div>
            </div>
          ) : (
            <div class="text-center">
              <div class="btn btn-primary btn-sm update-status">
                {seller?.status}
              </div>
            </div>
          )}
        </td>
        <td>
          <select
            required
            className="js-example-responsive form-control w-100 mt-2"
            onChange={(e) => {
              const newStatus = e.target.value;
              const vendorId = seller?.vendor?.vendorId;
              setStatus(newStatus);
              activedeactive(vendorId, newStatus);
            }}
          >
            <option value="" selected disabled>
              Select status
            </option>
            <option value="1">APPROVE</option>
            <option value="2">DISAPPROVE</option>
          </select>
        </td>

        {/* <td> <select
            required
            className="js-example-responsive form-control w-100 mt-2"
            onChange={(e) => {
              setstatusofapp(e.target.value);

              activedeactive(seller?.vendor
                ?.                  vendorId);
            }}
          >
            <option value="" selected disabled>
              Select status
            </option>
            <option value="1">APPROVE</option>
            <option value="2">DISAPPROVE</option>
          </select></td> */}

        <td>
          <div className="d-flex justify-content-center gap-2">
            <a
              href="#"
              onClick={() => {
                setstatuss(false);
                setcallid(seller?.vendor?.vendorId);
                setcallnumber(seller?.commission);
              }}
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </a>
            <a
              onClick={() => {
                deletebanner(seller?.vendor?.vendorId);
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
        style={{
          paddingLeft: "0px",
          paddingRight: "0px",
          marginLeft: "0px",
        }}
      >
        <div className="col-lg-3 col-md-4"></div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img width={20} src="assets/officer.png" alt="" />
              COORDINATOR DATA
              <span className="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="mb-0 page-header-title d-flex align-items-center gap-2 border-bottom pb-3 mb-3">
                <i class="fa fa-user" aria-hidden="true"></i>
                COORDINATOR DETAILS
              </h5>
              <div className="row ">

                <div className="col-md-6 ">
                  <div className="form-group">
                    <label
                      className="title-color d-flex"
                      htmlFor="f_name"
                    >
                      Name&nbsp;
                      <span class="text-danger">*</span>
                    </label>



                    <input

                      type="TEXT"
                      name="l_name"
                      className="form-control"
                      placeholder="Kabaddi"
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
                      Title&nbsp;<span class="text-danger">*</span>
                    </label>
                    <input

                      type="TEXT"
                      name="l_name"
                      className="form-control"
                      placeholder="Kabaddi Championship"
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
                      Image&nbsp;<span class="text-danger">*</span>
                    </label>
                    <input

                      type="file"
                      name="l_name"
                      className="form-control"
                      placeholder="Kabaddi Championship"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">
                <div className="px-3 py-0">
                  <div className="row gy-2 align-items-center">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      {statuss == false ? (
                        <form onSubmit={updated}>
                          <input type="hidden" />
                          <div className="row mt-5">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                              <h5 className="text-capitalize">
                                CHANGE COMMISSION
                              </h5>
                              <label
                                className="title-color"
                                htmlFor="exampleFormControlInput1"
                              >
                                ENTER COMMISSION
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                value={callnumber}
                                onChange={(e) => {
                                  setcallnumber(e.target.value);
                                }}
                                type="number"
                                name="name[]"
                                className="form-control"
                                placeholder="TYPE SUPPORT NO"
                                required
                              />
                            </div>
                          </div>
                          <div className="justify-content-center mt-3">
                            <button type="submit" className="btn btn--primary">
                              Update
                            </button>
                          </div>
                        </form>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="px-3 py-4">
                  <div className="row gy-2 align-items-center">
                    <div className="col-sm-4 col-md-4 col-lg-4">
                      <form>
                        <div className="input-group input-group-merge input-group-custom">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </div>
                          </div>
                          <input
                            type="search"
                            name="searchValue"
                            className="form-control"
                            placeholder="Search By Vendor Name&Email"
                            aria-label="Search orders"
                            onChange={handleFilter}
                          />
                          <button type="submit" className="btn btn--primary">
                            Search
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="col-sm-8 col-md-8 col-lg-8 d-flex justify-content-end flex-wrap">
                      <div className="form-group ">
                        <label htmlFor="itemsPerPage">Select No.</label>
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
                      <div className=" d-flex justify-content-end flex-wrap">
                        <div className="form-group">
                          <label htmlFor="itemsPerPage">Download</label>
                          <select
                            className="form-control"
                            id="downloadFormat"
                            onChange={(e) => {
                              if (e.target.value === "excel") {
                                exportToExcel();
                              } else if (e.target.value === "pdf") {
                                downloadPDF();
                              }
                            }}
                          >
                            <option value="">Download Format</option>
                            <option value="excel">EXCEL</option>
                            <option value="pdf">PDF</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  {filteredSellerList.length > 0 ? (
                    <table
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>Sr. No.</th>
                          <th>VENDOR ID</th>
                          {/* <th>Shop name</th> */}
                          <th>Name</th>
                          <th>MOBILE NO.</th>
                          <th>EMAIL</th>
                          <th>COMM.</th>
                          <th>BUSINESS NAME</th>
                          <th>CITY</th>
                          <th>STATE</th>
                          <th>STATUS</th>

                          <th className="text-center">APPROVE/DISAPPROVE</th>

                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSellerList
                          .slice(
                            (activePage - 1) * itemsPerPage,
                            activePage * itemsPerPage
                          )
                          .map((seller, index) =>
                            renderSellerData(seller, index)
                          )}
                      </tbody>
                    </table>
                  ) : (
                    <div class="text-center p-4">
                      {/* <img
                        class="mb-3 w-160"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                        alt="Image Description"
                      />
                      <p class="mb-0 order-stats__subtitle">No details found</p> */}
                    </div>
                  )}
                </div>


                <div className="table-responsive">

                  <table
                    id="datatable"
                    style={{ textAlign: "left" }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                  >
                    <thead className="thead-light thead-50 text-capitalize">
                      <tr>
                        <th>SR</th>
                        <th>Team Name</th>
                        <th>Date</th>
                        <th>Total Time</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Total Payment</th>
                        <th>Total Bet User</th>
                        <th>Status</th>
                        <th>Action</th>

                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((data, index) => (
                        <tr key={index}>
                          <th>{data.SR}</th>
                          <td>{data.TeamName}</td>
                          <td>{data.Date}</td>
                          <td>{data.Totaltime}</td>
                          <td>{data.StartTime}</td>
                          <td>{data.EndTime}</td>
                          <td>{data.TotalPayment}</td>
                          <td>{data.TotalBetUser}</td>


                          <td>
                            <td className='order-stats__subtitle d-inline-flex' style={{ lineHeight: "12px", color: "red", border: "1px solid red", padding: "5px" }}>{data.Status}</td>
                          </td>



                          <td style={{ display: "flex" }}>
                            <div className="d-flex gap-10 justify-content-center">
                              <span
                                className="btn btn-outline--primary btn-sm cursor-pointer edit"
                                // onClick={() => {
                                //   banneredit(
                                //     secureLocalStorage.setItem("banner_id", usersdata?._id)
                                //   );
                                // }}
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
                              <Link
                                to="/customerdetails"
                                // onClick={() => {
                                //   secureLocalStorage.setItem("userids", usersdata?._id);

                                // }}
                                title="View"
                                className="btn btn-outline-info btn-sm square-btn"
                              >
                                <i class="fa fa-eye" aria-hidden="true"></i>
                              </Link>
                            </div>


                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>



                <div className="table-responsive mt-4">
                  <div className="px-4 d-flex justify-content-center justify-content-md-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commissionapproval;
