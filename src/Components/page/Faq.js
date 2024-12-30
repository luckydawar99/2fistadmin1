import React, { useEffect, useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [updatedFaqData, setUpdatedFaqData] = useState([]);
  const token = secureLocalStorage.getItem("adminidtoken");
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  // const submitForm = (event) => {
  //   event.preventDefault();
   
  //   const faq ={
  //     title:title,
  //     text:text
  //   }

  //   const options = {
  //     headers: {
  //       token: token,
  //     },
  //   };
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_KEY}admin/api/create_faq`,
  //       faq,
  //       options
  //     )
  //     .then((res) => {
  //       fetchFaqData();
        
  //     })
  //     .catch((error) => {
       
  //     });
  //     setTitle("");
  //     setText("");
  // };

  const submitForm = (e)=>{
e.preventDefault();
const data ={
  title:title,
  text:text
}
const options = {
       headers: {
         token: token,
       },
   };
   axios.post(`${process.env.REACT_APP_API_KEY}admin/api/create_faq`,data,options).then((res)=>{
    fetchFaqData();
   }).catch((error)=>{

   })
setText("");
setTitle("");
  }

  useEffect(() => {
    fetchFaqData();
  }, [0]);

  const fetchFaqData = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/faq_list`)
      .then((res) => {
        setFaqData(res.data.data);
        setUpdatedFaqData(res.data.data.map((faq) => ({ ...faq })));
      })
      .catch((error) => {

      });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFaqs = [...updatedFaqData];
    updatedFaqs[index][name] = value;
    setUpdatedFaqData(updatedFaqs);
  };

  // const submitForm1 = (index) => (event) => {
  //   event.preventDefault();
  //   const faq = updatedFaqData[index];

  //   const options = {
  //     headers: {
  //       token: token,
  //     },
  //   };
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_KEY}admin/api/create_faq/${faq._id}`,
  //       faq,
  //       options
  //     )
  //     .then((res) => {
  //       // Update only the specific FAQ data in the state after successful update
  //       setFaqData((prevFaqData) => {
  //         const updatedData = [...prevFaqData];
  //         updatedData[index] = res.data.updatedFaq;
  //         return updatedData;
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error updating FAQ:", error);
  //     });
  // };

  return (
    <div>
      <div className="container row">
        <div className="col-lg-3 col-md-4"></div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
              <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
                <img
                 width={20}
                 src="assets/list.png" alt=""
                />
                Faq
              </h2>
            </div>
            <div className="row mb-0">
            
              <div className="col-md-12">
                <div>
                <form className="card" onSubmit={submitForm}>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Title
                              </label>
                              <input required placeholder="Enter Title"
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Description
                              </label>
                              <textarea placeholder="Enter Description here..."
                                type="text" required
                                className="form-control"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <button
                                type="submit"
                                className="btn btn--primary"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              
                {faqData.map((faq, index) => (
                  <div className="card" key={index}>
                   
                      <div className="card-body">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                              <div className="form-group mb-3">
                                <label
                                  htmlFor="title"
                                  className="title-color text-capitalize"
                                >
                                  Title
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="title"
                                  
                                  
                                  value={faq?.title}
                                />
                              </div>
                            </div>

                            <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                              <div className="form-group mb-3">
                                <label
                                  htmlFor="text"
                                  className="title-color text-capitalize"
                                >
                                  Description
                                </label>
                                <textarea
                                  className="form-control"
                                  name="text"
                                  
                                  value={faq?.text}
                                />
                              </div>
                            </div>

                            {/* <div className="col-md-4">
                              <div className="form-group mb-3">
                                <button
                                  type="submit"
                                  className="btn btn--primary"
                                >
                                  Update
                                </button>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;




























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import secureLocalStorage from "react-secure-storage";
// import toast, { Toaster } from "react-hot-toast";

// const Faq = () => {
//   const [aboutData, setAboutData] = useState([]);
//   const [title, setTitle] = useState("");
//   const [text, setText] = useState("");

//   const token = secureLocalStorage.getItem("adminidtoken");

//   const submitForm = (event) => {
//     event.preventDefault();

//     const dataAbout = {
//       title: title,
//       text: text,
//     };

//     const options = {
//       headers: {
//         token: token,
//       },
//     };

//     axios
//       .post(
//         `${process.env.REACT_APP_API_KEY}admin/api/create_faq`,
//         dataAbout,
//         options
//       )
//       .then((res) => {
//         getAbout();
//       })
//       .catch((error) => {});
//   };

//   const getAbout = () => {
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}admin/api/faq_list`)
//       .then((res) => {
//         setAboutData(res.data.data);
//       })
//       .catch((error) => {});
//   };

