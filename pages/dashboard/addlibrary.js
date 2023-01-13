import React, { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { Button, Text } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      props: { data, token_value },
    };
  }
}

const AddLibrary = ({ data, token_value }) => {
  const [liraryData, setLibraryData] = useState({
    library_type:
      data.library_type == "School Library"
        ? "School Library"
        : data.library_type,
    librarian_name: data.librarian_name,
    librarian_phone: data.librarian_phone,
  });

  const getLibraryData = (e) => {
    setLibraryData({ ...liraryData, [e.target.name]: e.target.value });
  };

  // const [checkLibraryType, setCheckLibraryType] = useState(liraryData.library_type);

  useEffect(() => {}, []);

  const saveLibraryData = async () => {
    const { library_type, librarian_name, librarian_phone } = liraryData;

    try {
      const res = await fetch(`/api/${token_value.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ library_type, librarian_name, librarian_phone }),
      });

      const data = await res.json();

      if (data.message == "Data Saved Successfully") {
        toast.success("Data Saved Successfully");
      } else if (data.messgae == "Technical Error") {
        toast.error("Technical Error");
      } else {
        toast.error("Server Error, Please try again...");
      }
    } catch (error) {
      console.log(error);
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
                name="library_type"
                value={liraryData.library_type}
                onChange={getLibraryData}
                aria-label="lib name"
              >
                <option value="School">School Library</option>
                <option value="University">University Library</option>
                <option value="Open Library">Open Library</option>
              </select>
            </div>

            <div className="flex flex-col gap-y-1 border">
              <label htmlFor="libname">Librarian Name</label>
              <input
                id="libname"
                className="rounded-xl shadow-md"
                style={{ padding: "8px 10px", backgroundColor: "#F1F3F5" }}
                type="text"
                name="librarian_name"
                value={liraryData.librarian_name}
                onChange={getLibraryData}
                placeholder="Librarian Name"
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
                name="librarian_phone"
                value={liraryData.librarian_phone}
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
