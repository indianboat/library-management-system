import React from "react";
import { Navbar, Link, Text, Button, Dropdown } from "@nextui-org/react";
import { icons } from "./Icons";

const NavbarBody = () => {
  const collapseItems = ["Home", "Features", "Sign up"];

  return (
    <>
      <Navbar shouldHideOnScroll variant="sticky">
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
        >
          <Navbar.Link href="#">Home</Navbar.Link>
          <Navbar.Link href="#features">Features</Navbar.Link>


          <Navbar.Link href="#">Login</Navbar.Link>
          {/* <Navbar.Link href="#">Pricing</Navbar.Link> */}
          {/* <Navbar.Link href="#">Company</Navbar.Link> */}
        </Navbar.Content>

        <Navbar.Content>
          <Navbar.Link css={{color:"$blue900"}} href="#">
            Sign up
          </Navbar.Link>
        </Navbar.Content>

        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={index}>
              <Link color="inherit" css={{ minWidth: "100%" }} href="#">
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarBody;
