import React, { useEffect, useState } from "react";
import "../sidebar.css";

import swal from "sweetalert";

import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Addnewproducttype = () => {
  const [status, setstatus] = useState(false);
  const [sizeelist, setsizeelist] = useState();

  const [type, settype] = useState();
  const [joiningPoint, setjoiningPoint] = useState();
  const [referralPoint, setreferralPoint] = useState();
  const [minimumRedeem, setminimumRedeem] = useState();
  const [pointRs, setpointRs] = useState();

  let token = secureLocalStorage.getItem("adminidtoken");

  const addreferral = (e) => {
    e.preventDefault();

    const formData = {
      type: type,
      joiningPoints: joiningPoint,
      referralPoints: referralPoint,
      minimumRedeemPoints: minimumRedeem,
      pointsRs: pointRs,
    };
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}referral/reward/setting/save`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res.data.message);

        getreferraldata();
      })
      .catch((error) => {});

    settype("");
    setjoiningPoint("");
    setreferralPoint("");
    setminimumRedeem("");
    setpointRs("");
  };

  const [refid, setrefid] = useState();
  const [typeoff, settypeoff] = useState();
  const [joiningpointof, setjoiningpointof] = useState();
  const [referralpointof, setreferralpointof] = useState();
  const [minimumredeempointof, setminimumredeempointof] = useState();
  const [pointrsof, setpointrsof] = useState();
  const updatereferral = (e) => {
    e.preventDefault();
    const data = {
      referralId: refid,
      type: typeoff,
      joiningPoints: joiningpointof,
      referralPoints: referralpointof,
      minimumRedeemPoints: minimumredeempointof,
      pointsRs: pointrsof,
    };

    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}referral/reward/setting/update`,
        data,
        options
      )
      .then((res) => {
        toast.success(res.data.message)
        getreferraldata();
        setstatus(false);
      })
      .catch((error) => {

      });
  };

  let deletreferral = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let deletereferraldata = () => {
          const options = {
            headers: {
              Authorization: token,
            },
          };
          axios
            .post(
              `${process.env.REACT_APP_API_KEY}referral/reward/setting/delete/${item}`,
              options
            )
            .then((res) => {
              getreferraldata();
            })
            .catch((error) => {});
        };
        deletereferraldata();
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };
  useEffect(() => {
    getreferraldata();
  }, [0]);
  let getreferraldata = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}referral/reward/setting/getAll`,
        options
      )
      .then((res) => {

        setsizeelist(res.data.data);
      })
      .catch((error) => {
        
      });
  };

  return (
    <div>
      {/* <Header /> */}
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img width={20} src="assets/commission.png" alt="" />
              REFERRAL REWARD SETTING
              <span className="badge badge-soft-dark radius-50 fz-12"></span>
            </h2>
          </div>
          <div className="row mt-4 ">
            <div className="col-md-12">
              {status === true ? (
                <div className="card mb-3">
                  <div className="card-body text-start">
                    <h5 class="d-flex align-items-center gap-2">
                      UPDATE VENDOR REFERRAL
                    </h5>

                    <form onSubmit={updatereferral}>
                      <input
                        type="hidden"
                        name="_token"
                        defaultValue="LOivn3m2NU0upgIv2pBhjrFyz9MIByXFPsdKT17p"
                        autoComplete="off"
                      />

                      <div className="row">
                        <div className="col-md-4">
                          <div
                            className="form-group  form-system-language-form"
                            id="en-form"
                          >
                            <label htmlFor="name" className="title-color">
                              SELECT TYPE
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              value={typeoff}
                              onChange={(e) => {
                                settypeoff(e.target.value);
                              }}
                              type="text"
                              name="name[]"
                              className="form-control"
                              id="name"
                              placeholder="JOINING POINTS"
                            >
                              <option value="" selected>
                                SELECT TYPE{" "}
                              </option>
                              <option value="MEMBER">MEMBER</option>
                              <option value="VENDOR">VENDOR</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div
                            className="form-group  form-system-language-form"
                            id="en-form"
                          >
                            <label htmlFor="name" className="title-color">
                              JOINING POINTS
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              value={joiningpointof}
                              onChange={(e) => {
                                setjoiningpointof(e.target.value);
                              }}
                              type="text"
                              name="name[]"
                              className="form-control"
                              id="name"
                              placeholder="JOINING POINTS"
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div
                            className="form-group  form-system-language-form"
                            id="en-form"
                          >
                            <label htmlFor="name" className="title-color">
                              REFERRAL POINTS
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              value={referralpointof}
                              onChange={(e) => {
                                setreferralpointof(e.target.value);
                              }}
                              type="text"
                              name="name[]"
                              className="form-control"
                              id="name"
                              placeholder="REFERRAL POINTS"
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div
                            className="form-group  form-system-language-form"
                            id="en-form"
                          >
                            <label htmlFor="name" className="title-color">
                              MINIMUM REDEEM POINTS
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              value={minimumredeempointof}
                              onChange={(e) => {
                                setminimumredeempointof(e.target.value);
                              }}
                              type="text"
                              name="name[]"
                              className="form-control"
                              id="name"
                              placeholder="REFERRAL POINTS"
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div
                            className="form-group  form-system-language-form"
                            id="en-form"
                          >
                            <label htmlFor="name" className="title-color">
                              POINTS RS
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              value={pointrsof}
                              onChange={(e) => {
                                setpointrsof(e.target.value);
                              }}
                              type="text"
                              name="name[]"
                              className="form-control"
                              id="name"
                              placeholder="POINTS RS"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex gap-3 justify-content-end">
                        <button type="submit" className="btn btn--primary px-4">
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : null}
              <div className="card mb-3">
                <div className="card-body text-start">
                  <h5 class="d-flex align-items-center gap-2">
                    FOR VENDOR REFERRAL
                  </h5>

                  <form onSubmit={addreferral}>
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="LOivn3m2NU0upgIv2pBhjrFyz9MIByXFPsdKT17p"
                      autoComplete="off"
                    />

                    <div className="row">
                      <div className="col-md-4">
                        <div
                          className="form-group  form-system-language-form"
                          id="en-form"
                        >
                          <label htmlFor="name" className="title-color">
                            SELECT TYPE
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            value={type}
                            onChange={(e) => {
                              settype(e.target.value);
                            }}
                            type="text"
                            name="name[]"
                            className="form-control"
                            id="name"
                            placeholder="JOINING POINTS"
                            required
                          >
                            <option value="" selected>
                              SELECT TYPE{" "}
                            </option>
                            <option value="MEMBER">MEMBER</option>
                            <option value="VENDOR">VENDOR</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="form-group  form-system-language-form"
                          id="en-form"
                        >
                          <label htmlFor="name" className="title-color">
                            JOINING POINTS
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={joiningPoint}
                            onChange={(e) => {
                              setjoiningPoint(e.target.value);
                            }}
                            type="text"
                            name="name[]"
                            className="form-control"
                            id="name"
                            placeholder="JOINING POINTS"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div
                          className="form-group  form-system-language-form"
                          id="en-form"
                        >
                          <label htmlFor="name" className="title-color">
                            REFERRAL POINTS
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={referralPoint}
                            onChange={(e) => {
                              setreferralPoint(e.target.value);
                            }}
                            type="text"
                            name="name[]"
                            className="form-control"
                            id="name"
                            placeholder="REFERRAL POINTS"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div
                          className="form-group  form-system-language-form"
                          id="en-form"
                        >
                          <label htmlFor="name" className="title-color">
                            MINIMUM REDEEM POINTS
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={minimumRedeem}
                            onChange={(e) => {
                              setminimumRedeem(e.target.value);
                            }}
                            type="text"
                            name="name[]"
                            className="form-control"
                            id="name"
                            placeholder="REFERRAL POINTS"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div
                          className="form-group  form-system-language-form"
                          id="en-form"
                        >
                          <label htmlFor="name" className="title-color">
                            POINTS RS
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={pointRs}
                            onChange={(e) => {
                              setpointRs(e.target.value);
                            }}
                            type="text"
                            name="name[]"
                            className="form-control"
                            id="name"
                            placeholder="POINTS RS"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-3 justify-content-end">
                      <button type="submit" className="btn btn--primary px-4">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4 ">
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="card-body text-start">
                  <div className="table-responsive">
                    <table
                      id="datatable"
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>SL</th>
                          <th>TYPE</th>
                          <th>JOINING POINT</th>
                          <th>REFERRAL POINT</th>
                          <th>MINIMUM REDEEM POINT</th>
                          <th>POINT RS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeelist?.map((data,index)=>{
return(
  <tr>
  <td>{index+1}</td>
  <td className="text-center">{data?.type
  }</td>
  <td className="text-center">{data?.joiningPoints
  }</td>
  <td className="text-center">{data?.referralPoints
  }</td>
  <td className="text-center">{data?.minimumRedeemPoints
  }</td>
  <td className="text-center">{data?.pointsRs
  }</td>

  <td>
    <div className="d-flex gap-10 justify-content-center">
      <a
        href="#"
        className="btn btn-outline--primary btn-sm cursor-pointer edit"
        onClick={() => {
          setrefid(data?.referralId);
          settypeoff(data?.type);
          setjoiningpointof(data?.joiningPoints);
          setreferralpointof(data?.referralPoints);
          setminimumredeempointof(data?.minimumRedeemPoints);
          setpointrsof(data?.pointsRs);
          setstatus(true);
        }}
        title="Edit"
      >
        <i
          className="fa fa-pencil-square-o"
          aria-hidden="true"
        />
      </a>
      <a
        onClick={() => {
          deletreferral(data?.referralId);
        }}
        className="btn btn-outline-danger btn-sm cursor-pointer delete"
        title="Delete"
      >
        <i
          className="fa fa-trash-o"
          aria-hidden="true"
        />
      </a>
    </div>
  </td>
</tr>
)
                        })}
                       
                    
                      </tbody>
                    </table>
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

export default Addnewproducttype;
