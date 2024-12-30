import axios from 'axios';
import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage';
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from 'xlsx';
import { FaClipboardList, FaCommentDollar, FaRegStopCircle } from 'react-icons/fa';
import swal from "sweetalert";
import { Link, useNavigate } from 'react-router-dom';

const Livematchs = () => {
  let navigate = useNavigate()

  const [productlist, setproductlist] = useState([]);
  const [matchDetails, setmatchDetails] = useState({});

  const [ProductListfilter, setProductListfilter] = useState([]);
  const [count, setcount] = useState();

  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    getCustomerData();
    getScoreDetails(); 
  }, []);

  const getCustomerData = async () => {
    try {
      const options = { headers: { token } };
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}matcheLists`,
        options
      );

      if (response?.data?.data?.length > 0) {
        setcount(response?.data?.data?.length);
        setproductlist(response?.data?.data);
        setProductListfilter(response?.data?.data); 
      } else {
        toast.error("No match data found.");
      }
    } catch (error) {
      console.error("Error fetching match data:", error);
      toast.error("Failed to fetch match list.");
    }
  };
console.log("productlist today",productlist)

  const getScoreDetails = async () => {
    const storedMatchId = secureLocalStorage.getItem("matchId");
    if (!storedMatchId) {
      toast.error("Match ID is missing.");
      return;
    }
  //  console.log("Fetched matchId:", storedMatchId);

    try {
      const options = { headers: { token } };
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}matchDetails`,
        { matchId: storedMatchId },
        options
      );

      if (response?.data?.data) {
        setmatchDetails(response?.data?.data);
        setcount(response?.data?.data.length);
      } else {
        toast.error("No score details found.");
      }
    } catch (error) {
      console.error("Error fetching score details:", error);
      toast.error("Error fetching score details.");
    }
  };
  //console.log("matchDetails today",matchDetails)

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredResults = productlist?.filter(
      (item) => item?.product_name?.toLowerCase().includes(searchTerm)
    );
    setProductListfilter(filteredResults);
  };

  const handleMatchClick = (matchId) => {
    secureLocalStorage.setItem("matchId", matchId);
    console.log("Saved matchId:", matchId);
    getScoreDetails(); 
  };


  const tableData = [
    { SR: 1, CoordinatorName: "Virat", TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 2, CoordinatorName: "Virat", TeamName: "Indore vs dewas", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 3, CoordinatorName: "Virat", TeamName: "ujjain vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 4, CoordinatorName: "Virat", TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },

    { SR: 5, CoordinatorName: "Virat", TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247", TotalPayment: "250", TotalBetUser: "9", Status: "live" },
    ,
  ];

  const totalAmount = tableData.reduce((sum, data) => sum + data.Amount, 0);
  const totalReturn = tableData.reduce((sum, data) => sum + parseFloat(data.Return), 0);
  const totalBillAmount = tableData.reduce((sum, data) => sum + parseFloat(data.BillAmount), 0);
  const totalCashPaid = tableData.reduce((sum, data) => sum + parseFloat(data.Cashpaid), 0);

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData, productlist);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Generate the excel file and download it
    XLSX.writeFile(workbook, "products_data.xlsx");
  };


  /// delete  bill data 
  let deleteproducts = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this bill?",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Delete",
          value: true,
          visible: true,
          className: "btn-danger",
          closeModal: true
        }
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Perform the delete action here
        console.log("Product deleted");
      } else {
        // Handle the cancel action here
        console.log("Delete cancelled");
      }
    });
  };

  // edit bill data 
  let editbilldata = () => {
    navigate("/updatebil")
  }

  return (
    <>
      <Toaster />
      <div className="container row" style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}>
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }} >
          <div className="mt-3 mb-5">
            <button
              style={{ float: "right" }}
              className='btn btn-success mb-5'
              onClick={handleExportToExcel}
            >
              Export EXCEL
            </button>
            <button
              style={{ float: "right", marginRight: "10px" }}
              className='btn btn-success mb-5'
              onClick={handleExportToExcel}
            >
              Import EXCEL
            </button>
            <div className="page-header pb-0 border-0 mb-3 mt-3 ">
              <div className="d-flex flex-wrap gap-2 align-items-center mb-3 mt-3 pl-3">
                <h2 className="h1 mb-0 d-flex gap-2">
                  <FaCommentDollar className='mt-1' style={{ fontSize: "18px" }} />
                  Live
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
                    <th>TeamName1</th>
                    <th>TeamName2</th>
                    <th>Coordinator Name</th>
                    <th>Category Name</th>
                    <th>Start Date</th>
                    <th>Start Time</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                  {productlist.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data?.teamName1}</td>
                      <td>{data?.teamName2}</td>
                      <td>{data?.coordinatorName}</td>

                      {/*   //<td className="text-center">
                      //     <Link
                      //   to="/livescoredetails"
                      //   onClick={() => {
                      //       secureLocalStorage.setItem("userids", data?._id);
                      //   }}>{data?.coordinatorName}</Link>
                      //  </td>
                      */}
                      <td>{data?.categoryName}</td>
                      <td>{data?.start_date}</td>
                      <td>{data?.start_time}</td>
                      <td>
                        <td className='order-stats__subtitle d-inline-flex' style={{ lineHeight: "12px", color: "green", border: "1px solid green", padding: "5px" }}>{data?.matchStatus}</td>
                      </td>
                      <td style={{ display: "flex" }}>


                        <div className="d-flex gap-10 justify-content-center">
                          {/* //  <span
                           // className="btn btn-outline--primary btn-sm cursor-pointer edit"
                            // onClick={() => {
                            //   banneredit(
                            //     secureLocalStorage.setItem("banner_id", usersdata?._id)
                            //   );
                            // }}
                           // title="Edit"
                         // >
                         //   <i className="fa fa-pencil-square-o" aria-hidden="true" />
                         // </span>
                          //<a
                          //  className="btn btn-outline-danger btn-sm cursor-pointer delete"
                          //  title="Delete"
                          //>
                          //  <i className="fa fa-trash-o" aria-hidden="true" />
                         // </a>
                        */}

                          <Link
                            to="/livescoredetails"
                            onClick={() => handleMatchClick(data?.matchId)}
                            title="View"
                            className="btn btn-outline-info btn-sm square-btn"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i> 
                          </Link>
                          {/* <Link
                            to="/livescoredetails"
                            onClick={() => {
                              secureLocalStorage.setItem("matchId", productlist?.matchId);
                              console.log("matchdId save ", productlist?.matchId)
                            }}
                            title="View"
                            className="btn btn-outline-info btn-sm square-btn"
                          >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                          </Link> */}
                        </div>
                        </td>
                    </tr>
                  ))}

                </tbody>
              </table>
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

export default Livematchs;
