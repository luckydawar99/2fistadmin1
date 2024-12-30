import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./manubar.css";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  let [passwordtype, setpasswordtype] = useState("password");
  let [iconstatus, seticonstatus] = useState(false);

  const [adminemail, setadminemail] = useState("");
  const [adminpassword, setadminpassword] = useState("");
  const Navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: adminemail,
      password: adminpassword,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}AdminLogin`, formData)
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          Navigate("/home");
        }, 3000);
        secureLocalStorage.setItem("adminidtoken", response.data.token);

        secureLocalStorage.setItem("adminid", response.data.data._id);

        secureLocalStorage.setItem("adminemail", response.data.data.email);
      })
      .catch((error) => {
        console.log(error)
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else if (error.response && error.response.status === 401) {
          toast.error(error.response.data.message);
        }
      });
  };

  let passwordicon = () => {
    setpasswordtype("text");
    seticonstatus(true);
  };
  let passwordicon1 = () => {
    seticonstatus(false);
    setpasswordtype("password");
  };

  return (
    <div>
      <Toaster />
      <div
        className="position-fixed top-0 right-0 left-0 bg-img-hero __inline-1"
        style={{
          backgroundImage:
            "url(https://6valley.6amtech.com/public/assets/admin/svg/components/abstract-bg-4.svg)",
        }}
      >
        <figure className="position-absolute right-0 bottom-0 left-0">
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1921 273"
          >
            <polygon fill="#f3f3f9" points="0,273 1921,273 1921,0 " />
          </svg>
        </figure>
      </div>
      <div className="container py-5 py-sm-7">
        <a
          className="d-flex justify-content-center mb-3 mt-3"
          href="javascript:"
        >
          <img
            style={{ borderRadius: "5px" }}
            width={100}
            className="z-index-2"
            src="./img/logo/logonew.png"
            alt="Logo"
          />
        </a>
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <h1>Welcome to 2Fist</h1>
            <p style={{ textAlign: "center", fontSize: "14px" }}>
              Admin login to 2Fist Dashboard
            </p>
            <div className="card card-lg mb-5">
              <form onSubmit={handlesubmit}>
                <div className="card-body">
                  <input type="hidden" />
                  {/* <div className="text-center">
                    <div className="mb-5">
                      <span>( Admin Login)</span>
                    </div>
                  </div> */}

                  <input
                    type="hidden"
                    className="form-control mb-3"
                    name="role"
                    defaultValue="admin"
                  />
                  <div className="js-form-message form-group">
                    <label className="input-label" htmlFor="signinSrEmail">
                      Username*
                    </label>
                    <input
                      type="email"
                      placeholder="Please enter username"
                      name="text"
                      onChange={(e) => {
                        setadminemail(e.target.value);
                      }}
                      required
                      className="form-control form-control-lg"
                      tabIndex={1}
                      aria-label="email@address.com"
                      data-msg="Please enter a valid email address."
                    />
                  </div>
                  <div className="js-form-message form-group">
                    <label
                      className="input-label"
                      htmlFor="signupSrPassword"
                      tabIndex={0}
                    >
                      <span className="d-flex justify-content-between align-items-center">
                        Password*
                      </span>
                    </label>
                    <div className="input-group input-group-merge iconinput">
                      <input
                        required
                        placeholder="Password"
                        onChange={(e) => {
                          setadminpassword(e.target.value);
                        }}
                        type={passwordtype == "password" ? "password" : "text"}
                        className="js-toggle-password form-control form-control-lg"
                        name="password"
                      />

                      {iconstatus == false ? (
                        <i
                          onClick={passwordicon}
                          class="fa fa-eye eyeicon"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i
                          onClick={passwordicon1}
                          class="fa fa-eye-slash eyeicon"
                          aria-hidden="true"
                        ></i>
                      )}
                    </div>
                  </div>

                  <div
                    id="recaptcha_element"
                    className="w-100;"
                    data-type="image"
                  />
                  <br />

                  <button
                    type="submit"
                    className="btn btn-lg btn-block btn--primary"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
