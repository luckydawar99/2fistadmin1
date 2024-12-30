import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { FaCommentDollar } from "react-icons/fa";
import { BiSolidMessageError } from "react-icons/bi";
import "../LiveScore_pagination.css";

const LiveScoreDetails = () => {
  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(0);
  const [allBatsData, setAllBatsData] = useState([]);
  const [matchedDatas, setMatchedDatas] = useState([]);
  const [viewMode, setViewMode] = useState("allBats");
  const itemsPerPage = 10;

  const token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    const fetchInitialData = async () => {
      const matchId = secureLocalStorage.getItem("matchId");
      if (matchId) {
        await getScoreDetails(matchId);
      } else {
        toast.error("Match ID is missing.");
      }
    };
    fetchInitialData();
  }, [viewMode]);

  const getScoreDetails = async (matchId) => {
    try {
   
      const options = { headers: { token } };
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}allBetUsersList`,
        { matchId },
        options
      );

      const fetchedData = response?.data?.data || [];
      console.log("API Response:", fetchedData);

      if (fetchedData.length > 0) {
        if (viewMode === "allBats") {
          setAllBatsData(fetchedData);
        } else if (viewMode === "matched") {
          setMatchedDatas(fetchedData.filter((data) => data?.matched === true));
        }
        setCount(fetchedData.length);
      } else {
        toast.error("No user data found.");
        setAllBatsData([]);
        setMatchedDatas([]);
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
      toast.error("Failed to fetch match details.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    secureLocalStorage.setItem("activePage", pageNumber);
  };

  const handleViewToggle = (view) => {
    setViewMode(view);
  };

 
  const hasData = (viewMode === "allBats" ? allBatsData : matchedDatas).length > 0;

  return (
    <>
      <Toaster />
      <div className="container row" style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}>
        <div className="col-lg-3 col-md-4">{/* Sidebar */}</div>
        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="page-header pb-0 border-0 mb-3 mt-3">
              <h2 className="h1 mb-0 d-flex gap-2">
                <FaCommentDollar className="mt-1" style={{ fontSize: "18px" }} />
                {viewMode === "allBats" ? "All Bats Details" : "Matched Details"}
              </h2>
            </div>

            <div className="btn_score_detels">
              <button
                style={{ float: "left", marginLeft: "5px", marginBottom: "5px" }}
                className={`btn ${viewMode === "allBats" ? "btn-success" : "btn-primary"}`}
                onClick={() => handleViewToggle("allBats")}
              >
                All Bats
              </button>
              <button
                style={{ float: "left", marginLeft: "5px", marginBottom: "5px" }}
                className={`btn ${viewMode === "matched" ? "btn-success" : "btn-primary"}`}
                onClick={() => handleViewToggle("matched")}
              >
                Matched
              </button>
            </div>

            <div className="table-responsive">
              <table
                id="datatable"
                className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
              >
                <thead className="thead-light">
                  <tr>
                    <th>SR</th>
                    <th>Unique Name</th>
                    <th>Profile</th>
                    <th>User Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {hasData ? (
                    (viewMode === "allBats" ? allBatsData : matchedDatas)
                      .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
                      .map((data, index) => (
                        <tr key={index}>
                          <td>{(activePage - 1) * itemsPerPage + index + 1}</td>
                          <td>{data?.uniqueName}</td>
                          <td>
                            <Link to="#" >
                              <img
                                className="rounded-circle img-fluid"
                                style={{ width: "50px", height: "50px" }}
                                src={data?.userProfile ? `${process.env.REACT_APP_IMG_URL}${data?.userProfile}` : "./img/bussiness-man.png"}
                                alt="Profile"
                              />
                            </Link>
                          </td>
                          <td>{data?.userName}</td>
                          <td>{`$${data?.amount}`}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4">
                        <img
                          class="mb-3 w-160"
                          src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                          alt="Image Description"
                        />
                        <p class="mb-0 order-stats__subtitle">No data found</p>

                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              {hasData && (
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={(viewMode === "allBats" ? allBatsData : matchedDatas).length}
                  onChange={handlePageChange}
                  innerClass="pagination justify-content-center mt-4"
                  itemClass="page-item"
                  linkClass="page-link"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveScoreDetails;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import secureLocalStorage from "react-secure-storage";
// import toast, { Toaster } from "react-hot-toast";
// import Pagination from "react-js-pagination";
// import { Link, useNavigate } from "react-router-dom";
// import { FaCommentDollar } from "react-icons/fa";
// import "../LiveScore_pagination.css"

// const LiveScoreDetails = () => {
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState(1);
//   const [count, setCount] = useState(0);
//   const [matchedDatas, setMatchedDatas] = useState([]);
//   const [allBatsData, setAllBatsData] = useState([]);
//   const [viewMode, setViewMode] = useState("allBats"); // Track which view to display: "allBats" or "matched"
//   const itemsPerPage = 10;

//   const token = secureLocalStorage.getItem("adminidtoken");

//   useEffect(() => {
//     const savedPage = secureLocalStorage.getItem("activePage");
//     if (savedPage) setActivePage(Number(savedPage));
//     getCustomerData();
//     getScoreDetails();
//   }, [viewMode]); // Re-fetch when the view mode changes



//   const getCustomerData = async () => {
//     try {
//       const options = { headers: { token } };
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_KEY}matcheLists`,
//         options
//       );
//       if (response?.data?.data?.length > 0) {
//         // const matchId = response.data.data[0]?.matchId || null;
//         // secureLocalStorage.setItem("matchId", matchId);

//       }
//     } catch (error) {
//       console.error("Error fetching customer order data:", error);
//       toast.error("Failed to fetch product list.");
//     }
//   };
//   console.log("count", count)

//   const getScoreDetails = async () => {
//     const storedUserId = secureLocalStorage.getItem("matchId");
//     if (!storedUserId) {
//       toast.error("Match ID is missing.");
//       return;
//     }
//     console.log("live id", storedUserId)
//     try {
//       const options = { headers: { token } };
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_KEY}allBetUsersList`,
//         { matchId: storedUserId },
//         options
//       );
//       console.log("resdata ", response?.data?.data)
//       if (response?.data?.data) {
//         if (viewMode === "allBats") {
//           setAllBatsData(response?.data?.data); // Set data for all bats view
//           setCount(response?.data?.data.length);
//         } else if (viewMode === "matched") {
//           const matcheddata = response?.data?.data.filter((data) => data?.matched === true);
//           setMatchedDatas(matcheddata); // Set matched data
//           setCount(response?.data?.data.length);
//         }
//       } else {
//         toast.error("No user data found.");
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       toast.error("Error fetching user details.");
//     }
//   };
//   console.log("allBatsData", allBatsData)
//   const handlePageChange = (pageNumber) => {
//     setActivePage(pageNumber);
//     secureLocalStorage.setItem("activePage", pageNumber);
//   };

//   const handleViewToggle = (view) => {
//     setViewMode(view); // Toggle between "allBats" and "matched"
//   };
//   console.log("viewMode", viewMode)
//   return (
//     <>
//       <Toaster />
//       <div className="container row" style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}>
//         <div className="col-lg-3 col-md-4">{/* Sidebar */}</div>
//         <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
//           <div className="mt-3 mb-5">
//             <div className="page-header pb-0 border-0 mb-3 mt-3">
//               <h2 className="h1 mb-0 d-flex gap-2">
//                 <FaCommentDollar className="mt-1" style={{ fontSize: "18px" }} />
//                 {viewMode === "allBats" ? "All Bats Details" : "Matched Details"}
//               </h2>
//             </div>

//             <div className="btn_score_detels "  >
//               <button
//                 style={{ float: "left", marginLeft: "5px", marginBottom: "5px" }}
//                 className={`btn ${viewMode === "allBats" ? "btn-success" : "btn-primary"} `}
//                 onClick={() => handleViewToggle("allBats")}
//               >
//                 All Bats
//               </button>
//               <button
//                 style={{ float: "left", marginLeft: "5px", marginBottom: "5px" }}
//                 className={`btn ${viewMode === "matched" ? "btn-success" : "btn-primary"}`}
//                 onClick={() => handleViewToggle("matched")}
//               >
//                 Matched
//               </button>
//             </div>

//             <div className="table-responsive ">
//               <table
//                 id="datatable"
//                 className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
//               >
//                 <thead className="thead-light">
//                   <tr>
//                     <th>SR</th>
//                     <th>Unique Name</th>
//                     <th>Profile</th>
//                     <th>User Name</th>
//                     <th>Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(viewMode === "allBats" ? allBatsData : matchedDatas)
//                     .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
//                     .map((data, index) => (
//                       <tr key={index}>
//                         <td>{(activePage - 1) * itemsPerPage + index + 1}</td>
//                         <td>{data?.uniqueName}</td>
//                         <td>
//                           <Link to="/coordinator_details" onClick={() => secureLocalStorage.setItem("matchId", data?.matchId)}>
//                             <img
//                               className="rounded-circle img-fluid"
//                               style={{ width: "50px", height: "50px" }}
//                               src={data?.userProfile ? `${process.env.REACT_APP_IMG_URL}${data?.userProfile}` : "./img/bussiness-man.png"}
//                               alt="Profile"
//                             />
//                           </Link>
//                         </td>
//                         <td>{data?.userName}</td>
//                         <td>{`$`}{data?.amount}</td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//               <Pagination
//                 activePage={activePage}
//                 itemsCountPerPage={itemsPerPage}
//                 totalItemsCount={(viewMode === "allBats" ? allBatsData : matchedDatas).length}
//                 onChange={handlePageChange}
//                 innerClass="pagination justify-content-center mt-4"
//                 itemClass="page-item"
//                 linkClass="page-link"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default LiveScoreDetails;