//   useEffect(() => {
//     getAbout();
//   }, [0]);

//   return (
//     <div>
//       {/* <Toaster /> */}
//       {/* <Header /> */}
//       <div
//         className="container row"
//         style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
//       >
//         <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

//         <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
//           <div className="mt-3 mb-5">
//             <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
//               <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
//                 <img
//                   width={20}
//                   src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png"
//                   alt
//                 />
//                 Faq
//               </h2>
//             </div>
//             <div className="row mb-5">
//               <div className="col-md-12">
//                 {aboutData?.map((data) => {
//                   return (
//                     <div className="card">
//                       <form className="card" onSubmit={submitForm}>
//                         <div className="card-body">
//                           <div className="form-group">
//                             <div className="row">
//                               <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
//                                 <div className="form-group mb-3">
//                                   <label
//                                     htmlFor="name"
//                                     className="title-color text-capitalize"
//                                   >
//                                     Title
//                                   </label>
//                                   <input
//                                     placeholder={data?.title}
//                                     type="text"
//                                     className="form-control"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                   />
//                                 </div>
//                               </div>

//                               <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
//                                 <div className="form-group mb-3">
//                                   <label
//                                     htmlFor="name"
//                                     className="title-color text-capitalize"
//                                   >
//                                     Description
//                                   </label>
//                                   <textarea
//                                     type="text"
//                                     className="form-control"
//                                     value={Text}
//                                     placeholder={data?.text}
//                                     onChange={(e) => setText(e.target.value)}
//                                   />
//                                 </div>
//                               </div>

//                               <div className="col-md-4">
//                                 <div className="form-group mb-3">
//                                   <button
//                                     type="submit"
//                                     className="btn btn--primary "
//                                   >
//                                     Update
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Faq;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import secureLocalStorage from "react-secure-storage";
// import toast, { Toaster } from "react-hot-toast";

// const Faq = () => {
//   const [aboutData, setAboutData] = useState([]);
//   const [title, setTitle] = useState("");
//   const [text, setText] = useState("");

//   const token = secureLocalStorage.getItem("adminidtoken");

//   const submitForm = (event) => {
//     event.preventDefault();

//     const dataAbout = {
//       title: title ? title : aboutData[0]?.title,
//       text: text ? text : aboutData[0]?.text,
//     };

//     const options = {
//       headers: {
//         token: token,
//       },
//     };

//     axios
//       .post(
//         `${process.env.REACT_APP_API_KEY}admin/api/create_faq`,
//         dataAbout,
//         options
//       )
//       .then((res) => {
//         getAbout();
//       })
//       .catch((error) => {});

//     setTitle("");
//     setText("");
//   };

//   const getAbout = () => {
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}admin/api/faq_list`)
//       .then((res) => {
//         //toast.success("Faq Data Updated Successfully");
//         setAboutData(res.data.data);

//         setTitle(res.data.data[0]?.title || "");
//         setText(res.data.data[0]?.text || "");
//       })
//       .catch((error) => {});
//   };

//   useEffect(() => {
//     getAbout();
//   }, [0]);

//   return (
//     <div>
//       {/* <Toaster /> */}
//       {/* <Header /> */}
//       <div
//         className="container row"
//         style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
//       >
//         <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

//         <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
//           <div className="mt-3 mb-5">
//             <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
//               <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
//                 <img
//                   width={20}
//                   src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png"
//                   alt
//                 />
//                 Faq
//               </h2>
//             </div>
//             <div className="row mb-5">
//               <div className="col-md-12">
//                 <div className="card">
//                   <form className="card" onSubmit={submitForm}>
//                     <div className="card-body">
//                       <div className="form-group">
//                         <div className="row">
//                           <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
//                             <div className="form-group mb-3">
//                               <label
//                                 htmlFor="name"
//                                 className="title-color text-capitalize"
//                               >
//                                 Title
//                               </label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                               />
//                             </div>
//                           </div>

//                           <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
//                             <div className="form-group mb-3">
//                               <label
//                                 htmlFor="name"
//                                 className="title-color text-capitalize"
//                               >
//                                 Description
//                               </label>
//                               <ReactQuill value={text} onChange={setText} />
//                             </div>
//                           </div>

//                           <div className="col-md-4">
//                             <div className="form-group mb-3">
//                               <button
//                                 type="submit"
//                                 className="btn btn--primary btn-block"
//                               >
//                                 Update
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Faq;
