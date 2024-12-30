import React, { useState } from "react";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";

const Profile = () => {
  let navigate = useNavigate();
  const [name, setname] = useState();
  const [profileImg, setprofileImg] = useState();

  const [bio, setbio] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [currentpassword, setcurrentpassword] = useState();
  let adminidd = secureLocalStorage.getItem("adminid");
  let token = secureLocalStorage.getItem("adminidtoken");

  let logout = () => {
    const formData = new FormData();
    formData.append("adminId", adminidd);

    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}tronix-admin/signOut`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        secureLocalStorage.removeItem("adminid");
        secureLocalStorage.removeItem("adminidtoken");
        secureLocalStorage.removeItem("adminemail");
        secureLocalStorage.removeItem("banner_id");
        secureLocalStorage.removeItem("subcategoryid");
        secureLocalStorage.removeItem("categoryid");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((error) => { });
  };

  let email = secureLocalStorage.getItem("adminemail");

  const changepassword = (e) => {
    e.preventDefault();
    // if (password != confirmpassword) {
    //   toast.error(
    //     "Please Enter Same input in Both filed (Password & Confirmpassword)"
    //   );
    //   return;
    // }
    // const userdata = {
    //   email: email,
    //   CurrentPassword: password,
    //   newPassword:confirmpassword,
    // };


    const formData = new FormData();
    formData.append("email", email)
    formData.append("CurrentPassword", password)
    formData.append("newPassword", confirmpassword)



    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}tronix-admin/updatePassword`, formData, options
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error(error.response.data.message)
          return;
        }
      });
  };


  const updateadmindata = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("adminId", adminidd);
    formData.append("profileImg", profileImg);
    formData.append("name", name);
    formData.append("bio", bio);
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/update`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => { });
  };


  let logoutadmin = (item) => {
    console.log(item)
    swal({
      title: "Are you sure?",
      text: "you wnat to logout ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        navigate("/")
      } else {

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
            <div className="page-header">
              <div className="row align-items-end">
                <h2 className="col-sm mb-2 mb-sm-0 h1 mb-0 text-capitalize d-flex align-items-center gap-2">
                  <img
                    width={20}
                    src="https://6valley.6amtech.com/public/assets/back-end/img/profile_setting.png"
                    alt
                  />
                  Settings
                </h2>
                <div className="col-sm-auto">
                  <button onClick={logoutadmin} className="btn btn--primary" >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <form onSubmit={updateadmindata}>
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="M5Ms1Z4GEx6hqRPEuULXw4EVAXN9PGreUwLBXESa"
                  />
                  <div className="card mb-3 mb-lg-5" id="generalDiv">
                    <div className="profile-cover">
                      <div
                        className="profile-cover-img-wrapper"
                        style={{
                          backgroundImage:
                            "url(https://6valley.6amtech.com/storage/app/public/shop/2023-06-14-64886fc2abca5.png)",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                      />
                    </div>
                    <label
                      className="avatar avatar-xxl avatar-circle avatar-border-lg avatar-uploader profile-cover-avatar"
                      htmlFor="customFileUpload"
                    >
                      <input
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .webp |image/*"
                        type="file"
                        id="customFileUpload"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          setprofileImg(e.target.files[0]);
                        }}
                      />
                      {profileImg ? (
                        <img
                          className="avatar-img"
                          src={URL.createObjectURL(profileImg)}
                          alt="Image"
                        />
                      ) : (
                        <img
                          id="viewer"
                          className="avatar-img"
                          src="https://6valley.6amtech.com/storage/app/public/admin/2022-11-19-6379d3493297b.png"
                          alt="Image"
                        />
                      )}
                    </label>
                  </div>
                  <div className="card mb-3 mb-lg-5">
                    <div className="card-header">
                      <h2 className="card-title h4">Basic Information</h2>
                    </div>
                    <div className="card-body">
                      <div className="row form-group">
                        <label
                          htmlFor="firstNameLabel"
                          className="col-sm-3 col-form-label input-label"
                        >
                          Full name
                        </label>
                        <div className="col-sm-9">
                          <div className="input-group input-group-sm-down-break">
                            <input
                              value={name}
                              onChange={(e) => {
                                setname(e.target.value);
                              }}
                              type="text"
                              className="form-control"
                              name="name"
                              id="firstNameLabel"
                              placeholder="Your first name"
                              aria-label="Your first name"
                              defaultValue="Admin"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row form-group">
                        <label
                          htmlFor="phoneLabel"
                          className="col-sm-3 col-form-label input-label"
                        >
                          Description{" "}
                          <span className="input-label-secondary">
                            (Optional)
                          </span>
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            value={bio}
                            onChange={(e) => {
                              setbio(e.target.value);
                            }}
                            type="text"
                            className="js-masked-input form-control"
                            name="phone"
                            id="phoneLabel"
                            placeholder="Enter Description"
                          />
                        </div>
                      </div>
                      {/* <div className="row form-group">
                        <label
                          htmlFor="phoneLabel"
                          className="col-sm-3 col-form-label input-label"
                        >
                          Phone{" "}
                          <span className="input-label-secondary">
                            (Optional)
                          </span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="js-masked-input form-control"
                            name="phone"
                            id="phoneLabel"
                            placeholder="+x(xxx)xxx-xx-xx"
                            aria-label="+(xxx)xx-xxx-xxxxx"
                            defaultValue="+00xxxxxxxxxxxx"
                            data-hs-mask-options='{
                                         "template": "+(880)00-000-00000"
                                       }'
                          />
                        </div>
                      </div>
                      <div className="row form-group">
                        <label
                          htmlFor="newEmailLabel"
                          className="col-sm-3 col-form-label input-label"
                        >
                          Email
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="newEmailLabel"
                            placeholder={email}
                            aria-label="Enter new email address"
                          />
                        </div>
                      </div> */}
                      {/* <div className="row">
                        <label
                          htmlFor="newEmailLabel"
                          className="col-sm-3 input-label"
                        >
                          Profile Image
                        </label>
                        <div className="form-group col-md-9" id="select-img">
                          <span className="d-block mb-2 text-info"></span>
                          <div className="custom-file">
                            <input
                              type="file"
                              name="image"
                              id="customFileUpload"
                              className="custom-file-input"
                              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFileUpload"
                            >
                              Image Upload
                            </label>
                          </div>
                        </div>
                      </div> */}
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn--primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="card mb-3 mb-lg-5">
                  <div className="card-header">
                    <h4 className="card-title">Change your password</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={changepassword}>
                      <input type="hidden" />

                      <div className="row form-group">
                        <label
                          htmlFor="newPassword"
                          className="col-sm-3 col-form-label input-label"
                        >
                          {" "}
                          Current password
                        </label>
                        <div className="col-sm-9">
                          <input required
                            value={password}
                            onChange={(e) => {
                              setpassword(e.target.value);
                            }}
                            type="password"
                            className="js-pwstrength form-control"
                            name="password"
                            placeholder="Enter Current password"
                            aria-label="Enter Current password"
                          />
                          <p className="form-text mb-2" />
                          <div id="passwordStrengthProgress" />
                        </div>
                      </div>
                      <div className="row form-group">
                        <label
                          htmlFor="confirmNewPasswordLabel"
                          className="col-sm-3 col-form-label input-label"
                        >
                          {" "}
                          New password{" "}
                        </label>
                        <div className="col-sm-9">
                          <div className="mb-3">
                            <input required
                              value={confirmpassword}
                              onChange={(e) => {
                                setconfirmpassword(e.target.value);
                              }}
                              type="password"
                              className="form-control"
                              name="confirm_password"
                              placeholder="Enter New password"
                              aria-label="Confirm your new password"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn--primary">
                          Save changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div id="stickyBlockEndPoint" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
