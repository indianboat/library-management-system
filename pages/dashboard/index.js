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
    const res = await fetch(`http://localhost:3000/api/${token_value.id}`);
    // const res = await fetch(`https://amrita-lms.vercel.app/api/${token_value.id}`);
    const data = await res.json();
    return {
      props: {data}
    }
  }
}

const DashboardHome = ({data}) => {

  return (
    <>
      <div className="2xl:container flex mx-auto border border-blue-800 min-h-screen">
        <div className="md:flex flex-auto w-96 sm:flex hidden border border-rose-400">1</div>
        <div className="flex flex-auto w-full border border-rose-400">2</div>
        <div className="md:flex flex-auto w-60 sm:flex hidden border border-rose-400">3</div>
      </div>
    </>
  )
}

export default DashboardHome