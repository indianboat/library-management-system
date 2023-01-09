import React, { useState, useRef, useEffect } from "react";
import { Navbar, Button, Dropdown, Avatar, Grid } from "@nextui-org/react";
import NextLink from "next/link";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";

const NavbarBody = () => {
  const { user_session } = parseCookies();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();

  const logoutUser = (e) => {
    destroyCookie(null, "user_session");
    router.push("/login");
  };

  useEffect(() => {
    if (user_session) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user_session]);

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
                href={"/dashboard/home"}
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
              <Grid.Container justify="flex-start" gap={2}>
                <Grid>
                  <Dropdown placement="bottom-left">
                    <Dropdown.Trigger>
                      <Avatar
                        size="lg"
                        as="button"
                        color=""
                        src="/user.png"
                      />
                    </Dropdown.Trigger>
                    <Dropdown.Menu variant="shadow"
                      color="default"
                      aria-label="Avatar Actions"
                    >
                      <Dropdown.Item
                        key="settings"
                        description="Add School/University"
                        textValue="settings"
                      >
                        Add Library
                      </Dropdown.Item>
                      <Dropdown.Item
                        key="team_settings"
                        description="Manage Library"
                        textValue="manage"
                      >
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item key="configurations" textValue="manage">
                        Change Password
                      </Dropdown.Item>
                      <Dropdown.Item className="px-0" key="logout" color="error" withDivider textValue="logout">
                        <p
                          className="py-1 w-full px-3"
                          onClick={logoutUser}
                        >
                          Logout
                        </p>
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
                  onClick={() => HandleSideMenu("/")}
                  color="inherit"
                  css={{ minWidth: "100%", fontWeight: "500 !important" }}
                  href="/dashboard/home"
                >
                  Home
                </NextLink>
              </Navbar.CollapseItem>
              <Navbar.CollapseItem key={"homeadmin"}>
                <NextLink
                  onClick={() => HandleSideMenu("/")}
                  color="inherit"
                  css={{ minWidth: "100%", fontWeight: "500 !important" }}
                  href="/dashboard#"
                >
                  Add School/University
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
