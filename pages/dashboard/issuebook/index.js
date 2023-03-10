import React, { useEffect, useState } from "react";
import HeaderBox from "../components/HeaderBox";
import SideMenu from "../components/SideMenu";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { Text, Table, Row } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextLink from "next/link";
import { useFormik } from "formik";
import btoa from "btoa";

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
    const res = await fetch(process.env.NODE_ENV == "production" ? `${process.env.production}/api/users/${token_value.id}` : `${process.env.local}/api/users/${token_value.id}`);
    
    const data = await res.json();

    return {
      props: { token, data },
    };
  }
}

const IssueBook = ({ data, token }) => {

  const fName = jwt.decode(token).user_first_name;
  const lName = jwt.decode(token).user_last_name;

  const libId = data.libraryInfo.libraryId;
  const formik = useFormik({
    initialValues:{
      searchQuery:""
    }
  });

  //table
  const columns = [
    { name: "USER ID", uid: "userid" },
    { name: "USER", uid: "user" },
    { name: "CLASS DETAILS", uid: "details" },
    { name: "NO. OF ISSUED", uid: "issued" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const users = data.usersList;

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={4000}
        theme={"light"}
      />
      <div className="2xl:container flex mx-auto">
        <SideMenu userFirstName={fName} userLastName={lName} libId={libId} />
        <div className="w-full py-3 px-3 bg-[#ebf0fa]">
          <HeaderBox pageName="Issue Book" />

          <div className="w-full">
            <div className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200 bg-white">
              <form>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 md:gap-y-6 sm:gap-y-6 p-3">
                  <div className="flex flex-col">
                    <label htmlFor="searchQuery" className="text-sm">
                      Search User by name or id
                    </label>
                    <input
                      type="text"
                      name="searchQuery"
                      id="searchQuery"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200 appearance-none"
                      placeholder="Search User by name or id"
                      spellCheck={false}
                      required
                      {...formik.getFieldProps("searchQuery")}
                    />
                  </div>
                </div>
              </form>

              <div className="">
                <Table
                  aria-label="Example table with static content"
                  css={{
                    height: "auto",
                    minWidth: "100%",
                  }}
                  selectionMode="single"
                >
                  <Table.Header columns={columns}>
                    {(column) => (
                      <Table.Column key={column.uid}>
                        {column.name}
                      </Table.Column>
                    )}
                  </Table.Header>
                  <Table.Body>
                    {users
                      .filter((item) => {
                        if (formik.values.searchQuery == "") return item;
                        else if (
                          item.userFullName
                            .toLowerCase()
                            .includes(formik.values.searchQuery.toLowerCase()) ||
                          item.userIdNumber
                            .toString()
                            .includes(formik.values.searchQuery.toString())
                        ) {
                          return item;
                        }
                      })
                      .map((val, key) => {
                        return (
                          <Table.Row key={key}>
                            <Table.Cell>
                              <Row>
                                <Text b size={14} css={{ tt: "capitalize" }}>
                                  {val.userIdNumber}
                                </Text>
                              </Row>
                              <Row>
                                <Text
                                  b
                                  size={13}
                                  css={{ tt: "lowercase", color: "$accents7" }}
                                >
                                  {val.userIdProof}
                                </Text>
                              </Row>
                            </Table.Cell>
                            <Table.Cell>
                              <Row>
                                <Text b size={14} css={{ tt: "capitalize" }}>
                                  {val.userFullName}
                                </Text>
                              </Row>
                              <Row>
                                <Text
                                  b
                                  size={13}
                                  css={{ tt: "lowercase", color: "$accents7" }}
                                >
                                  {val.userEmailId}
                                </Text>
                              </Row>
                              <Row>
                                <Text
                                  b
                                  size={13}
                                  css={{ tt: "lowercase", color: "$accents7" }}
                                >
                                  {`${new Date(val.userDOB).getDate()}-${
                                    new Date(val.userDOB).getMonth() + 1
                                  }-${new Date(val.userDOB).getFullYear()}`}
                                </Text>
                              </Row>
                            </Table.Cell>
                            <Table.Cell>
                              <Row>
                                <Text b size={14} css={{ tt: "capitalize" }}>
                                  {val.userClassName}
                                </Text>
                              </Row>
                              <Row>
                                <Text
                                  b
                                  size={13}
                                  css={{ tt: "uppercase", color: "$accents7" }}
                                >
                                  {val.userSection}
                                </Text>
                              </Row>
                            </Table.Cell>
                            <Table.Cell>{val.userNumOfIssued}</Table.Cell>
                            <Table.Cell>
                              <NextLink
                                className="px-2 py-1 rounded-md bg-slate-400 text-slate-200"
                                href={{ 
                                  pathname:`/dashboard/issuebook/${btoa(val._id)}`,
                                  query:{ library:btoa(libId) }
                               }}
                              >
                                Issue Book
                              </NextLink>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueBook;