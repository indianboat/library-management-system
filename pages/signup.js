import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { Text, Button, Loading, Tooltip } from "@nextui-org/react";
import NextLink from "next/link";
import validator from "validator";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f0f0f0" offset="20%" />
      <stop stop-color="#f0f0f0" offset="50%" />
      <stop stop-color="#f0f0f0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f0f0f0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const SignUp = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({ fname: "", lname: "", email: "", password: "" });

  const getUserData = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const [loading, setLoading] = useState(false);

  // Validation for Sign up
  const [errorCount, setErrorCount] = useState({ fname: 1, email: 1, password: 1 });
  const [strongPasswordMessage, setSPM] = useState(true);

  useEffect(() => {
    let fname = document.getElementById("fname");

    if (userData.fname == "") {
      fname.style.color = "black";
      fname.style.backgroundColor = "#F1F3F5";
      setErrorCount({ ...errorCount, fname: 1 });
    } else if (userData.fname != "" && userData.fname.length > 2) {
      fname.style.color = "#1f811d";
      fname.style.backgroundColor = "#dcffd6";
      setErrorCount({ ...errorCount, fname: 0 });
    } else if (userData.fname.length <= 2) {
      fname.style.color = "#a80000";
      fname.style.backgroundColor = "#ffd9dc";
      setErrorCount({ ...errorCount, fname: 1 });
    }
  }, [userData.fname]);

  useEffect(() => {
    let lname = document.getElementById("lname");

    if (userData.lname == "") {
      lname.style.color = "black";
      lname.style.backgroundColor = "#F1F3F5";
    } else if (userData.lname != "") {
      lname.style.color = "#1f811d";
      lname.style.backgroundColor = "#dcffd6";
    }
  }, [userData.lname]);

  useEffect(() => {
    let emailSignup = document.getElementById("emailSignup");

    if (userData.email == "") {
      emailSignup.style.color = "black";
      emailSignup.style.backgroundColor = "#F1F3F5";
      setErrorCount({ ...errorCount, email: 1 });
    } else if (!validator.isEmail(userData.email)) {
      emailSignup.style.color = "#a80000";
      emailSignup.style.backgroundColor = "#ffd9dc";
      setErrorCount({ ...errorCount, email: 1 });
    } else if (userData.email != "" && validator.isEmail(userData.email)) {
      emailSignup.style.color = "#1f811d";
      emailSignup.style.backgroundColor = "#dcffd6";
      setErrorCount({ ...errorCount, email: 0 });
    }
  }, [userData.email]);

  useEffect(() => {
    let passwordSignup = document.getElementById("passwordSignup");
    if (userData.password == "") {
      passwordSignup.style.color = "black";
      passwordSignup.style.backgroundColor = "#F1F3F5";
      setErrorCount({ ...errorCount, password: 1 });
      setSPM(true);
    } else if (!validator.isStrongPassword(userData.password)) {
      passwordSignup.style.color = "#a80000";
      passwordSignup.style.backgroundColor = "#ffd9dc";
      setErrorCount({ ...errorCount, password: 1 });
      setSPM(false);
    } else if (
      userData.password != "" &&
      validator.isStrongPassword(userData.password)
    ) {
      passwordSignup.style.color = "#1f811d";
      passwordSignup.style.backgroundColor = "#dcffd6";
      setErrorCount({ ...errorCount, password: 0 });
      setSPM(true);
    }
  }, [userData.password]);

  const saveData = async () => {
    if (errorCount.fname == 1) {
      fname.style.backgroundColor = "#ffd9dc";
    } else if (errorCount.email == 1) {
      emailSignup.style.backgroundColor = "#ffd9dc";
    } else if (errorCount.password == 1) {
      passwordSignup.style.backgroundColor = "#ffd9dc";
    } else {
      const { fname, lname, email, password } = userData;
      setLoading(true);

      try {
        const res = await fetch("/api/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fname, lname, email, password }),
        });

        const data = await res.json();

        if (data.message == "User already exists !") {
          toast.error("User already exists !");
          setLoading(false);
        } else if (data.message == "Sign up Success") {
          toast.success("Sign up Success, Redirecting to login...");
          setUserData({ fname: "", lname: "", email: "", password: "" });
          setLoading(false);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else if (data.message == "Server Error, try again later") {
          toast.error("Server Error, try again later");
          setLoading(false);
        } else {
          toast.error("Server Error");
          setLoading(false);
        }
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={4000}
        theme={"light"}
      />
      <div className="container mx-auto md:my-0 sm:my-6 my-6 px-3">
        <div className="flex md:grid-cols-2 sm:grid-cols-1 justify-evenly">
          <div className="flex-col md:flex sm:hidden hidden place-items-center justify-center my-3">
            <Image
              src="/signupImage.png"
              role="img"
              alt="signup-image"
              width={500}
              height={400}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(500, 400)
              )}`}
            />
          </div>
          <div className="md:py-12 flex flex-col rounded-lg my-3">
            <Text size={24} className="font-Calisga text-center mb-10">
              Sign up as Librarian
            </Text>
            <div className="">
              <form method="post" className="py-3 px-8 flex flex-col gap-y-6">
                <div className="grid gap-y-6 gap-x-6 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
                  <div className="flex flex-col gap-y-1">
                    <label htmlFor="lfname">
                      First Name<span className="text-rose-900">*</span>
                    </label>
                    <input
                      className="rounded-xl shadow-md"
                      style={{
                        padding: "8px 10px",
                        backgroundColor: "#F1F3F5",
                      }}
                      id="fname"
                      type="text"
                      name="fname"
                      value={userData.fname}
                      onChange={getUserData}
                      placeholder="First Name"
                      aria-label="first-name"
                      spellCheck={false}
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label htmlFor="lname">Last Name</label>
                    <input
                      id="lname"
                      className="rounded-xl shadow-md"
                      style={{
                        padding: "8px 10px",
                        backgroundColor: "#F1F3F5",
                      }}
                      type="text"
                      name="lname"
                      value={userData.lname}
                      onChange={getUserData}
                      placeholder="Last Name"
                      aria-label="last-name"
                      spellCheck={false}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="emailSignup">
                    Email Id<span className="text-rose-900">*</span>
                  </label>
                  <input
                    id="emailSignup"
                    className="rounded-xl shadow-md"
                    style={{ padding: "8px 10px", backgroundColor: "#F1F3F5" }}
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={getUserData}
                    placeholder="Email address"
                    aria-label="email"
                    spellCheck={false}
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="passwordSignup">
                    Create Strong Password
                    <span className="text-rose-900">*</span>
                  </label>
                  <Tooltip content={"Must contain at least 1 number and 1 uppercase and lowercase letter, and at least 8 or more characters"} className="w-full">

                  <input 
                    id="passwordSignup"
                    className="rounded-xl shadow-md w-full"
                    style={{ padding: "8px 10px", backgroundColor: "#F1F3F5" }}
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={getUserData}
                    placeholder="Create Password"
                    aria-label="password"
                  />
                  </Tooltip>
                 
                  {/* <div className="text-rose-800 text-center" hidden={strongPasswordMessage}></div> */}
                </div>
                <Button
                  className="mt-4"
                  onClick={saveData}
                  css={{ backgroundColor: "$accents9 !important" }}
                >
                  {loading ? (
                    <>
                      {" "}
                      <Loading color="white" size="sm" />{" "}
                    </>
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </form>
            </div>
            <Text className="font-Inter text-center mt-4">
              Already have an account? <NextLink href="/login">Login</NextLink>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
