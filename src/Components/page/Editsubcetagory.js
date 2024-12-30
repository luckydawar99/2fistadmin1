import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import swal from "sweetalert";
import { Navigate, useNavigate } from "react-router-dom";

const Editsubcetagory = () => {
  const [imageUrl, setimageUrl] = useState();

  const [bankName, setbankName] = useState();

  const [categorydata, setcategorydata] = useState();
  const Navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");

  let bank_id = secureLocalStorage.getItem("bankid");

  useEffect(() => {
    getsubcategorydata();
  }, [0]);
  let getsubcategorydata = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/banks/getBankById/${bank_id}`,

        options
      )
      .then((res) => {
        setbankName(res.data.data.bankName);
        setcategorydata(res.data.data);
      })
      .catch((error) => {});
  };

  let editdata = () => {
    swal({
      title: "Bank details Update Successfully",
      text: "Bank details inserted sucessfully",
      icon: "success",
      buttons: true,
    });
  };

  const editsubcetagory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageUrl", imageUrl);
    formData.append("bankId", bank_id);

    formData.append("bankName", bankName);

    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/banks/update`,
        formData,
        options
      )
      .then((res) => {
        setTimeout(() => {
          Navigate("/subcetagory");
        }, 3000);
        editdata();
      })
      .catch((error) => {});
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
          <div className="mt-3 mb-5">
            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
              <h2 className="h1 mb-0">
                <img
                  width={20}
                  src="assets/banker.png"                  className="mb-1 mr-1"
                  alt
                />
                Bank Details Update
              </h2>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form onSubmit={editsubcetagory}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div>
                            <div className="form-group  lang_form">
                              <label className="title-color">
                                Bank Name
                                <span className="text-danger">*</span> (EN)
                              </label>
                              <input
                                value={bankName}
                                onChange={(e) => {
                                  setbankName(e.target.value);
                                }}
                                type="text"
                                name="name[]"
                                className="form-control"
                              />
                            </div>
                          </div>

                          <div className="from_part_2">
                            <label className="title-color">Image Logo</label>
                            <span className="text-info">
                              <span className="text-danger">*</span>
                            </span>
                            <div className="custom-file text-left">
                              <input
                                onChange={(e) => {
                                  setimageUrl(e.target.files[0]);
                                }}
                                type="file"
                                name="image"
                                className="custom-file-input"
                                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFileEg1"
                              >
                                Choose File
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
                          <div className="form-group">
                            <center>
                              {imageUrl ? (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src={URL.createObjectURL(imageUrl)}
                                  alt="image"
                                />
                              ) : (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src={
                                    `${process.env.REACT_APP_IMG_URL}` +
                                    categorydata?.imageUrl
                                  }
                                  alt="image"
                                />
                              )}
                            </center>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <button type="submit" className="btn btn--primary">
                          Update
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
    </div>
  );
};

export default Editsubcetagory;
