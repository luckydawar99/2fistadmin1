import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ReactPlayer from "react-player";
const Cashcollected = () => {
  const [mainCategory_list, setmainCategory_list] = useState();
  const [idd, setidd] = useState();

  const [image, setimage] = useState();
  const [bannerimage, setbannerimage] = useState();
  const [category, setcategory] = useState();

  const Navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");
  useEffect(() => {
    setidd(secureLocalStorage.getItem("categoryids"));

    setimage(secureLocalStorage.getItem("imgurl"));
    setcategory(secureLocalStorage.getItem("categorynamee"));
  }, [0]);
let idds = secureLocalStorage.getItem("categorynamid")

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

  const updatecategorybanner = (e) => {
    e.preventDefault();
    const formData = new FormData();
 
      formData.append("id", idds);
    formData.append("categoryName", category);
    formData.append("categoryImage", bannerimage ? bannerimage : "");
    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/categoryBanner/updateCategoryBanner`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          Navigate("/editmaincategory");
        }, 3000);
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
                src="https://6valley.6amtech.com/public/assets/back-end/img/earning_statictics.png"
                alt=""
              />
              UPDATE CAREGORY BANNER DATA
            </h2>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <div className="card">
                <form onSubmit={updatecategorybanner}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="5201ifIgVXHshEaS9xR5L76fdJ1eBw8H5dYCuDvv"
                    autoComplete="off"
                  />{" "}
                  <div className="card-body">
                    <h5 className="mb-0 page-header-title d-flex align-items-center gap-2 border-bottom pb-3 mb-3">
                      <i class="fa fa-money" aria-hidden="true"></i> CATEGORY
                      BANNER DATA
                    </h5>
                    <div className="row">
                      <div className="col-lg-6">
                        <div>
                          <div className="form-group">
                            <label className="title-color">Category</label>

                            <select
                              value={category}
                              onChange={(e) => {
                                const selectedIndex = e.target.selectedIndex;
                                const selectedCategoryIds =
                                  e.target.options[selectedIndex].getAttribute(
                                    "data-categoryids"
                                  );
                                setcategory(e.target.value);
                                setidd(selectedCategoryIds);
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
                                  data-categoryids={data?.categoryId}
                                >
                                  {data?.categoryName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
                        <div className="form-group mb-5">
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
                            ) : image?.endsWith(".mp4") ||
                              image?.endsWith(".mov") ||
                              image?.endsWith(".wmv") ||
                              image?.endsWith(".flv") ||
                              image?.endsWith(".avi") ||
                              image?.endsWith(".avchd") ? (
                              <ReactPlayer
                                controls
                                height={100}
                                width={150}
                                url={`${process.env.REACT_APP_IMG_URL}${image}`}
                              />
                            ) : (
                              <img
                                className="upload-img-view"
                                width={64}
                                src={`${process.env.REACT_APP_IMG_URL}${image}`}
                                alt="Banner image"
                              />
                            )}
                          </center>
                        </div>

                        <div className="from_part_2 ">
                          <label className="title-color">Banner image</label>
                          <span className="text-info">
                            <span className="text-danger">*</span>
                          </span>
                          <div className="custom-file text-left">
                            <input
                              onChange={(e) => {
                                setbannerimage(e.target.files[0]);
                              }}
                              type="file"
                              name="image"
                              className="custom-file-input"
                              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff, .mp4, .mov, .wmv, .flv, .avi, .avchd|image/*"
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
                    <div className="d-flex gap-3 justify-content-end mt-3">
                      <button type="submit" className="btn btn--primary px-4">
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cashcollected;
