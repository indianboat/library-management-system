import React from "react";
import { Navbar, Link, Text, Button, Dropdown } from "@nextui-org/react";
import { icons } from "./Icons";

const NavbarBody = () => {
  const collapseItems = ["Home", "Features", "Sign up"];

  return (
    <>
      <nav>
        <Navbar shouldHideOnScroll variant="sticky">
          <Navbar.Toggle showIn="xs" />
          <Navbar.Brand css={{ "@xs": { w: "12%" } }}>
            <Text b color="inherit" hideIn="xs">
              LMS
            </Text>
          </Navbar.Brand>

          <Navbar.Content
            activeColor="default"
            hideIn="xs"
            variant="highlight-rounded"
          >
            <Navbar.Link href="#">Home</Navbar.Link>
            <Dropdown>
              <Navbar.Item css={{ pe: 0, height: "auto" }}>
                <Dropdown.Button
                  auto
                  light
                  css={{
                    px: "$0",
                    height: "auto",
                    dflex: "center",
                    h: "0px",
                    span: { px: "$0 !important" },
                    svg: { padding: "$0 !important", mx: "$0", h: "100px" },
                  }}
                  iconRight={icons.chevron}
                  ripple={false}
                >
                  Features
                </Dropdown.Button>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="ACME features"
                css={{
                  $$dropdownMenuWidth: "340px",
                  $$dropdownItemHeight: "70px",
                  "& .nextui-dropdown-item": {
                    py: "$4",
                    // dropdown item left icon
                    svg: {
                      color: "$secondary",
                      mr: "$4",
                    },
                    // dropdown item title
                    "& .nextui-dropdown-item-content": {
                      w: "100%",
                      fontWeight: "$semibold",
                    },
                  },
                }}
              >
                <Dropdown.Item
                  key="multiple"
                  showFullDescription
                  description="It provides access to multiple users at same time"
                  // icon={icons.scale}
                >
                  Multiple access
                </Dropdown.Item>
                <Dropdown.Item
                  key="manage"
                  showFullDescription
                  description="Can manage books or update anytime."
                  // icon={icons.activity}
                >
                  Manage Books Anytime
                </Dropdown.Item>
                <Dropdown.Item
                  key="receipt"
                  showFullDescription
                  description="Generate receipt for every book borrowed"
                  // icon={icons.flash}
                >
                  Generate Receipt
                </Dropdown.Item>
                <Dropdown.Item
                  key="track"
                  showFullDescription
                  description="Track information like location, quantity etc. of any book"
                  // icon={icons.server}
                >
                  Track Records
                </Dropdown.Item>
                <Dropdown.Item
                  key="easytouse"
                  showFullDescription
                  description="Fast communication with electronic and computerized service."
                  // icon={icons.user}
                >
                  Easy to use
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Navbar.Link href="#">Login</Navbar.Link>
            {/* <Navbar.Link href="#">Pricing</Navbar.Link> */}
            {/* <Navbar.Link href="#">Company</Navbar.Link> */}
          </Navbar.Content>

          <Navbar.Content>
            <Navbar.Link color="secondary" href="/">
              Get Started
            </Navbar.Link>
          </Navbar.Content>

          <Navbar.Collapse>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem key={index}>
                <Link color="inherit" css={{ minWidth: "100%" }} href="#">{item}</Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </nav>
    </>
  );
};

export default NavbarBody;
