import React, { useState, useRef, useEffect } from "react";
import { Navbar, Dropdown, Grid, Text, Avatar } from "@nextui-org/react";
import NextLink from "next/link";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const NavbarBody = () => {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const { token } = parseCookies();
  const tokenValues = jwt.decode(token);

  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");

  useEffect(() => {
    if (token) {
      setIsUserLoggedIn(true);
      setFirstName(tokenValues.user_first_name);
      setLastName(tokenValues.user_last_name);
    } else if (token == undefined) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [token, tokenValues]);

  const navbarToggleRef = useRef();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState(
    useEffect(() => {
      window.location.href.split(`${window.location.origin}`)[1];
    }, [])
  );

  const HandleSideMenu = (link) => {
    setActiveMenu(link);
    isSideMenuOpen && navbarToggleRef.current.click();
  };

  const logoutUser = () => {
    destroyCookie(undefined, "token", { path:"/", secure:true });
    router.push("/login");
  };

  return (
    <>
      <Navbar variant="sticky">
        <Navbar.Toggle
          ref={navbarToggleRef}
          onChange={(isSelected) => setIsSideMenuOpen(isSelected)}
          showIn="xs"
          name="toggleButton"
        />
        <Navbar.Brand
          hideIn={"xs"}
          onClick={() => HandleSideMenu("/")}
          css={{ "@xs": { w: "12%" } }}
        >
          {isUserLoggedIn == false ? (
            <>
              <NextLink className="font-semibold" color="inherit" href={"/"}>
                Library Manager
              </NextLink>
            </>
          ) : (
            <>
              <NextLink
                className="font-semibold"
                color="inherit"
                href={"/dashboard"}
              >
                Library Manager Dashboard
              </NextLink>
            </>
          )}
        </Navbar.Brand>
        <Navbar.Content
          activeColor="default"
          hideIn="xs"
          className="font-Inter"
        >
          {isUserLoggedIn == false ? (
            <>
              <NextLink className="mx-4" href="/">
                Home
              </NextLink>
              <NextLink className="mx-4" href="/#features">
                Features
              </NextLink>
              <NextLink className="mx-4" href="/signup">
                Sign up
              </NextLink>
            </>
          ) : (
            <>
              {/* <NextLink className="mx-4" href="/dashboard/home">Home</NextLink> */}
            </>
          )}
        </Navbar.Content>

        <Navbar.Content>
          {isUserLoggedIn == false ? (
            <>
              <NextLink
                className="font-Inter"
                color="inherit"
                href="/login"
                role="tab"
              >
                Login
              </NextLink>
            </>
          ) : (
            <>
              <Grid.Container justify="flex-start" className="py-0 px-0" gap={2}>
                <Grid className="flex align-middle justify-center place-items-center gap-x-3">
                  <Text b size={14}>
                    Hello {firstName}
                  </Text>
                  <Dropdown placement="bottom-right">
                    <Dropdown.Trigger>
                      <Avatar bordered size="md" as="button" src="/user.png" />
                    </Dropdown.Trigger>
                    <Dropdown.Menu color="default" aria-label="Avatar Actions">
                      {/* <Dropdown.Item key="profile" css={{ height: "$14" }} textValue="welcome">
                        <Text b color="inherit" className="font-Inter" css={{ d: "flex" }}>
                          {`Welcome ${firstName} ${lastName}`}
                        </Text>
                      </Dropdown.Item> */}
                      <Dropdown.Item
                        className="px-0"
                        key="homepage"
                        textValue="homepage"
                      >
                        <NextLink
                          style={{
                            paddingTop: "2.4px",
                            paddingBottom: "2.4px",
                          }}
                          className="px-3 block rounded-lg"
                          href="/dashboard"
                        >
                          Dashboard
                        </NextLink>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="px-0"
                        key="settings"
                        textValue="settings"
                      >
                        <NextLink
                          style={{
                            paddingTop: "2.4px",
                            paddingBottom: "2.4px",
                          }}
                          className="px-3 block rounded-lg"
                          href="/dashboard/addlibrary"
                        >
                          Add Library
                        </NextLink>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="px-0"
                        key="team_settings"
                        textValue="manage"
                      >
                        <NextLink
                          style={{
                            paddingTop: "2.4px",
                            paddingBottom: "2.4px",
                          }}
                          className="px-3 block rounded-lg"
                          href="/dashboard/home#"
                        >
                          Settings
                        </NextLink>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="px-0"
                        key="configurations"
                        textValue="manage"
                      >
                        <NextLink
                          style={{
                            paddingTop: "2.4px",
                            paddingBottom: "2.4px",
                          }}
                          className="px-3 block rounded-lg"
                          href="/dashboard/home#"
                        >
                          Change Password
                        </NextLink>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="px-0"
                        key="logout"
                        color="error"
                        withDivider
                        textValue="logout"
                      >
                        <Text
                          color="error"
                          className="py-1 w-full px-3"
                          onClick={logoutUser}
                        >
                          Logout
                        </Text>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid>
              </Grid.Container>
            </>
          )}
        </Navbar.Content>
        {isUserLoggedIn == false ? (
          <>
            <Navbar.Collapse>
              <Navbar.CollapseItem key={"home1"}>
                <NextLink
                  onClick={() => HandleSideMenu("/")}
                  color="inherit"
                  css={{ minWidth: "100%", fontWeight: "500 !important" }}
                  href="/"
                >
                  Home
                </NextLink>
              </Navbar.CollapseItem>
              <Navbar.CollapseItem key={"feature"}>
                <NextLink
                  onClick={() => HandleSideMenu("/#features")}
                  color="inherit"
                  css={{ minWidth: "100%", fontWeight: "500 !important" }}
                  href="/#features"
                >
                  Features
                </NextLink>
              </Navbar.CollapseItem>
              <Navbar.CollapseItem key={"signup"}>
                <NextLink
                  onClick={() => HandleSideMenu("/signup")}
                  color="inherit"
                  css={{ minWidth: "100%", fontWeight: "500 !important" }}
                  href="/signup"
                >
                  Sign up
                </NextLink>
              </Navbar.CollapseItem>
            </Navbar.Collapse>
          </>
        ) : (
          <>
            <Navbar.Collapse>
              <Navbar.CollapseItem key={"home2"}>
                <NextLink
                  onClick={() => HandleSideMenu("/dashboard")}
                  color="inherit"
                  css={{ minWidth: "100%", fontWeight: "500 !important" }}
                  href="/dashboard"
                >
                  Dashboard
                </NextLink>
              </Navbar.CollapseItem>
              <Navbar.CollapseItem key={"homeadmin"}>
                <NextLink
                  onClick={() => HandleSideMenu("/dashboard/adduser")}
                  color="inherit"
                  css={{ minWidth: "100%", fontWeight: "500 !important" }}
                  href="/dashboard/adduser"
                >
                  Add User
                </NextLink>
              </Navbar.CollapseItem>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    </>
  );
};

export default NavbarBody;
