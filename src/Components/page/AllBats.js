
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage';
import toast, { Toaster } from "react-hot-toast";

import Pagination from "react-js-pagination";
import { FaClipboardList, FaCommentDollar, FaRegStopCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';


const AllBats = () => {
  let navigate = useNavigate()

  const [productlist, setproductlist] = useState([]);
  const [allBats, setAllBats] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(0);
  const itemsPerPage = 10;

  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    const savedPage = secureLocalStorage.getItem("activePage");
    if (savedPage) setActivePage(Number(savedPage));

    getCustomerOrderData();
    getScoreDetails();


  }, [0]);


  const getCustomerOrderData = async () => {
    try {
      const options = { headers: { token } };
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}matcheLists`,
        options
      );
      if (response?.data?.data?.length > 0) {
        const matchId = response.data.data[0]?.matchId || null;
        secureLocalStorage.setItem("matchId", matchId);
      //  toast.success("Match ID stored successfully.");
        setCount(response.data.data.length);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Failed to fetch product list.");
    }
  };

  const getScoreDetails = async () => {
    const storedUserId = secureLocalStorage.getItem("matchId");
    if (!storedUserId) {
      toast.error("Match ID is missing.");
      return;
    }

    try {
      const options = { headers: { token } };
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}allBetUsersList`,
        { matchId: storedUserId },
        options
      );

      if (response?.data?.data) {
        toast.success("User details fetched successfully.");
        setAllBats(response.data.data);
      } else {
        toast.error("No user data found.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    secureLocalStorage.setItem("activePage", pageNumber);
  };


  console.warn("ProductList", productlist)

  return (
    <>
      <Toaster />
      <div className="container row" style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}>
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }} >
          <div className="mt-3 mb-5">
      
            <div className="page-header pb-0 border-0 mb-3 mt-3 ">
              <div className="d-flex flex-wrap gap-2 align-items-center mb-3 mt-3 pl-3">
                <h2 className="h1 mb-0 d-flex gap-2">
                  <FaCommentDollar className='mt-1' style={{ fontSize: "18px" }} />
                  All Bats Details
                </h2>
              </div>
            </div>

            <div className="table-responsive">
              <table
                id="datatable"
                style={{ textAlign: "left" }}
                className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
              >
                <thead className="thead-light thead-50 text-capitalize">
                  <tr>
                    <th>SR</th>
                    <th>Unique Name</th>
                    <th>Profile</th>
                    <th>User Name</th>
                    <th>Amount</th>


                  </tr>
                </thead>
                <tbody>
                  {allBats
                    .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
                    .map((data, index) => (
                      <tr key={index}>
                        <td>{(activePage - 1) * itemsPerPage + index + 1}</td>
                        <td>{data?.uniqueName}</td>
                        <td>
                          <Link
                            to="/coordinator_details"
                            onClick={() => secureLocalStorage.setItem("matchId", data?.matchId)}
                          >
                            <img
                              className="rounded-circle img-fluid"
                              style={{ width: "50px", height: "50px" }}
                              src={
                                data?.userProfile
                                  ? `${process.env.REACT_APP_IMG_URL}${data?.userProfile}`
                                  : "./img/bussiness-man.png"
                              }
                              alt={data?.userProfile ? "User Profile" : "Default Profile"}
                            />
                          </Link>
                        </td>
                        <td>{data?.userName}</td>
                      
                        <td>{data?.amount}</td>

                      </tr>
                    ))}
                </tbody>
              </table>
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={allBats.length}
                onChange={handlePageChange}
                innerClass="pagination justify-content-center mt-4"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </div>
          {/*  */}
          <thead>
            <tr>
              <th>
              </th>

            </tr>
          </thead>
          {/*  */}
        </div>
      </div>
    </>
  )
}

export default AllBats;

