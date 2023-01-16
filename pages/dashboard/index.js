import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";
import { Text } from "@nextui-org/react";
import BooksTable from "./components/BooksTable";
import NextLink from "next/link";
import SideMenu from "./components/SideMenu";

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
      props: { data },
    };
  }
}

const DashboardHome = ({ data }) => {

  const [libActive, setLibActive] = useState(data.libraryInfo.libraryActive);

  const numberArr = [data.booksInfo.totalBooks, data.booksInfo.issuedBooks, data.booksInfo.returnedBooks, data.booksInfo.availableBooks];
  const totalBooks = Intl.NumberFormat("en-IN").format(numberArr[0]);
  const issuedBooks = Intl.NumberFormat("en-IN").format(numberArr[1]);
  const returnedBooks = Intl.NumberFormat("en-IN").format(numberArr[2]);
  const avaiBook = Intl.NumberFormat("en-IN").format(numberArr[3]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const now = new Date();
  const timeToday = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;

  return (
    <>
      {libActive == false ? (
        <>
        Hey, you do not have any library. Please add your library
          <NextLink href="/dashboard/addlibrary" className="text-blue-900 italic"> Add Library</NextLink>
        </>
      ) : (
        <>
          <div className="2xl:container flex mx-auto">
            <div className="md:flex sm:flex flex-auto hidden justify-center md:w-96 sm:w-80">
              <SideMenu />
            </div>

            <div className="w-full  py-3 px-3">
              <div className="grid grid-flow-col justify-between place-items-center mb-7 py-4 px-3 rounded-xl shadow-lg bg-white">
                <Text b className="font-PoppinsRegular">
                  Dashboard
                </Text>
                <Text className="font-PoppinsRegular">Today, {timeToday}</Text>
              </div>

              <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 w-auto">
                <div
                  className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
                  style={{ backgroundColor: "#bae6fd" }}
                >
                  <Text
                    size={18}
                    className="font-PoppinsLight text-sky-900"
                    css={{ letterSpacing: "0.01px" }}
                  >
                    Total Books
                  </Text>
                  <Text
                    size={26}
                    className="font-PoppinsMedium text-sky-900"
                    css={{ letterSpacing: "0.2px" }}
                  >
                    {totalBooks}
                  </Text>
                </div>

                <div
                  className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
                  style={{ backgroundColor: "#fef3c7" }}
                >
                  <Text
                    size={18}
                    className="font-PoppinsLight text-amber-700"
                    css={{ letterSpacing: "0.01px" }}
                  >
                    Issued Books
                  </Text>
                  <Text
                    size={26}
                    className="font-PoppinsMedium text-amber-700"
                    css={{ letterSpacing: "0.2px" }}
                  >
                    {issuedBooks}
                  </Text>
                </div>

                <div
                  className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
                  style={{ backgroundColor: "#fecdd3" }}
                >
                  <Text
                    size={18}
                    className="font-PoppinsLight text-red-900"
                    css={{ letterSpacing: "0.01px" }}
                  >
                    Returned Books
                  </Text>
                  <Text
                    size={26}
                    className="font-PoppinsMedium text-red-900"
                    css={{ letterSpacing: "0.2px" }}
                  >
                    {returnedBooks}
                  </Text>
                </div>

                <div
                  className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
                  style={{ backgroundColor: "#a7f3d0" }}
                >
                  <Text
                    size={18}
                    className="font-PoppinsLight text-emerald-900"
                    css={{ letterSpacing: "0.01px" }}
                  >
                    Available Books
                  </Text>
                  <Text
                    size={26}
                    className="font-PoppinsMedium text-emerald-900"
                    css={{ letterSpacing: "0.2px" }}
                  >
                    {avaiBook}
                  </Text>
                </div>
              </div>

              <div className="mt-7">
                <BooksTable />
              </div>
            </div>
            {/* <div className="md:flex flex-auto w-60 sm:flex hidden border border-rose-400">3</div> */}
          </div>
        </>
      )}
    </>
  );
};

export default DashboardHome;
