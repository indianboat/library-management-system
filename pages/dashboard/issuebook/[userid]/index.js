import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import SideMenu from "../../components/SideMenu";
import HeaderBox from "../../components/HeaderBox";
import useSWR from "swr";
import { useFormik } from "formik";
import atob from "atob";
import btoa from "btoa";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Table, Row, Text, Badge, Link, Button } from "@nextui-org/react";
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

const IssueById = ({ token }) => {
  const router = useRouter();
  const libraryId = atob(router.query.library);
  const uid = atob(router.query.userid);
  const ind = router.query.userIndex;
  console.log(ind);

  const userid = jwt.decode(token).id;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading } = useSWR(`/api/users/${userid}`, fetcher);
  const {
    data: books,
    error,
    isLoading: booksLoading,
  } = useSWR(`/api/librarydata/${libraryId}`, fetcher);

  let user = [];
  let allBooks = [];

  if (!isLoading) {
    for (let i = 0; i < data.usersList.length; i++) {
      const element = data.usersList[i];
      if (uid == element._id) {
        user.push(element);
      }
    }
  }

  if (!booksLoading) {
    const libId = books.library_id;
    if (atob(router.query.library) === libId) {
      for (let i = 0; i < books.bookList.length; i++) {
        const element = books.bookList[i];
        allBooks.push(element);
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      bookQuery: "",
    },
  });

  const bookColumns = [
    { name: "BOOK ID", uid: "bookId" },
    { name: "TITLE", uid: "bookTitle" },
    { name: "AUTHOR", uid: "authorName" },
    { name: "QUANTITY", uid: "bookQuantity" },
    { name: "STATUS", uid: "stockStatus" },
    { name: "ACTION", uid: "action" },
  ];

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
                  `Hello ${user[0].userFullName}`
                ) : (
                  <Skeleton baseColor="#ECF1FA" height={20} width={120} />
                )}
              </h1>
              <div className="mt-4">
                <form method="post" onSubmit={formik.handleSubmit}>
                  <div className="">
                    <div className="flex flex-col md:w-fit sm:w-full">
                      <label htmlFor="bookQuery">
                        Enter Id or Name or Author
                      </label>
                      <input
                        type="search"
                        name="bookQuery"
                        id="bookQuery"
                        placeholder="Search"
                        className="rounded-xl px-3 py-2 border-2 border-rose-200 appearance-none"
                        spellCheck={false}
                        {...formik.getFieldProps("bookQuery")}
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      {isLoading ? (
                        <Skeleton count={5} />
                      ) : (
                        <Table
                          bordered={false}
                          aria-label="books-data"
                          css={{
                            height: "auto",
                            minWidth: "100%",
                            zIndex: "0",
                          }}
                        >
                          <Table.Header
                            columns={bookColumns}
                            className="select-none"
                          >
                            {(cols) => (
                              <Table.Column key={cols.uid} css={{textAlign:"center"}}>
                                {cols.name}
                              </Table.Column>
                            )}
                          </Table.Header>
                          <Table.Body css={{textAlign:"center"}}>
                            {allBooks
                              .filter((bookname) => {
                                if (formik.values.bookQuery === "")
                                  return bookname;
                                else if (
                                  bookname.bookTitle
                                    .toLowerCase()
                                    .includes(
                                      formik.values.bookQuery.toLowerCase()
                                    ) ||
                                  bookname.bookId
                                    .toString()
                                    .includes(
                                      formik.values.bookQuery.toString()
                                    ) ||
                                  bookname.authorName
                                    .toLowerCase()
                                    .includes(
                                      formik.values.bookQuery.toLowerCase()
                                    )
                                ) {
                                  return bookname;
                                }
                              })
                              .map((val, key) => {
                                return (
                                  <Table.Row key={key} className="select-none" >
                                    <Table.Cell css={{cursor:"auto"}}>
                                      <Row css={{textAlign:"center", justifyContent:"center"}}>
                                        <Text
                                          b
                                          size={14}
                                          css={{ tt: "capitalize" }}
                                          className="select-none"
                                        >
                                          {val.bookId}
                                        </Text>
                                      </Row>
                                    </Table.Cell>
                                    <Table.Cell css={{cursor:"auto"}}>{val.bookTitle}</Table.Cell>
                                    <Table.Cell css={{cursor:"auto"}}>{val.authorName}</Table.Cell>
                                    <Table.Cell css={{cursor:"auto", width:"fit-content"}}>{val.bookQuantity}</Table.Cell>
                                    <Table.Cell css={{cursor:"auto"}}>
                                      {val.outOfStock == false && val.bookQuantity != 0 ? (
                                        <Badge color="success" enableShadow disableOutline variant="flat">
                                          Available
                                        </Badge>
                                      ) : (
                                        <Badge color="error" enableShadow disableOutline variant="flat">
                                          Out of Stock
                                        </Badge>
                                      )}
                                    </Table.Cell>
                                    <Table.Cell css={{cursor:"auto", d:"flex", justifyContent:"center"}}>
                                      <Button auto disabled={val.outOfStock == false && val.bookQuantity != 0 ? false : true} className="px-2 py-1 rounded-2xl w-1/2 bg-slate-400 text-slate-200">
                                        <NextLink
                                          href={{
                                            pathname: `/dashboard/issuebook/${router.query.userid}/bookdata`,
                                            query: {
                                              bookid: btoa(val.bookId),
                                              library: router.query.library,
                                              userIndex: ind,
                                            },
                                          }}
                                        >
                                          Issue
                                        </NextLink>
                                      </Button>
                                    </Table.Cell>
                                  </Table.Row>
                                );
                              })}
                          </Table.Body>
                        </Table>
                      )}
                    </div>
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

export default IssueById;
