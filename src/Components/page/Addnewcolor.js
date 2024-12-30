import React, { useEffect, useState } from "react";
import Header from "../Header";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import Pagination from "react-js-pagination";
import toast, { Toaster } from "react-hot-toast";

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";

const Addnewcolor = () => {
  let navigate = useNavigate();

  let subcetagoryedit = () => {
    navigate("/editsubcetagory");
  };

  const [bankName, setbankName] = useState();
  const [Namecountry, setNamecountry] = useState();

  const [subcategorylist, setsubcategorylist] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
  const [count, setcount] = useState();
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [status, setstatus] = useState(false);
  let token = secureLocalStorage.getItem("adminidtoken");
  const [idd, setidd] = useState();
  const [nameofcountry, setnameofcountry] = useState();

  const subcategorydatahandle = (e) => {
    e.preventDefault();

    const formData = {
      countryName: Namecountry,
    };

    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/countrymaster/create`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getbanklistt();
      })
      .catch((error) => {});

    setNamecountry("");
  };

  let updatecharges = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", idd);
    formData.append("countryName", nameofcountry);
    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/countrymaster/updateName`,
        formData,
        options
      )
      .then((response) => {
        setstatus(false);
        getbanklistt();
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error("You Entered Envlid Inoformation");
        }
      });
  };

  const cleardata = () => {
    setNamecountry("");

    return;
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setActivePage(1);
  };
  useEffect(() => {
    getbanklistt();
  }, [0]);
  let getbanklistt = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/countrymaster/getList`,
        options
      )
      .then((res) => {
       
        setcount(res?.data?.data?.length);

        setsubcategorylist(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    setFilteredCategoryList(subcategorylist);
  }, [subcategorylist]);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = subcategorylist.filter((item) =>
      item?.countryName?.toLowerCase().includes(searchTerm)
    );
    setFilteredCategoryList(result);
    setActivePage(1);
  };

  const activedeactive = (item) => {
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/countrymaster/changeStatusById/${item}`,
        {},

        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getbanklistt();
      })
      .catch((error) => {});
  };

  let deletebanner = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let deletebannerimage = () => {
          const formData = new FormData();
          formData.append("id", item);

          const options = {
            headers: {
              Authorization: token,
            },
          };
          axios
            .delete(
              `${process.env.REACT_APP_API_KEY}admin/countrymaster/delete?id=${item}`,
              options,
              formData
            )
            .then((res) => {
              getbanklistt();
            })
            .catch((error) => {});
        };
        deletebannerimage();
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };


  const exportToExcel = () => {
    const dataSet = filteredCategoryList.map((data, index) => ({
      "Sr No.": (activePage - 1) * itemsPerPage + index + 1,
      "Country Name": data?.countryName,
      
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataSet);
    const workbook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'countryname.xlsx');
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Sr No.", "Country Name"];
    const tableRows = [];

    filteredCategoryList.forEach((data, index) => {
      const customerData = [
        (activePage - 1) * itemsPerPage + index + 1,
        data?.countryName,
        
      ];
      tableRows.push(customerData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Country Name", 14, 15);
    doc.save("country_list.pdf");
  };

  const renderSubcategoryData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">{data?.id}</td>
        <td className="text-center text-capitalize">{data?.countryName}</td>

        <td className="text-center">{data?.createdDateTime}</td>
        <td className="text-center">{data?.updatedDateTime}</td>
        <td className="text-center">
          {data.active === true ? (
            <label className="badge badge-success cursor-pointer">ACTIVE</label>
          ) : (
            <label className="badge badge-danger cursor-pointer">
              INACTIVE
            </label>
          )}
        </td>

        {data?.active != true ? (
          <td className="text-center">
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher mx-auto">
                <input
                  type="checkbox"
                  className="switcher_input"
                  name="status"
                  onChange={() => activedeactive(data?.id)}
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
                  onChange={() => activedeactive(data?.id)}
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
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                setidd(data?.id);
                setnameofcountry(data?.countryName);
                setstatus(true);
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </a>
            <a
              onClick={() => {
                deletebanner(data?.id);
              }}
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
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
        <div className="col-lg-3 col-md-4" style={{ paddingLeft: "0px" }}>
          {/* <Sidebarr /> */}
        </div>

        <div
          className="col-lg-9 col-md-8"
          style={{ paddingLeft: "0px", marginTop: "60px" }}
        >
          <div className="mt-3">
            <div className="mb-3">
              <h2 className="h1 mb-0 d-flex gap-2">
                <img width={20} src="assets/app.png" alt />
                COUNTRY MASTER<span className="badge badge-soft-dark radius-50">
                            {count}
                          </span>
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    {status === true ? (
                      <form onSubmit={updatecharges}>
                        <input type="hidden" />

                        <div className="row">
                          <div className="col-md-6 col-xl-6 col-sm-12 col-lg-6 d-flex gap-3">
                            <div className="w-100">
                              <div
                                className="form-group  lang_form"
                                id="en-form"
                              >
                                <label
                                  className="title-color"
                                  htmlFor="exampleFormControlInput1"
                                >
                                  COUNTRY NAME
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  value={nameofcountry}
                                  onChange={(e) => {
                                    setnameofcountry(e.target.value);
                                  }}
                                  type="text"
                                  name="name[]"
                                  className="form-control"
                                  placeholder="New COUNTRY NAME"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-wrap gap-2 justify-content-end">
                          <button type="submit" className="btn btn--primary">
                            Update
                          </button>
                        </div>
                      </form>
                    ) : null}
                    <form onSubmit={subcategorydatahandle}>
                      <input type="hidden" />

                      <div className="row">
                        <div className="col-md-6 col-xl-6 col-sm-12 col-lg-6 d-flex gap-3">
                          <div className="w-100">
                            <div className="form-group  lang_form" id="en-form">
                              <label
                                className="title-color"
                                htmlFor="exampleFormControlInput1"
                              >
                                COUNTRY NAME
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                value={Namecountry}
                                onChange={(e) => {
                                  setNamecountry(e.target.value);
                                }}
                                type="text"
                                name="name[]"
                                className="form-control"
                                placeholder="New COUNTRY NAME"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <a
                          onClick={cleardata}
                          href="#"
                          class="btn btn-secondary px-5"
                        >
                          Reset
                        </a>

                        <button type="submit" className="btn btn--primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-20 mb-5" id="cate-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-4">
                    <div className="row align-items-center">
                      <div className="col-sm-4 col-md-4 col-lg-4 mb-2 mb-sm-0">
                        <h5 className="text-capitalize d-flex gap-2">
                          COUNTRY LIST
                          <span className="badge badge-soft-dark radius-50 fz-12">
                            {count}
                          </span>
                        </h5>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-4">
                        <div className="input-group input-group-merge input-group-custom">
                          <input
                            type="search"
                            name="search"
                            className="form-control"
                            placeholder="Search by here.."
                            onChange={handleFilter}
                          />
                          <button type="submit" className="btn btn--primary">
                            Search
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-4 col-lg-2">
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
                      <div className="col-sm-12 col-md-4 col-lg-2">
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
                    <option value="">Download
                       Format</option>
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
                            <th>COUNTRY ID</th>
                            <th>COUNTRY NAME</th>
                            <th>CREATE DATE&TIME</th>
                            <th>LAST UPDATE DATE&TIME</th>
                            <th>STATUS</th>
                            <th>ACTIVE&DEACTIVE</th>

                            <th className="text-center">ACTION</th>
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
                    <div className="d-flex justify-content-lg-end"></div>
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

export default Addnewcolor;
