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

const IssueById = ({ token }) => {
  const router = useRouter();
  const userid = jwt.decode(token).id;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/users/${userid}`, fetcher);
  const { data: books, isLoading: booksLoading } = useSWR(
    "/api/books/AMRITALIB0001",
    fetcher
  );

  let user = [];

  if (!isLoading) {
    for (let i = 0; i < data.usersList.length; i++) {
      const element = data.usersList[i];
      if (router.query.userid == element._id) {
        user.push(element);
      }
    }
  }

  // console.log(books);
  // const allBooks = books.bookList;

  const formik = useFormik({
    initialValues: {
      bookQuery: "",
    },
  });

  const bookColumns = [
    { name: "BOOK ID", uid: "bookId" },
    { name: "TITLE", uid: "bookTitle" },
    { name: "AUTHOR", uid: "authorName" },
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
              <div className="border mt-4">
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
                      <Table
                        className="border-0"
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
                            <Table.Column key={cols.uid}>
                              {cols.name}
                            </Table.Column>
                          )}
                        </Table.Header>
                        <Table.Body>
                          {booksLoading
                            ? "Loading Please Wait"
                            : books.bookList
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
                                    <Table.Row
                                      key={key}
                                      className="select-none"
                                    >
                                      <Table.Cell>
                                        <Row>
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
                                      <Table.Cell>{val.bookTitle}</Table.Cell>
                                      <Table.Cell>{val.authorName}</Table.Cell>
                                      <Table.Cell>
                                        {val.outOfStock == false ? (
                                          <span className="text-green-500">
                                            Available
                                          </span>
                                        ) : (
                                          <span>Out of Stock</span>
                                        )}
                                      </Table.Cell>
                                      <Table.Cell>
                                        <NextLink
                                          className="px-2 py-1 rounded-md bg-slate-400 text-slate-200"
                                          href={`/dashboard/issuebook/${router.query.userid}/${val.bookId}`}
                                        >
                                          Issue
                                        </NextLink>
                                      </Table.Cell>
                                    </Table.Row>
                                  );
                                })}
                        </Table.Body>
                      </Table>
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
