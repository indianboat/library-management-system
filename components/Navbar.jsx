import React from "react";
import { Navbar, Text } from "@nextui-org/react";
import NextLink from 'next/link';

const NavbarBody = () => {
  return (
    <>
      <Navbar variant="sticky" css={{backgroundColor:"$accents2"}}>
        <Navbar.Toggle showIn="xs" name="toggleButton" />
        <Navbar.Brand css={{ "@xs": { w: "12%" } }}>
          <Text b color="inherit" hideIn="xs">
            Library Manager
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          activeColor="default"
          hideIn="xs"
          variant="highlight-rounded"
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
            <NextLink color="inherit" css={{ minWidth: "100%", fontWeight:"500 !important" }} href="/">
              Home
            </NextLink>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem key={"feature"}>
            <NextLink color="inherit" css={{ minWidth: "100%", fontWeight:"500 !important" }} href="/#features">
              Features
            </NextLink>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem key={"login"}>
            <NextLink color="inherit" css={{ minWidth: "100%", fontWeight:"500 !important" }} href="/login">
              Login
            </NextLink>
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarBody;
