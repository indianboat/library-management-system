import React, { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { Button, Text } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  const token_value = jwt.decode(token);

  if (token == undefined) {
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
      props: { data, token_value }
    };
  }
}

const AddLibrary = ({ data, token_value }) => {

  const router = useRouter();

  const [liraryData, setLibraryData] = useState({
    libraryType:"school",
    libraryName:"",
    librarianPhone:"",
    libraryActive:true
  });

  const getLibraryData = (e) => {
    setLibraryData({ ...liraryData, [e.target.name]: e.target.value });
  };

  const saveLibraryData = async () => {
    const { libraryType, libraryName, librarianPhone, libraryActive } = liraryData;

    try {
      const res = await fetch(`/api/${token_value.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ libraryType, libraryName, librarianPhone, libraryActive }),
      });

      const data = await res.json();

      if (data.message == "Data Saved Successfully") {
        toast.success("Data Saved Successfully, redirecting...");

        setTimeout(() => {
          router.push("/dashboard")
        }, 3000);

      } else if (data.messgae == "Technical Error") {
        toast.error("Technical Error");
      } else {
        toast.error("Server Error, Please try again...");
      }
    } catch (error) {
      toast.error("Server Error : ", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={4000}
        theme={"light"}
      />
      <div className="container border mx-auto justify-center my-8">
        <div className="text-center md:px-0 sm:px-2 px-3 py-3">
          <Text b size={30}>
            Add your Library Online
          </Text>
        </div>
        <div className="md:w-96 sm:w-96 w-full border mx-auto md:px-0 sm:px-2 px-3">
          <form method="post" className="border grid gap-y-6">
            <div className="flex flex-col gap-y-1 border">
              <label htmlFor="libtype">
                Choose What type your library is...
              </label>
              <select
                id="libtype"
                className="rounded-xl shadow-md"
                style={{ padding: "8px 10px", backgroundColor: "#F1F3F5" }}
                name="libraryType"
                value={liraryData.libraryType}
                onChange={getLibraryData}
                aria-label="lib name"
              >
                <option value="school">School</option>
                <option value="university">University</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div className="flex flex-col gap-y-1 border">
              <label htmlFor="libname">Library Name</label>
              <input
                id="libname"
                className="rounded-xl shadow-md"
                style={{ padding: "8px 10px", backgroundColor: "#F1F3F5" }}
                type="text"
                name="libraryName"
                value={liraryData.libraryName}
                onChange={getLibraryData}
                placeholder="Library Name"
                aria-label="libr name"
                spellCheck={false}
              />
            </div>
            <div className="flex flex-col gap-y-1 border">
              <label htmlFor="libphone">Librarian Phone Number</label>
              <input
                id="libphone"
                className="rounded-xl shadow-md"
                style={{ padding: "8px 10px", backgroundColor: "#F1F3F5" }}
                type="tel"
                name="librarianPhone"
                value={liraryData.librarianPhone}
                onChange={getLibraryData}
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="Librarian Phone Number"
                aria-label="libr phone"
                spellCheck={false}
              />
            </div>
            <div className="w-full grid grid-flow-col place-items-center">
              <Button onClick={saveLibraryData} className="bg-gray-900 w-3">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLibrary;
