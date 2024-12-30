import Header from "../Header";
import Sidebarr from "../Sidebar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import React, { useEffect, useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";
const Chatwithadmin = () => {
  let adminid = secureLocalStorage.getItem("adminid");

  const [vendorchat, setvendorchat] = useState();

  const [text, settext] = useState();
  const [fileimage, setfileimage] = useState();
  const [customerid, setcustomerid] = useState();

  let token = secureLocalStorage.getItem("adminidtoken");
  let adminIdd = secureLocalStorage.getItem("adminid");
  let ticketid = secureLocalStorage.getItem("tiketid");

  useEffect(() => {
    getvendormessage();
  }, [0]);
  const getvendormessage = () => {
    let options = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/ticket/getAllMessageByTicketId/${ticketid}`,

        options
      )
      .then((res) => {
        setvendorchat(res.data.data);
      })
      .catch((error) => {});
  };

  const sendmessage = (e) => {
    e.preventDefault();
    if (!text) {
      toast.error("Please enter message of reply");
      return;
    }
    let formData;

    formData = new FormData();

    formData.append("ticketId", ticketid);

    formData.append("message", text);

    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/ticket/addAdminMessage`,
        formData,
        options
      )
      .then((res) => {
        getvendormessage();
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.error("Enternal server error, Please try again");
        }
      });
    settext("");
    setfileimage("");
  };

  const closeticket = () => {
    const options = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/ticket/ticketClose/${ticketid}`,
        {},
        options
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {});
  };

  const Deletevendormessage = (item) => {
    let options = {
      hraders: {
        token: token,
      },
    };
    const data = {
      adminId: adminIdd,
      messageIds: [item],
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/removeVender_Message`,
        data,
        options
      )
      .then((res) => {
        getvendormessage();
      })
      .catch((error) => {});
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [vendorchat]);

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
              <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
                <img width={20} src="assets/technical-support.png" alt />
                SUPPORT TICKET CHAT
              </h2>
            </div>
            <div className="row mb-5">
              <section className="col-xl-12 col-lg-12 mt-4 mt-lg-0">
                <div className="card card-body card-chat justify-content-between Chat">
                  <div className="inbox_msg_header d-flex flex-wrap gap-3 justify-content-between align-items-center border px-3 py-2 rounded mb-4">
                    <div className="media align-items-center gap-3">
                      <div className="avatar avatar-sm avatar-circle">
                        <img
                          className="avatar-img"
                          id="profile_image"
                          src={
                            vendorchat &&
                            vendorchat?.length > 10000 &&
                            vendorchat[0]?.venderId?.vender_profile
                              ? `${process.env.REACT_APP_API_KEY}uploads/${vendorchat[0]?.venderId?.vender_profile}`
                              : "https://6valley.6amtech.com/storage/app/public/profile/2022-10-12-63464cd299fc3.png"
                          }
                          alt="Image Description"
                        />
                        <span className="avatar-status avatar-sm-status avatar-status-success" />
                      </div>
                      <div className="media-body">
                        <h5 className="profile-name mb-1" id="profile_name">
                          {vendorchat && vendorchat?.length > 10000 ? (
                            <>{vendorchat[0]?.venderId?.firstName}</>
                          ) : (
                            <>MOTOPAY ADMIN</>
                          )}
                        </h5>
                        <span className="fz-12" id="profile_phone">
                          {vendorchat && vendorchat?.length > 10000 ? (
                            <>{vendorchat[0]?.venderId?.mobile_number}</>
                          ) : (
                            <>XXX XXX XXX </>
                          )}
                        </span>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        closeticket();
                      }}
                      className="d-flex btn btn--primary flex-wrap gap-3 justify-content-end align-items-end border px-3 py-2 rounded "
                    >
                      CLOSE
                    </div>
                  </div>

                  <div className="messaging">
                    <div className="inbox_msg">
                      <div className="mesgs">
                        <div
                          className="msg_history pr-2 "
                          id="show_msg "
                          ref={chatContainerRef}
                        >
                          {vendorchat?.map((chatdata, index) => {
                            return (
                              <>
                                {chatdata?.userMessage ? (
                                  <div className="incoming_msg">
                                    <div className="received_msg">
                                      <div className="received_withd_msg">
                                        <div className="d-flex justify-content-start">
                                          {chatdata &&
                                            chatdata?.userMessage &&
                                            chatdata?.userMessage &&
                                            (chatdata?.userMessage?.endsWith(
                                              ".jpg"
                                            ) ||
                                            chatdata?.userMessage?.endsWith(
                                              ".png"
                                            ) ||
                                            chatdata?.userMessage?.endsWith(
                                              ".jpeg"
                                            ) ||
                                            chatdata?.userMessage?.endsWith(
                                              ".gif"
                                            ) ||
                                            chatdata?.userMessage?.endsWith(
                                              ".bmp"
                                            ) ||
                                            chatdata?.userMessage?.endsWith(
                                              ".webp"
                                            ) ? (
                                              <img
                                                className="rounded"
                                                src={`${process.env.REACT_APP_API_KEY}uploads/${chatdata?.userMessage}`}
                                                width={120}
                                                alt="Image"
                                              />
                                            ) : chatdata?.userMessage?.endsWith(
                                                ".wmv"
                                              ) ||
                                              chatdata?.userMessage?.endsWith(
                                                ".mp4"
                                              ) ||
                                              chatdata?.userMessage?.endsWith(
                                                ".mov"
                                              ) ||
                                              chatdata?.userMessage?.endsWith(
                                                ".avi"
                                              ) ||
                                              chatdata?.userMessage?.endsWith(
                                                ".flv"
                                              ) ||
                                              chatdata?.userMessage?.endsWith(
                                                ".mkv"
                                              ) ||
                                              chatdata?.userMessage?.endsWith(
                                                ".mts"
                                              ) ? (
                                              <video
                                                className="rounded"
                                                width={200}
                                                height={180}
                                                controls
                                              >
                                                <source
                                                  src={`${process.env.REACT_APP_API_KEY}uploads/${chatdata?.userMessage}`}
                                                  type="video/mp4"
                                                />
                                                Your browser does not support
                                                the video tag.
                                              </video>
                                            ) : (
                                              <p className="bg-chat rounded px-3 py-2 mb-1">
                                                {chatdata?.userMessage}
                                              </p>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="outgoing_msg">
                                    <div className="sent_msg p-2">
                                      <div className="d-flex justify-content-end">
                                        {chatdata &&
                                          chatdata?.adminMessage &&
                                          chatdata?.adminMessage &&
                                          (chatdata?.adminMessage?.endsWith(
                                            ".jpg"
                                          ) ||
                                          chatdata?.adminMessage?.endsWith(
                                            ".png"
                                          ) ||
                                          chatdata?.adminMessage?.endsWith(
                                            ".jpeg"
                                          ) ||
                                          chatdata?.adminMessage?.endsWith(
                                            ".gif"
                                          ) ||
                                          chatdata?.adminMessage?.endsWith(
                                            ".bmp"
                                          ) ||
                                          chatdata?.adminMessage?.endsWith(
                                            ".webp"
                                          ) ? (
                                            <img
                                              className="rounded"
                                              src={`${process.env.REACT_APP_API_KEY}uploads/${chatdata?.adminMessage}`}
                                              width={120}
                                              alt="Image"
                                            />
                                          ) : chatdata?.adminMessage?.endsWith(
                                              ".wmv"
                                            ) ||
                                            chatdata?.adminMessage?.endsWith(
                                              ".mp4"
                                            ) ||
                                            chatdata?.adminMessage?.endsWith(
                                              ".mov"
                                            ) ||
                                            chatdata?.adminMessage?.endsWith(
                                              ".avi"
                                            ) ||
                                            chatdata?.adminMessage?.endsWith(
                                              ".flv"
                                            ) ||
                                            chatdata?.adminMessage?.endsWith(
                                              ".mkv"
                                            ) ||
                                            chatdata?.adminMessage?.endsWith(
                                              ".mts"
                                            ) ? (
                                            <video
                                              className="rounded bg-c1 text-white rounded px-3 py-2 mb-1"
                                              width={200}
                                              height={180}
                                              controls
                                            >
                                              <source
                                                src={`${process.env.REACT_APP_API_KEY}uploads/${chatdata?.adminMessage}`}
                                                type="video/mp4"
                                              />
                                              Your browser does not support the
                                              video tag.
                                            </video>
                                          ) : chatdata?.adminMessage?.endsWith(
                                              ".wmv"
                                            ) ||
                                            chatdata?.adminMessage?.endsWith(
                                              ".mp3"
                                            ) ? (
                                            <ReactAudioPlayer
                                              className="bg-c1 text-white rounded px-3 py-2 mb-1"
                                              width={200}
                                              height={180}
                                              src={`${process.env.REACT_APP_API_KEY}uploads/${chatdata?.adminMessage}`}
                                              controls
                                            />
                                          ) : (
                                            <p className="bg-c1 text-white rounded px-3 py-2 mb-1">
                                              {chatdata?.adminMessage}
                                            </p>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          })}
                        </div>
                        {fileimage ? (
                          fileimage.type.startsWith("image/") ? (
                            <img
                              width={150}
                              height={150}
                              src={URL.createObjectURL(fileimage)}
                              alt="Image"
                            />
                          ) : (
                            <ReactPlayer
                              width={150}
                              height={150}
                              controls
                              url={URL.createObjectURL(fileimage)}
                            />
                          )
                        ) : null}

                        <div class="type_msg">
                          <div class="input_msg_write">
                            <form
                              onSubmit={sendmessage}
                              class="mt-4 chatting-messages-ajax-form"
                              enctype="multipart/form-data"
                            >
                              <input
                                type="hidden"
                                name="_token"
                                value="R2a4JPykxlbGP7QVKC69wpePkrNlz7T8J4fqJX1c"
                                autocomplete="off"
                              />{" "}
                              <input
                                type="hidden"
                                id="current-user-hidden-id"
                                value="9"
                                name="user_id"
                              />
                              <div class="position-relative d-flex">
                                <div>
                                  <label class="py-0 px-3 d-flex align-items-center m-0 cursor-pointer position-absolute top-3">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="22"
                                      height="22"
                                      viewBox="0 0 22 22"
                                      fill="none"
                                    >
                                      <path
                                        d="M18.1029 1.83203H3.89453C2.75786 1.83203 1.83203 2.75786 1.83203 3.89453V18.1029C1.83203 19.2395 2.75786 20.1654 3.89453 20.1654H18.1029C19.2395 20.1654 20.1654 19.2395 20.1654 18.1029V3.89453C20.1654 2.75786 19.2395 1.83203 18.1029 1.83203ZM3.89453 3.20703H18.1029C18.4814 3.20703 18.7904 3.51595 18.7904 3.89453V12.7642L15.2539 9.2277C15.1255 9.09936 14.9514 9.02603 14.768 9.02603H14.7653C14.5819 9.02603 14.405 9.09936 14.2776 9.23136L10.3204 13.25L8.65845 11.5945C8.53011 11.4662 8.35595 11.3929 8.17261 11.3929C7.9957 11.3654 7.81053 11.4662 7.6822 11.6009L3.20703 16.1705V3.89453C3.20703 3.51595 3.51595 3.20703 3.89453 3.20703ZM3.21253 18.1304L8.17903 13.0575L13.9375 18.7904H3.89453C3.52603 18.7904 3.22811 18.4952 3.21253 18.1304ZM18.1029 18.7904H15.8845L11.2948 14.2189L14.7708 10.6898L18.7904 14.7084V18.1029C18.7904 18.4814 18.4814 18.7904 18.1029 18.7904Z"
                                        fill="#1455AC"
                                      ></path>
                                      <path
                                        d="M8.12834 9.03012C8.909 9.03012 9.54184 8.39728 9.54184 7.61662C9.54184 6.83597 8.909 6.20312 8.12834 6.20312C7.34769 6.20312 6.71484 6.83597 6.71484 7.61662C6.71484 8.39728 7.34769 9.03012 8.12834 9.03012Z"
                                        fill="#1455AC"
                                      ></path>
                                    </svg>

                                    <input
                                      onChange={(e) => {
                                        setfileimage(e.target.files[0]);
                                      }}
                                      type="file"
                                      id="msgfilesValue"
                                      className="h-100 position-absolute w-100 "
                                      hidden
                                      //multiple
                                      accept=".mp4, .mts, .mkv, .mov, .flv, .avi, .jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                                    />
                                  </label>
                                </div>

                                <div className="">
                                  <label class="ml-5 py-0 px-3 d-flex align-items-center m-0 cursor-pointer position-absolute top-3">
                                    <i class="fa fa-microphone mt-1"></i>
                                    <input
                                      onChange={(e) => {
                                        setfileimage(e.target.files[0]);
                                      }}
                                      type="file"
                                      className="h-100 position-absolute w-100 "
                                      hidden
                                      accept=".mp3, .mp4 audio/*"
                                    />
                                  </label>
                                </div>

                                <input
                                  value={text}
                                  onChange={(e) => {
                                    settext(e.target.value);
                                  }}
                                  class="form-control w-0 pl-9 mt-1"
                                  id="msgInputValue"
                                  name="message"
                                  type="text"
                                  placeholder="Send a message"
                                  aria-label="Search"
                                ></input>
                                <div class="d-flex align-items-center justify-content-center bg-F1F7FF radius-right-button">
                                  <button
                                    class="aSend bg-transparent outline-0 border-0 shadow-0"
                                    type="submit"
                                    id="msgSendBtn"
                                  >
                                    <img
                                      src="https://6valley.6amtech.com/public/assets/back-end/img/send-icon.png"
                                      alt=""
                                    />
                                  </button>
                                </div>
                              </div>
                              <div class="mt-3 d-flex justify-content-between">
                                <div class="overflow-x-auto pb-2 pt-3 w-100">
                                  <div class="d-flex gap-3 filearray"></div>
                                  <div id="selected-files-container"></div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatwithadmin;
