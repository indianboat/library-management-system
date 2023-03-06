import { useRouter } from "next/router";
import React from "react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import SideMenu from "../../components/SideMenu";
import HeaderBox from "../../components/HeaderBox";
import useSWR from "swr";
import { useFormik } from "formik";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Table, Row, Text } from "@nextui-org/react";
import NextLink from "next/link";

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

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading } = useSWR(`/api/users/${userid}`, fetcher);
  // const { data: books, isLoading: booksLoading } = useSWR(
  //   "/api/books/AMRITALIB0001",
  //   fetcher
  // );

  // let user = [];

  // if (!isLoading) {
  //   for (let i = 0; i < data.usersList.length; i++) {
  //     const element = data.usersList[i];
  //     if (router.query.userid == element._id) {
  //       user.push(element);
  //     }
  //   }
  // }

  // get particular book to match slug------>

  const bid = router.query.bid;

  



  return (
    <>
      <div className="2xl:container flex mx-auto">
        <SideMenu
          userFirstName={!isLoading ? data.fname : ""}
          userLastName={!isLoading ? data.lname : ""}
          libId={!isLoading ? data.libraryInfo.libraryId : ""}
        />
        <div className="w-full py-3 px-3 bg-[#ebf0fa]">
          <HeaderBox pageName="Issue Book to user" />
          <div className="w-full">
            <div className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200 bg-white">
              <h1>
                {!isLoading ? (
                  `Book Id : ${bid}`
                ) : (
                  <Skeleton baseColor="#ECF1FA" height={20} width={120} />
                )}
              </h1>
              <div className="border mt-4">
                <form method="post">
                  <div className="">

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
