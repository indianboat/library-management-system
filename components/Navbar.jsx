import React from "react";
import { Navbar, Link, Text } from "@nextui-org/react";

const NavbarBody = () => {
  return (
    <>
      <Navbar variant="sticky">
        <Navbar.Toggle showIn="xs" />
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
          <Navbar.Link href="#">Home</Navbar.Link>
          <Navbar.Link href="#features">Features</Navbar.Link>
          <Navbar.Link href="#">Login</Navbar.Link>
        </Navbar.Content>

        <Navbar.Content>
          <Navbar.Link className="font-Inter" color="inherit" href="#">
            Sign up
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem key={"home"}>
            <Link color="inherit" css={{ minWidth: "100%", fontWeight:"500 !important" }} href="#">
              Home
            </Link>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem key={"feature"}>
            <Link color="inherit" css={{ minWidth: "100%", fontWeight:"500 !important" }} href="#features">
              Features
            </Link>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem key={"login"}>
            <Link color="inherit" css={{ minWidth: "100%", fontWeight:"500 !important" }} href="#">
              Login
            </Link>
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarBody;
