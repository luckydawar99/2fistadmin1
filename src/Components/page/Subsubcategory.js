import React, { useEffect, useState } from "react";
import Header from "../Header";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import Pagination from "react-js-pagination";
import toast, { Toaster } from "react-hot-toast";
const Subsubcategory = () => {
  let navigate = useNavigate();

  const [category_englishName, setcategory_englishName] = useState();

  const [category_image, setcategory_image] = useState();

  const [categorylist, setcategorylist] = useState([]);

  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [count, setcount] = useState();
  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    setFilteredCategoryList(categorylist);
  }, [categorylist]);
  let addcategorydata = () => {
    swal({
      title: "Category added Successfully",
      text: "Category inserted sucessfully",
      icon: "success",
      buttons: true,
    });
  };

  const categorydatahandle = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("categoryName", category_englishName);

    formData.append("categoryImage", category_image);

    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/category/addCategory`,
        formData,
        options
      )
      .then((res) => {
        addcategorydata();
        getbannerlist();
      })
      .catch((error) => {});

    setcategory_englishName("");

    setcategory_image("");
  };

  useEffect(() => {
    getbannerlist();
  }, [0]);

  let getbannerlist = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/category/getCategoryList`,options)
      .then((res) => {
        setcount(res?.data?.length);
        setcategorylist(res.data);
      })
      .catch((error) => {});
  };

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const result = categorylist.filter(
      (item) =>
        item.categoryName?.toLowerCase().includes(searchTerm)
    );
    setFilteredCategoryList(result);
    setActivePage(1);
  };


  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  let cetagoryedit = () => {
    navigate("/editcetagory");
  };

  let deletesubcategory = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let deletebannerimage = () => {
          let bannerdata = {
            categoryId: item,
          };

          let options = {
            headers: {
              token: token,
            },
          };
          axios
            .post(
              `${process.env.REACT_APP_API_KEY}admin/api/deleteCategory`,
              bannerdata,
              options
            )
            .then((res) => {
              getbannerlist();
            })
            .catch((error) => {});
        };
        deletebannerimage();
        swal("Poof! Your category  has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your category is safe!");
      }
    });
  };

  const activedeactive = (item) => {
    const Data = {
      categoryId: item,
    };
    let options = {
      hraders: {
        token: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/activeDeactive_category`,
        Data,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getbannerlist();
      })
      .catch((error) => {});
  };

  const renderCategoryData = (categorydata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center">
        Raju DD
        </td>

        <td className="text-center">DD Raju</td>
        <td className="text-center">Axis</td>
        <td className="text-center">Saving</td>
        <td className="text-center">01455dfdf52</td>
        <td className="text-center">01EREdf</td>
        <td className="text-center"><label
            
            className="badge badge-success cursor-pointer"
          >
            Approve
          </label></td>
          
          <td className="text-center">2024-05-12</td>
          <td className="text-center">2024-04-10</td>
          <td className="text-center"><form action="https://6valley.6amtech.com/vendor/products/status-update" method="post" data-from="product-status" id="product-status54-form" className="admin-product-status-form">
        <input type="hidden" name="_token" defaultValue="2nohFUff9chQ6XVV3eOZHrzANIB1CpRwY18RYsMm" autoComplete="off" /> <input type="hidden" name="id" defaultValue={54} />
        <label className="switcher mx-auto">
          <input type="checkbox" className="switcher_input toggle-switch-message" name="status" id="product-status54" defaultValue={1} defaultChecked data-modal-id="toggle-status-modal" data-toggle-id="product-status54" data-on-image="product-status-on.png" data-off-image="product-status-off.png" data-on-title="Want to Turn ON Secret Covered in Sand Comic book pdf Status" data-off-title="Want to Turn OFF Secret Covered in Sand Comic book pdf Status" data-on-message="<p>If enabled this product will be available on the website and customer app</p>" data-off-message="<p>If disabled this product will be hidden from the website and customer app</p>" />
          <span className="switcher_control" />
        </label>
      </form></td>
        <td className="text-center">
          <div className="d-flex gap-10 justify-content-center">
            <span
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                cetagoryedit(
                  secureLocalStorage.setItem("categoryid", categorydata?.categoryId)
                );
              }}
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
           
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Toaster />
      {/* <Header /> */}
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4" style={{ paddingLeft: "0px" }}>
          {/* <Sidebarr /> */}
        </div>

        <div
          className="col-lg-9 col-md-8"
          style={{ paddingLeft: "0px", marginTop: "60px" }}
        >
          <div className="mt-3">
            <div className="mb-3">
              <h2 className="h1 mb-0 d-flex gap-10">
                <img
                  width={20}
                  src="assets/banker.png"                  alt
                />
                MEMBER BANKER
              </h2>
            </div>
           
            <div className="row mt-20" id="cate-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-4">
                    <div className="row align-items-center">
                      <div className="col-sm-3 col-md-3 col-lg-3 mb-2 mb-sm-0">
                        <h5 className="text-capitalize d-flex gap-1">
                        BANKER LIST
                          <span className="badge badge-soft-dark radius-50 fz-12">
                            {count}
                          </span>
                        </h5>
                      </div>

                      <div className="col-sm-5 col-md-5 col-lg-5">
                        <form>
                          <div className="input-group input-group-merge input-group-custom">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i class="fa fa-search" aria-hidden="true"></i>
                              </div>
                            </div>
                            <input
                              type="search"
                              name="searchValue"
                              className="form-control"
                              placeholder="Search here...."
                              aria-label="Search orders"
                              onChange={handleFilter}
                            />
                            <button type="submit" className="btn btn--primary">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-sm-2 col-md-2 col-lg-2">
                        <div className="form-group">
                    <label htmlFor="itemsPerPage">Select No.</label>
                    <select
                      className="form-control"
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="1000">1000</option>
                    </select>
                  </div>
                  
                  </div>
                  <div className="col-sm-2 col-md-2 col-lg-2">
                        
                  <div className="form-group">
                    <label htmlFor="itemsPerPage">Download</label>
                    <select
                      className="form-control"
                      id="itemsPerPage"
                     
                    >
                      <option value="10">EXCEL</option>
                      <option value="25">PDF</option>
                      <option value="50">WORD</option>
                      
                    </select>
                  </div>
                  </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    {filteredCategoryList?.length > 0 ? (
                      <table
                        style={{ textAlign: "left" }}
                        className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                      >
                        <thead className="thead-light thead-50 text-capitalize">
                          <tr>
                            <th>SR NO.</th>
                            <th>A/C HOLDER NAME</th>
                            <th>BANK NAME</th>
                            <th>BRANCH NAME</th>
                            <th>AC TYPE</th>
                            <th>AC NO.</th>
                            <th>IFSC CODE</th>
                            <th>IS APPROVE</th>
                            <th>CREATE DATE&TIME</th>
                            <th>LAST UPDAET DATE&TIME</th>

                           

                            <th>STATACTIVE&DEACTIVEUS</th>


                            <th className="text-center">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCategoryList
                            .slice(
                              (activePage - 1) * itemsPerPage,
                              activePage * itemsPerPage
                            )
                            .map((seller, index) =>
                              renderCategoryData(seller, index)
                            )}
                        </tbody>
                      </table>
                    ) : (
                      <div class="text-center p-4">
                        <img
                          class="mb-3 w-160"
                          src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                          alt="Image Description"
                        />
                        <p class="mb-0 order-stats__subtitle">
                          No data found
                        </p>
                      </div>
                    )}
                   
                  </div>
                  <div className="table-responsive mt-4">
                    <div className="d-flex justify-content-lg-end"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Subsubcategory;
