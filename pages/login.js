import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { Text, Button, Loading, Checkbox, Tooltip } from "@nextui-org/react";
import NextLink from "next/link";
import { setCookie, parseCookies } from "nookies";

import { useRouter } from "next/router";
import validator from "validator";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        statusCode: 307,
      },
    };
  }

  return {
      props: { },
  }
}

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

const Login = () => {

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });

  const getUserData = (event) => {
    setUserLoginData({
      ...userLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Validation for sign in
  const [emailErrorCount, setEmailErrorCount] = useState(0);
  const [passwordErrorCount, setPasswordErrorCount] = useState(0);

  useEffect(() => {
    let emailInput = document.getElementById("emailInput");

    if (userLoginData.email == "") {
      emailInput.style.color = "black";
      emailInput.style.backgroundColor = "#F1F3F5";
      setEmailErrorCount(1);
    } else if (!validator.isEmail(userLoginData.email)) {
      emailInput.style.color = "#a80000";
      emailInput.style.backgroundColor = "#ffd9dc";
      setEmailErrorCount(1);
    } else if (validator.isEmail(userLoginData.email)) {
      emailInput.style.color = "#1f811d";
      emailInput.style.backgroundColor = "#dcffd6";
      setEmailErrorCount(0);
    }
  }, [userLoginData.email]);

  useEffect(() => {
    let passwordInput = document.getElementById("passwordInput");

    if (userLoginData.password == "") {
      passwordInput.style.color = "black";
      setPasswordErrorCount(1);
      passwordInput.style.backgroundColor = "#F1F3F5";
    } else if (userLoginData.password.length >= 8) {
      passwordInput.style.color = "#1f811d";
      passwordInput.style.backgroundColor = "#dcffd6";
      setPasswordErrorCount(0);
    } else if (userLoginData.password.length < 8) {
      passwordInput.style.color = "#a80000";
      passwordInput.style.backgroundColor = "#ffd9dc";
      setPasswordErrorCount(1);
    }
  }, [userLoginData.password])
  

  const saveData = async () => {
    if (emailErrorCount == 1) {
      emailInput.style.backgroundColor = "#ffd9dc";
    } else if (passwordErrorCount == 1){
      passwordInput.style.backgroundColor = "#ffd9dc";
    } else {
      const { email, password } = userLoginData;

      setLoading(true);

      try {
        const res = await fetch("/api/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (data.message == "This email is not registered with us !") {
          toast.error("User does not exists. Please sign up !");
          setLoading(false);
        } else if (data.message == "Invalid Credentials") {
          toast.error("Invalid Credentials");
          setLoading(false);
        } else if (data.message == "Login success") {
          toast.success("Login Success, redirecting....");
          setLoading(false);
         
          setCookie(null, "token", data.token, { secure: process.env.NODE_ENV=="production", maxAge:60*60 });
          router.push("/dashboard");

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
        className="sm:w-1/2"
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
          <div className="md:py-12 w-96 flex flex-col rounded-lg my-3">
            <Text size={24} className="font-Calisga text-center mb-1">
              Welcome Back
            </Text>
            <p className="font-Inter text-center mb-8">
              Welcome, login as librarian
            </p>
            <div className="">
              <form method="post" className="py-3 px-2 flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="emailInput">Email</label>
                  <input
                    id="emailInput"
                    autoFocus
                    className="rounded-xl shadow-md"
                    style={{ padding: "8px 10px", backgroundColor: "#F1F3F5" }}
                    type="email"
                    name="email"
                    value={userLoginData.email}
                    onChange={getUserData}
                    // size="md"
                    // shadow={false}
                    placeholder="Email address"
                    aria-label="login-email"
                    spellCheck={false}
                  />
                </div>

                <div className="flex flex-col gap-y-1">
                  <label htmlFor="passwordInput">Password</label>
                  <input
                    id="passwordInput"
                    className="rounded-xl shadow-md"
                    style={{ padding: "8px 10px", backgroundColor: "#F1F3F5" }}
                    type="password"
                    name="password"
                    minLength={8}
                    value={userLoginData.password}
                    onChange={getUserData}
                    // size="md"
                    // shadow={false}
                    placeholder="Password"
                    aria-label="login-password"
                  />
                </div>
                <div className="flex md:flex-row justify-between text-center sm:gap-y-3">
                  <Checkbox
                    size="sm"
                    className="sm:justify-center justify-center"
                  >
                    Remember me
                  </Checkbox>
                  <NextLink href="#" className="font-bold">
                    Forgot Password
                  </NextLink>
                </div>

                <Button
                  className="z-0 w-full"
                  onClick={saveData}
                  css={{ backgroundColor: "$accents9 !important" }}
                >
                  {loading ? (
                    <>
                      {" "}
                      <Loading color="white" size="sm" />{" "}
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </div>
            <Text className="font-Inter text-center mt-4">
              Dont have an account? <NextLink href="/signup">Sign up</NextLink>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
