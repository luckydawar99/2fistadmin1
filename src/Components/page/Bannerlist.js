import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import swal from "sweetalert";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";

import ReactPlayer from "react-player";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Bannerlist = () => {
  let navigate = useNavigate();
  const [bannerlist, setBannerlist] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  let banneredit = () => {
    navigate(`/editbannerlist`);
  };

  let token = secureLocalStorage.getItem("adminidtoken");

  let deletebanner = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this banner file!",
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
              `${process.env.REACT_APP_API_KEY}admin/banners/delete/${item}`,
              options
            )
            .then((res) => {
              getBannerlist();
            })
            .catch((error) => {});
        };
        deletebannerimage();
        swal("Poof! Your banner file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your banner is safe!");
      }
    });
  };

  let add_banner = () => {
    navigate(`/add_banner`);
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
      .get(`${process.env.REACT_APP_API_KEY}admin/banners/getList`, options)
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
        `${process.env.REACT_APP_API_KEY}admin/banners/activeBannerStatusByImageId/${item}`,
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
      Type: bannerdata?.type,
      Title: bannerdata?.title,
      Url: bannerdata?.imageUrl,
      BannerStatus: bannerdata?.active,
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
    saveAs(data, "banner_list.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Sr No.", "Type", "Title", "ImgUrl", "Status"];
    const tableRows = [];

    bannerlist.forEach((bannerdata, index) => {
      const customerData = [
        (activePage - 1) * itemsPerPage + index + 1,
        bannerdata?.type,
        bannerdata?.title,
        bannerdata?.imageUrl,
        bannerdata?.active,
      ];
      tableRows.push(customerData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Banner List", 14, 15);
    doc.save("banner_list.pdf");
  };
  const renderBannerData = (bannerdata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr id={`data-${index}`}>
        <td className="text-center">{adjustedIndex}</td>
        <td>{bannerdata?.type}</td>

        <td className="text-capitalize text-center">{bannerdata?.title}</td>
        <td className="text-center">
          {bannerdata?.imageUrl ? (
            bannerdata?.imageUrl?.endsWith(".mp4") ||
            bannerdata?.imageUrl.endsWith(".mov") ||
            bannerdata?.imageUrl?.endsWith(".wmv") ||
            bannerdata?.imageUrl?.endsWith(".flv") ||
            bannerdata?.imageUrl?.endsWith(".avi") ||
            bannerdata?.imageUrl?.endsWith(".avchd") ? (
              <ReactPlayer
                controls
                height={100}
                width={150}
                url={`${process.env.REACT_APP_VIDEO_URL}${bannerdata?.imageUrl}`}
              />
            ) : (
              <img
                className="rounded"
                width={64}
                src={`${process.env.REACT_APP_IMG_URL}${bannerdata?.imageUrl}`}
                alt="Banner image"
              />
            )
          ) : null}
        </td>
        <td className="text-center">{bannerdata?.createdDate}</td>
        <td className="text-center">{bannerdata?.updatedDate}</td>

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
                  onChange={() => activedeactive(bannerdata?.id)}
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
                  onChange={() => activedeactive(bannerdata?.id)}
                />
                <span className="switcher_control" />
              </label>
            </form>
          </td>
        )}

        <td>
          <div className="d-flex gap-10 justify-content-center">
            <span
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                banneredit(
                  secureLocalStorage.setItem("banner_id", bannerdata?.id),
                  secureLocalStorage.setItem("type", bannerdata.type),
                  secureLocalStorage.setItem("img", bannerdata?.imageUrl),
                  secureLocalStorage.setItem("title", bannerdata?.title),
                  secureLocalStorage.setItem(
                    "redirectUrl",
                    bannerdata?.redirectUrl
                  )
                );
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <a
              onClick={() => {
                deletebanner(bannerdata?.id);
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
                <img width={20} src="assets/banner.png" alt="Banner icon" />
                BANNER SETUP{" "}
                <span className="badge badge-soft-dark radius-50">
                  {bannerlist?.length}
                </span>
              </h2>
            </div>

            <div className="row" id="banner-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-4">
                    <div className="row gy-2 align-items-center">
                      <div className="col-sm-4 col-md-4 col-lg-4">
                        BANNER DATA
                        <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                          {bannerlist?.length}
                        </span>
                      </div>

                      <div className="col-sm-8 col-md-8 col-lg-8 d-flex justify-content-end flex-wrap">
                        <div className="form-group ">
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
                            <option value="">Select Format</option>
                            <option value="excel">EXCEL</option>
                            <option value="pdf">PDF</option>
                          </select>
                        </div>
                        &nbsp;
                        <div className=" d-flex justify-content-end flex-wrap">
                          <div className="form-group">
                            <button
                              onClick={add_banner}
                              id="main-banner-add"
                              className="btn btn--primary"
                            >
                              <i class="fa fa-plus" aria-hidden="true"></i> ADD
                              BANNER
                            </button>
                          </div>
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
                          <th>TYPE</th>
                          <th>BANNER TITLE</th>
                          <th>BANNER IMAGE</th>
                          <th>CREATE DATE&TIME</th>
                          <th>LAST UPDATE</th>

                          <th>ACTIVE/DEACTIVE</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
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
                  {/* <div className="table-responsive mt-4">
                    <div className="px-4 d-flex justify-content-lg-center">
                      <div className="d-flex justify-content-center mt-4">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={itemsPerPage}
                          totalItemsCount={bannerlist ? bannerlist.length : 0}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bannerlist;
