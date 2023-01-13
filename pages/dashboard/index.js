import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";
import { Button, Text } from "@nextui-org/react";
import BooksTable from "./components/BooksTable";

import NextLink from "next/link";
import {
  Category,
  PaperPlus,
  PaperUpload,
  PaperDownload,
  Setting,
} from "react-iconly";

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
      props: { data },
    };
  }
}

const DashboardHome = ({ data }) => {

  const numberArr = [745896, 78964, 751412, 89669];
  const totalBooks = Intl.NumberFormat("en-IN").format(numberArr[0]);
  const issuedBooks = Intl.NumberFormat("en-IN").format(numberArr[1]);
  const returnedBooks = Intl.NumberFormat("en-IN").format(numberArr[2]);
  const avaiBook = Intl.NumberFormat("en-IN").format(numberArr[3]);

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];


  const now = new Date();
  const timeToday = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;


  return (
    <>
      <div className="2xl:container flex mx-auto border border-blue-800">
        <div className="md:flex sm:flex flex-auto hidden justify-center md:w-96 sm:w-80 border border-rose-400">
          <ul className="p-4 justify-center border border-yellow-300 bg-white">
            <li className="flex justify-start w-full align-middle mb-4">
              <NextLink
                className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
                href="/dashboard"
              >
                <span>
                  <Category set="curved" size={22} primaryColor="#ab0143" />
                </span>
                <span className="font-semibold font-GilroyLight">
                  Dashboard
                </span>
              </NextLink>
            </li>
            <li className="flex justify-start w-full align-middle">
              <NextLink
                className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
                href="/dashboard"
              >
                <span>
                  <PaperPlus set="curved" primaryColor="#ab0143" />
                </span>
                <span className="font-semibold font-GilroyLight">
                  Add a Book
                </span>
              </NextLink>
            </li>
            <li className="flex justify-start w-full align-middle">
              <NextLink
                className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
                href="/dashboard"
              >
                <span>
                  <PaperUpload set="curved" primaryColor="#ab0143" />
                </span>
                <span className="font-semibold font-GilroyLight">
                  Issue a Book
                </span>
              </NextLink>
            </li>
            <li className="flex justify-start w-full align-middle">
              <NextLink
                className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
                href="/dashboard"
              >
                <span>
                  <PaperDownload set="curved" primaryColor="#ab0143" />
                </span>
                <span className="font-semibold font-GilroyLight">
                  Return a Book
                </span>
              </NextLink>
            </li>
            <li className="flex justify-start w-full align-middle mb-0">
              <NextLink
                className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
                href="/dashboard"
              >
                <span>
                  <Setting set="curved" primaryColor="#ab0143" />
                </span>
                <span className="font-semibold font-GilroyLight">Settings</span>
              </NextLink>
            </li>
          </ul>
        </div>

        <div className="w-full border border-rose-400 py-3 px-3">

          <div className="grid grid-flow-col justify-between place-items-center mb-7 py-4 px-3 rounded-xl shadow-lg bg-white">
            <Text b className="font-PoppinsRegular">Dashboard</Text>
            <Text className="font-PoppinsRegular">Today, {timeToday}</Text>
          </div>


          <div className="border grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 w-auto">


            <div className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200" style={{backgroundColor:"#bae6fd"}}>
              <Text size={18} className="font-PoppinsLight text-sky-900" css={{letterSpacing:"0.01px"}}>Total Books</Text>
              <Text size={26} className="font-PoppinsMedium text-sky-900" css={{letterSpacing:"0.2px"}}>{totalBooks}</Text>
            </div>


            <div className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200" style={{backgroundColor:"#fef3c7"}}>
              <Text size={18} className="font-PoppinsLight text-amber-700" css={{letterSpacing:"0.01px"}}>Issued Books</Text>
              <Text size={26} className="font-PoppinsMedium text-amber-700" css={{letterSpacing:"0.2px"}}>{issuedBooks}</Text>
            </div>


            <div className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200" style={{backgroundColor:"#fecdd3"}}>
              <Text size={18} className="font-PoppinsLight text-red-900" css={{letterSpacing:"0.01px"}}>Returned Books</Text>
              <Text size={26} className="font-PoppinsMedium text-red-900" css={{letterSpacing:"0.2px"}}>{returnedBooks}</Text>
            </div>


            <div className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200" style={{backgroundColor:"#a7f3d0"}}>
              <Text size={18} className="font-PoppinsLight text-emerald-900" css={{letterSpacing:"0.01px"}}>Available Books</Text>
              <Text size={26} className="font-PoppinsMedium text-emerald-900" css={{letterSpacing:"0.2px"}}>{avaiBook}</Text>
            </div>


          </div>

          <div className="border mt-7">
            <BooksTable />
          </div>


        </div>
        {/* <div className="md:flex flex-auto w-60 sm:flex hidden border border-rose-400">3</div> */}
      </div>
    </>
  );
};

export default DashboardHome;
