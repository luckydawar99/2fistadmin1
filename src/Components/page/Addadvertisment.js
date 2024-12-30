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
const Addadvertisment = () => {
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
        item?.businessName?.toLowerCase().includes(searchTerm) ||
        item.vendorName?.toLowerCase().includes(searchTerm) ||
        item.vendorGenId?.toLowerCase().includes(searchTerm)
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
      .catch((error) => { });
  };
  const itemsPerPage = 10;

  let token = secureLocalStorage.getItem("adminidtoken");

  const tableData = [
    { SR: 1, Transction_id:"0001", TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 2, Transction_id:"0002", TeamName: "Indore vs dewas", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 3, Transction_id:"0003", TeamName: "ujjain vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 4, Transction_id:"0004", TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 5, Transction_id:"0005", TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },


    ,
  ];

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
        `${process.env.REACT_APP_API_KEY}admin/member/getAllCommission`,
        options
      )
      .then((res) => {

        setcount(res?.data?.data?.length);
        setproductlist(res.data.data);
      })
      .catch((error) => { });
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
        `${process.env.REACT_APP_API_KEY}admin/member/saveMemberReferalCommission`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getproductlist();
      })
      .catch((error) => { });
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
        `${process.env.REACT_APP_API_KEY}admin/member/changeFlatOrPercentForLevelZero`,
        formData,
        options
      )
      .then((res) => {
        getproductlist();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error("Some techincial error is getting please try again later");
      });
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
        `${process.env.REACT_APP_API_KEY}admin/member/changeFlatOrPercentForLevelOne`,
        formData,
        options
      )
      .then((res) => {
        getproductlist();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error("Some techincial error is getting please try again later");
      });
  };

  const [status, setstatus] = useState(false);
  const [vendornamea, setvendornamea] = useState("");

  const remove = () => {
    setvendorid("");
    setcommision("");
    setcommision1("");
    setvendornamea("");
  };

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
              MEMBER REFERRAL COMMISSION
              <span class="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>

          <div className="row mb-5">
            <div className="col-md-12">
              <div className="card">
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
                  )
                   : (
               ""
                  )
                  }
                  <div className="d-flex justify-content-center">
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
                    <div className="table-responsive">

                      <table
                        id="datatable"
                        style={{ textAlign: "left" }}
                        className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                      >
                        <thead className="thead-light thead-50 text-capitalize">
                          <tr>
                            <th>SR</th>
                            <th>Team Image </th>
                            <th>Team Name</th>
                            <th>Date</th>
                            <th>Total Time</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Total Payment</th>
                            <th>Total Bet User</th>
                            <th>Total Commision</th>
                            <th>Status</th>
                            <th>Action</th>

                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((data, index) => (
                            <tr key={index}>
                              <th>{data.SR}</th>
                              <td>
                          <img
                            style={{
                              width: "30%",
                              borderRadius: "50%", 
                            }}
                            src="./img/logo/blank-profile-picture.webp"
                          />
                          VS
                          <img
                            style={{ width: "30%",  borderRadius: "50%", }}
                            src="./img/logo/blank-profile-picture.webp"
                          />
                        </td>
                          
                              <td>{data.TeamName}</td>
                              <td>{data.Date}</td>
                              <td>{data.Totaltime}</td>
                              <td>{data.StartTime}</td>
                              <td>{data.EndTime}</td>
                              <td>{data.TotalPayment}</td>
                              <td>{data.TotalBetUser}</td>
                              {/* <td>{data.TotalComission}</td> */}
                              <td>34,0000</td>


                              <td>
                                {/* <td className='order-stats__subtitle d-inline-flex' style={{ lineHeight: "12px", color: "red", border: "1px solid red", padding: "5px" }}>{data.Status}</td> */}
                             Complete Match
                              </td>



                              <td style={{ display: "flex" }}>
                                <button

                                  className='btn btn-danger'
                                // onClick={deleteproducts}
                                >
                                  Delete
                                </button>
                                <button

                                  className='btn btn-info ml-2'
                                // onClick={editbilldata}
                                >
                                  Edit
                                </button>

                              </td>
                            </tr>
                          ))}

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
    </div>
  );
};

export default Addadvertisment;
