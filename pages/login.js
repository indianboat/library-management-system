import React, { useState } from "react";
import Image from "next/legacy/image";
import { Text, Input, Button, Loading } from "@nextui-org/react";
import NextLink from "next/link";
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from "next/router";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    setUserLoginData({ ...userLoginData, [event.target.name]: event.target.value });
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveData = async () => {
    const { email, password } = userLoginData;

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.message == "Required email !") {
        toast.error("Required email !");
        setLoading(false);
      } else if (data.message == "Required password !") {
        toast.error("Required password !");
        setLoading(false);
      } else if (data.message == "Required password !") {
        toast.error("Required password !");
        setLoading(false);
      } else if (data.message == "Email id invalid !") {
        toast.error("Email id invalid !");
        setLoading(false);
      } else if (data.message == "This email is not registered with us !") {
        toast.error("This email is not registered with us !");
        setLoading(false);
      } else if (data.message == "Invalid Credentials") {
        toast.error("Invalid Credentials");
        setLoading(false);
      } else if (data.message == "Login success") {
        toast.success("Login Success !");
        setCookie(null, "user_session", data.token, { secure: true })
        setLoading(false);

        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);

      } else {
        toast.error("Server Error");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };
  return (
    <>
    <ToastContainer position="top-center" hideProgressBar={true} autoClose={4000} theme={"light"} />
      <div className="container mx-auto md:my-12 sm:my-6 my-6 px-3">
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
          <div className="md:py-12 w-80 flex flex-col rounded-lg my-3">
            <Text size={24} className="font-Calisga text-center mb-10">
              Login as Librarian
            </Text>
            <div className="">
              <form method="post" className="py-3 px-2 flex flex-col gap-y-6">
                <input
                  className="border rounded-xl"
                  style={{padding:"8px 10px", backgroundColor:"#F1F3F5"}}
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
                <input
                  className="border rounded-xl"
                  style={{padding:"8px 10px", backgroundColor:"#F1F3F5"}}
                  // size="md"
                  // shadow={false}
                  type="password"
                  name="password"
                  value={userLoginData.password}
                  onChange={getUserData}
                  placeholder="Password"
                  aria-label="login-password"
                />
                <Button
                  className="mt-4"
                  onClick={saveData}
                  css={{ backgroundColor: "$accents9 !important" }}
                >
                  {
                    loading ? <> <Loading color="white" size="sm" /> </> : "Login"
                  }
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
