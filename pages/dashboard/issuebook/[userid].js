import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SideMenu from "../components/SideMenu";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import HeaderBox from "../components/HeaderBox";
import useSWR from "swr";

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

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(`/api/users/${userid}`, fetcher);

  console.log(error);
  console.log(isLoading);

  const user = [];


  if(!isLoading){
    for (let i = 0; i < data.usersList.length; i++) {
      const element = data.usersList[i];
      if(router.query.userid == element._id){
        user.push(element);
      }
    }
  }
 
  
  return (
    <>
      <div className="2xl:container flex mx-auto">
        <SideMenu userFirstName={!isLoading ? data.fname : ""} userLastName={!isLoading ? data.lname : ""} libId={!isLoading ? data.libraryInfo.libraryId : ""} />
        <div className="w-full py-3 px-3 bg-[#ebf0fa]">
          <HeaderBox pageName="Issue Book to user" />
          <div className="w-full">
            <div className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200 bg-white">Hello {!isLoading ? user[0].userFullName : "User"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueById;
