import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";
import BooksTable from "./components/BooksTable";
import NextLink from "next/link";
import SideMenu from "./components/SideMenu";

import DashBox from "./components/DashBox";
import HeaderBox from "./components/HeaderBox";


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
    const res = await fetch(`http://localhost:3000/api/${token_value.id}`);
    // const res = await fetch(`https://amrita-lms.vercel.app/api/${token_value.id}`);
    const data = await res.json();
    return {
      props: { data, token },
    };
  }
}

const DashboardHome = ({ data, token }) => {

  const [libActive, setLibActive] = useState(data.libraryInfo.libraryActive);

  const numberArr = [data.booksInfo.totalBooks, data.booksInfo.issuedBooks, data.booksInfo.returnedBooks, data.booksInfo.availableBooks];

  const totalBooks = Intl.NumberFormat("en-IN").format(numberArr[0]);
  const issuedBooks = Intl.NumberFormat("en-IN").format(numberArr[1]);
  const returnedBooks = Intl.NumberFormat("en-IN").format(numberArr[2]);
  const avaiBook = Intl.NumberFormat("en-IN").format(numberArr[3]);

  return (
    <>
      {libActive == false ? (
        <>
        Hey, you do not have any library. Please add your library
          <NextLink href="/dashboard/addlibrary" className="text-blue-900 italic"> Add Library</NextLink>
        </>
      ) : (
        <>
          <div className="2xl:container flex mx-auto min-h-screen">
            <SideMenu userFirstName={data.fname} userLastName={data.lname}/>

            <div className="w-full py-3 px-3 bg-[#ebf0fa]">
              <HeaderBox pageName="Dashboard" />

              <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 w-auto">
                <DashBox totalBooks={totalBooks} issuedBooks={issuedBooks} returnedBooks={returnedBooks} availableBooks={avaiBook} />
              </div>

              <div className="mt-7">
                {/* <BooksTable /> */}
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
