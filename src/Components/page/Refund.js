

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage';
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from 'xlsx';
import { FaClipboardList, FaCommentDollar, FaRegStopCircle } from 'react-icons/fa';
import swal from "sweetalert";
import { Link, useNavigate } from 'react-router-dom';
import { FcApprove } from "react-icons/fc";
import { RiRefund2Fill } from 'react-icons/ri';


const Refund = () => {
  let navigate = useNavigate()

  const [productlist, setproductlist] = useState([]);
  const [ProductListfilter, setProductListfilter] = useState([]);
  const [count, setcount] = useState();
  let token = secureLocalStorage.getItem("adminidtoken");




  useEffect(() => {
    getproductlist();
  }, [0]);
  let getproductlist = () => {
    const options = {
      headers: {
        token: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/productList`, options)
      .then((res) => {
        setcount(res?.data?.data?.length);
        setproductlist(res.data.data);
      })
      .catch((error) => { });
  };

  const activedeactive = (item) => {
    const Data = {
      productId: item,
    };

    let options = {
      headers: {
        token: token,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/product_approve`,
        Data,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getproductlist();
      })
      .catch((error) => { });
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = productlist?.filter(
      (item) => item?.product_name?.toLowerCase().includes(searchTerm)
      //item.product_name.toLowerCase().includes(searchTerm)
    );
    setProductListfilter(result);
  };



  const tableData = [
    { SR: 1, TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247",TotalPayment: "250" ,TotalBetUser:"9", Status:"Refund" },
  
    { SR: 2, TeamName: "Indore vs dewas", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247",TotalPayment: "250" ,TotalBetUser:"9" ,Status:"Refund"  },

    { SR: 3, TeamName: "ujjain vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247",TotalPayment: "250" ,TotalBetUser:"9", Status:"Refund"  },

    { SR: 4, TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247",TotalPayment: "250" ,TotalBetUser:"9", Status:"Refund"  },

    { SR: 5, TeamName: "Indore vs Bhopal", Date: "2023-01-05 ", Totaltime: "12:22:05", StartTime: "2500", EndTime: "758247",TotalPayment: "250" ,TotalBetUser:"9", Status:"Refund"  },


    ,
  ];

  const totalAmount = tableData.reduce((sum, data) => sum + data.Amount, 0);
  const totalReturn = tableData.reduce((sum, data) => sum + parseFloat(data.Return), 0);
  const totalBillAmount = tableData.reduce((sum, data) => sum + parseFloat(data.BillAmount), 0);
  const totalCashPaid = tableData.reduce((sum, data) => sum + parseFloat(data.Cashpaid), 0);

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
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
                <RiRefund2Fill className='mt-1' style={{ fontSize: "18px" }} />
                Refund
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
                    <th>Team Name</th>
                    <th>Date</th>
                    <th>Total Time</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Total Payment</th>
                    <th>Total Bet User</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <th>{data.SR}</th>
                      <td>{data.TeamName}</td>
                      <td>{data.Date}</td>
                      <td>{data.Totaltime}</td>
                      <td>{data.StartTime}</td>
                      <td>{data.EndTime}</td>
                      <td>{data.TotalPayment}</td>
                      <td>{data.TotalBetUser}</td>
                     

                     <td>
                     <td className='order-stats__subtitle d-inline-flex' style={{ lineHeight: "12px", color: "red", border: "1px solid red", padding: "5px" }}>{data.Status}</td>
                     </td>



                      <td style={{ display: "flex" }}>
                      <div className="d-flex gap-10 justify-content-center">
                                                    <span
                                                        className="btn btn-outline--primary btn-sm cursor-pointer edit"
                                                        // onClick={() => {
                                                        //   banneredit(
                                                        //     secureLocalStorage.setItem("banner_id", usersdata?._id)
                                                        //   );
                                                        // }}
                                                        title="Edit"
                                                    >
                                                        <i className="fa fa-pencil-square-o" aria-hidden="true" />
                                                    </span>
                                                    <a
                                                        className="btn btn-outline-danger btn-sm cursor-pointer delete"
                                                        title="Delete"
                                                    >
                                                        <i className="fa fa-trash-o" aria-hidden="true" />
                                                    </a>
                                                    <Link
                                                        to="/customerdetails"
                                                        // onClick={() => {
                                                        //   secureLocalStorage.setItem("userids", usersdata?._id);

                                                        // }}
                                                        title="View"
                                                        className="btn btn-outline-info btn-sm square-btn"
                                                    >
                                                        <i class="fa fa-eye" aria-hidden="true"></i>
                                                    </Link>
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

export default Refund;

