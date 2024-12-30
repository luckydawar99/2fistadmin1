import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import swal from "sweetalert";
import secureLocalStorage from "react-secure-storage";
import ReactPlayer from "react-player";

const Editbanner = () => {
  const [bannertype, setbannertype] = useState();
  const [resoucetype, setresoucetype] = useState();
  const [bannerimage, setbannerimage] = useState();

  const [banner, setbanner] = useState();

  const [banner_type, setbanner_type] = useState(
    secureLocalStorage.getItem("type")
  );
  const [resource_type, setresource_type] = useState(
    secureLocalStorage.getItem("title")
  );
  const [banner_url, setbanner_url] = useState(
    secureLocalStorage.getItem("redirectUrl")
  );
  const Navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");

  let bannerid = secureLocalStorage.getItem("banner_id");

  useEffect(() => {
    getbannerby();
  }, [0]);
  let getbannerby = () => {
    const bannerdata = {
      bannerId: bannerid,
    };
    let options = {
      headers: {
        token: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/getBanner_byId`,
        bannerdata,
        options
      )
      .then((res) => {
        setbanner(res.data.data);
      })
      .catch((error) => {});
  };

  let editdata = () => {
    swal({
      title: "Banner Update Successfully",
      text: "Banner inserted sucessfully",
      icon: "success",
      buttons: true,
    });
  };

  let bannerimage1 = secureLocalStorage.getItem("img");

  const editbanner = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageId", bannerid);
    formData.append("title", resource_type);
    formData.append("type", banner_type);

    formData.append("imageUrl", bannerimage);

    formData.append("redirectUrl", banner_url);

    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/banners/updateBannerDetails`,

        formData,
        options
      )
      .then((res) => {
        setTimeout(() => {
          Navigate("/bannerlist");
        }, 3000);
        editdata();
      })
      .catch((error) => {});
    setbannerimage("");
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
            <div className="d-flex justify-content-between mb-3">
              <div>
                <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
                  <img width={20} src="assets/banner.png" alt />
                  BANNER UPDATE
                </h2>
              </div>
              <div>
                <Link className="btn btn--primary text-white" to="/bannerlist">
                  Back
                </Link>
              </div>
            </div>
            <div className="row" style={{ textAlign: "left" }}>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <form
                      onSubmit={editbanner}
                      encType="multipart/form-data"
                      className="banner_form"
                    >
                      <input
                        type="hidden"
                        name="_token"
                        defaultValue="M5Ms1Z4GEx6hqRPEuULXw4EVAXN9PGreUwLBXESa"
                      />{" "}
                      <input type="hidden" name="_method" defaultValue="put" />{" "}
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input type="hidden" id="id" name="id" />
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="name"
                              className="title-color text-capitalize"
                            >
                              Banner type
                            </label>
                            <select
                              className="js-example-responsive form-control w-100"
                              name="banner_type"
                              value={banner_type}
                              onChange={(e) => {
                                setbanner_type(e.target.value);
                              }}
                            >
                              <option value="">{banner_type}</option>

                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                            </select>
                          </div>
                          <div className="form-group mb-3">
                            <label
                              htmlFor="name"
                              className="title-color text-capitalize"
                            >
                              Banner URL
                            </label>
                            <input
                              className="form-control"
                              value={banner_url}
                              onChange={(e) => {
                                setbanner_url(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="resource_id"
                              className="title-color text-capitalize"
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              className="js-example-responsive form-control w-100"
                              name="resource_type"
                              value={resource_type}
                              onChange={(e) => {
                                setresource_type(e.target.value);
                              }}
                            ></input>
                          </div>
                        </div>

                        <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
                          <div className="form-group mb-5">
                            <center>
                              {/* {bannerimage ? (
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
                              ) : null}   */}
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
                              ) : bannerimage1?.endsWith(".mp4") ||
                                bannerimage1?.endsWith(".mov") ||
                                bannerimage1?.endsWith(".wmv") ||
                                bannerimage1?.endsWith(".flv") ||
                                bannerimage1?.endsWith(".avi") ||
                                bannerimage1?.endsWith(".avchd") ? (
                                <ReactPlayer
                                  controls
                                  height={100}
                                  width={150}
                                  url={`${process.env.REACT_APP_VIDEO_URL}${bannerimage1}`}
                                />
                              ) : (
                                <img
                                  className="upload-img-view"
                                  width={64}
                                  src={`${process.env.REACT_APP_IMG_URL}${bannerimage1}`}
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

                        <div className="col-md-12 d-flex justify-content-end gap-3">
                          {/* <button
                            type="reset"
                            className="btn btn-secondary px-4"
                          >
                            Reset
                          </button> */}
                          <button
                            type="submit"
                            className="btn btn--primary px-4"
                          >
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
      </div>
    </div>
  );
};

export default Editbanner;
