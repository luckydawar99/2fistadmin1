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

const EditMaincategory = () => {
  let navigate = useNavigate();
  const [bannerimage, setbannerimage] = useState();
  const [bannerlist, setBannerlist] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [mainCategory_name, setmainCategory_name] = useState();
  const [mainCategory_list, setmainCategory_list] = useState();
  const [categoryId, setcategoryId] = useState();

  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    mainCategorylist();
  }, [0]);
  let mainCategorylist = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/category/getCategoryList`,
        options
      )
      .then((res) => {
        setmainCategory_list(res.data);
      })
      .catch((error) => {});
  };
  const addcategorybanner = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", mainCategory_name);
    formData.append("categoryImage", bannerimage);
    formData.append("id", categoryId);
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/categoryBanner/saveCategoryBanner`,
        formData,
        options
      )
      .then((res) => {
        getBannerlist();
        toast.success(res.data.message);
      })
      .catch((error) => {});
    setcategoryId("");
    setbannerimage("");
    setmainCategory_name("");
  };

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
              `${process.env.REACT_APP_API_KEY}admin/categoryBanner/deleteCategoryBanner?id=${item}`,
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
      .get(
        `${process.env.REACT_APP_API_KEY}admin/categoryBanner/getAllCategoryBanner`,
        options
      )
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
      .put(
        `${process.env.REACT_APP_API_KEY}admin/categoryBanner/changeStatusCategoryBanner?id=${item}`,
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
      Category: bannerdata?.categoryName,
      
      Url: bannerdata?.categoryImageUrl,
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
    const tableColumn = ["Sr No.", "Category Name", "ImgUrl", "Status"];
    const tableRows = [];

    bannerlist.forEach((bannerdata, index) => {
      const customerData = [
        (activePage - 1) * itemsPerPage + index + 1,
        bannerdata?.categoryName,
        bannerdata?.categoryImageUrl,
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

        <td className="text-capitalize text-center">
          {bannerdata?.categoryName}
        </td>
        <td className="text-center">
          {bannerdata?.categoryImageUrl ? (
            bannerdata?.categoryImageUrl?.endsWith(".mp4") ||
            bannerdata?.categoryImageUrl.endsWith(".mov") ||
            bannerdata?.categoryImageUrl?.endsWith(".wmv") ||
            bannerdata?.categoryImageUrl?.endsWith(".flv") ||
            bannerdata?.categoryImageUrl?.endsWith(".avi") ||
            bannerdata?.categoryImageUrl?.endsWith(".avchd") ? (
              <ReactPlayer
                controls
                height={100}
                width={150}
                url={`${process.env.REACT_APP_IMG_URL}${bannerdata?.categoryImageUrl}`}
              />
            ) : (
              <img
                className="rounded"
                width={64}
                src={`${process.env.REACT_APP_IMG_URL}${bannerdata?.categoryImageUrl}`}
                alt="Banner image"
              />
            )
          ) : null}
        </td>
        <td className="text-center">{bannerdata?.createdDate}</td>
        <td className="text-center">{bannerdata?.updatedDate}</td>

        {bannerdata?.active !== true ? (
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
            <Link
              to="/cashcollected"
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                secureLocalStorage.setItem(
                  "categoryids",
                  bannerdata?.categoryId
                );

                secureLocalStorage.setItem(
                  "imgurl",
                  bannerdata?.categoryImageUrl
                );
                secureLocalStorage.setItem(
                  "categorynamee",
                  bannerdata?.categoryName
                );
                secureLocalStorage.setItem("categorynamid", bannerdata?.id);
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </Link>
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
                CATEGORY BANNER SETUP{" "}
                <span className="badge badge-soft-dark radius-50">
                  {bannerlist?.length}
                </span>
              </h2>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h5>ADD CATEGORY BANNER</h5>
                    <form onSubmit={addcategorybanner}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div>
                            <div className="form-group">
                              <label className="title-color">
                                Category <span className="text-danger">*</span>
                              </label>

                              <select
                                required
                                value={mainCategory_name}
                                onChange={(e) => {
                                  const selectedIndex = e.target.selectedIndex;
                                  const selectedCategoryId =
                                    e.target.options[
                                      selectedIndex
                                    ].getAttribute("data-categoryid");
                                  setmainCategory_name(e.target.value);
                                  setcategoryId(selectedCategoryId);
                                }}
                                className="form-control"
                              >
                                <option value="" disabled selected>
                                  Maincategory
                                </option>
                                {mainCategory_list?.map((data, index) => (
                                  <option
                                    key={index}
                                    value={data?.categoryName}
                                    data-categoryid={data?.categoryId}
                                  >
                                    {data?.categoryName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 d-flex flex-column justify-content-center">
                          <div className="form-group">
                            <center>
                              {bannerimage ? (
                                bannerimage?.name?.endsWith(".mp4") ||
                                bannerimage?.name?.endsWith(".mov") ||
                                bannerimage?.name?.endsWith(".wmv") ||
                                bannerimage?.name?.endsWith(".flv") ||
                                bannerimage?.name?.endsWith(".avi") ||
                                bannerimage?.name?.endsWith(".avchd") ? (
                                  <ReactPlayer
                                    controls
                                    className="upload-img-view"
                                    url={URL.createObjectURL(bannerimage)}
                                  />
                                ) : (
                                  <img
                                    className="upload-img-view"
                                    src={URL.createObjectURL(bannerimage)}
                                    alt="image"
                                  />
                                )
                              ) : (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src="https://6valley.6amtech.com/public/assets/back-end/img/900x400/img1.jpg"
                                  alt="image"
                                />
                              )}
                            </center>
                          </div>
                          <div className="custom-file text-left">
                            <input
                              onChange={(e) => {
                                setbannerimage(e.target.files[0]);
                              }}
                              type="file"
                              name="image"
                              className="custom-file-input"
                              accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff, .mp4, .mov, .wmv, .flv, .avi, .avchd|image/*"
                              required
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFileEg1"
                            >
                              Choose File <span className="text-danger">*</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2 mt-3 justify-content-end">
                        <button type="submit" className="btn btn--primary">
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" id="banner-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-4">
                    <div className="row gy-2 align-items-center">
                      <div className="col-sm-4 col-md-4 col-lg-4">
                        CATEGORY BANNER DATA
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

                          <th>CATEGORY NAME</th>
                          <th>BANNER IMAGE</th>
                          <th>CREATE DATE&TIME</th>
                          <th>LAST UPDATE</th>

                          <th>ACTIVE/DEACTIVE</th>
                          <th className="text-center">ACTION</th>
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

export default EditMaincategory;
