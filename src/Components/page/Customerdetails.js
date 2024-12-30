import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Pagination from "react-js-pagination";
const Customerdetails = () => {
  const [customerdata, setcustomerdata] = useState();
  const [count, setcount] = useState();
  const [customerorderdata, setcustomerorderdata] = useState();
  const [ProductListfilter, setProductListfilter] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [balance, setbalance] = useState();
  const itemsPerPage = 5;
  let deleteproducts = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this banner?",
      icon: "success",
      dangerMode: true,
    });
  };

  let useridss = secureLocalStorage.getItem("userids");
  let memberidof = secureLocalStorage.getItem("memberid");

  let token = secureLocalStorage.getItem("adminidtoken");
  useEffect(() => {
    getcustomerdata();
  }, [0]);
  let getcustomerdata = () => {
    const data = {
      userId: useridss,
    };
    let options = {
      headers: {
        token: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}customerDetails`,
        data,

        options
      )
      .then((res) => {
        setbalance(res?.data?.balance);
        setcustomerdata(res?.data?.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getcustomerorderdata();
  }, [0]);
  let getcustomerorderdata = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/transaction-history/getTransactionsByMemberId/${memberidof}`,

        options
      )
      .then((res) => {
        const reversedData = res?.data?.data?.reverse() || [];
        setcount(reversedData?.length);
        setcustomerorderdata(reversedData);

        // setcount(res?.data?.data?.length);
        // setcustomerorderdata(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    setProductListfilter(customerorderdata);
  }, [customerorderdata]);
  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = customerorderdata?.filter(
      (item) =>
        item?.vendorName?.toLowerCase().includes(searchTerm) ||
        item?.transactionId?.toLowerCase().includes(searchTerm) ||
        item?.paymentMode?.toLowerCase().includes(searchTerm) ||
        item?.businessName?.toLowerCase().includes(searchTerm)
    );
    setProductListfilter(result);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderProductData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr>
        <td>{adjustedIndex}</td>
        <td className="text-capitalize text-center">{data?.businessName}</td>
        <td className="text-capitalize text-center">{data?.vendorName}</td>
        <td className="text-center">
          <a href="#" className="title-color hover-c1">
            {data?.transactionId}
          </a>
        </td>
        <td className="text-center">{data?.amount}</td>
        <td className="text-center">{data?.paymentMode}</td>
        <td className="text-center">
          {data?.type ? data?.type : data?.transactionStatus}
        </td>
        <th className="text-center">{data?.transactionStatus}</th>
        <th>{data?.transactionDateTime}</th>
      </tr>
    );
  };
  return (
    <div>
      {/* <Header /> */}
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img width={20} src="assets/customer-service.png" alt="" />
              User Details
              <span className="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>
          <div className="row" id="printableArea">
            <div className="col-lg-8 mb-3 mb-lg-0">
              <div className="card">
                <div className="p-3">
                  <div className="row justify-content-end">
                    <div className="col-auto">
                      <form>
                        <div className="input-group input-group-merge input-group-custom">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </div>
                          </div>
                          <input
                            onChange={handleFilter}
                            id="datatableSearch_"
                            type="search"
                            name="searchValue"
                            className="form-control"
                            placeholder="Search here"
                            aria-label="Search orders"
                            required
                          />
                          <button type="submit" className="btn btn--primary">
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="table-responsive datatable-custom">
                  {ProductListfilter?.length > 0 ? (
                    <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>SR NO.</th>
                          <th>BUSINESS NAME</th>
                          <th>VENDOR NAME</th>
                          <th>TRANSACTION ID</th>
                          <th>AMOUNT</th>
                          <th>PAYMENT MODE</th>
                          <th>STATUS</th>
                          <th>TRANSACTION</th>
                          <th>DATE&TIME</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ProductListfilter.slice(
                          (activePage - 1) * itemsPerPage,
                          activePage * itemsPerPage
                        ).map((data, index) => renderProductData(data, index))}
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
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-4 d-flex align-items-center gap-2">
                    <img
                      src="https://6valley.6amtech.com/public/assets/back-end/img/seller-information.png"
                      alt=""
                    />
                    User
                  </h4>
                  <div className="media">
                    {/* <div className="mr-3">
                      {customerdata?.profileImageUrl ? (
                         <img
                         className="avatar rounded-circle avatar-70"
                         src={
                           `${process.env.REACT_APP_IMG_URL}` +
                           customerdata?.profileImageUrl
                         }
                         alt="Image"
                       />
                      ) : (
                        <img
                          className="avatar rounded-circle avatar-50"
                          src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
                          alt="Image"
                        />
                       
                      )}
                    </div> */}
                 

                    <div className=" d-flex flex-column gap-1">
                      <span className="title-color hover-c1">
                        <strong className="text-capitalize">
                         Name : {customerdata?.userName.slice(0, 10)}
                        </strong>
                      </span>
                      <span className="title-color hover-c1">
                        <strong className="text-capitalize">
                         UniqueName : {customerdata?.uniqueName.slice(0, 10)}
                        </strong>
                      </span>
                      <span className="title-color hover-c1">
                        <strong className="text-capitalize">
                         Country :  {customerdata?.countryName.slice(0, 10)}
                        </strong>
                      </span>

                      <span className="title-color">
                        <strong>{count}0 </strong>Transaction
                      </span>
                      <span className="title-color">
                        <strong>{customerdata?.userWallet?.toFixed(2)} </strong>
                        Balance
                      </span>

                      <span className="title-color text-capitalize">
                      <strong>Email-id</strong> :  {customerdata?.email?.length > 20
                          ? customerdata?.email?.slice(0, 20) + `...`
                          : customerdata?.email}
                      </span>

                      {customerdata?.userStatus == 0 ? (
                        <label
                          style={{ fontSize: "100%" }}
                          className="text-center badge badge-success"
                        >
                         <strong>Currently</strong>  : ACTIVE
                        </label>
                      ) : (
                        <label
                          style={{ fontSize: "100%" }}
                          className="text-center  badge badge-danger"
                        >
                          <strong>Currently</strong> : BLOCKED
                        </label>
                      )}
                    </div>
                    <div className="media-body text-right"></div>
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

export default Customerdetails;
