import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";

const Refundpolicy = () => {
  const [aboutData, setAboutData] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
const [Idd, setIdd] = useState();
  const token = secureLocalStorage.getItem("adminidtoken");

  const submitForm = (event) => {
    event.preventDefault();

    const dataAbout = {
      id:Idd,
      title: title ? title : aboutData[0]?.title,
      description: text ? text : aboutData[0]?.text,
    };

    const options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/refund-policy/create`,
        dataAbout,
        options
      )
      .then((res) => {
        toast.success(res.data.message)
        getAbout();
      })
      .catch((error) => {});

    setTitle("");
    setText("");
  };

  const getAbout = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/refund-policy/get`,options)
      .then((res) => {

        setAboutData(res.data.data);
        setIdd(res.data.data[0]?.id || "");
        setTitle(res.data.data[0]?.title || "");
        setText(res.data.data[0]?.description || "");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAbout();
  }, [0]);

  

  return (
    <div>
    <Toaster/>
      {/* <Header /> */}
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8 " style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
              <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
                <img
                  width={20}
                  src="assets/list.png"  alt
                />
                REFUND POLICY
              </h2>    
            </div>
            <div className="card-header justify-content-center">
                    <h2 className="mb-0 ">REFUND POLICY FOR MEMBER</h2>
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
                                TITLE
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
                                DESCRIPTION
                              </label>
                              <ReactQuill value={text} onChange={setText} />
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
        </div>
      </div>
    </div>
  );
};

export default Refundpolicy;
