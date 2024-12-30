import React, { useEffect, useState } from "react";

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";

const Cetagory = () => {
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


  const categorydatahandle = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("categoryName", category_englishName);

    formData.append("category_image", category_image);


    const options = {
      headers: {
        token: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}createCategory`,
        formData,
        options
      )
      .then((res) => {
        swal({
          title: (res.data.message),

          icon: "success",

        });

        GetCategorylist();
      })
      .catch((error) => {

      });

    setcategory_englishName("");
    setcategory_image("");

  };

  useEffect(() => {
    GetCategorylist();
  }, [0]);

  let GetCategorylist = () => {
    const options = {
      headers: {
        token: token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}getCategory`,
        options
      )
      .then((res) => {
        setcount(res?.data?.data?.length);
        setcategorylist(res.data.data);
      })
      .catch((error) => { });
  };


  let cetagoryedit = () => {
    navigate("/editcetagory");
  };

  let deletesubcategory = (item) => {
    console.log(item)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {

        const data = {
          categoryId: item?._id
        }
        console.log(data)
        let options = {
          headers: {
            token: token,
          },
        };
        axios
          .delete(
            `${process.env.REACT_APP_API_KEY}deleteCategory`, data,
            options
          )
          .then((res) => {
            console.log(res)
            GetCategorylist();
          })
          .catch((error) => {
            console.log(error)
          });

      } else {
        swal("Your category is safe!");
      }
    });
  };

  const activedeactive = (item) => {
    const data = {
      categoryId: item
    }
    let options = {
      headers: {
        token: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}activeDeactive_category`,
        data,
        options
      )
      .then((res) => {
        swal({
          title: (res.data.message),
          icon: "success"
        })
        GetCategorylist();
      })
      .catch((error) => { });
  };

  const renderCategoryData = (categorydata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td className="text-center">{adjustedIndex}</td>
        <td className="text-center text-capitalize">
          {categorydata?.categoryName}
        </td>

        <td className="text-center">
          <img
            alt="img"
            className="rounded"
            width={64}
            src={
              `${process.env.REACT_APP_IMG_URL}` +
              categorydata?.category_image
            }
          />
        </td>
        {categorydata?.acrtive_status !== 0 ? (
          <td className="text-center">
            <span className="badge badge-danger">INACTIVE</span>
          </td>
        ) : (
          <td className="text-center">
            <span className="badge badge-success">ACTIVE</span>
          </td>
        )}

        {categorydata?.acrtive_status !== 0 ? (



          <td className="text-center">
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher mx-auto">
                <input
                  type="checkbox"
                  className="switcher_input"
                  name="status"
                  onChange={() => activedeactive(categorydata?._id)}
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
                  onChange={() => activedeactive(categorydata?._id)}
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
                cetagoryedit(
                  secureLocalStorage.setItem(
                    "categoryid",
                    categorydata?._id
                  )
                );
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            {/* onClick={deletesubcategory(categorydata?.categoryId)} */}
            {/* <a
              href
              onClick={() => {
                deletesubcategory(categorydata);
              }}
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
              id={index + 1}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </a> */}
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
                <img width={20} src="assets/app.png" alt="asa" />
                CATEGORY
                {/* <span className="badge badge-soft-dark radius-50">{count}</span> */}
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
                                CATEGORY TITLE<span className="text-danger">*</span>
                              </label>
                              <input
                                value={category_englishName}
                                onChange={(e) => {
                                  setcategory_englishName(e.target.value);
                                }}
                                type="text"
                                name="name[]"
                                className="form-control"
                                placeholder="META  TITLE"
                                required
                              />
                            </div>
                          </div>


                        </div>
                        <div className="mb-2 col-lg-6 mt-4 mt-lg-0 from_part_2">
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
                          Add Data
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
                            <th className="text-center">CATEGORY IMAGE</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                            <th className="text-center">CONTROLS</th>
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

export default Cetagory;
