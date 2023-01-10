import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import { Button, Text } from '@nextui-org/react';
import NextLink from 'next/link';

export async function getServerSideProps(ctx){

  const { token } = parseCookies(ctx);
  const token_value = jwt.decode(token);

  if (token_value == undefined) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 307
      },
    }
  }
  else{
    // const res = await fetch(`http://localhost:3000/api/${token_value.id}`);
    const res = await fetch(`https://amrita-lms.vercel.app/api/${token_value.id}`);
    const data = await res.json();
    return {
      props: {data}
    }
  }
  
}

const DashboardHome = ({data}) => {

  const [libraryData, setLibraryData] = useState({
    library_name:data.library_name,
  });

  useEffect(() => {
    if(data.library_name == ""){
      setLibraryData({library_name:"You have not any library"})
    }
    else{
      setLibraryData({library_name:""})
    }
  }, [data.library_name])
  

  return (
    <>
      <div className="container mx-auto my-6 border">       
        {/* <div className="grid gap-y-4 border justify-center">
        welcome back, {data.fname}{data.lname}
        <NextLink color="default" href="/dashboard/addlibrary" className="bg-gray-500 px-4 py-2 shadow shadow-gray-300 rounded-xl text-white">Add your Library Online</NextLink>
        </div>
        <div className="">
          <p>{libraryData.library_name}</p>
        </div> */}
        <div className="">
          <Text b size={30}>Congratulations, <i className='font-thin'>{data.fname}</i></Text>
        </div>



      </div>
    </>
  )
}

export default DashboardHome