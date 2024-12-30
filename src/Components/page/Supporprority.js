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
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";

const Supporprority = () => {
  let navigate = useNavigate();
  const [bannerlist, setBannerlist] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [prorityname, setprorityname] = useState();
  const [solutions, setsolutions] = useState();

  const [statuss, setstatuss] = useState(true);
  const [priortid, setpriortid] = useState(null);
  const [solustion, setsolustion] = useState("");
  const [proritnamee, setproritnamee] = useState("");

  const updated = (e) => {
    e.preventDefault();
    const formData = {
      priorityId: priortid,
      solutionTime: solustion,
      priorityName: proritnamee,
    };

    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/priority/update`,
        formData,
        options
      )

      .then((res) => {
        getBannerlist();
        setstatuss(true);
        toast.success(res.data.message);
      })
      .catch((error) => {});
    setproritnamee("");
    setsolustion("");
    setpriortid("");
  };

  const submitdata = (e) => {
    e.preventDefault();
    const formData = {
      priorityName: prorityname,
      solutionTime: solutions,
    };
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/priority/save`,
        formData,
        options
      )
      .then((res) => {
        getBannerlist();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error("Some techincial error is getting please try again later");
      });
    setprorityname("");
    setsolutions("");
  };

  const remove = () => {
    setprorityname("");
    setsolutions("");
  };

  let token = secureLocalStorage.getItem("adminidtoken");

  let deletebanner = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Priority!",
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
              `${process.env.REACT_APP_API_KEY}admin/priority/deleteById/${item}`,
              options
            )
            .then((res) => {
              getBannerlist();
            })
            .catch((error) => {});
        };
        deletebannerimage();
        swal("Poof! Your Priority file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Priority is safe!");
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
      .get(`${process.env.REACT_APP_API_KEY}admin/priority/getList`, options)
      .then((res) => {
      
        setBannerlist(res.data.data);
      })
      .catch((error) => {});
  };

  const activedeactive = (item) => {
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/priority/changePriorityStatusById/${item}`,
        {},
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
      PriorityId: bannerdata?.priorityId,
      "Priority Name": bannerdata?.priorityName,
      "Solustion Time" : bannerdata?.solutionTime
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataSet);
    const workbook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Supportpriority_list.xlsx');
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Sr No.", "PriorityId", "Priority Name", "Solustion Time"];
    const tableRows = [];

    bannerlist.forEach((bannerdata, index) => {
      const customerData = [
        (activePage - 1) * itemsPerPage + index + 1,
        bannerdata?.priorityId,
        bannerdata?.priorityName,
        bannerdata?.solutionTime
        
      ];
      tableRows.push(customerData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Spportpriority List", 14, 15);
    doc.save("supportpriority_list.pdf");
  };
  const renderBannerData = (bannerdata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr id={`data-${index}`}>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">{bannerdata?.priorityId}</td>
        <td className="text-center text-capitalize">{bannerdata?.priorityName}</td>
        <td className="text-center">{bannerdata?.solutionTime}</td>
        <td className="text-center">{bannerdata?.createDateTime}</td>
        <td className="text-center">{bannerdata?.updatedDateTime}</td>

        {bannerdata?.active != true ? (
          <td className="text-center">
            <span className="badge badge-danger">INACTIVE</span>
          </td>
        ) : (
          <td className="text-center">
            <span className="badge badge-success">ACTIVE</span>
          </td>
        )}

        {bannerdata?.active != true ? (
          <td className="text-center">
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher mx-auto">
                <input
                  type="checkbox"
                  className="switcher_input"
                  name="status"
                  onChange={() => activedeactive(bannerdata?.priorityId)}
                />
                <span className="switcher_control" />
              </label>
            </form>
          </td>
        ) : (
          <td className="text-center">
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher mx-auto">
                <input
                  id="coupon_status9"
                  name="status"
                  defaultValue={1}
                  defaultChecked
                  type="checkbox"
                  className="switcher_input"
                  onChange={() => activedeactive(bannerdata?.priorityId)}
                />
                <span className="switcher_control" />
              </label>
            </form>
          </td>
        )}
        <td>
          <div className="d-flex gap-10 justify-content-center">
            <a
              href="#"
              onClick={() => {
                setstatuss(false);
                setpriortid(bannerdata?.priorityId);
                setsolustion(bannerdata?.solutionTime);
                setproritnamee(bannerdata?.priorityName);
              }}
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </a>
            <a
              onClick={() => {
                deletebanner(bannerdata?.priorityId);
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
                Answerd Tickets{" "}
                <span className="badge badge-soft-dark radius-50">
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
                        DEPARTMENT LIST{" "}
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
                          <th className="pl-xl-5">SR NO.</th>
                          <th>PRIORITY ID</th>
                          <th>PRIORITY NAME</th>
                          <th>SOLUTION TIME (HOURS)</th>
                          <th>CREATE DATE&TIME</th>
                          <th>LAST UPDATE DATE&TIME</th>
                          <th>STATUS</th>
                          <th>ACTIVATE&DEACTIVATE</th>
                          <th>ACTION</th>
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

export default Supporprority;
