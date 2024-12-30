import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import Pagination from "react-js-pagination";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Withdrow = () => {
  const [valueof, setvalueof] = useState();

  const [dataofwithdraw, setdataofwithdraw] = useState();
  const [count, setcount] = useState();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  useEffect(() => {
    getwithdrow();
  }, [valueof]);

  const getwithdrow = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}payout/request/getAllPayoutRequest`)
      .then((res) => {
        let filteredData = [];

        if (valueof == "Pending") {
          filteredData = res.data.data.filter(
            (item) => item.status == "Pending"
          );
        } else if (valueof == "Confirm") {
          filteredData = res.data.data.filter(
            (item) => item.status == "Confirm"
          );
        } else if (valueof == "Reject") {
          filteredData = res.data.data.filter(
            (item) => item.status == "Reject"
          );
        } else {
          filteredData = res.data.data;
        }

        setcount(filteredData?.length);
        setdataofwithdraw(filteredData);
      })
      .catch((error) => {});
  };

  const exportToExcel = () => {
    const dataSet = dataofwithdraw.map((data, index) => ({
      "Sr No.": (activePage - 1) * itemsPerPage + index + 1,
      Type: data?.type,
      Amount: data?.amount,
      Name: data?.accountHolderName,
      PaymentStatus: data?.status,
      "Verify Status": data?.bankVerifyStatus,
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
    saveAs(data, "withdrowrequest_list.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Sr No.",
      "Type",
      "Amount",
      "Name",
      "Payment Status",
      "Verify Status",
    ];
    const tableRows = [];

    dataofwithdraw.forEach((data, index) => {
      const customerData = [
        (activePage - 1) * itemsPerPage + index + 1,
        data?.type,
        data?.amount,
        data?.accountHolderName,
        data?.status,
        data?.bankVerifyStatus,
      ];
      tableRows.push(customerData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Withdrow Request List", 14, 15);
    doc.save("withdrowrequest_list.pdf");
  };

  const renderProductData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr>
        <td>{adjustedIndex}</td>
        <td>{data?.type}</td>
        <td>{data?.amount}</td>
        <td className="text-capitalize">
          {data?.accountHolderName ? (
            <>{data?.accountHolderName}</>
          ) : (
            <>Tronix</>
          )}
        </td>
        <td>
          {data?.requestDateTime?.slice(0, 10)}{" "}
          {data?.requestDateTime?.slice(11, 19)}
        </td>
        <td className="text-center">
          {data?.status == "Pending" ? (
            <label className="badge badge-soft-primary">Pending</label>
          ) : data.status == "Confirm" ? (
            <label className="badge badge-soft-success">Confirm</label>
          ) : (
            <label className="badge badge-soft-danger">Denied</label>
          )}
        </td>
        <td>
          {data?.bankVerifyStatus === true ? (
            <div className="d-flex justify-content-center">
              <span className="badge badge-soft-primary">Active</span>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <span className="badge badge-soft-danger">Deactive</span>
            </div>
          )}
        </td>
        <td>
          <div class="d-flex justify-content-center">
            <Link
              onClick={(e) => {
                secureLocalStorage.setItem("venderIds", data?.vendorId);
                secureLocalStorage.setItem("withdrawids", data?.id);
              }}
              class="btn btn-outline-info btn-sm square-btn"
              title="View"
              to="/withdrawview"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </div>
        </td>
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
              <img
                width={20}
                src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw-icon.png"
                alt=""
              />
              WITHDRAW
              <span className="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>
          <div className="row mb-5">
            <div className="col-md-12">
              <div className="card">
                <div className="table-responsive">
                  <table
                    id="datatable"
                    style={{ textAlign: "left" }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                  >
                    <thead className="thead-light thead-50 text-capitalize">
                      <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>payment Type</th>
                        <th>Request time</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Account</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Shiyon</td>
                        <td>24,000</td>
                        <td>online</td>
                        <td>12:00 To 4:00</td>
                        <td>Active</td>
                        <td>Current</td>

                        <td>
                          <div class="d-flex justify-content-center">
                            <button class="btn btn-info btn-sm mx-1">
                              <i class="fa fa-eye" aria-hidden="true"></i> View
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* {dataofwithdraw?.length > 0 ? (
                    <table
                      id="datatable"
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>SL</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Name</th>
                          <th>Request time</th>
                          <th className="text-center">Status</th>
                          <th className="text-center">Account</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                        </tr>
                        {dataofwithdraw
                          ?.slice(
                            (activePage - 1) * itemsPerPage,
                            activePage * itemsPerPage
                          )
                          .map((dataofwithdraw, index) =>
                            renderProductData(dataofwithdraw, index)
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
                      <p class="mb-0 order-stats__subtitle">
                        No Transaction found
                      </p>
                    </div>
                  )} */}
                  <div className="d-flex justify-content-center mt-4">
                    {dataofwithdraw?.length > itemsPerPage && (
                      <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={dataofwithdraw?.length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    )}
                  </div>
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

export default Withdrow;
