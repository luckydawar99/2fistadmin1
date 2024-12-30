import React, { useEffect, useState } from "react";
import "../sidebar.css";

import swal from "sweetalert";
import { Link } from "react-router-dom";

import secureLocalStorage from "react-secure-storage";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Sellerlist = () => {
  const [count, setcount] = useState();
  const [sellerlist, setSellerlist] = useState([]);
  const [filteredSellerList, setFilteredSellerList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  let token = secureLocalStorage.getItem("adminidtoken");



  let unblockseller = () => {
    swal({
      title: "Seller Status Changed",
      icon: "success",
    });
  };

  let unblock = (item) => {
    let options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/vendor/blockOrUnblockVnedorByVendorId/${item}`,
        {},
        options
      )
      .then((res) => {
        unblockseller();
        getsellerlist();
      })
      .catch((error) => { });
  };

  let vendoractive = (item) => {
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/vendor/changeStatusByVendorId/${item}`,
        {},
        options
      )
      .then((res) => {
        getsellerlist();
        toast.success(res.data.message);
      })
      .catch((error) => { });
  };

  useEffect(() => {
    getsellerlist();
  }, [0]);

  let getsellerlist = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/vendor/getList`, options)
      .then((res) => {
        console.log("resssss", res)
        setcount(res?.data?.data?.length);
        setSellerlist(res.data.data);
        setFilteredSellerList(res.data.data);
      })
      .catch((error) => { });
  };

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const result = sellerlist.filter(
      (item) =>
        item.mobileNumber?.toLowerCase().includes(searchTerm) ||
        item.email?.toLowerCase().includes(searchTerm) ||
        item.businessName?.toLowerCase().includes(searchTerm) ||
        item.name?.toLowerCase().includes(searchTerm)
    );
    setFilteredSellerList(result);
    setActivePage(1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setActivePage(1);
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const exportToExcel = () => {
    const dataSet = filteredSellerList.map((seller, index) => ({
      "Sr No.": (activePage - 1) * itemsPerPage + index + 1,
      "Vendor Id": seller.vendorId,
      Image: seller?.memberImageUrl,
      Name: seller?.name,
      "Vendor GenerateId": seller.vendorGenId,
      Email: seller?.email,
      "Bussiness Email": seller.businessEmail,
      "Acoount Status": seller?.active,
      "Block Status": seller?.block,
      "Date of Joining": seller.dateOfJoin,
      "Mobile No.": seller.businessMobile,
      Address: `${seller.address} (${seller.country}) (${seller.state}) (${seller.city})`,
      "Bussiness Address": seller.businessAddress,
      "Bussiness Description": seller.businessDescription,
      "AddharCard No.": seller.adharNumber,
      "Pin code": seller.pinCode,
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
    saveAs(data, "customer_list.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Sr No.",
      "Vendor Id",
      "Image",
      "Name",
      "Vendor GenerateId",
      "Email",
      "Bussiness Email",
      "Acoount Status",
      "Block Status",
      "Date of Joining",
      "Mobile No.",
      "Address",
      "Bussiness Address",
      "Bussiness Description",
      "AddharCard No.",
      "Pin code",
    ];
    const tableRows = [];

    filteredSellerList.forEach((seller, index) => {
      const customerData = [
        (activePage - 1) * itemsPerPage + index + 1,
        seller.vendorId,
        seller?.memberImageUrl,
        seller?.name,
        seller.vendorGenId,
        seller?.email,
        seller.businessEmail,
        seller?.active,
        seller?.block,
        seller.dateOfJoin,
        seller.businessMobile,
        `${seller.address} (${seller.country}) (${seller.state}) (${seller.city})`,
        seller.businessAddress,
        seller.businessDescription,
        seller.adharNumber,
        seller.pinCode,
      ];
      tableRows.push(customerData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Seller List", 14, 15);
    doc.save("seller_list.pdf");
  };
  //=============================Coordinator List Part Start================================>
  let [showcoordinatorList, setcoordinatorList] = useState([])
  useEffect(() => {
    get_coordinatorList()
  }, [])

  let get_coordinatorList = () => {
    let options = {
      headers: {
        token: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}coordinatorList`, options)
      .then((res) => {
        if (res.data.result == "true") {
          setcoordinatorList(res.data.data)
        }
      })
      .catch((error) => { });
  };

  const renderuserData = (usersdata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr id={`data-${index}`}>
        <td className="text-center">{adjustedIndex}</td>
        {/* blank-profile-picture.webp */}
        <td className="text-center">
          <Link to="/coordinator_details" onClick={() => { secureLocalStorage.setItem("coordinatorids", usersdata?._id); }}>
            {
              usersdata?.coordinatorProfile === " " || usersdata?.coordinatorProfile === null || usersdata?.coordinatorProfile === undefined ? (
                <img
                  src="./img/logo/blank-profile-picture.webp"
                />
              ) : usersdata?.coordinatorProfile?.startsWith("https://") ? (
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${usersdata?.coordinatorProfile}`} alt=""
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${usersdata?.coordinatorProfile}`} alt=""
                />
              )
            }
          </Link>
        </td>
        <td className="text-center">{usersdata?.coordinatorName}</td>
        <td className="text-center">{usersdata?.email}</td>
        <td className="text-center">{usersdata?.uniqueName}</td>

        <td className="text-center">{usersdata?.countryName}</td>
        <td className="text-center">{usersdata?.coordinatorWallet}</td>
        <td className="text-center">{usersdata?.createdAt}</td>
        <td className="text-center">{usersdata?.updatedAt}</td>
        {usersdata?.coordinatorStatus !== 0 ?
          <td className="text-center">
            <label className="badge badge-danger">BLOCKED</label>
          </td> : <td className="text-center">
            <label className="badge badge-success">ACTIVE</label>
          </td>}
        {usersdata?.coordinatorStatus !== 0 ? (
          <td className="text-center">
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher mx-auto">
                <input
                  type="checkbox"
                  className="switcher_input"
                  name="status"
                  onChange={() => activedeactive(usersdata)}
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
                  onChange={() => activedeactive(usersdata)}
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

              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <a onClick={(() => deletebanner())}
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </a>
            <Link
              to="/coordinator_details"
              onClick={() => {
                secureLocalStorage.setItem("coordinatorids", usersdata?._id);

              }}
              title="View"
              className="btn btn-outline-info btn-sm square-btn"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </div>
        </td>
      </tr>
    );
  };

  const activedeactive = (item) => {
    console.log(item)
    console.log(token)
    const Data = {
      coordinatorId: item?._id,
    };
    let options = {
      headers: {
        token: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}coordinatorBlock_unblock_api`,
        Data,
        options
      )
      .then((res) => {
        console.log(res)
        swal({
          title: (res.data.message),
          icon: "success",

        });
        get_coordinatorList();
      })
      .catch((error) => { });
  };

  let deletebanner = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this User data!",
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
              get_coordinatorList();
            })
            .catch((error) => { });
        };
        deletebannerimage();
        swal("Poof! Your user data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };
  // =====================================Coordinator LIst Part Start==========================
  return (
    <div>
      {/* <Header /> */}
      <Toaster />
      <div
        className="container row"
        style={{
          paddingLeft: "0px",
          paddingRight: "0px",
          marginLeft: "0px",
        }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img width={20} src="assets/officer.png" alt="" />
              COORDINATOR LIST
              <span className="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">

                {showcoordinatorList?.length > 0 ? (
                  <div className="table-responsive">
                    <table
                      id="datatable"
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>SR</th>
                          <th>PROFILE</th>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>UNIQUE NAME</th>
                          <th>COUNTRY</th>
                          <th>WALLET PAYMENT</th>
                          <th>CREATE DATE & TIME</th>
                          <th>LAST UPDATE DATE & TIME</th>
                          <th>STATUS</th>
                          <th>ACTION</th>
                          <th>CONTROLS</th>

                        </tr>
                      </thead>
                      <tbody>
                        {showcoordinatorList
                          .slice(
                            (activePage - 1) * itemsPerPage,
                            activePage * itemsPerPage
                          )
                          .map((usersdata, index) =>
                            renderuserData(usersdata, index)
                          )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div class="text-center p-4">
                    <img
                      class="mb-3 w-160"
                      src="./logo/default.png"
                      alt="Image Description"
                    />
                    <p class="mb-0 order-stats__subtitle">No data found</p>
                  </div>
                )}

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

export default Sellerlist;
