import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Sidebarr from "./../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";

const Productattribute = () => {
  const [coupon_list, setcoupon_list] = useState();

  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [count, setcount] = useState();
  const Navigate = useNavigate();
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setActivePage(1);
  };
  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    getcoupon_list();
  }, [0]);

  let getcoupon_list = () => {
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/vendor/getAllFunds`, options)
      .then((res) => {
       
        setcount(res.data.data.length);
        setcoupon_list(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    setFilteredCategoryList(coupon_list);
  }, [coupon_list]);
  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = coupon_list?.filter(
      (item) =>
        item?.vendorGenId?.toLowerCase().includes(searchTerm) ||
        item?.name?.toLowerCase().includes(searchTerm)
    );
    setFilteredCategoryList(result);
    setActivePage(1);
  };

  const deductfund = () => {
    Navigate("/coupanupdate");
  };
  const addfund = () => {
    Navigate("/failedToDelivery");
  };


  const exportToExcel = () => {
    const dataSet = filteredCategoryList.map((data, index) => ({
      "Sr No.": (activePage - 1) * itemsPerPage + index + 1,
      VendorId: data.vendorGenId,
      Name:data?.name,
      Narration: data?.narration,
      Amount:data?.amount,
      "Payment Status":data?.type,
      "Current Balance": data.currentBalance,
      
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataSet);
    const workbook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'vendorfund_list.xlsx');
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Sr No.", "VendorId", "Name", "Narration", "Amount", "Payment Status", "Current Balance"];
    const tableRows = [];

    filteredCategoryList.forEach((data, index) => {
      const customerData = [
        (activePage - 1) * itemsPerPage + index + 1,
        data.vendorGenId,
        data?.name,
        data?.narration,
        data?.amount,
        data?.type,
        data?.currentBalance
      ];
      tableRows.push(customerData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Vendor Fund List", 14, 15);
    doc.save("vendorfund_list.pdf");
  };

  const renderSubcategoryData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>
        <td>{data?.vendorGenId}</td>
        <td className="text-center text-capitalize">{data?.name}</td>
        <td className="text-capitalize text-center">2024-05-10 10:12PM</td>

        <td
          class="text-wrap"
          title=""
          data-toggle="tooltip"
          data-custom-class="darker-tooltip"
          data-original-title="Querries about latest deal about computer Develop ghkgfhjgfk"
        >
          <div class="line--limit-2 max-w-200 text-capitalize" style={{scrollbarWidth:'thin', overflowX:'hidden', height:'50px', textAlign: "justify" }}>
            {data?.narration}
          </div>
        </td>
        {/* <td class="line--limit-2 max-w-100" style={{textAlign:'justify'}}>{data?.narration}</td> */}
        <td className="text-center">{data?.amount?.toFixed(2)}</td>
        <td className="text-center">{data?.type}</td>
        <td className="text-center">{data?.currentBalance?.toFixed(2)}</td>
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
              <img width={20} src="assets/funding.png" alt="" />
              VENDOR FUND REPORT<span className="badge badge-soft-dark radius-50">
                          {count}
                        </span>
            </h2>
          </div>

          <div className="row mt-20 mb-5">
            <div className="col-md-12">
              <div className="card">
                <div className="px-3 py-4">
                  <div className="row justify-content-between align-items-center flex-grow-1">
                    <div className="col-sm-2 col-md-2 col-lg-4 mb-2 mb-sm-0">
                      <h5 className="mb-0 text-capitalize d-flex gap-2">
                        FUND REPORT
                        <span className="badge badge-soft-dark radius-50 fz-12">
                          {count}
                        </span>
                      </h5>
                    </div>
                    <div col-sm-2 col-md-2 col-lg-2>
                      <div className="input-group input-group-merge input-group-custom">
                        <input
                          type="search"
                          name="search"
                          className="form-control"
                          placeholder="Search by here"
                          onChange={handleFilter}
                        />
                        <button type="submit" className="btn btn--primary">
                          Search
                        </button>
                      </div>
                    </div>
                    {/* <div col-sm-2 col-md-2 col-lg-2>
                      
                      <button onClick={addfund} className="btn btn-primary">ADD FUND</button>
                    
                    
                </div>
                <div col-sm-2 col-md-2 col-lg-2>
                      
                      <button onClick={deductfund} className="btn btn-primary">DEDUCT FUND</button>
                     
                    
                </div> */}

                    <div col-sm-2 col-md-2 col-lg-2>
                      <div className="form-group">
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
                    </div>

                    <div className="col-sm-2 col-md-2 col-lg-2">
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

                <div className="table-responsive">
                  {filteredCategoryList?.length > 0 ? (
                    <table
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>SR NO.</th>
                          <th>VENDOR ID</th>
                          <th>VENDOR NAME</th>
                          <th>DATE&TIME</th>
                          <th>NARRATION ADDED TRONIX</th>
                          <th>AMOUNT</th>
                          <th>PAYMENT STATUS</th>
                          
                          
                          <th>BALANCE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCategoryList
                          .slice(
                            (activePage - 1) * itemsPerPage,
                            activePage * itemsPerPage
                          )
                          .map((subcategorylist, index) =>
                            renderSubcategoryData(subcategorylist, index)
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
                </div>
                <div className="table-responsive mt-4">
                  <div className="px-4 d-flex justify-content-lg-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="quick-view"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div
          className="modal-dialog modal-dialog-centered coupon-details"
          role="document"
        >
          <div className="modal-content" id="quick-view-modal">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <div className="coupon__details">
              <div className="coupon__details-left">
                <div className="text-center">
                  <h6 className="title" id="title">
                    free delivery
                  </h6>
                  <h6 className="subtitle">
                    Code : <span id="coupon_code">pcuw655ytg</span>
                  </h6>
                  <div className="text-capitalize">
                    <span>Free delivery</span>
                  </div>
                </div>
                <div className="coupon-info">
                  <div className="coupon-info-item">
                    <span>Minimum purchase :</span>
                    <strong id="min_purchase">$10.00</strong>
                  </div>
                  <div className="coupon-info-item">
                    <span>Start date : </span>
                    <span id="start_date">10th Jan 2024</span>
                  </div>
                  <div className="coupon-info-item">
                    <span>Expire date : </span>
                    <span id="expire_date">31st Dec 2027</span>
                  </div>
                  <div className="coupon-info-item">
                    <span>Discount bearer : </span>
                    <span id="expire_date">Vendor</span>
                  </div>
                </div>
              </div>
              <div className="coupon__details-right">
                <div className="coupon">
                  <img
                    src="https://6valley.6amtech.com/public/assets/back-end/img/free-delivery.png"
                    alt="Free delivery"
                    width={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productattribute;
