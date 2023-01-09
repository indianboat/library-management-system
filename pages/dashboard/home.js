import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { Button } from '@nextui-org/react';
import NextLink from 'next/link';

export async function getServerSideProps(ctx){

  const { user_session } = parseCookies(ctx);
  const token = jwt.decode(user_session);

  const res = await fetch(`http://localhost:3000/api/${token.id}`);
  const data = await res.json();

  if (token == null) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 307
      },
    }
  }
  return {
    props: {data}
  }
}

const DashboardHome = ({data}) => {

  const [libraryData, setLibraryData] = useState({
    library_name:"",
    
  });

  if(data.library_name == ""){
    setLibraryData
  }

  return (
    <>
      <div className="container mx-auto my-6">       
        <div className="grid gap-y-4 justify-center">
        welcome back, {data.fname}{data.lname}
        <NextLink color="default" href="#" className="bg-gray-500 px-4 py-2 shadow shadow-gray-300 rounded-xl text-white">Create a Library</NextLink>
        </div>
      </div>
    </>
  )
}

export default DashboardHome