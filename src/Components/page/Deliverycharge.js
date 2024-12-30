import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const Deliverycharge = () => {
  const [deliverycharge, setdeliverycharge] = useState();
  const [commission, setcommission] = useState();
  const [charges, setcharges] = useState();
  let token = secureLocalStorage.getItem("adminidtoken");
  
  useEffect(() => {
    getcharges();
  }, [0]);

  const getcharges = () => {
    const options = {
      headers:{
        Authorization : token
      }
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/withdraw/minimum/amount/getAllAmountLimit`,options)
      .then((res) => {
       
        setcharges(res.data.data);
      })
      .catch((error) => {});
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("type",deliverycharge)
    formData.append("amount",commission)
const options = {
  headers:{
    Authorization : token
  }
}

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/withdraw/minimum/amount/save/limit`,
        formData,options
      )
      .then((res) => {

        toast.success(res.data.message);
        getcharges();
      })
      .catch((error) => {

      });
    setdeliverycharge("");
    setcommission("");
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
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
              <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
                <img
                  width={20}
                  src="assets/map.png"     alt
                />
                MINIMUM WITHDRAWAL AMOUNT SETTING
              </h2>
            </div>
            <div
              className="row pb-4 d--none"
              id="main-banner"
              style={{ textAlign: "left" }}
            ></div>
            <form onSubmit={handlesubmit} encType="multipart/form-data">
              <div className="row g-3 mb-3">
                <div className="col-md-12">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="UUv9Mglm04V3CqIyFGCPNvVg28RwTzVCaKRLpfdW"
                    autoComplete="off"
                  />{" "}
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0 text-capitalize">
                        {" "}
                        WITHDRAWAL AMOUNT :{" "}
                      </h5>
                    </div>
                    <div className="card-body">
                      
                      <small className="badge badge-soft-danger text-wrap mb-3">
                        SET YOUR WITHDRAWAL AMOUNT HERE !
                      </small>
                      <div className="row">
                      <div className="col-md-6">
                      <div className="form-group">
                        <label>SELECT TYPE <span className="text-danger">*</span></label>
                        <select
                          required
                          onChange={(e) => {
                            setdeliverycharge(e.target.value);
                          }} 
                          value={deliverycharge}
                          className="form-control"
                          
                        ><option value="" selected>SELECT TYPE</option>
<option value="VENDOR">VENDOR</option>
<option value="MEMBER">MEMBER</option>
                        </select>
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group">
                        <label>ENTER AMOUNT <span className="text-danger">*</span></label>
                        <input required
                          placeholder='ENTER AMOUNT'
                          type="number"
                          onChange={(e) => {
                            setcommission(e.target.value);
                          }} 
                          value={commission}
                          className="form-control"
                          name="commission"
                        />
                      </div>
                      </div>
                      </div>
                      
                      <div class="d-flex gap-3 justify-content-end"><button type="submit" class="btn btn--primary px-4">Submit</button></div>
                    </div>




                    <div className="card-body">
                      
                    
                      <div className="row">
                        {charges?.map((data)=>{
                          return(
                            <div className="col-md-4">
                            <div className="form-group">
                              <label>{data?.type} WITHDRAW LIMIT</label>
                              <div 
                                className="form-control btn btn--primary"
                                name="commission"
                              >{data?.amount}</div>
                            </div>
                            </div>
                          )
                        })}
                     
                     
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

export default Deliverycharge;
