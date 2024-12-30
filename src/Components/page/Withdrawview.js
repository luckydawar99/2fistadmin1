import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Withdrawview = () => {
  const [dataofwithdraw, setdataofwithdraw] = useState([]);
  const [paymentstatus, setpaymentstatus] = useState();

  const [note, setnote] = useState();
  let venderId = secureLocalStorage.getItem("venderIds");
  let withdrawid = secureLocalStorage.getItem("withdrawids");
  let token = secureLocalStorage.getItem("adminidtoken");
  useEffect(() => {
    getwithd();
  }, [0]);
  const getwithd = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}payout/request/getPayoutRequestById/${withdrawid}`,
        options
      )
     
      .then((res) => {
        
        setdataofwithdraw(res.data.data);
      })
      .catch((error) => {});
  };
  const sendrequest = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("id", withdrawid);
    formData.append("status", paymentstatus);

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}payout/request/changeStatusTo`,
        formData
      )

      .then((res) => {
        getwithd();
        toast.success(res.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.message);
        } else {
          toast.error("Invalid Data Entered by you.");
        }
      });
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
                src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw-icon.png"
                alt=""
              />
              WITHDRAW
            </h2>
          </div>
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="card">
                <div className="card-body text-start">
                  <div className="text-capitalize d-flex align-items-center justify-content-between gap-2 border-bottom pb-2 mb-4">
                    <h3 className="text-capitalize">WITHDRAW INFORMATION</h3>
                    <i class="fa fa-credit-card fz-30" aria-hidden="true"></i>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-2 mb-md-0">
                      <div className="flex-start flex-wrap">
                        <div>
                          <h5 className="text-capitalize">Amount: </h5>
                        </div>
                        <div className="mx-1">
                          <h5>{dataofwithdraw?.payoutRequest?.amount}</h5>
                        </div>
                      </div>
                      <div className="flex-start flex-wrap">
                        <div>
                          <h5>Request time: </h5>
                        </div>
                        <div className="mx-1">
                          {dataofwithdraw?.payoutRequest?.requestDateTime?.slice(
                            0,
                            10
                          )}{" "}
                          {dataofwithdraw?.payoutRequest?.requestDateTime?.slice(
                            11,
                            19
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-2 mb-md-0">
                      <div className="flex-start">
                        <div className="line--limit-2 max-w-200 title-color text-capitalize align-items-justify">
                          Note: {dataofwithdraw?.payoutRequest?.remarks}
                        </div>
                        <div className="mx-1" />
                      </div>
                    </div>
                    {dataofwithdraw?.payoutRequest?.status == "Pending" ? (
                      <div class="col-md-2 ">
                        <button
                          type="button"
                          class="btn btn-primary float-end"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          Proceed &nbsp;
                          <i
                            class="fa fa-long-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>
                    ) : dataofwithdraw?.payoutRequest?.status == "Confirm" ? (
                      <div class="col-md-2">
                        <button
                          type="button"
                          class="btn btn-success text-center float-end"
                        >
                          Confirm
                        </button>
                      </div>
                    ) : (
                      <div className="col-md-2">
                        <div className="text-center float-end">
                          <label className="btn btn-danger  p-2 rounded-bottom">
                            Reject
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-start">
                  <div className="text-capitalize d-flex align-items-center justify-content-between gap-2 border-bottom pb-3 mb-4">
                    <h3 className="h3 mb-0">Bank info </h3>
                    <i class="fa fa-usd" aria-hidden="true"></i>
                  </div>
                  <div className="mt-2">
                    <div className="flex-start">
                      <div>
                        <h6>Bank name : </h6>
                      </div>
                      <div className="mx-1 text-capitalize">
                        <h6>{dataofwithdraw?.payoutRequest?.bankName}</h6>
                      </div>
                    </div>
                    <div className="flex-start">
                      <div>
                        <h6>Branch : </h6>
                      </div>
                      <div className="mx-1 text-capitalize">
                        <h6>{dataofwithdraw?.payoutRequest?.branchName}</h6>
                      </div>
                    </div>
                    <div className="flex-start">
                      <div>
                        <h6>Holder name : </h6>
                      </div>
                      <div className="mx-1 text-capitalize">
                        <h6>
                          {dataofwithdraw?.payoutRequest?.accountHolderName}
                        </h6>
                      </div>
                    </div>
                    <div className="flex-start">
                      <div>
                        <h6>Account no : </h6>
                      </div>
                      <div className="mx-1">
                        <h6>{dataofwithdraw?.payoutRequest?.accountNumber}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {dataofwithdraw?.payoutRequest?.type !== "Member" ? (
              <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-start">
                  <div className="text-capitalize d-flex align-items-center justify-content-between gap-2 border-bottom pb-3 mb-4">
                    <h3 className="h3 mb-0">Business info </h3>
                    <i class="fa fa-stop-circle" aria-hidden="true"></i>
                  </div>
                  <div className="flex-start">
                    <div>
                      <h6>Business Name : </h6>
                    </div>
                    <div className="mx-1 text-capitalize">
                      <h6>
                        {dataofwithdraw?.vendorPayRequestWrapper?.businessName}{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="flex-start">
                    <div>
                      <h6>Phone : </h6>
                    </div>
                    <div className="mx-1">
                      <h6>
                        {dataofwithdraw?.vendorPayRequestWrapper?.mobileNo}
                      </h6>
                    </div>
                  </div>
                  <div className="flex-start">
                    <div>
                      <h6>Address : </h6>
                    </div>
                    <div className="mx-1 text-capitalize">
                      <h6>
                        {dataofwithdraw?.vendorPayRequestWrapper?.address}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>) : null
            }
            
            {dataofwithdraw?.memberPayRequestWrapper ? (<div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-start">
                  <div className="text-capitalize d-flex align-items-center justify-content-between gap-2 border-bottom pb-3 mb-4">
                    <h3 className="h3 mb-0">Member info </h3>
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                  </div>
                  <div className="flex-start">
                    <div>
                      <h6>Name :</h6>
                    </div>
                    <div className="mx-1 text-capitalize">
                      <h6>{dataofwithdraw?.memberPayRequestWrapper?.name}</h6>
                    </div>
                  </div>
                  <div className="flex-start">
                    <div>
                      <h6>Email :</h6>
                    </div>
                    <div className="mx-1">
                      <h6> {dataofwithdraw?.memberPayRequestWrapper?.email}</h6>
                    </div>
                  </div>
                  <div className="flex-start">
                    <div>
                      <h6>Phone :</h6>
                    </div>
                    <div className="mx-1">
                      <h6>
                        {" "}
                        {dataofwithdraw?.memberPayRequestWrapper?.mobileNo}
                      </h6>
                    </div>
                  </div>

                  <div className="flex-start">
                    <div>
                      <h6>Address :</h6>
                    </div>
                    <div className="mx-1">
                      <h6>
                        {" "}
                        {dataofwithdraw?.memberPayRequestWrapper?.address}
                      </h6>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>) : (<div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-start">
                  <div className="text-capitalize d-flex align-items-center justify-content-between gap-2 border-bottom pb-3 mb-4">
                    <h3 className="h3 mb-0">Vendor info </h3>
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                  </div>
                  <div className="flex-start">
                    <div>
                      <h6>Name :</h6>
                    </div>
                    <div className="mx-1 text-capitalize">
                      <h6>{dataofwithdraw?.vendorPayRequestWrapper?.name}</h6>
                    </div>
                  </div>
                  <div className="flex-start">
                    <div>
                      <h6>Email :</h6>
                    </div>
                    <div className="mx-1">
                      <h6> {dataofwithdraw?.vendorPayRequestWrapper?.email}</h6>
                    </div>
                  </div>
                  <div className="flex-start">
                    <div>
                      <h6>Phone :</h6>
                    </div>
                    <div className="mx-1">
                      <h6>
                        {" "}
                        {dataofwithdraw?.vendorPayRequestWrapper?.mobileNo}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
            }
            
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Withdraw request process
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form onSubmit={sendrequest}>
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="5201ifIgVXHshEaS9xR5L76fdJ1eBw8H5dYCuDvv"
                      autoComplete="off"
                    />{" "}
                    <div className="modal-body">
                      <div className="form-group">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Request:
                        </label>
                        <select
                          onChange={(e) => {
                            setpaymentstatus(e.target.value);
                          }}
                          required
                          value={paymentstatus}
                          name="approved"
                          className="custom-select"
                        >
                          <option value="" disabled selected>
                            Select Status
                          </option>
                          <option value="Confirm">Approve</option>
                          <option value="Reject">Deny</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="message-text"
                          className="col-form-label"
                        >
                          Note about transaction or request:
                        </label>
                        <textarea
                          onChange={(e) => {
                            setnote(e.target.value);
                          }}
                          className="form-control"
                          name="note"
                          id="message-text"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn--primary">
                        Submit
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

export default Withdrawview;
