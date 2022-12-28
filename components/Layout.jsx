import React from "react";
import Navbar from "./Navbar";

import { Raleway, Chivo_Mono } from "@next/font/google";

const rale = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const chivo = Chivo_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


const Layout = ({ children }) => {
  return (
    <>
      <header><Navbar /></header>
      <main className={rale.className}>{children}</main>
      <footer>{/* <Footer /> */}</footer>
    </>
  );
};

export default Layout;
