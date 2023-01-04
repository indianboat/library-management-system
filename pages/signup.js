import React from "react";
import Image from "next/legacy/image";
import { Text, Input, Button } from "@nextui-org/react";
import NextLink from "next/link";

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
  return (
    <>
      <div className="container border border-red-500 mx-auto md:my-12 sm:my-6 my-6 px-3">
        <div className="flex md:grid-cols-2 sm:grid-cols-1 justify-evenly">
          <div className="border flex-col md:flex sm:hidden hidden place-items-center justify-center border-blue-500 my-3">
            <Image
              className="border"
              src="/signupImage.png"
              role="img"
              alt="signup-image"
              width={500}
              height={400}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(600, 400)
              )}`}
            />
          </div>
          <div className="md:py-12 flex flex-col border border-blue-500 bg-white rounded-lg drop-shadow-md my-3">
            <Text size={24} className="font-Calisga text-center mb-10">
              Sign up as Librarian
            </Text>
            <div className="">
              <form
                method="post"
                className="border py-3 px-8 flex flex-col gap-y-6"
              >
                <div className="grid gap-y-6 gap-x-6 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 border">
                  <Input
                    className=""
                    size="lg"
                    type="text"
                    underlined
                    placeholder="First Name*"
                    status="primary"
                    color="primary"
                    // helperColor={helper.color}
                    // helperText={helper.text}
                    required
                  />
                  <Input
                    className=""
                    size="lg"
                    type="text"
                    underlined
                    placeholder="Last Name"
                  />
                </div>
                <Input
                  type="email"
                  size="lg"
                  underlined
                  placeholder="Email address"
                  required
                />
                <Input.Password
                  size="lg"
                  type="password"
                  underlined
                  placeholder="Create Password"
                  required
                />
                <Button
                  type="submit"
                  className="mt-4"
                  css={{ backgroundColor: "$accents9 !important" }}
                >
                  Sign up
                </Button>
              </form>
            </div>
            <Text className="font-Inter text-center border mt-4">
              Already have an account? <NextLink href="/login">Login</NextLink>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
