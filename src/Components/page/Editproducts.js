import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";

import Sidebarr from "./../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";

const Editproducts = () => {
  let token = secureLocalStorage.getItem("adminidtoken");

  const [brandlist, setBrandlist] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [filteredSellerList, setFilteredSellerList] = useState([]);

  const [vendorid, setvendorid] = useState();
  const [amount, setamount] = useState();
  const [text, settext] = useState();
  const [balance, setbalance] = useState();
  useEffect(() => {
    getbrand_list();
  }, [0]);

  let getbrand_list = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/vendor/getList`, options)
      .then((res) => {
        setBrandlist(res?.data?.data);
        setFilteredSellerList(res.data.data);
      })
      .catch((error) => {});
  };

  const [status, setstatus] = useState(false);
  const [vendornamea, setvendornamea] = useState("");
  const handleFilter52 = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const result = brandlist.filter(
      (item) =>
        item?.name?.toLowerCase().includes(searchTerm) ||
        item?.businessName?.toLowerCase().includes(searchTerm) ||
        item?.vendorGenId?.toLowerCase().includes(searchTerm)
    );
    setFilteredSellerList(result);
    setActivePage(1);
  };

  const addfund = (e) => {
    e.preventDefault();
    if(!vendorid) {
      toast.error("Please select Vendor first")
      return
    }
    const formData = {
      vendorId: vendorid,
      amount: amount,
      narration: text,
    };

    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/vendor/deductFund`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {});
    setvendorid("");
    settext("");
    setamount("");
    setvendornamea("");
    setbalance("");
  };
  const resetdata = () => {
    setvendorid("");
    settext("");
    setamount("");
    setvendornamea("");
    setbalance("");
  };

  const getbalance = (item) => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/vendor/getCurrentBalanceById/${item}`,
        options
      )
      .then((res) => {
        setbalance(res.data.data);
      })
      .catch((error) => {});
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
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img
                width={20}
                src="assets/funding.png"
                className="mb-1 mr-1"
                alt=""
              />
              DEDUCT VENDOR FUND
            </h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-3">Deduct fund in Ewallet</h4>
                  <form onSubmit={addfund}>
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="YFPrIbFYlUsgcs6Ht4EEyCysWGBq8lmpLaBUW0q6"
                    />{" "}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="name" className="title-color">
                            Vendor ID <span className="text-danger">*</span>{" "}
                            &nbsp; {vendornamea}
                          </label>

                          <div className="" name="sub_category_id">
                            <p
                              className="form-control text-capitalize"
                              onClick={() => {
                                setstatus(true);
                              }}
                            >
                              Search&select
                            </p>
                            {status === true ? (
                              <div
                                className=""
                                style={{
                                  overflow: "scroll",
                                  height: "160px",
                                  scrollbarWidth: "none",
                                  backgroundColor: "rgb(255, 254, 253)",
                                }}
                              >
                                <input
                                  placeholder="Search here..."
                                  style={{ width: "" }}
                                  type="text"
                                  id="categoryFilter"
                                  className="form-control"
                                  onChange={handleFilter52}
                                />
                                {filteredSellerList?.length === 0 ? (
                                  <li className="form-control"> No data</li>
                                ) : (
                                  filteredSellerList?.map((brandItem) => {
                                    return (
                                      <>
                                        <div
                                          onClick={() => {
                                            getbalance(brandItem?.vendorId);
                                            setvendorid(brandItem?.vendorId);
                                            setvendornamea(
                                              brandItem?.businessName
                                            );
                                            setstatus(false);
                                          }}
                                          className="form-control text-capitalize"
                                          style={{ cursor: "pointer" }}
                                        >
                                          {brandItem?.businessName} (
                                          {brandItem?.name}{" "}
                                          {brandItem?.vendorGenId})
                                        </div>
                                      </>
                                    );
                                  })
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="name"
                          className="title-color text-capitalize"
                        >
                          Current Ewallet Balance
                        </label>
                        <input
                          value={
                            balance !== "" ? parseFloat(balance).toFixed(2) : ""
                          }
                          type="text"
                          name="title"
                          className="form-control"
                          placeholder="Current Ewallet Balance"
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="name"
                          className="title-color text-capitalize"
                        >
                          Amount
                        </label>

                        <input
                          value={amount}
                          onChange={(e) => {
                            setamount(e.target.value);
                          }}
                          type="text"
                          name="code"
                          className="form-control"
                          placeholder="Amount"
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="title-color text-capitalize"
                        >
                          Narration
                        </label>
                        <textarea maxLength={200}
                          required
                          value={text}
                          onChange={(e) => {
                            settext(e.target.value);
                          }}
                          type="text"
                          className="form-control"
                          placeholder="Narration"
                        />
                      </div>
                    </div>
                    <div className="mt-3 d-flex align-items-center justify-content-end flex-wrap gap-10">
                      <button
                        onClick={resetdata}
                        type="reset"
                        className="btn btn-secondary px-4"
                      >
                        Reset
                      </button>
                      <button type="submit" className="btn btn--primary px-4">
                        DEDUCT
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editproducts;
