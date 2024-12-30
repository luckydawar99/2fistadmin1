import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import swal from "sweetalert";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";

import ReactPlayer from "react-player";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
const Addcallsupport = () => {
  let navigate = useNavigate();
  const [bannerlist, setBannerlist] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [number, setnumber] = useState();
  const [callid, setcallid] = useState();
  const [callnumber, setcallnumber] = useState();
  const [statuss, setstatuss] = useState(true);

  const remove = () => {
    setnumber("");
  };

  const updated = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("supportId", callid);
    formData.append("supportNumber", callnumber);

    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/callsupport/update`,
        formData,
        options
      )

      .then((res) => {
        getBannerlist();
        setstatuss(true);
        toast.success(res.data.message);
      })
      .catch((error) => {});
    setcallid("");
    setcallnumber("");
  };
  const submitdata = (e) => {
    e.preventDefault();

    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/callsupport/save/${number}`,
        {},
        options
      )
      .then((res) => {
        getBannerlist();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error("Some techincial error is getting please try again later");
      });
    setnumber("");
  };
  let token = secureLocalStorage.getItem("adminidtoken");

  let deletebanner = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Support no.!",
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
              `${process.env.REACT_APP_API_KEY}admin/callsupport/delete/${item}`,
              options
            )
            .then((res) => {
              getBannerlist();
            })
            .catch((error) => {});
        };
        deletebannerimage();
        swal("Poof! Your Support no. file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Support no. is safe!");
      }
    });
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
      .get(`${process.env.REACT_APP_API_KEY}admin/callsupport/getAll`, options)
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


  const exportToExcel = () => {
    const dataSet = bannerlist.map((bannerdata, index) => ({
      "Sr No.": (activePage - 1) * itemsPerPage + index + 1,
      "Support Number": bannerdata?.supportNumber,
     }));

    const worksheet = XLSX.utils.json_to_sheet(dataSet);
    const workbook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'SupportNumber_list.xlsx');
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Sr No.", "SupportNumber"];
    const tableRows = [];

    bannerlist.forEach((bannerdata, index) => {
      const customerData = [
        (activePage - 1) * itemsPerPage + index + 1,
        bannerdata?.supportNumber,
        
      ];
      tableRows.push(customerData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Support Number List", 14, 15);
    doc.save("supportnumber_list.pdf");
  };
  const renderBannerData = (bannerdata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr id={`data-${index}`}>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">{bannerdata?.supportNumber}</td>

        <td className="text-center">{bannerdata?.dateOfCreation}</td>
        <td className="text-center">{bannerdata?.updateDate}</td>

        <td>
          <div className="d-flex gap-10 justify-content-center">
            <a
              href="#"
              onClick={() => {
                setstatuss(false);
                setcallid(bannerdata?.supportId);
                setcallnumber(bannerdata?.supportNumber);
              }}
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </a>
            <a
              onClick={() => {
                deletebanner(bannerdata?.supportId);
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
                All Tickets <span className="badge badge-soft-dark radius-50">
                          {bannerlist?.length}
                        </span>
              </h2>
            </div>
      
            <div className="row" id="banner-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-3">
                    <div className="row gy-2 align-items-center">
                      <div className="col-sm-4 col-md-4 col-lg-4">
                        CALL SUPPORT LIST{" "}
                        <span className="badge badge-soft-dark radius-50 fz-12">
                          {bannerlist?.length}
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
                          <label>DOWNLOAD</label>
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
                    <table
                      id="columnSearchDatatable"
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th className="pl-xl-5 text-center">SR NO.</th>
                          <th className="text-center">SUPPORT NO.</th>
                          <th className="text-center">CREATE DATE&TIME</th>
                          <th className="text-center">UPDATE DATE&TIME</th>
                          <th className="text-center">ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td className="pl-xl-5">1</td>
                          <td>87676866DFF</td>
                          <td>VHGCGRDF55</td>
                          <td>GTSKY</td>
                          <td>PLAYING</td>
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

export default Addcallsupport;
