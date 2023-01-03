import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <div className="layout font-Inter">
        <header>
          <Navbar />
        </header>
        <main className="font-Inter">{children}</main>
        <Footer />       
      </div>
    </>
  );
};

export default Layout;
