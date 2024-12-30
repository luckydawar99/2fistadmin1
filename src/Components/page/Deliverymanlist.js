import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Pagination from "react-js-pagination";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
const Deliverymanlist = () => {
  const [status, setstatus] = useState();
  const [count, setcount] = useState();
  const [sellerlist, setSellerlist] = useState([]);
  const [filteredSellerList, setFilteredSellerList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  let token = secureLocalStorage.getItem("adminidtoken");

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(sellerlist);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Product List");

    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    if (document.body) {
      document.body.appendChild(link);

      link.setAttribute("href", url);
      link.setAttribute("download", "sellerlist.xlsx");

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else {
    }
  };

  let unblockseller = () => {
    swal({
      title: "Seller Status Changed",
      icon: "success",
    });
  };

  let unblock = (item) => {
    let unblockdata = {
      sallerId: item,
    };

    let options = {
      headers: {
        token: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/sallerBlock_unblock_api`,
        unblockdata,
        options
      )
      .then((res) => {
        unblockseller();
        getsellerlist();
      })
      .catch((error) => {});
  };

  let vendoractive = (item, status) => {
    let sellerdata = {
      driverId: item,
      status: status,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/approveDriver`,
        sellerdata
      )
      .then((res) => {
        getsellerlist();
        toast.success(res.data.message);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getsellerlist();
  }, [0]);

  let getsellerlist = () => {
    axios
      .get(`http://157.66.191.24:3038/admin/api/userQueryList`)
      .then((res) => {
        setcount(res?.data?.data?.length);
        setSellerlist(res.data.data);
        setFilteredSellerList(res.data.data);
      })
      .catch((error) => {});
  };

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const result = sellerlist.filter((item) =>
      item.fname?.toLowerCase().includes(searchTerm)
    );
    setFilteredSellerList(result);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderSellerData = (seller, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">Super</td>
        <td className="text-center">{seller?.fname}</td>
        <td className="text-center">
          <div className="d-flex flex-column gap-1">
            <div>
              <a
                className="title-color hover-c1"
                href={`mailto:${seller?.email}`}
              >
                <strong>{seller?.email}</strong>
              </a>
            </div>
          </div>
        </td>
        <td className="text-center">ER7485</td>
        <td className="text-center">MAN@74415</td>
        <td className="text-center">{seller?.phone}</td>
        <td className="text-center">2024-02-10 12:41PM</td>
        <td className="text-center">2024-04-21 10:11PM</td>
        <td>
          <Link to="/rating" className="badge fz-14 badge-soft-success">
            <span>Active</span>
          </Link>
        </td>
        <td>
          <form
            action="https://6valley.6amtech.com/vendor/products/status-update"
            method="post"
            data-from="product-status"
            id="product-status54-form"
            className="admin-product-status-form"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="2nohFUff9chQ6XVV3eOZHrzANIB1CpRwY18RYsMm"
              autoComplete="off"
            />{" "}
            <input type="hidden" name="id" defaultValue={54} />
            <label className="switcher mx-auto">
              <input
                type="checkbox"
                className="switcher_input toggle-switch-message"
                name="status"
                id="product-status54"
                defaultValue={1}
                defaultChecked
                data-modal-id="toggle-status-modal"
                data-toggle-id="product-status54"
                data-on-image="product-status-on.png"
                data-off-image="product-status-off.png"
                data-on-title="Want to Turn ON Secret Covered in Sand Comic book pdf Status"
                data-off-title="Want to Turn OFF Secret Covered in Sand Comic book pdf Status"
                data-on-message="<p>If enabled this product will be available on the website and customer app</p>"
                data-off-message="<p>If disabled this product will be hidden from the website and customer app</p>"
              />
              <span className="switcher_control" />
            </label>
          </form>
        </td>

        <td>
          <div className="d-flex justify-content-center align-items-center gap-10">
            <Link
              to="/updatedeliveryman"
              className="btn btn-outline--primary btn-sm edit"
              title="Edit"
              href="https://6valley.6amtech.com/admin/delivery-man/update/10"
            >
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </Link>
          </div>
        </td>
      </tr>
    );
  };

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
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img
                width={20}
                src="assets/businessman.png"
                alt=""
              />
              EMPLOYEE MASTER
              <span className="badge badge-soft-dark radius-50 fz-12">
                {count}
              </span>
            </h2>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">
                <div className="px-3 py-4">
                  <div className="d-flex justify-content-between gap-10 flex-wrap align-items-center">
                    <div className>
                      <form>
                        <div className="input-group input-group-merge input-group-custom">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </div>
                          </div>
                          <input
                            type="search"
                            name="searchValue"
                            className="form-control"
                            placeholder="DATE BETWEEN, EMAIL, NAME, STATUS,ACTIVE&DEACTIVE"
                            aria-label="Search orders"
                            onChange={handleFilter}
                          />
                          <button type="submit" className="btn btn--primary">
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <select className="form-control">
                        <option>
                          <div className="dropdown text-nowrap">
                            <button
                              onClick={handleExport}
                              type="button"
                              className="btn btn-outline--primary"
                              data-toggle="dropdown"
                            >
                              <i class="fa fa-download" aria-hidden="true"></i>{" "}
                              EXCEL
                            </button>
                          </div>
                        </option>
                        <option>
                          <div className="dropdown text-nowrap">
                            <button
                              onClick={handleExport}
                              type="button"
                              className="btn btn-outline--primary"
                              data-toggle="dropdown"
                            >
                              <i class="fa fa-download" aria-hidden="true"></i>{" "}
                              PDF
                            </button>
                          </div>
                        </option>
                        <option>
                          <div className="dropdown text-nowrap">
                            <button
                              onClick={handleExport}
                              type="button"
                              className="btn btn-outline--primary"
                              data-toggle="dropdown"
                            >
                              <i class="fa fa-download" aria-hidden="true"></i>{" "}
                              WORD
                            </button>
                          </div>
                        </option>
                      </select>

                      {/* <div className="dropdown text-nowrap">
                        <button
                          onClick={handleExport}
                          type="button"
                          className="btn btn-outline--primary"
                          data-toggle="dropdown"
                        >
                          <i class="fa fa-download" aria-hidden="true"></i>{" "}
                          Export
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  {filteredSellerList.length > 0 ? (
                    <table
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th className="text-center">SR NO.</th>
                          <th className="text-center">EMPLOYEE TYPE</th>
                          <th className="text-center">EMPLOYEE NAME</th>
                          <th className="text-center">EMAIL</th>
                          <th className="text-center">LOGIN ID</th>
                          <th className="text-center">PASSWORD</th>
                          <th className="text-center">MOBILE</th>
                          <th className="text-center">ADD DATE&TIME</th>
                          <th className="text-center">LAST UPDATE DATE&TIME</th>
                          <th className="text-center">STATUS</th>
                          <th className="text-center">ACTIVE&DEACTIVE</th>
                          <th className="text-center">ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSellerList
                          .slice(
                            (activePage - 1) * itemsPerPage,
                            activePage * itemsPerPage
                          )
                          .map((seller, index) =>
                            renderSellerData(seller, index)
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
                        No data found
                      </p>
                    </div>
                  )}
                  <div className="d-flex justify-content-center mt-4">
                    {filteredSellerList.length > itemsPerPage && (
                      <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={filteredSellerList.length}
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

export default Deliverymanlist;
