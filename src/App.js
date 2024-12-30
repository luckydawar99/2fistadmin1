import logo from "./logo.svg";
import "./App.css";
import Allproducts from "./Components/page/Allproducts";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Panding from "./Components/page/Panding";
import Confrimproducts from "./Components/page/Confrimproducts";
import Products_list from "./Components/page/Products_list";
import Addnewproducts from "./Components/page/Addnewproducts";
import AllBats from "./Components/page/AllBats.js";
import Match_Status from "./Components/page/Match_Status.js"
import Orderdetails from "./Components/page/Orderdetails";
import { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Bannerlist from "./Components/page/Bannerlist";
import Editbanner from "./Components/page/Editbanner";
import Addbanner from "./Components/page/Addbanner";
import Notifications from "./Components/page/Notifications ";
import NotificationsEdit from "./Components/page/NotificationsEdit";
import Usermanagement from "./Components/page/Usermanagement";
import UserOrderdetails from "./Components/page/UserOrderdetails";
import Paymentmanagement from "./Components/page/Paymentmanagement";
import Vendor_manage from "./Components/page/Vendor_manage";
import Subscription from "./Components/page/Subscription";
import Profile from "./Components/page/Profile";
import Login from "./Components/Login";
import Packaging from "./Components/page/Packaging";
import Screen from "./Components/Screen";
import Overviewsale from "./Components/page/Overviewsale";
import Deliverdproducs from "./Components/page/Deliverdproducs";
import Outfordelivery from "./Components/page/Outfordelivery";
import Canceledproducts from "./Components/page/Canceledproducts";
import Returnedproducts from "./Components/page/Returnedproducts";
import Failedtodelivery from "./Components/page/Failedtodelivery";
import Sallerdetails from "./Components/page/Sallerdetails";
import Sallerorder from "./Components/page/Sallerorder";
import Sallerproducts from "./Components/page/Sallerproducts";
import Sallersatting from "./Components/page/Sallersatting";
import Sallertransacations from "./Components/page/Sallertransacations";
import Sallerreview from "./Components/page/Sallerreview";
import Sallerorderdetails from "./Components/page/Sallerorderdetails";
import Productsmange from "./Components/page/Productsmange";
import Editproducts from "./Components/page/Editproducts";
import Addsubscription from "./Components/page/Addsubscription";
import Massage from "./Components/page/Massage";
import Cetagory from "./Components/page/Cetagory";
import EditCetagory from "./Components/page/EditCetagory";
import Subcetagory from "./Components/page/Subcetagory";
import Editsubcetagory from "./Components/page/Editsubcetagory";
import Subsubcategory from "./Components/page/Subsubcategory";
import Edit_subsubcetagory from "./Components/page/Edit_subsubcetagory";
import Userdetails from "./Components/page/Userdetails";
import User_reaview from "./Components/page/User_reaview";
import Sallereditproducts from "./Components/page/Sallereditproducts";
import Newhello from "./Components/Newhello";
import Products_details from "./Components/page/Products_details";
import Products_edit from "./Components/page/Products_edit";
import Subscriberlist from "./Components/page/Subscriberlist";
import Refundpanding from "./Components/page/Refundpanding";
import Refundapproved from "./Components/page/Refundapproved";
import Refundrefunded from "./Components/page/Refundrefunded";
import Refundreject from "./Components/page/Refundreject";
import Refundstatus from "./Components/page/Refundstatus";
import { Category } from "@syncfusion/ej2-react-charts";
import Delivered from "./Components/page/Delivered";
import Canceled from "./Components/page/Canceled";
import Returned from "./Components/page/Returned";
import Coupan from "./Components/page/Coupan";
import Coupanupdate from "./Components/page/Coupanupdate";
import Chatwithadmin from "./Components/page/Chatwithadmin";
import Withdrow from "./Components/page/Withdrow";
import Customerlist from "./Components/page/Customerlist";
import Customerdetails from "./Components/page/Customerdetails";
import Customerreview from "./Components/page/Customerreview";
import Wallet from "./Components/page/Wallet";
import Walletbonussetup from "./Components/page/Walletbonussetup";
import Walletbonusedit from "./Components/page/Walletbonusedit";
import Loyaltyreport from "./Components/page/Loyaltyreport";
import Addnewseller from "./Components/page/Addnewseller";
import Sellerlist from "./Components/page/Sellerlist";
import Sellerdetails from "./Components/page/Sellerdetails";
import Withdrawview from "./Components/page/Withdrawview";
import Withdrawmethod from "./Components/page/Withdrawmethod";
import Withdrawmethodadd from "./Components/page/Withdrawmethodadd";
import Addnewdeliveryman from "./Components/page/Addnewdeliveryman";
import Deliverymanlist from "./Components/page/Deliverymanlist";
import Earningstatement from "./Components/page/Earningstatement";
import Cashcollected from "./Components/page/Cashcollected";
import Updatedeliveryman from "./Components/page/Updatedeliveryman";
import Rating from "./Components/page/Rating";
import Emergencycontact from "./Components/page/Emergencycontact";
import Customermessage from "./Components/page/Customermessage";
import Customermessageview from "./Components/page/Customermessageview";
import Addnewbrands from "./Components/page/Addnewbrands";
import Brandlist from "./Components/page/Brandlist";
import Updatebrand from "./Components/page/Updatebrand";
import Productattribute from "./Components/page/Productattribute";
import Updateattribute from "./Components/page/Updateattribute";
import Newproductsrequest from "./Components/page/Newproductsrequest";
import Productupdaterequest from "./Components/page/Productupdaterequest";
import Vendorapprovedproductlist from "./Components/page/Vendorapprovedproductlist";
import Vendordeniedproductlist from "./Components/page/Vendordeniedproductlist";
import Protect from "./Components/page/Protect";
import Deliverycharge from "./Components/page/Deliverycharge";
import Aboutus from "./Components/page/Aboutus";
import Termcondition from './Components/page/Termcondition';
import Privacypolicy from "./Components/page/Privacypolicy";
import Faq from "./Components/page/Faq";
import Contactus from "./Components/page/Contactus";
import Vendorchat from "./Components/page/Vendorchat";
import Test from "./Components/page/Test";
import Maincetagory from "./Components/page/Maincetagory";
import EditMaincategory from "./Components/page/EditMaincategory";
import Error from "./Components/Error";
import Addnewsize from "./Components/page/Addnewsize";
import Addnewcolor from "./Components/page/Addnewcolor";

import Addnewproducttype from "./Components/page/Addnewproducttype";
import Dealsoftheday from "./Components/page/Dealsoftheday";
import Returnpolicy from "./Components/page/Returnpolicy";
import Cancellaionpolicy from "./Components/page/Cancellaionpolicy";
import Refundpolicy from "./Components/page/Refundpolicy";
import Addadvertisment from "./Components/page/Addadvertisment";
import Alltransication from "./Components/page/Alltransication";
import Withdrawviewdetails from "./Components/page/Withdrawviewdetails";
import Suggestion from "./Components/page/Suggestion";
import Deliverywithdraw from "./Components/page/Deliverywithdraw";
import Deliverywithdrawreview from "./Components/page/Deliverywithdrawreview";
import Commissionapproval from "./Components/page/Commissionapproval";
import Addnewemploye from "./Components/page/Addnewemploye";
import Addnewemployetype from "./Components/page/Addnewemployetype";
import Smslist from "./Components/page/Smslist";
import Subbcetagory from "./Components/page/Subbcetagory";
import Ticketsupport from "./Components/page/Ticketsupport";
import Supportdepartment from "./Components/page/Supportdepartment";
import Supporprority from "./Components/page/Supporprority";
import Addcallsupport from "./Components/page/Addcallsupport";
import SystemSetting from "./Components/page/SystemSetting";
import Livematchs from "./Components/page/Livematchs.js";
import LiveScoreDetails from "./Components/page/LiveScore_Details.js"
import Approved from "./Components/page/Approved.js";
import Refund from "./Components/page/Refund.js";
import Rejected from "./Components/page/Rejected.js";
import Cancelmatch from "./Components/page/Cancelmatch.js";
import Tomorrowmatch from "./Components/page/Tomorrowmatch.js";
import Confirmed from "./Components/page/Confirmed.js";
import Complete from "./Components/page/Complete.js";
import Active_user from "./Components/page/Active_user.js";
import Emailunverified_user from "./Components/page/Emailunverified_user.js";
import Unverfiedcordintor from "./Components/page/Unverfiedcordintor.js";
import Coordinator_details from "./Components/admin-Page/coordinator_details.js";
import UnApprovalCoordenaitor from "./Components/admin-Page/UnApprovalCoordenaitor.js";
import Unapprov from "./Components/page/Unapprov.js";
import Withdraw_req from "./Components/page/Withdraw_req.js";



function App() {
  const [randomResult, setRandomResult] = useState("hello");

  useEffect(() => {
    // Generate 8-digit random number
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;

    // Generate 2 random alphabets
    const randomAlphabets =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // Combine the random number and alphabets
    const result = randomNumber.toString() + randomAlphabets;

    // Set the result in the state
    // setRandomResult(result);
  }, []);
  const location = useLocation();

  // useEffect(() => {
  //   const handleContextmenu = (e) => e.preventDefault();
  //   const handleKeydown = (e) => {
  //     if (
  //       e.keyCode === 123 || // F12
  //       (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || 
  //       (e.ctrlKey && e.keyCode === 85) 
  //     ) {
  //       e.preventDefault();
  //     }
  //   };
  //   const handleMousedown = (e) => {
  //     if (e.button === 1) {
  //       e.preventDefault();
  //     }
  //   };

  //   document.addEventListener('contextmenu', handleContextmenu);
  //   document.addEventListener('keydown', handleKeydown);
  //   document.addEventListener('mousedown', handleMousedown);

  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextmenu);
  //     document.removeEventListener('keydown', handleKeydown);
  //     document.removeEventListener('mousedown', handleMousedown);
  //   };
  // }, []);


  return (
    <div>
      {location.pathname !== "/" && location.pathname !== "/test" && <Header />}
      {location.pathname !== "/" && location.pathname !== "/test" && <Sidebar />}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={<Protect ComponentName={Home} />}
        ></Route>

        {/* -------------------- */}

        <Route
          path="/coordinator_details"
          element={<Protect ComponentName={Coordinator_details} />}
        ></Route>

        <Route
          path="/SystemSetting"
          element={<Protect ComponentName={SystemSetting} />}
        ></Route>

        <Route
          path="/profile"
          element={<Protect ComponentName={Profile} />}
        ></Route>
        <Route
          path="/allorder"
          element={<Protect ComponentName={Allproducts} />}
        ></Route>

        <Route
          path="/panding"
          element={<Protect ComponentName={Panding} />}
        ></Route>

        <Route
          path="/confrimproducts"
          element={<Protect ComponentName={Confrimproducts} />}
        ></Route>

        <Route
          path="/packaging"
          element={<Protect ComponentName={Packaging} />}
        ></Route>

        <Route
          path="/delivered"
          element={<Protect ComponentName={Delivered} />}
        ></Route>

        <Route
          path="/canceled"
          element={<Protect ComponentName={Canceled} />}
        ></Route>

        <Route
          path="/returned"
          element={<Protect ComponentName={Returned} />}
        ></Route>

        <Route
          path="/coupan"
          element={<Protect ComponentName={Coupan} />}
        ></Route>

        <Route
          path="/coupanupdate"
          element={<Protect ComponentName={Coupanupdate} />}
        ></Route>

        <Route
          path="/message"
          element={<Protect ComponentName={Massage} />}
        ></Route>
        <Route
          path="/chatwithadmin"
          element={<Protect ComponentName={Chatwithadmin} />}
        ></Route>

        <Route
          path="/withdraw_req"
          element={<Protect ComponentName={Withdraw_req} />}
        ></Route>
        <Route
          path="/customerlist"
          element={<Protect ComponentName={Customerlist} />}
        ></Route>

        <Route
          path="/Customerdetails"
          element={<Protect ComponentName={Customerdetails} />}
        ></Route>

        <Route
          path="/livescoredetails"
          element={<Protect ComponentName={LiveScoreDetails} />}
        ></Route>
        <Route
          path="/allbats"
          element={<Protect ComponentName={AllBats} />}
        ></Route>
        <Route
          path="/matchstatus"
          element={<Protect ComponentName={Match_Status} />}
        ></Route>

        <Route
          path="/customerreview"
          element={<Protect ComponentName={Customerreview} />}
        ></Route>
        <Route
          path="/wallet"
          element={<Protect ComponentName={Wallet} />}
        ></Route>
        <Route
          path="/walletbonussetup"
          element={<Protect ComponentName={Walletbonussetup} />}
        ></Route>
        <Route
          path="/walletbonusedit"
          element={<Protect ComponentName={Walletbonusedit} />}
        ></Route>
        <Route
          path="/loyaltyreport"
          element={<Protect ComponentName={Loyaltyreport} />}
        ></Route>
        <Route
          path="/addnewseller"
          element={<Protect ComponentName={Addnewseller} />}
        ></Route>
        <Route
          path="/sellerlist"
          element={<Protect ComponentName={Sellerlist} />}
        ></Route>
        <Route
          path="/unapprov"
          element={<Protect ComponentName={Unapprov} />}
        ></Route>
        <Route
          path="/sellerdetails"
          element={<Protect ComponentName={Sallerdetails} />}
        ></Route>
        <Route
          path="/withdrawview"
          element={<Protect ComponentName={Withdrawview} />}
        ></Route>
        <Route
          path="/withdrawmethod"
          element={<Protect ComponentName={Withdrawmethod} />}
        ></Route>
        <Route
          path="/withdrawmethodadd"
          element={<Protect ComponentName={Withdrawmethodadd} />}
        ></Route>
        <Route
          path="/addnewdeliveryman"
          element={<Protect ComponentName={Addnewdeliveryman} />}
        ></Route>
        <Route
          path="/deliverymanlist"
          element={<Protect ComponentName={Deliverymanlist} />}
        ></Route>
        <Route
          path="/earningstatement"
          element={<Protect ComponentName={Earningstatement} />}
        ></Route>
        <Route
          path="/cashcollected"
          element={<Protect ComponentName={Cashcollected} />}
        ></Route>
        <Route
          path="/updatedeliveryman"
          element={<Protect ComponentName={Updatedeliveryman} />}
        ></Route>
        <Route
          path="/rating"
          element={<Protect ComponentName={Rating} />}
        ></Route>
        <Route
          path="/emergencycontact"
          element={<Protect ComponentName={Emergencycontact} />}
        ></Route>
        <Route
          path="/customermessage"
          element={<Protect ComponentName={Customermessage} />}
        ></Route>
        <Route
          path="/customermessageview"
          element={<Protect ComponentName={Customermessageview} />}
        ></Route>
        <Route
          path="/addnewbrands"
          element={<Protect ComponentName={Addnewbrands} />}
        ></Route>
        <Route
          path="/brandlist"
          element={<Protect ComponentName={Brandlist} />}
        ></Route>
        <Route
          path="/updatebrand"
          element={<Protect ComponentName={Updatebrand} />}
        ></Route>
        <Route
          path="/productattribute"
          element={<Protect ComponentName={Productattribute} />}
        ></Route>

        <Route
          path="/updateattribute"
          element={<Protect ComponentName={Updateattribute} />}
        ></Route>


        <Route path="/commissionapproval" element={<Protect ComponentName={Commissionapproval} />}></Route>

        <Route
          path="/newproductsrequest"
          element={<Protect ComponentName={Newproductsrequest} />}
        ></Route>


        <Route
          path="/subbcetagory"
          element={<Protect ComponentName={Subbcetagory} />}
        ></Route>



        <Route
          path="/ticketsupport"
          element={<Protect ComponentName={Ticketsupport} />}
        ></Route>

        <Route
          path="/supportdepartment"
          element={<Protect ComponentName={Supportdepartment} />}
        ></Route>


        <Route
          path="/addcallsupport"
          element={<Protect ComponentName={Addcallsupport} />}
        ></Route>

        <Route
          path="/supporprority"
          element={<Protect ComponentName={Supporprority} />}
        ></Route>


        <Route
          path="/addnewemployetype"
          element={<Protect ComponentName={Addnewemployetype} />}
        ></Route>
        <Route
          path="/smslist"
          element={<Protect ComponentName={Smslist} />}
        ></Route>


        <Route path="/addnewemploye" element={<Protect ComponentName={Addnewemploye} />}></Route>



        <Route
          path="/productupdaterequest"
          element={<Protect ComponentName={Productupdaterequest} />}
        ></Route>


        <Route
          path="/vendorapprovedproductlist"
          element={<Protect ComponentName={Vendorapprovedproductlist} />}
        ></Route>

        <Route
          path="/vendordeniedproductlist"
          element={<Protect ComponentName={Vendordeniedproductlist} />}
        ></Route>


        <Route
          path="/outfordelivery"
          element={<Protect ComponentName={Outfordelivery} />}
        ></Route>

        <Route
          path="/canceledproducts"
          element={<Protect ComponentName={Canceledproducts} />}
        ></Route>

        <Route
          path="/returnedproducts"
          element={<Protect ComponentName={Returnedproducts} />}
        ></Route>

        <Route
          path="/failedtodelivery"
          element={<Protect ComponentName={Failedtodelivery} />}
        ></Route>




        <Route
          path="/sallerdetails"
          element={<Protect ComponentName={Sallerdetails} />}
        ></Route>


        <Route
          path="/sallerorder"
          element={<Protect ComponentName={Sallerorder} />}
        ></Route>


        <Route
          path="/sallerproducts"
          element={<Protect ComponentName={Sallerproducts} />}
        ></Route>


        <Route
          path="/dealsoftheday"
          element={<Protect ComponentName={Dealsoftheday} />}
        ></Route>
        <Route
          path="/sallersatting"
          element={<Protect ComponentName={Sallersatting} />}
        ></Route>

        <Route
          path="/sallertransacation"
          element={<Protect ComponentName={Sallertransacations} />}
        ></Route>

        <Route
          path="/sallerreview"
          element={<Protect ComponentName={Sallerreview} />}
        ></Route>


        <Route
          path="/sallerorderdetils"
          element={<Protect ComponentName={Sallerorderdetails} />}
        ></Route>


        <Route
          path="/salleproductsedit"
          element={<Protect ComponentName={Sallereditproducts} />}
        ></Route>


        <Route
          path="/devivardproducts"
          element={<Protect ComponentName={Deliverdproducs} />}
        ></Route>

        <Route
          path="/products_list"
          element={<Protect ComponentName={Products_list} />}
        ></Route>

        <Route
          path="/withdraw_req"
          element={<Protect ComponentName={Products_list} />}
        ></Route>

        <Route
          path="/addnewproducts"
          element={<Protect ComponentName={Addnewproducts} />}
        ></Route>

        <Route
          path="/orderdetails"
          element={<Protect ComponentName={Orderdetails} />}
        ></Route>

        <Route
          path="/add_banner"
          element={<Protect ComponentName={Addbanner} />}
        ></Route>

        <Route
          path="/bannerlist"
          element={<Protect ComponentName={Bannerlist} />}
        ></Route>

        <Route
          path="/editbannerlist"
          element={<Protect ComponentName={Editbanner} />}
        ></Route>

        <Route
          path="/sendnotification"
          element={<Protect ComponentName={Notifications} />}
        ></Route>

        <Route
          path="/editnotification"
          element={<Protect ComponentName={NotificationsEdit} />}
        ></Route>

        <Route
          path="/userlist"
          element={<Protect ComponentName={Usermanagement} />}
        ></Route>

        <Route
          path="/userreaview"
          element={<Protect ComponentName={User_reaview} />}
        ></Route>

        <Route
          path="/userorderlist"
          element={<Protect ComponentName={UserOrderdetails} />}
        ></Route>

        <Route
          path="/paymentmanage"
          element={<Protect ComponentName={Paymentmanagement} />}
        ></Route>


        <Route
          path="/vendormanage"
          element={<Protect ComponentName={Vendor_manage} />}
        ></Route>

        <Route
          path="/subscription"
          element={<Protect ComponentName={Subscription} />}
        ></Route>

        <Route
          path="/overviewsale"
          element={<Protect ComponentName={Overviewsale} />}
        ></Route>




        <Route
          path="/allproductsmanage"
          element={<Protect ComponentName={Productsmange} />}
        ></Route>





        <Route
          path="/productsdetails"
          element={<Protect ComponentName={Products_details} />}
        ></Route>

        <Route
          path="/productseditproducts"
          element={<Protect ComponentName={Products_edit} />}
        ></Route>

        <Route
          path="/subscriberlist"
          element={<Protect ComponentName={Subscriberlist} />}
        ></Route>
        <Route
          path="/addnewsize"
          element={<Protect ComponentName={Addnewsize} />}
        ></Route>
        <Route
          path="/addnewcolor"
          element={<Protect ComponentName={Addnewcolor} />}
        ></Route>

        <Route
          path="/editproducts"
          element={<Protect ComponentName={Editproducts} />}
        ></Route>

        <Route
          path="/addsubscription"
          element={<Protect ComponentName={Addsubscription} />}
        ></Route>

        <Route
          path="/massages"
          element={<Protect ComponentName={Massage} />}
        ></Route>

        <Route
          path="/cetagory"
          element={<Protect ComponentName={Cetagory} />}

        ></Route>

        <Route
          path="/editcetagory"
          element={<Protect ComponentName={EditCetagory} />}
        ></Route>

        <Route
          path="/subcetagory"
          element={<Protect ComponentName={Subcetagory} />}
        ></Route>

        <Route
          path="/editsubcetagory"
          element={<Protect ComponentName={Editsubcetagory} />}
        ></Route>

        <Route
          path="/subsubcetagory"
          element={<Protect ComponentName={Subsubcategory} />}
        ></Route>

        <Route
          path="/editsubsubcetagory"
          element={<Protect ComponentName={Edit_subsubcetagory} />}
        ></Route>

        <Route
          path="/userdetails"
          element={<Protect ComponentName={Userdetails} />}
        ></Route>

        <Route
          path="/refundpanding"
          element={<Protect ComponentName={Refundpanding} />}
        ></Route>

        <Route
          path="/refundapproved"
          element={<Protect ComponentName={Refundapproved} />}
        ></Route>

        <Route
          path="/refundrefunded"
          element={<Protect ComponentName={Refundrefunded} />}
        ></Route>

        <Route
          path="/refundreject"
          element={<Protect ComponentName={Refundreject} />}
        ></Route>

        <Route
          path="/refundstatus"
          element={<Protect ComponentName={Refundstatus} />}
        ></Route>

        <Route
          path="/hello"
          element={<Protect ComponentName={Screen} />}
        ></Route>

        <Route
          path="/newhello"
          element={<Protect ComponentName={Newhello} />}
        ></Route>



        <Route
          path="/deliverycharge"
          element={<Protect ComponentName={Deliverycharge} />}
        ></Route>
        <Route
          path="/aboutus"
          element={<Protect ComponentName={Aboutus} />}
        ></Route>



        <Route
          path="/termcondition"
          element={<Protect ComponentName={Termcondition} />}
        ></Route>
        <Route
          path="/aboutus"
          element={<Protect ComponentName={Aboutus} />}
        ></Route>


        <Route
          path="/termcondition"
          element={<Protect ComponentName={Termcondition} />}
        ></Route>
        <Route
          path="/privacypolicy"
          element={<Protect ComponentName={Privacypolicy} />}
        ></Route>


        <Route
          path="/returnpolicy"
          element={<Protect ComponentName={Returnpolicy} />}
        ></Route>


        <Route
          path="/deliverywithdraw"
          element={<Protect ComponentName={Deliverywithdraw} />}
        ></Route>


        <Route
          path="/deliverywithdrawreview"
          element={<Protect ComponentName={Deliverywithdrawreview} />}
        ></Route>
        <Route
          path="/suggestion"
          element={<Protect ComponentName={Suggestion} />}
        ></Route>

        <Route
          path="/alltransication"
          element={<Protect ComponentName={Alltransication} />}
        ></Route>


        <Route
          path="/withdrawviewdetails"
          element={<Protect ComponentName={Withdrawviewdetails} />}
        ></Route>

        <Route
          path="/addadvertisment"
          element={<Protect ComponentName={Addadvertisment} />}
        ></Route>


        <Route
          path="/cancellaionpolicy"
          element={<Protect ComponentName={Cancellaionpolicy} />}
        ></Route>

        <Route
          path="/refundpolicy"
          element={<Protect ComponentName={Refundpolicy} />}
        ></Route>


        <Route
          path="/faq"
          element={<Protect ComponentName={Faq} />}
        ></Route>


        <Route
          path="/contactus"
          element={<Protect ComponentName={Contactus} />}
        ></Route>


        <Route
          path="/vendorchat"
          element={<Protect ComponentName={Vendorchat} />}
        ></Route>
        <Route
          path="/maincetagory"
          element={<Protect ComponentName={Maincetagory} />}
        ></Route>




        <Route
          path="/editMaincategory"
          element={<Protect ComponentName={EditMaincategory} />}
        ></Route>

        <Route
          path="/addnewproducttype"
          element={<Protect ComponentName={Addnewproducttype} />}
        ></Route>
        <Route
          path="/test"
          element={<Protect ComponentName={Test} />}
        ></Route>





        <Route path="/livematch" element={<Livematchs />}></Route>

        <Route path="/tomorrowmatch" element={<Tomorrowmatch />}></Route>
        <Route path="/approved" element={<Approved />}></Route>
        <Route path="/refund" element={<Refund />}></Route>
        <Route path="/rejected" element={<Rejected />}></Route>
        <Route path="/cancelmatch" element={<Cancelmatch />}></Route>
        <Route path="/Complete" element={<Complete />}></Route>
        <Route path="/active_user" element={<Active_user />}></Route>

        <Route path="/emailunverified_user" element={<Emailunverified_user />}></Route>
        <Route path="/unverfiedcordintor" element={<Unverfiedcordintor />}></Route>
        <Route path="/unApprovalCoordenaitor" element={<UnApprovalCoordenaitor />}></Route>




        <Route path="*" element={<Error />}></Route>
      </Routes>
      {location.pathname !== "/"}
    </div>
  );
}

export default App;

