
import React, { useEffect, useState } from "react";
import "../sidebar.css";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import Pagination from "react-js-pagination";

const UnApprovalCoordenaitor = () => {

    let navigate = useNavigate();
    const [count, setCount] = useState();
    const [userlist, setUserlist] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    let banneredit = () => {
        navigate(`/Updatedeliveryman      `);
    };

    let token = secureLocalStorage.getItem("adminidtoken");

    let deletebanner = (item) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this User data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let deletebannerimage = () => {
                    let options = {
                        headers: {
                            Authorization: token,
                        },
                    };
                    axios
                        .delete(
                            `${process.env.REACT_APP_API_KEY}admin/banners/delete/${item}`,
                            options
                        )
                        .then((res) => {
                            GetUserList();
                        })
                        .catch((error) => { });
                };
                deletebannerimage();
                swal("Poof! Your user data has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your data is safe!");
            }
        });
    };



    useEffect(() => {
        GetUserList();
    }, [0]);

    let GetUserList = () => {
        let options = {
            headers: {
                token: token,
            },
        };
        axios
            .get(`${process.env.REACT_APP_API_KEY}coordinatorList`, options)
            .then((res) => {
                console.log(res)

                setCount(res?.data?.data?.length)
                setUserlist(res.data.data);
                let newdatafiler = res.data.data.filter((items) => {
                    return items.Status == 0
                })
            //    setUserlist(newdatafiler);
            })
            .catch((error) => { });
    };

    const activedeactive = (item) => {
        const Data = {
            coordinatorId: item,
        };
        let options = {
            headers: {
                token: token,
            },
        };
        axios
            .post(
                `${process.env.REACT_APP_API_KEY}coordinatorApprove_api`,
                Data,
                options
            )
            .then((res) => {
                console.log(res)
                swal({
                    title: (res.data.message),
                    icon: "success",
                });
                GetUserList();
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setActivePage(1);
    };

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const renderuserData = (usersdata, index) => {
         console.log("userdata",usersdata)
        const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
        return (
            <>

                <tr id={`data-${index}`}>
                    <td className="text-center">{adjustedIndex}</td>
                    <Link to="/coordinator_details" onClick={() => { secureLocalStorage.setItem("coordinatorids", usersdata?._id); }}>
                        {
                            usersdata?.coordinatorProfile === " " || usersdata?.coordinatorProfile === null || usersdata?.coordinatorProfile === undefined ? (
                                <img width={"50%"}
                                    src="./img/logo/blank-profile-picture.webp"
                                />
                            ) : usersdata?.coordinatorProfile?.startsWith("https://") ? (
                                <img width={"50%"}
                                    src={`${process.env.REACT_APP_IMG_URL}${usersdata?.coordinatorProfile}`} alt=""
                                />
                            ) : (
                                <img width={"50%"}
                                    src={`${process.env.REACT_APP_IMG_URL}${usersdata?.coordinatorProfile}`} alt=""
                                />
                            )
                        }
                    </Link>
                    <td className="text-center"><Link
                        to="/customerdetails"
                        onClick={() => {
                            secureLocalStorage.setItem("userids", usersdata?._id);

                        }}>{usersdata?.coordinatorName}</Link></td>
                    <td className="text-center">{usersdata?.email}</td>
                    <td className="text-center">{usersdata?.uniqueName}</td>
                    <td className="text-center">{usersdata?.countryName}</td>

                    <td className="text-center">2024-05-14 04:40</td>
                    <td className="text-center">2024-05-15 05:55</td>
                    {usersdata?.Status == 0 ?
                        <td className="text-center">
                            <label className="badge badge-danger">UL APPROVAL</label>
                        </td> : <td className="text-center">
                            <label className="badge badge-success">APPROVED</label>
                        </td>}
                    {usersdata?.Status == 0 ? (
                        <td className="text-center">
                            <form className="banner_status_form">
                                <input type="hidden" />
                                <input type="hidden" name="id" />
                                <label className="switcher mx-auto">
                                    <input
                                        type="checkbox"
                                        className="switcher_input"
                                        name="status"
                                        onChange={() => activedeactive(usersdata?._id)}
                                    />
                                    <span className="switcher_control" />
                                </label>
                            </form>
                        </td>
                    ) : (
                        <td className="text-center">
                            <form className="banner_status_form">
                                <input type="hidden" />
                                <input type="hidden" name="id" />
                                <label className="switcher mx-auto">
                                    <input
                                        id="coupon_status9"
                                        name="status"
                                        defaultValue={1}
                                        defaultChecked
                                        type="checkbox"
                                        className="switcher_input"
                                        onChange={() => activedeactive(usersdata?._id)}
                                    />
                                    <span className="switcher_control" />
                                </label>
                            </form>
                        </td>
                    )}

                    <td>
                        <div className="d-flex gap-10 justify-content-center">
                            <span
                                className="btn btn-outline--primary btn-sm cursor-pointer edit"
                                onClick={() => {
                                    banneredit(
                                        secureLocalStorage.setItem("banner_id", usersdata?._id)
                                    );
                                }}
                                title="Edit"
                            >
                                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                            </span>
                            <a onClick={(() => deletebanner())}
                                className="btn btn-outline-danger btn-sm cursor-pointer delete"
                                title="Delete"
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" />
                            </a>
                            <Link
                                to="/coordinator_details"
                                onClick={() => {
                                    secureLocalStorage.setItem("coordinatorids", usersdata?._id);

                                }}
                                title="View"
                                className="btn btn-outline-info btn-sm square-btn"
                            >
                                <i class="fa fa-eye" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </td>
                </tr>

            </>
        );
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
                    <div className="mt-3 mb-4">
                        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
                            <img
                                width={20}
                                src="assets/businessman.png"
                                alt=""
                            />
                            Un Approval Coordinator List
                        </h2>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="table-responsive">
                                    {userlist?.length > 0 ? (
                                        <table
                                            id="columnSearchDatatable"
                                            style={{ textAlign: "left" }}
                                            className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                                        >
                                            <thead className="thead-light thead-50 text-capitalize">
                                                <tr>
                                                    <th className="pl-xl-5">SR NO.</th>
                                                    <th>PROFILE</th>
                                                    <th>USER NAME</th>
                                                    <th>EMAIL-ID</th>
                                                    <th>UNIQUENAME</th>
                                                    <th>COUNTRY NAME</th>
                                                    <th>CREATE DATE&TIME</th>
                                                    <th>LAST UPDATE DATE & TIME</th>
                                                    <th>STATUS</th>
                                                    <th>ACTIVATE&DEACTIVATE</th>
                                                    <th className="text-center">CONTROLS</th>

                                                </tr>
                                            </thead>

                                            <tbody>
                                                {userlist
                                                    .slice(
                                                        (activePage - 1) * itemsPerPage,
                                                        activePage * itemsPerPage
                                                    )
                                                    .map((usersdata, index) =>
                                                        renderuserData(usersdata, index)
                                                    )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div class="text-center p-4">
                                            <img
                                                class="mb-3 w-160"
                                                src="./logo/default.png"
                                                alt="Image Description"
                                            />
                                            <p class="mb-0 order-stats__subtitle">No data found</p>
                                        </div>
                                    )}
                                    <div className="d-flex justify-content-center mt-4">
                                        {userlist.length > itemsPerPage && (
                                            <Pagination
                                                activePage={activePage}
                                                itemsCountPerPage={itemsPerPage}
                                                totalItemsCount={userlist.length}
                                                pageRangeDisplayed={5}
                                                onChange={handlePageChange}
                                                itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        )}
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

export default UnApprovalCoordenaitor;
