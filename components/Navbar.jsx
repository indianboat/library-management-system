import React, { useState, useRef, useEffect } from "react";
import { Navbar, Text } from "@nextui-org/react";
import NextLink from 'next/link';

const NavbarBody = () => {

	const navbarToggleRef = useRef();
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	
  const [activeMenu, setActiveMenu] = useState(
    useEffect(()=>{
      window.location.href.split(`${window.location.origin}`)[1]
    },[])
  );

  const HandleSideMenu = (link) => {
		setActiveMenu(link)
		isSideMenuOpen && navbarToggleRef.current.click()
	}

  return (
    <>
      <Navbar variant="sticky">
        <Navbar.Toggle ref={navbarToggleRef} onChange={(isSelected) => setIsSideMenuOpen(isSelected)} showIn="xs" name="toggleButton" />
        <Navbar.Brand onClick={() => HandleSideMenu("/")} css={{ "@xs": { w: "12%" } }}>
          <NextLink className="font-semibold" color="inherit" href={"/"} hideIn="xs">
            Library Manager
          </NextLink>
        </Navbar.Brand>
        <Navbar.Content
          activeColor="default"
          hideIn="xs"
          className="font-Inter"
        >
          <NextLink className="mx-4" href="/">Home</NextLink>
          <NextLink className="mx-4" href="/#features">Features</NextLink>
          <NextLink className="mx-4" href="/signup">Sign up</NextLink>
        </Navbar.Content>

        <Navbar.Content>
          <NextLink className="font-Inter" color="inherit" href="/login" role="tab">
            Login
          </NextLink>
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem key={"home"}>
            <NextLink onClick={() => HandleSideMenu("/")} color="inherit" css={{ minWidth: "100%", fontWeight:"500 !important" }} href="/">
              Home
            </NextLink>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem key={"feature"}>
            <NextLink onClick={() => HandleSideMenu("/#features")} color="inherit" css={{ minWidth: "100%", fontWeight:"500 !important" }} href="/#features">
              Features
            </NextLink>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem key={"login"}>
            <NextLink onClick={() => HandleSideMenu("/login")} color="inherit" css={{ minWidth: "100%", fontWeight:"500 !important" }} href="/login">
              Login
            </NextLink>
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarBody;
