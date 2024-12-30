import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
const AboutUs = () => {
  const [aboutData, setAboutData] = useState([]);
  const [title, setTitle] = useState("");
  const [title1, setTitle1] = useState("");
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");

  const token = secureLocalStorage.getItem("adminidtoken");

  const submitForm = (event) => {
    event.preventDefault();

    const dataAbout = {
      // type: "2",
      title: title ? title : aboutData[0]?.title,
      text: text ? text : aboutData[0]?.text,
    };

    const options = {
      headers: {
        token: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}create_aboutUs`,
        dataAbout,
        options
      )
      .then((res) => {
        swal({
          title: (res.data.message),

          icon: "success",

        });
        // toast.success(res.data.message);
        getAbout();
      })
      .catch((error) => { });

    setTitle("");
    setText("");
  };

  const getAbout = () => {
    const options = {
      headers: {
        token: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}aboutUs_list`, options)
      .then((res) => {
        //toast.success("Faq Data Updated Successfully");
        setAboutData(res.data.data);

        setTitle(res.data.data[0]?.title || "");
        setText(res.data.data[0]?.text || "");
      })
      .catch((error) => { });
  };
  useEffect(() => {
    getAbout();
  }, [0]);
  // const submitForm1 = (event) => {
  //   event.preventDefault();

  //   const dataAbout = {
  //     type: "1",
  //     title: title1 ? title1 : aboutData[1]?.title,
  //     text: text1 ? text1 : aboutData[1]?.text,
  //   };

  //   const options = {
  //     headers: {
  //       token: token,
  //     },
  //   };

  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_KEY}admin/api/create_aboutUs`,
  //       dataAbout,
  //       options
  //     )
  //     .then((res) => {
  //       getAbout1();
  //     })
  //     .catch((error) => {});

  //   setTitle1("");
  //   setText1("");
  // };

  // const getAbout1 = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_KEY}admin/api/aboutUs_list`)
  //     .then((res) => {

  //       setAboutData(res.data.data);

  //       setTitle1(res.data.data[1]?.title || "");
  //       setText1(res.data.data[1]?.text || "");
  //     })
  //     .catch((error) => {});
  // };

  // useEffect(() => {
  //   getAbout1();
  // }, [0]);
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
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
              <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
                <img
                  width={20}
                  src="assets/list.png" alt=""
                />
                About Us
              </h2>
            </div>

            <div className="row mb-5">
              <div className="col-md-12 mb-3">
                <div className="card">
                  <div className="card-header justify-content-center">
                    <h2 className="mb-0">About Us for User</h2>
                  </div>

                  <form className="card" onSubmit={submitForm}>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Title
                              </label>
                              <textarea
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Description
                              </label>
                              <ReactQuill value={text} onChange={setText} />
                            </div>
                          </div>

                          <div className="col-md-12 justify-content-end d-flex">
                            <div className="form-group mb-3">
                              <button
                                type="submit"
                                className="btn btn--primary "
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* <div className="col-md-12">
                <div className="card">
                  <div className="card-header justify-content-center">
                    <h2 className="mb-0">About Us for Vendor</h2>
                  </div>

                  <form className="card" onSubmit={submitForm1}>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Title
                              </label>
                              <textarea
                                type="text"
                                className="form-control"
                                value={title1}
                                onChange={(e) => setTitle1(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Description
                              </label>
                              <ReactQuill value={text1} onChange={setText1} />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <button
                                type="submit"
                                className="btn btn--primary"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
