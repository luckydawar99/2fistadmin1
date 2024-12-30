import React, { useEffect, useState } from "react";
import "../sidebar.css";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
const Alltransication = () => {
  const [valueof, setvalueof] = useState();

  const [dataofwithdraw, setdataofwithdraw] = useState();
  const [count, setcount] = useState();
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  


  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  let token = secureLocalStorage.getItem("adminidtoken");
  useEffect(() => {
    getwithdrow();
  }, [valueof]);

  const getwithdrow = () => {
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/transaction-history/get`,
        options
      )
      .then((res) => {

        let filteredData = [];

        if (valueof == "FAILED") {
          filteredData = res.data.data.filter(
            (item) => item?.transactionStatus == "FAILED"
          );
        } else if (valueof == "SUCCESS") {
          filteredData = res.data.data.filter(
            (item) => item?.transactionStatus == "SUCCESS"
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
      TransicationId: data.transactionId,
      Amount: data.amount,
      "Payment Mode": data.paymentMode,
      "Bussniess Name": data.businessName,
      "Member Name": data.memberName,
      MemberId: data.memberId,
      Type: data.type,
      "Vendor Name": data.vendorName,
      "Vendor GenerateId": data.vendorGenId,
      "Transication Date": data.transactionDateTime,
      "Transication Status": data.transactionStatus,
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
    saveAs(data, "alltransication_list.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Sr No.",
      "TransicationId",
      "Amount",
      "Payment Mode",
      "Bussniess Name",
      "Member Name",
      "MemberId",
      "Type",
      "Vendor Name",
      "Vendor GenerateId",
      "Transication Date",
      "Transication Status",
    ];
    const tableRows = [];

    dataofwithdraw.forEach((data, index) => {
      const customerData = [
        (activePage - 1) * itemsPerPage + index + 1,
        data.transactionId,
        data.amount,
        data.paymentMode,
        data.businessName,
        data.memberName,
        data.memberId,
        data.type,
        data.vendorName,
        data.vendorGenId,
        data.transactionDateTime,
        data.transactionStatus,
      ];
      tableRows.push(customerData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Transication List", 14, 15);
    doc.save("transication_list.pdf");
  };

  const renderProductData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr>
        <td>{adjustedIndex}</td>
        <td>{data?.transactionId}</td>
        <td className="text-center">₹{data?.amount?.toFixed(2)}</td>
        <td className="text-center">₹{data?.adminReceived?.toFixed(2)}</td>

        
        <td className="text-center">{data?.paymentMode}</td>
        <td>{data?.type}</td>
        <td className="text-capitalize text-center">{data?.businessName}</td>
        <td className="text-center text-capitalize">{data?.memberName}</td>
        <td className="text-center">{data?.memberId}</td>
        <td className="text-center text-capitalize">{data?.vendorName}</td>
        <td className="text-center">{data?.vendorGenId}</td>
        <td className="text-center">{data?.transactionDateTime}</td>
        <td className="text-center">
          {data?.transactionStatus == "SUCCESS" ? (
            <label className="badge badge-soft-success">
              {data?.transactionStatus}
            </label>
          ) : (
            <label className="badge badge-soft-danger">
              {data?.transactionStatus}
            </label>
          )}
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
              <img width={20} src="assets/exchange.png" alt="" />
              ALL TRANSACTION
              <span className="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>
          <div className="row mb-5">
            <div className="col-md-12">
              <div className="card">
                <div className="table-responsive">
                  {dataofwithdraw?.length > 0 ? (
                    <table
                      id="datatable"
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>SL</th>
                          <th>Transaction Id</th>
                          <th>Amount</th>
                          <th>Admin Charge</th>
                          <th>Payment Mode</th>
                          <th>Type</th>
                          <th>Business Name</th>
                          <th>Member Name</th>
                          <th>Member Id</th>
                          <th>Vendor Name</th>
                          <th>Vendor Id</th>
                          <th>Payment time</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
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
                      <p class="mb-0 order-stats__subtitle">No Details found</p>
                    </div>
                  )}
                  {/* <div className="d-flex justify-content-center mt-4">
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
                  </div> */}
                    
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

export default Alltransication;
