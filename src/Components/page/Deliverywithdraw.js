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
const Deliverywithdraw = () => {
  const [productlist, setproductlist] = useState([]);
  const [ProductListfilter, setProductListfilter] = useState([]);
  const [count, setcount] = useState();
  const [activePage, setActivePage] = useState(1);
  const [brandlist, setBrandlist] = useState([]);
  const [brandlistdetails, setBrandlistDetails] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [brand_name, setbrand_name] = useState();
  const handleDropdownToggle1 = () => {
    setBrandlistDetails(!brandlistdetails);
  };

  const handleBrandSelection = (selectedBrand) => {
    setbrand_name(selectedBrand);
    setBrandlistDetails(true);
  };

  const filteredBrandList = brandlist.filter((brandItem) =>
    brandItem?.brand?.some((brand) =>
      brand?.toLowerCase().includes(filterText.toLowerCase())
    )
  );

  useEffect(() => {
    getbrand_list();
  }, [0]);

  let getbrand_list = () => {
    let data = {
      categoryId: "65eddc05e73fd3071ed36c10",
    };

    axios
      .post(`http://103.104.74.215:3038/vender/api/brand_list`, data)
      .then((res) => {
        setBrandlist(res?.data?.data);
      })
      .catch((error) => {});
  };
  const itemsPerPage = 10;

  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    getproductlist();
  }, [0]);
  let getproductlist = () => {
    const options = {
      headers: {
        token: token,
      },
    };
    axios
      .get(
        `http://157.66.191.24:3038/admin/api/ProductList`,
        options
      )
      .then((res) => {

        setcount(res?.data?.data?.length);
        setproductlist(res.data.data);
      })
      .catch((error) => {});
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = productlist?.filter((item) =>
      item?.product_name?.toLowerCase().includes(searchTerm)
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
  const activedeactive = (item) => {
    const Data = {
      productId: item,
    };

    let options = {
      headers: {
        token: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/Add_advertisementProduct`,
        Data,
        options
      )
      .then((res) => {

        toast.success(res.data.message);
        getproductlist();
      })
      .catch((error) => {

      });
  };


 
  const renderProductData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <th scope="row">{adjustedIndex}</th>
      
        <td className="text-center cursor-pointer"><div className="form-control d-flex gap-2">7 <input className="gap-5" type="checkbox"/> Is Flat</div></td>
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
        <div className="col-lg-3 col-md-4">
          {/* <Sidebarr /> */}
        </div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-3">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img width={20}
                src="assets/commission.png"  alt=""
              />
              RECHARGE&BBPS COMMISSION SETTING
              <span class="badge badge-soft-dark radius-50 fz-14 ml-1">
                {count}
              </span>
            </h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-3">ADD RECHARGE&BBPS COMMISSION</h4>
                  <form
                    
                  >
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="YFPrIbFYlUsgcs6Ht4EEyCysWGBq8lmpLaBUW0q6"
                    />{" "}
                    <div className="row">
                    <div className="col-md-6">
                        <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 form-group">
                          <label
                            htmlFor="name"
                            className="title-color text-capitalize"
                          >
                            SELECT SERVICE <span className="text-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="title"
                            className="form-control"
                            id="title"
                            placeholder="COMMISION"
                            required
                          >
                            <option>PREPAID</option> 
                            <option>DTH</option> 
                            <option>FASTAG</option> 
                            <option>ELECTRIVITY</option> 
                            <option>LANDLINE</option>
                            <option>MUNICIPLE</option>
                            <option>INSURANCE</option>
                            <option>ALL BBPS</option> 
                          </select>
                        </div>
                        
                      </div>

                      <div className="col-md-6">
                        <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12 form-group">
                          <label
                            htmlFor="name"
                            className="title-color text-capitalize"
                          >
                            SELECT OPERATOR <span className="text-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="title"
                            className="form-control"
                            id="title"
                            placeholder="COMMISION"
                            required
                          >
                            <option>AIRTEL</option> 
                            <option>JIO</option> 
                            <option>IDEA</option> 
                            <option>ICICI FASTAG</option> 
                            <option>AXIS FASTAG</option>
                            <option>TATA POWER</option>
                            <option>TORENT POWER</option>
                            
                          </select>
                        </div>
                        
                      </div>


                     
                    </div>
                    <div className="d-flex align-items-center justify-content-end flex-wrap gap-10">
                      <button type="reset" className="btn btn-secondary px-4">
                        Reset
                      </button>
                      <button type="submit" className="btn btn--primary px-4">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-20 mb-5">
            <div className="col-md-12">
              <div className="card">
                <div className="px-3 py-4">
                  <div className="row align-items-center">
                    <div className="col-lg-4">
                      <form action="#" method="GET">
                        <div className="input-group input-group-merge input-group-custom">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </div>
                          </div>
                          <input
                            type="search"
                            name="search"
                            className="form-control"
                            placeholder="Search here..."
                            onChange={handleFilter}
                          />
                          <button type="submit" className="btn btn--primary">
                            Search
                          </button>
                        </div>
                      </form>
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
                          <th>LEVEL NO</th>
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
                  ) : (
<div class="text-center p-4">
<img class="mb-3 w-160" src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png" alt="Image Description"/>
<p class="mb-0 order-stats__subtitle">No data found</p>
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

export default Deliverywithdraw;









