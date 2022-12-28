import { Text, Container, Link } from "@nextui-org/react";
import React from "react";

const Footer = () => {
  return (
    <>
      <Container xl className="footer bg-gray-900 text-right py-1">

        <div className="flex justify-between">
          <div className="grid grid-flow-col gap-3 place-items-center">
            <p><Link href="#" css={{color:"$accents5"}}>Twitter</Link></p>
            <p><Link href="#" css={{color:"$accents5"}}>Github</Link></p>
            <p><Link href="#" css={{color:"$accents5"}}>Instagram</Link></p>
            <p><Link href="#" css={{color:"$accents5"}}>Contact</Link></p>
          </div>
          <div className="flex flex-col">
          <Text css={{color:"$accents5"}}>
            Made with <span style={{ color: "#D31F47" }}>&#10084;</span> by Pankaj
          </Text>
          <Text css={{color:"$accents5"}}>
            &copy; CopyRight {new Date().getFullYear(2022)}{" "}
          </Text>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Footer;
