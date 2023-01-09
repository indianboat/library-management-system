import { Text, Container, Link } from "@nextui-org/react";
import React from "react";

const Footer = () => {
  return (
    <>
      <Container xl className="footer bg-gray-900 py-1">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 justify-between">
          <div className="flex gap-2 md:justify-start sm:justify-center justify-center place-items-center ">
            <p>
              <Link className="font-Inter" href="#" css={{ color: "$accents5" }}>
                Twitter
              </Link>
            </p>
            <p>
              <Link className="font-Inter" href="#" css={{ color: "$accents5" }}>
                Github
              </Link>
            </p>
            <p>
              <Link className="font-Inter" href="#" css={{ color: "$accents5" }}>
                Instagram
              </Link>
            </p>
            <p>
              <Link className="font-Inter" href="#" css={{ color: "$accents5" }}>
                Contact
              </Link>
            </p>
          </div>
          <div className="flex flex-col md:text-right sm:text-center text-center">
            <Text className="font-Inter" css={{ color: "$accents5" }}>
              Made with <span style={{ color: "#D31F47" }}>&#10084;</span> by
              Pankaj
            </Text>
            <Text className="font-Inter" css={{ color: "$accents5" }}>
              &copy; CopyRight {new Date().getFullYear(2022)} <span className="text-gray-400 font-thin">v0.0.6-beta</span>
            </Text>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Footer;
