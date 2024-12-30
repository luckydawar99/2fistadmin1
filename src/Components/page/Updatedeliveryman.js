import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
const Updatedeliveryman = () => {
  const [userName, setuserName] = useState();
  const [mobilenumber, setmobilenumber] = useState();
  const [email, setemail] = useState();
  const [address, setAddress] = useState("");
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const Navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [store_address, setstore_address] = useState();
  let customeridd = secureLocalStorage.getItem("customerid");

  let token = secureLocalStorage.getItem("adminidtoken");

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setDetails(latLng);
    } catch (error) {}
  };

  useEffect(() => {
    getcustomerdata();
  }, [0]);
  let getcustomerdata = () => {
    let options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/member/getMemberById/${customeridd}`,

        options
      )
      .then((res) => {
        setuserName(res.data.data.userName);
        setmobilenumber(res.data.data.mobileNumber);
        setemail(res.data.data.email);
        setAddress(res.data.data.address);
        setlatitude(res.data.data.latitude);
        setlongitude(res.data.data.longitude);
      })
      .catch((error) => {});
  };

  const updatemember = (e) => {
    e.preventDefault();

    const formdata = {
      userId: customeridd,
      userName: userName,
      mobileNumber: mobilenumber,
      email: email,
      address: address ? address : store_address,

      latitude: latitude ? latitude : details?.lat,
      longitude: longitude ? longitude : details?.lng,
    };

    let options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/member/updateMember`,
        formdata,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          Navigate("/customerlist");
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
                src="https://6valley.6amtech.com/public/assets/back-end/img/deliveryman.png"
                width={20}
                alt=""
              />
              UDATE USER DETAILS
            </h2>
          </div>
          <div className="row">
            <div className="col-12 mb-3">
              <form onSubmit={updatemember}>
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="5201ifIgVXHshEaS9xR5L76fdJ1eBw8H5dYCuDvv"
                  autoComplete="off"
                />{" "}
                <div className="card">
                  <div className="card-body">
                    <h5 className="mb-0 page-header-title d-flex align-items-center gap-2 border-bottom pb-3 mb-3">
                      <i class="fa fa-user" aria-hidden="true"></i>
                      General Information
                    </h5>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="form-group">
                          <label className="title-color d-flex">UserName</label>
                          <input
                            onChange={(e) => {
                              setuserName(e.target.value);
                            }}
                            type="text"
                            value={userName}
                            name="f_name"
                            className="form-control"
                            placeholder="Jarvis Doat"
                            required
                          />
                        </div>

                      
                       
                       
                      </div>
                      
                      <div className="col-md-6 col-12">
                        

                        <div className="form-group">
                          <label
                            className="title-color d-flex"
                            htmlFor="exampleFormControlInput1"
                          >
                            Mobile Number
                          </label>
                          <div className="input-group mb-3">
                            <input
                              value={mobilenumber}
                              onChange={(e) => {
                                setmobilenumber(e.target.value);
                              }}
                              placeholder="9858574585"
                              type="text"
                              name="phone"
                              className="form-control"
                            />
                          </div>
                        </div>
                        
                        
                      </div>
                      <div className="col-md-6 col-12">
                       

                      
                       
                        <div className="form-group">
                          <label className="title-color d-flex">Email</label>
                          <input placeholder="jarvis@gmail.com"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            type="email"
                            name="email"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        

                       
                        <div className="form-group">
                          <label
                            htmlFor="exampleInputPhone"
                            className="title-color d-flex gap-1 align-items-center"
                          >
                            Address
                          </label>
                          <PlacesAutocomplete
                            value={address}
                            onChange={(newValue) => setAddress(newValue)}
                            onSelect={handleSelect}
                          >
                            {({
                              getInputProps,
                              suggestions,
                              getSuggestionItemProps,
                              loading,
                            }) => (
                              <div>
                                <input
                                  style={{ width: "100%", marginTop: "0px" }}
                                  className="form-control"
                                  {...getInputProps({
                                    placeholder: "Select location",
                                  })}
                                />
                                <div>
                                  {loading && <div>Loading...</div>}
                                  {suggestions.map((suggestion) => {
                                    const style = {
                                      backgroundColor: suggestion.active
                                        ? "#41b6e6"
                                        : "#fff",
                                    };
                                    return (
                                      <div
                                        {...getSuggestionItemProps(suggestion, {
                                          style,
                                        })}
                                      >
                                        {suggestion.description}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </PlacesAutocomplete>
                        </div>
                       
                      </div>
                      
                    </div>

                    <div className="d-flex gap-3 justify-content-end">
                      <button onClick={(()=>{Navigate("/customerlist")})}
                        type="reset"
                        id="reset"
                        className="btn btn-secondary px-4"
                      >
                        Back
                      </button>
                      <button type="submit" className="btn btn--primary px-4">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatedeliveryman;

                     
                 