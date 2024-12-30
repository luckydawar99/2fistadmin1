import React, { useEffect, useState } from "react";
import Header from "../Header";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
const Subbcetagory = () => {
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
      .get(
        `${process.env.REACT_APP_API_KEY}admin/category/getCategoryList`,
        options
      )
      .then((res) => {
        setcount(res?.data?.length);
        setcategorylist(res.data);
      })
      .catch((error) => {});
  };

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const result = categorylist.filter((item) =>
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
        <td className="text-center">ER41T</td>
        <td className="text-center">Bireman</td>
        <td className="text-center">DFE748 </td>
        <td className="text-center">
          <img
            className="rounded"
            width={64}
            src={
              `${process.env.REACT_APP_IMG_URL}` +
              categorydata?.categoryImageUrl
            }
          />
        </td>
        <td className="text-center">Updated on Nov</td>

        <td className="text-center">2024-05-10 11:51PM</td>
        <td className="text-center">2024-05-12 01:04PM</td>
        <td className="text-center">
          <span className="badge badge-success">ACIVE</span>
        </td>
        <td>
          <form
            action="https://6valley.6amtech.com/vendor/products/status-update"
            method="post"
            data-from="product-status"
            id="product-status54-form"
            className="admin-product-status-form"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="2nohFUff9chQ6XVV3eOZHrzANIB1CpRwY18RYsMm"
              autoComplete="off"
            />{" "}
            <input type="hidden" name="id" defaultValue={54} />
            <label className="switcher mx-auto">
              <input
                type="checkbox"
                className="switcher_input toggle-switch-message"
                name="status"
                id="product-status54"
                defaultValue={1}
                defaultChecked
                data-modal-id="toggle-status-modal"
                data-toggle-id="product-status54"
                data-on-image="product-status-on.png"
                data-off-image="product-status-off.png"
                data-on-title="Want to Turn ON Secret Covered in Sand Comic book pdf Status"
                data-off-title="Want to Turn OFF Secret Covered in Sand Comic book pdf Status"
                data-on-message="<p>If enabled this product will be available on the website and customer app</p>"
                data-off-message="<p>If disabled this product will be hidden from the website and customer app</p>"
              />
              <span className="switcher_control" />
            </label>
          </form>
        </td>

        <td>
          <div className="d-flex gap-10 justify-content-center">
            <span
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                cetagoryedit(
                  secureLocalStorage.setItem(
                    "categoryid",
                    categorydata?.categoryId
                  )
                );
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <a
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
              id={index + 1}
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
                   src="assets/app.png"
                  alt
                />
                SUBCATEGORY
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form onSubmit={categorydatahandle}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div>
                            <div className="form-group  lang_form">
                              <label className="title-color">
                                SELECT CATEGORY
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                type="text"
                                name="name[]"
                                className="form-control"
                                required
                              >
                                <option>SELECT CATEGORY</option>
                                <option>PRIMIER</option>
                                <option>SAFARI</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <div className="form-group  lang_form">
                              <label className="title-color">
                                SUB CATEGORY NAME
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                value={category_englishName}
                                onChange={(e) => {
                                  setcategory_englishName(e.target.value);
                                }}
                                type="text"
                                name="name[]"
                                className="form-control"
                                placeholder="SUB CATEGORY NAME"
                                required
                              />
                            </div>
                          </div>

                          <div className="form-group mt-3">
                            <label className="title-color">
                              SUB CATEGORY CODE
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="SUB CATEGORY CODE"
                              className="form-control"
                            />
                          </div>

                          <div className="form-group mt-3">
                            <label className="title-color">
                              SUB CATEGORY DESCRIPTION
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="SUB CATEGORY DESCRIPTION"
                              className="form-control"
                            />
                          </div>

                          <div className="form-group mt-3">
                            <label className="title-color">
                              META TITLE
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="META TITLE"
                              className="form-control"
                            />
                          </div>

                          <div className="form-group mt-3">
                            <label className="title-color">
                              META KEY WORDS
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="META KEY WORDS"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label className="title-color">
                              META DESCRIPTION
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="META DESCRIPTION"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
                          <div className="form-group">
                            <center>
                              {category_image ? (
                                <img
                                  className="upload-img-view"
                                  src={URL.createObjectURL(category_image)}
                                  alt="image"
                                />
                              ) : (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src="https://6valley.6amtech.com/public/assets/back-end/img/900x400/img1.jpg"
                                  alt="image"
                                />
                              )}
                            </center>
                          </div>
                          <div className="from_part_2">
                            <label className="title-color">
                              CHOOSE IMAGE FILE
                            </label>
                            <span className="text-info">
                              <span className="text-danger">*</span>
                            </span>
                            <div className="custom-file text-left">
                              <input
                                onChange={(e) => {
                                  setcategory_image(e.target.files[0]);
                                }}
                                type="file"
                                name="image"
                                className="custom-file-input"
                                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                                required
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFileEg1"
                              >
                                Choose File
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <button type="submit" className="btn btn--primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-20" id="cate-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-4">
                    <div className="row align-items-center">
                      <div className="col-sm-4 col-md-4 col-lg-4 mb-2 mb-sm-0">
                        <h5 className="text-capitalize d-flex gap-1">
                          SUBCATEGORY LIST
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
                      <div className="col-sm-3 col-md-3 col-lg-3">
                        <div className="form-group">
                          <label htmlFor="itemsPerPage">
                            Select No. of Records:
                          </label>
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
                            <th>CATEGORY NAME</th>
                            <th>SUB CATEGORY NAME</th>
                            <th>CODE</th>
                            <th className="text-center">SUB CATEGORY IMAGE</th>

                            <th>DESCRIPTION</th>

                            <th>CREATE DATE&TIME</th>
                            <th>LAST UPDATE DATE&TIME</th>
                            <th>STATUS</th>
                            <th>ACTIVATE&DEACTIVATE</th>
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
                          No Category found
                        </p>
                      </div>
                    )}
                    {/* <div className="d-flex justify-content-center mt-4">
                      {filteredCategoryList?.length > itemsPerPage && (
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={itemsPerPage}
                          totalItemsCount={filteredCategoryList?.length}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      )}
                    </div> */}
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

export default Subbcetagory;
