import React, { useEffect, useState } from "react";
import Header from "../Header";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

import toast, { Toaster } from "react-hot-toast";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { FcApprove } from "react-icons/fc";
const Products_list = () => {
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

    const formData = new FormData();
    formData.append("payMode", Namecountry);
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}payout/request/paymode/save`,
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
    formData.append("paymentMode", nameofcountry);
    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_API_KEY}payout/request/paymode/update`,
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
        `${process.env.REACT_APP_API_KEY}payout/request/getPayMode`,
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
      item?.payMode?.toLowerCase().includes(searchTerm)
    );
    setFilteredCategoryList(result);
    setActivePage(1);
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
              `${process.env.REACT_APP_API_KEY}payout/request/paymode/delete/${item}`,
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
      PaymodeId: data?.id,
      "Paymode Name": data?.payMode,
      
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataSet);
    const workbook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Paymodedata_list.xlsx');
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Sr No.", "PaymodeId", "Paymode Name"];
    const tableRows = [];

    filteredCategoryList.forEach((data, index) => {
      const customerData = [
        (activePage - 1) * itemsPerPage + index + 1,
        data?.id,
        data?.payMode,
        
      ];
      tableRows.push(customerData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Paymode List", 14, 15);
    doc.save("paymode_list.pdf");
  };

  const renderSubcategoryData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">{data?.id}</td>
        <td className="text-center text-capitalize">{data?.payMode}</td>

        <td className="text-center">{data?.createdDate}</td>
        <td className="text-center">{data?.updatedDate}</td>

        <td>
          <div className="d-flex gap-10 justify-content-center">
            <a
              href="#"
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                setidd(data?.id);
                setnameofcountry(data?.payMode);
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
      {/* <Header /> */}
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
        <div className="page-header pb-0 border-0 mb-3 mt-3 ">
              <div className="d-flex flex-wrap gap-2 align-items-center mb-3 mt-3 pl-3">
                <h2 className="h1 mb-0 d-flex gap-2">
                <FcApprove className='mt-1' style={{ fontSize: "18px" }} />
                  Transaction ID
                </h2>
              </div>
            </div>
          {/* <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex gap-2 align-items-center">
              <img
                width={20}
                src="assets/officer.png"
                alt
              />
              Vendor details
            </h2>
          </div> */}
          {/* <div className="flex-between d-sm-flex row align-items-center justify-content-between mb-2 mx-1">
            <div></div>
          </div> */}
          {/* <div className="page-header">
            {/* <div className="flex-between row mx-1">
                                <div>
                                    <h1 className="page-header-title">Digital House</h1>
                                </div>
                            </div> */}
            {/* <div className="js-nav-scroller hs-nav-scroller-horizontal">
              <ul className="nav nav-tabs flex-wrap page-header-tabs">
                <li className="nav-item">
                  <Link className="nav-link " to="/sallerdetails">
                    Overview
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/sallerorder">
                    Transaction
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/sallerproducts">
                    Data
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sallersatting">
                    Setting
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/sallertransacation">
                    Transaction
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sallerreview">
                    Review
                  </Link>
                </li>
              </ul>
            </div> */}
          {/* </div>  */}
          <div className="content container-fluid p-0">
            <div className="row">
              <div className="col-md-12">
                {/* <div className="card">
                  <div className="px-3 py-4">
                    <div className="row align-items-center">
                      <div className="col-lg-4 mb-3 mb-lg-0">
                        <h5 className="mb-0 text-capitalize d-flex gap-1 align-items-center">
                          Transaction table
                          <span className="badge badge-soft-dark fz-12">1</span>
                        </h5>
                      </div>
                      <div className="col-md-6 col-lg-4 mb-3 mb-md-0">
                        <form action="" method="GET">
                          <div className="input-group input-group-merge input-group-custom">
                            <input
                              id="datatableSearch_"
                              type="search"
                              name="search"
                              className="form-control"
                              placeholder="Search by orders id or transaction id"
                            />
                            <button type="submit" className="btn btn--primary">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <form method="GET">
                          <div className="d-flex justify-content-end align-items-center gap-10">
                            <select className="form-control" name="status">
                              <option value={0} selected disabled>
                                ---Select status---
                              </option>
                              <option className="text-capitalize" value="all">
                                All{" "}
                              </option>
                              <option
                                className="text-capitalize"
                                value="disburse"
                              >
                                Disburse{" "}
                              </option>
                              <option className="text-capitalize" value="hold">
                                Hold
                              </option>
                            </select>
                            <button type="submit" className="btn btn-success">
                              Filter
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="table-responsive">
                  <table
                    id="datatable"
                    style={{ textAlign: "left" }}
                    className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                  >
                    <thead className="thead-light thead-50 text-capitalize">
                      <tr>
                        <th>SL</th>
                        <th>Vendor name</th>
                        <th>Customer name</th>
                        <th>Order id</th>
                        <th>Transaction id</th>
                        <th>Order amount</th>
                        <th>Vendor amount</th>
                        <th>Admin commission</th>
                        <th>Received by</th>
                        <th>Delivered by</th>
                        <th>Delivery charge</th>
                        <th>Payment method</th>
                        <th>Tax</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Digital Vendor</td>
                        <td>fatema subarna</td>
                        <td>100124</td>
                        <td>4030-F7M9R-1665555309</td>
                        <td>$5,700.00</td>
                        <td>$4,845.00</td>
                        <td>$855.00</td>
                        <td>admin</td>
                        <td>admin</td>
                        <td>$10.00</td>
                        <td>cash on delivery</td>
                        <td>$120.00</td>
                        <td className="text-center">
                          <span className="badge badge-soft-success">
                            Disburse
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>1</td>
                        <td>Digital Vendor</td>
                        <td>fatema subarna</td>
                        <td>100124</td>
                        <td>4030-F7M9R-1665555309</td>
                        <td>$5,700.00</td>
                        <td>$4,845.00</td>
                        <td>$855.00</td>
                        <td>admin</td>
                        <td>admin</td>
                        <td>$10.00</td>
                        <td>cash on delivery</td>
                        <td>$120.00</td>
                        <td className="text-center">
                          <span className="badge badge-soft-success">
                            Disburse
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Digital Vendor</td>
                        <td>fatema subarna</td>
                        <td>100124</td>
                        <td>4030-F7M9R-1665555309</td>
                        <td>$5,700.00</td>
                        <td>$4,845.00</td>
                        <td>$855.00</td>
                        <td>admin</td>
                        <td>admin</td>
                        <td>$10.00</td>
                        <td>cash on delivery</td>
                        <td>$120.00</td>
                        <td className="text-center">
                          <span className="badge badge-soft-success">
                            Disburse
                          </span>
                        </td>
                      </tr> <tr>
                        <td>1</td>
                        <td>Digital Vendor</td>
                        <td>fatema subarna</td>
                        <td>100124</td>
                        <td>4030-F7M9R-1665555309</td>
                        <td>$5,700.00</td>
                        <td>$4,845.00</td>
                        <td>$855.00</td>
                        <td>admin</td>
                        <td>admin</td>
                        <td>$10.00</td>
                        <td>cash on delivery</td>
                        <td>$120.00</td>
                        <td className="text-center">
                          <span className="badge badge-soft-success">
                            Disburse
                          </span>
                        </td>
                      </tr> <tr>
                        <td>1</td>
                        <td>Digital Vendor</td>
                        <td>fatema subarna</td>
                        <td>100124</td>
                        <td>4030-F7M9R-1665555309</td>
                        <td>$5,700.00</td>
                        <td>$4,845.00</td>
                        <td>$855.00</td>
                        <td>admin</td>
                        <td>admin</td>
                        <td>$10.00</td>
                        <td>cash on delivery</td>
                        <td>$120.00</td>
                        <td className="text-center">
                          <span className="badge badge-soft-success">
                            Disburse
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default Products_list;
