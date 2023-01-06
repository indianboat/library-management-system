import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { parseCookies } from 'nookies';

export async function getServerSideProps(ctx){
  const { user_session } = parseCookies(ctx);
  const id = jwt.decode(user_session);

  if (id == null) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 307
      },
    }
  }
  return {
    props: {}
  }
}

const Dashboard = () => {
  return (
    <>
    
    </>
  )
}

export default Dashboard