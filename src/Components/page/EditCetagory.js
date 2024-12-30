import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Navigate, useNavigate } from "react-router-dom";

const EditCetagory = () => {
  const [category_image, setcategory_image] = useState();

  const [category_englishName, setcategory_englishName] = useState();

  const [categorydata, setcategorydata] = useState();
console.log(categorydata)
  const [commission, setCommission] = useState();
  const [tops, setTops] = useState(false);
  
  const [description, setDescription] = useState();
  const Navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");

  let category_id = secureLocalStorage.getItem("categoryid");

  useEffect(() => {
    getsubcategorydata();
  }, [category_id]);

  let getsubcategorydata = () => {
    const data = {
      categoryId: category_id
    }
    let options = {
      headers: {
        token: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}getCategory_byId`,data,
        options
      )
      .then((res) => {
        
        setcategory_englishName(res?.data?.data?.categoryName);

        setcategorydata(res.data.data);
      })
      .catch((error) => {});
  };

  const handleCheckboxChange = (event) => {
    setTops(event.target.checked);
  };
  let editdata = () => {
    swal({
      title: "Category Update Successfully",
      text: "Category inserted sucessfully",
      icon: "success",
      buttons: true,
    });
  };
  const editcetagory = (e) => {
    e.preventDefault();
    let options = {
      headers: {
        token: token,
      },
    };
    const formData = new FormData();
    formData.append("categoryId", category_id);
    formData.append("categoryName", category_englishName);
    formData.append("category_image", category_image);
    
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}updateCategory`,
        formData,
        options
      )
      .then((res) => {
        setTimeout(() => {
          Navigate("/cetagory");
        }, 3000);

        editdata();
        getsubcategorydata();
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
                  src="assets/app.png"
                  className="mb-1 mr-1"
                  alt
                />
                Category Update
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form onSubmit={editcetagory}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div>
                            <div className="form-group  lang_form">
                              <label className="title-color">
                                Category Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                value={category_englishName}
                                onChange={(e) => {
                                  setcategory_englishName(e.target.value);
                                }}
                                type="text"
                                name="name[]"
                                className="form-control"
                              />
                            </div>
                          </div>
                          
                        </div>
                        <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
                          <div className="form-group">
                            <center>
                              {category_image ? (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src={URL.createObjectURL(category_image)}
                                  alt="image"
                                />
                              ) : (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src={
                                    `${process.env.REACT_APP_IMG_URL}` +
                                    categorydata?.category_image
                                  }
                                  alt="image"
                                />
                              )}
                            </center>
                          
                          </div>
                          <div className="from_part_2 mb-2">
                            <label className="title-color">Category Logo</label>
                            <span className="text-info">
                              <span className="text-danger">*</span>
                            </span>
                            <div className="custom-file text-left">
                              <input
                                onChange={(e) => {
                                  setcategory_image(e.target.files[0]);
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

export default EditCetagory;
