import React, { useEffect, useState } from "react";
import Header from "../Header";
import "../sidebar.css";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import Pagination from "react-js-pagination";
import QRCode from "react-qr-code";
const Confrimproducts = () => {
  const [productlist, setproductlist] = useState([]);
  const [count, setcount] = useState();
  const [ProductListfilter, setProductListfilter] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  let token = secureLocalStorage.getItem("vendortoken");
  let shopid = secureLocalStorage.getItem("shopidofvendor");

  useEffect(() => {
    getproductlist();
  }, [0]);
  let getproductlist = () => {
    const data = {
      shopId: shopid,
      status:"2"
    };
    const options = {
      headers: {
        token: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/orderList`,
        data,
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
      item.products[0]?.product_name?.toLowerCase().includes(searchTerm)
    );
    setProductListfilter(result);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const [CategoryList, setCategoryList] = useState();
  const [serviceName, setServiceName] = useState("");
  let serviceTypeId = secureLocalStorage.getItem("serviceTypeeee");

  useEffect(() => {
    if (CategoryList) {
      const matchedCategory = CategoryList?.find(
        (category) => category?._id === serviceTypeId
      );
      if (matchedCategory) {
        setServiceName(matchedCategory?.maincategory_englishName);
      }
    }
  }, [CategoryList, serviceTypeId]);

  const renderProductData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr>
        <td>{adjustedIndex}</td>
        <td>
          {data?.products?.map((prodcutss) => {
            return (
              <Link
                onClick={() => {
                  secureLocalStorage.setItem("productid", prodcutss?.productId);
                  secureLocalStorage.setItem("orderdid", data?._id);
                }}
                to="/orderdetails"
                className="media align-items-center gap-2 w-max-content"
              >
                <img
                  src={
                    prodcutss?.image
                      ? `${process.env.REACT_APP_API_KEY}uploads/${prodcutss?.image}`
                      : "https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64883db39dcbb.png"
                  }
                  className="avatar border"
                  alt
                />
              </Link>
            );
          })}
        </td>
        <td>
          <Link  className="title-color hover-c1" to="#">
            {data?.orderId}{" "}
          </Link>
        </td>
        <td>
          <div>{data?.order_date?.slice(0, 10)}</div>
          <div>{data?.order_date?.slice(11, 19)}</div>
        </td>

        <td>
          <div>${data?.products[0]?.total} {data?.payment_status}</div>
          {data?.products[0]?.payment_status == "Paid" ?           <span className="badge badge-soft-success">Paid</span> : <span className="badge badge-soft-danger">Unpaid</span> }

        </td>
        <td className="text-capitalize ">
          <label className="badge badge-soft-success">Confirm</label>
        </td>
        
      </tr>
    );
  };
  return (
    <div>
    {/* <Header /> */}
    <div
      className="container row" style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      
    >
      <div className="col-lg-3 col-md-4" >
        {/* <Sidebarr /> */}
      </div>

      <div
        className="col-lg-9 col-md-8"
        style={{  marginTop: "60px" }}
      >
         <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img
                width={20}
                src="https://6valley.6amtech.com/public/assets/back-end/img/all-orders.png"
                alt
              />
              Confirm Transaction
              <span className="badge badge-soft-dark radius-50 fz-14 ml-1">
                {count}
              </span>
            </h2>
          </div>
          
          <div className="row mt-20 mb-3">
            <div className="col-md-12">
              <div className="card">
                <div className="px-3 py-4 light-bg">
                  <div className="row g-2 align-items-center flex-grow-1">
                    <div className="col-md-4">
                      <h5 className="text-capitalize d-flex gap-1">
                        Success list
                        <span className="badge badge-soft-dark radius-50 fz-12">
                          {count}
                        </span>
                      </h5>
                    </div>
                    <div className="col-md-8 d-flex gap-3 flex-wrap flex-sm-nowrap justify-content-md-end">
                      <form>
                        <div className="input-group input-group-merge input-group-custom">
                          <input
                            id="datatableSearch_"
                            onChange={handleFilter}
                            type="search"
                            name="search"
                            className="form-control"
                            placeholder="Search by name"
                            aria-label="Search orders"
                            required
                          />
                          <button type="submit" className="btn btn--primary">
                            Search
                          </button>
                        </div>
                      </form>
                      <div className="dropdown">
                        <ul className="dropdown-menu dropdown-menu-right">
                          <li>
                            <a
                              className="dropdown-item"
                              href="https://6valley.6amtech.com/seller/orders/export-order-data/all?date_type=this_year"
                            >
                              <img
                                width={14}
                                src="https://6valley.6amtech.com/public/assets/back-end/img/excel.png"
                                alt
                              />
                              Excel
                            </a>
                          </li>
                        </ul>
                      </div>
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
                          <th className="text-capitalize">SL</th>
                          <th className="text-capitalize">Image</th>
                          <th className="text-capitalize">Order ID</th>
                          <th className="text-capitalize">Order Date</th>

                          <th className="text-capitalize">Total amount</th>
                          <th className="text-capitalize">Order Status </th>
                          {/* <th className="text-capitalize">Payment method </th> */}
                          {/* <th className="text-center">Action</th> */}
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
<img class="mb-3 w-160" src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png" alt="Image Description"/>
<p class="mb-0 order-stats__subtitle">No Transaction found</p>
</div>
                  )}
                  <div className="d-flex justify-content-center mt-4">
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
  );
};

export default Confrimproducts;
