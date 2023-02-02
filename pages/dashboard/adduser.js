import React, { useState } from "react";
import SideMenu from "./components/SideMenu";
import { Button, Text } from "@nextui-org/react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import HeaderBox from "./components/HeaderBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  const token_value = jwt.decode(token);

  if (token_value == undefined) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 307,
      },
    };
  } else {
    // const res = await fetch(`http://localhost:3000/api/${token_value.id}`);
    const res = await fetch(`https://amrita-lms.vercel.app/api/${token_value.id}`);
    const data = await res.json();

    return {
      props: { token, data },
    };
  }
}

const AddUser = ({ data, token }) => {

  const user_id = jwt.decode(token).id;
  const fName = jwt.decode(token).user_first_name;
  const lName = jwt.decode(token).user_last_name;

  const libraryType = data.libraryInfo.libraryType;

  let userType="";

  if(libraryType == "university"){
    userType = "College";
  }
  else if(libraryType == "school"){
    userType = "School";
  }
  else{
    userType = "Public";
  }

  const [userInfo, setUserInfo] = useState({
    userType: userType,
    userIdProof: "School Id Card",
    userIdNumber: "",
    userFullName: "",
    userMobilePhone: "",
    userAddress: "",
    userCourseName:"",
    userDOB:"",
    userGender:"male",
    userEmailId:"",
    userClassName:"",
    userEducation:"",
    userBatch:"",
    userSection:""
  });

  const getUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const schoolOptions = ["School Id Card", "Aadhar Card"];
  const collegeOptions = [
    "College Id Card",
    "Payment slip",
    "Aadhar Card",
    "Pan Card",
    "Driving License",
  ];
  const otherOptions = [
    "School Id Card",
    "College Id Card",
    "Aadhar Card",
    "Pan Card",
    "Driving License",
    "Other",
  ];

  const addUserData = async () => {

    const {userType, userIdProof, userIdNumber, userFullName, userMobilePhone, userAddress, userCourseName, userDOB, userGender, 
      userEmailId, userClassName, userEducation, userBatch, userSection} = userInfo;

    try {

    const res = await fetch(`/api/adduser/${user_id}`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(libraryType=="school" ? {userType, userIdProof, userIdNumber, userFullName, userEmailId, userGender, userDOB, userClassName, userSection} : libraryType == "university" ? {userType, userIdProof, userIdNumber, userCourseName, userBatch, userFullName, userGender, userDOB, userEmailId, userMobilePhone} : {userType, userIdProof, userIdNumber, userEducation, userEmailId, userMobilePhone, userFullName, userGender, userDOB})
    });

    const data = await res.json();

    if(data.message == "Required fields !"){
      toast.error("Required fields !");
    }
    else if(data.message == "Data Saved Successfully"){
      toast.success("Data Saved Successfully");
    }
    else if(data.message == "Technical Error"){
      toast.error("Technical Error")
    }
    else{
      toast.error(data.err);
    }
    } catch (error) {
      toast.error(error);
    }

  }

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={4000}
        theme={"light"}
      />
      <div className="2xl:container flex mx-auto">
        <SideMenu userFirstName={fName} userLastName={lName} />

        <div className="w-full py-3 px-3 bg-[#ebf0fa]">
          <HeaderBox pageName="Add User" />

          <div className="w-full">
            <div className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200" style={{ backgroundColor: "white" }} >
              <Text >Add student {libraryType.charAt(0).toUpperCase() + libraryType.slice(1)} Library</Text>
              <form method="post">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 md:gap-y-6 sm:gap-y-6 p-3">
                  <div className="flex flex-col">
                    <label htmlFor="usertype" className="text-sm">
                      User Type
                    </label>
                    <input
                      name="userType"
                      id="usertype"
                      value={userType}
                      onChange={getUserInfo}
                      readOnly
                      className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="idproof" className="text-sm">ID Proof</label>
                    <select
                      name="userIdProof"
                      id="idproof"
                      value={userInfo.userIdProof}
                      onChange={getUserInfo}
                      className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                    >
                      {schoolOptions.map((val, index) => {
                        if (libraryType == "school") {
                          return <option value={val}  key={index}>{val}</option>;
                        }
                      })}

                      {collegeOptions.map((val, index) => {
                        if (libraryType == "university") {
                          return <option value={val}  key={index}>{val}</option>;
                        }
                      })}
                      {otherOptions.map((val, index) => {
                        if (libraryType == "public") {
                          return <option value={val} key={index}>{val}</option>;
                        }
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="idnum" className="text-sm">Id Number*</label>
                    <input
                      type="text"
                      id="idnum"
                      name="userIdNumber"
                      value={userInfo.userIdNumber}
                      onChange={getUserInfo}
                      spellCheck={false}
                      placeholder="Id Number"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="fullname" className="text-sm">Student Name*</label>
                    <input
                      type="text"
                      id="fullname"
                      name="userFullName"
                      value={userInfo.userFullName}
                      onChange={getUserInfo}
                      spellCheck={false}
                      placeholder="Full Name"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="dob" className="text-sm">Dob</label>
                    <input
                      type="date"
                      id="dob"
                      name="userDOB"
                      value={userInfo.userDOB}
                      max="2008-01-01"
                      min="1975-01-01"
                      onChange={getUserInfo}
                      placeholder="Dob"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="usergender" className="text-sm">Gender</label>
                    <select
                      id="usergender"
                      name="userGender"
                      spellCheck={false}
                      value={userInfo.userGender}
                      onChange={getUserInfo}
                      placeholder="Gender"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200 appearance-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="transgender">Transgender</option>
                    </select>
                  </div>
                  {
                    libraryType == "public" ? 
                    <>
                    <div className="flex flex-col">
                    <label htmlFor="edu" className="text-sm">Education</label>
                    <input
                      type="text"
                      id="edu"
                      name="userEducation"
                      spellCheck={false}
                      value={userInfo.userEducation}
                      onChange={getUserInfo}
                      placeholder="Ex. 10th, 12th, Graduate etc"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200 appearance-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="mob" className="text-sm">Mobile</label>
                    <input
                      type="tel"
                      id="mob"
                      name="userMobilePhone"
                      value={userInfo.userMobilePhone}
                      onChange={getUserInfo}
                      placeholder="Ex 9999988888"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="emailid" className="text-sm">Email Id</label>
                    <input
                      type="email"
                      id="emailid"
                      name="userEmailId"
                      value={userInfo.userEmailId.toLowerCase()}
                      onChange={getUserInfo}
                      placeholder="Ex abc@gmail.com"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                    </> : libraryType == "university" ? 
                    <>
                    <div className="flex flex-col">
                    <label htmlFor="cour" className="text-sm">Course*</label>
                    <input
                      type="text"
                      id="cour"
                      name="userCourseName"
                      spellCheck={false}
                      value={userInfo.userCourseName}
                      onChange={getUserInfo}
                      placeholder="Ex. MCA"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200 appearance-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="year" className="text-sm">Batch</label>
                    <input
                      type="tel"
                      id="year"
                      name="userBatch"
                      value={userInfo.userBatch}
                      onChange={getUserInfo}
                      placeholder="Ex 2021-24"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="emailid" className="text-sm">Student Email Id</label>
                    <input
                      type="email"
                      id="emailid"
                      name="userEmailId"
                      value={userInfo.userEmailId.toLowerCase()}
                      onChange={getUserInfo}
                      placeholder="Ex abc@gmail.com"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="mob" className="text-sm">Student Mobile</label>
                    <input
                      type="tel"
                      id="mob"
                      name="userMobilePhone"
                      value={userInfo.userMobilePhone}
                      maxLength={10}
                      onChange={getUserInfo}
                      placeholder="Ex 9999988888"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                    </> : 
                    
                    <>
                    <div className="flex flex-col">
                    <label htmlFor="cla" className="text-sm">Class*</label>
                    <input
                      type="text"
                      id="cla"
                      name="userClassName"
                      spellCheck={false}
                      value={userInfo.userClassName}
                      onChange={getUserInfo}
                      placeholder="Ex. 6th"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200 appearance-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="sec" className="text-sm">Section</label>
                    <input
                      type="text"
                      id="sec"
                      name="userSection"
                      value={userInfo.userSection.toUpperCase()}
                      onChange={getUserInfo}
                      maxLength={2}
                      placeholder="Ex A"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="emailid" className="text-sm">Student Email Id</label>
                    <input
                      type="email"
                      id="emailid"
                      name="userEmailId"
                      value={userInfo.userEmailId.toLowerCase()}
                      onChange={getUserInfo}
                      placeholder="Ex abc@gmail.com"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                    </>
                  }
                </div>

                <div className="flex p-3">
                  <Button onClick={addUserData} className="bg-rose-900 md:w-40 sm:w-full w-full">
                    Add User
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
