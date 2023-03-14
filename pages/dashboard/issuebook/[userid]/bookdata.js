import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import SideMenu from "../../components/SideMenu";
import HeaderBox from "../../components/HeaderBox";
import useSWR from "swr";
import atob from "atob";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button, Text } from "@nextui-org/react";
import { useFormik } from "formik";
import DateObject from "react-date-object";

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
  }
  return {
    props: { token },
  };
}

const BookId = ({ token }) => {
  const router = useRouter();
  const userid = jwt.decode(token).id;
  const [bid, setBid] = useState(atob(router.query.bookid));
  const [lid, setlib] = useState(atob(router.query.library));
  const [userIndex, setUserIndex] = useState(router.query.userIndex);
  
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading } = useSWR(`/api/users/${userid}`, fetcher);
  const { data: book, isLoading: bookLoading } = useSWR( `/api/librarydata/${lid}/${bid}`, fetcher );
  
  const [userIdNum, setUserIdNum] = useState(data.usersList[userIndex].userIdNumber);

  const [bookData, setBookData] = useState({});

  useEffect(() => {
    if (!bookLoading) {
      setBookData(book[0]);
    }
  }, [bookLoading, book]);

  let today = new DateObject({ format: "DD-MM-YYYY" });
  let returnMaxDate = new DateObject({
    format: "YYYY-MM-DD",
    month: today.month.number + 2,
    day: today.day,
    year: today.year,
  }).format();

  const formik = useFormik({
    initialValues: {
      issuedDate: today.format("YYYY-MM-DD"),
      returnDate: today.format("YYYY-MM-DD"),
    },
    onSubmit,
  });

  async function onSubmit(values) {
    try {
      const res = await fetch(`/api/librarydata/${lid}/${userIdNum}/${userIndex}/${bid}`, {
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      });

      const data = res.json();
      console.log(data.message);

    } catch (error) {
      toast.error(error)
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
        <SideMenu
          userFirstName={!isLoading ? data.fname : ""}
          userLastName={!isLoading ? data.lname : ""}
          libId={!isLoading ? data.libraryInfo.libraryId : ""}
        />
        <div className="w-full py-3 px-3 bg-[#ebf0fa]">
          <HeaderBox pageName="Issue Book to user" />
          <div className="w-full">
            <div className="px-4 py-4 rounded-xl space-y-4 shadow-xl shadow-slate-200 bg-white">
              <Text className="text-2xl">
                { !bookLoading ? ( `Book Title : ${bookData.bookTitle}` ) : ( <Skeleton baseColor="#ECF1FA" height={20} width={300} /> )}
              </Text>
              <Text className="text-xl font-semibold">
                {!isLoading ? (
                  `Book Id : ${bid}`
                ) : (
                  <Skeleton baseColor="#ECF1FA" height={20} width={300} />
                )}
              </Text>
              <Text className="text-xl font-semibold">
                {!bookLoading ? (
                  `Author : ${bookData.authorName}`
                ) : (
                  <Skeleton baseColor="#ECF1FA" height={20} width={300} />
                )}
              </Text>
              <Text className="text-xl font-semibold">
                {!bookLoading ? (
                  `Genre : ${bookData.bookGenre}`
                ) : (
                  <Skeleton baseColor="#ECF1FA" height={20} width={300} />
                )}
              </Text>
              <Text className="text-xl font-semibold">
                {!bookLoading ? (
                  `Publisher : ${bookData.publisherName}`
                ) : (
                  <Skeleton baseColor="#ECF1FA" height={20} width={300} />
                )}
              </Text>
              <Text className="text-xl font-semibold">
                {!bookLoading ? (
                  `Published Date : ${bookData.publishDate}`
                ) : (
                  <Skeleton baseColor="#ECF1FA" height={20} width={300} />
                )}
              </Text>
              <Text className="text-xl font-semibold">
                {!bookLoading ? (
                  `No. of Pages : ${bookData.totalPages}`
                ) : (
                  <Skeleton baseColor="#ECF1FA" height={20} width={300} />
                )}
              </Text>
              <div className="flex flex-col">
                <form method="post" onSubmit={formik.handleSubmit}>
                  <div className="flex flex-col">
                    <label htmlFor="issuedDate">Issue Date</label>
                    <input
                      type="text"
                      readOnly
                      name="issuedDate"
                      value={today.format("DD-MM-YYYY")}
                      className="border"
                      id="issuedDate"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label htmlFor="returnDate">Return Date</label>
                    <input
                      type="date"
                      className="border flex w-fit"
                      id="returnDate"
                      name="returnDate"
                      value={formik.values.returnDate}
                      min={formik.values.issuedDate}
                      max={returnMaxDate}
                      {...formik.getFieldProps("returnDate")}
                    />
                  </div>
                  <div className=""></div>
                  <div className="flex flex-col mt-4">
                    <Button
                      type="submit"
                      auto
                      className="border flex w-fit bg-slate-400"
                    >
                      Issue
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookId;
