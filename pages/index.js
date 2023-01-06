import Image from "next/legacy/image";
import { Grid, Text, Card } from "@nextui-org/react";
import NextLink from 'next/link';
import HomeImage from "../public/home_image.png";
import dataManagementImage from "../public/features/data-management.png";
import timeImage from "../public/features/time.png";
import searchingImage from "../public/features/searching.png";
import manualImage from "../public/features/manual.png";

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

export default function Home() {
  return (
    <>
      <div className="container mx-auto md:my-8 sm:my-6 my-6">
        <Grid.Container>
          <Grid xs={12} md={6}>
            <div className="px-4 py-4 md:text-start sm:text-center text-center">
              <Text
                size={60}
                css={{
                  textGradient: "45deg, #0093E9 -20%, #80D0C7 50%",
                  lineHeight: "4.5rem",
                  letterSpacing: "0.1px",
                  padding: "1px 0px",
                }}
                weight="bold"
                className="font-EdensorFree"
              >
                Manage Your
              </Text>
              <Text
                size={60}
                css={{
                  textGradient: "45deg, #0093E9 -20%, #80D0C7 50%",
                  lineHeight: "4.5rem",
                  fontStyle: "italic",
                  letterSpacing: "0.1px",
                  padding: "1px 0px",
                }}
                weight="bold"
                className="font-GilroyExtraBold"
              >
                Library
              </Text>
              <Text
                size={60}
                css={{
                  textGradient: "45deg, #0093E9 -20%, #80D0C7 50%",
                  lineHeight: "4.5rem",
                  letterSpacing: "0.1px",
                  padding: "1px 0px",
                }}
                weight="bold"
                className="font-GilroyExtraBold"
              >
                at one place
              </Text>

              <p
                className="md:my-6 sm:my-6 my-8 font-Inter"
                style={{
                  lineHeight: "2rem",
                  letterSpacing: "0.1px",
                  textAlign: "justify",
                }}
              >
                Library management systems are designed to manage the movement
                of books and maintain records of the members in a library.
                Library management focuses on the possibility of search for
                books by title, author or subject by the member.
              </p>
              <NextLink
                style={{
                  color: "white",
                  backgroundColor: "#102C4C",
                  borderRadius: "50px",
                }}
                className="px-6 py-2"
                href="/signup"
              >
                Get Started
              </NextLink>
            </div>
          </Grid>
          <Grid xs={12} md={6} className="flex justify-center">
            <div className="px-3 py-3 flex place-items-center">
              <Image
                src={HomeImage}
                width={600}
                height={300}
                alt="home-image"
                role="home-image"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(600, 300)
                )}`}
              />
            </div>
          </Grid>
        </Grid.Container>
      </div>

      <div className="container max-w-screen-2xl mx-auto md:my-28 sm:my-18 my-12 pb-12 bg-slate-100">
        <div className="text-center">
          <Text className="font-Inter " id="features" size={35}>
            Features
          </Text>
        </div>
        <div className="">
          <Grid.Container className="mx-auto">
            <Grid md={6} sm={6} xs={12} className="flex px-6 py-4">
              <Card
                variant="bordered"
                className="border-0 shadow-lg flex md:flex-row p-6 gap-6"
              >
                <div className="flex justify-center">
                  <Grid
                    style={{ minWidth: "100px", maxWidth: "100px" }}
                    className="flex place-items-center"
                  >
                    <Image
                      src={dataManagementImage}
                      alt="data-management"
                      width={260}
                      height={260}
                      role="data-manage"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(260, 260)
                      )}`}
                    ></Image>
                  </Grid>
                </div>
                <Grid className="md:text-start sm:text-center text-center md:py-0 sm:py-2 flex flex-col">
                  <Text b css={{ lineHeight: "$normal", mb: "10px" }}>
                    Easy to Manage Books
                  </Text>
                  <Text
                    css={{
                      lineHeight: "$normal",
                      textAlign: "justify",
                      letterSpacing: "0.1px",
                    }}
                    className="font-Inter"
                  >
                    Maintains the information about the books present in the
                    library, their authors, the members of library to whom books
                    are issued, library staff and all.
                  </Text>
                </Grid>
              </Card>
            </Grid>

            <Grid md={6} sm={6} xs={12} className="flex px-6 py-4">
              <Card
                variant="bordered"
                className="border-0 shadow-lg flex md:flex-row p-6 gap-8"
              >
                <div className="flex justify-center">
                  <Grid
                    style={{ minWidth: "100px", maxWidth: "100px" }}
                    className="flex place-items-center"
                  >
                    <Image
                      src={timeImage}
                      alt="time"
                      width={260}
                      height={260}
                      role="time-manage"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(260, 260)
                      )}`}
                    ></Image>
                  </Grid>
                </div>
                <Grid className="md:text-start sm:text-center text-center md:py-0 sm:py-2 flex flex-col">
                  <Text b css={{ lineHeight: "$normal", mb: "10px" }}>
                    Time Saving
                  </Text>
                  <Text
                    css={{
                      lineHeight: "$normal",
                      textAlign: "justify",
                      letterSpacing: "0.1px",
                    }}
                    className="font-Inter"
                  >
                    Stock checking and verification of books in the library can
                    be done within a few hours. The automated system saves a
                    considerable amount of time as opposed to the manual system.
                  </Text>
                </Grid>
              </Card>
            </Grid>
            <Grid md={6} sm={6} xs={12} className="flex px-6 py-4">
              <Card
                variant="bordered"
                className="border-0 shadow-lg flex md:flex-row p-6 gap-8"
              >
                <div className="flex justify-center">
                  <Grid
                    style={{ minWidth: "100px", maxWidth: "100px" }}
                    className="flex place-items-center"
                  >
                    <Image
                      src={searchingImage}
                      alt="searching"
                      width={260}
                      height={260}
                      role="search"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(260, 260)
                      )}`}
                    ></Image>
                  </Grid>
                </div>
                <Grid className="md:text-start sm:text-center text-center md:py-0 sm:py-2 flex flex-col">
                  <Text b css={{ lineHeight: "$normal", mb: "10px" }}>
                    Easily Tracking or Searching
                  </Text>
                  <Text
                    css={{
                      lineHeight: "$normal",
                      textAlign: "justify",
                      letterSpacing: "0.1px",
                    }}
                    className="font-Inter"
                  >
                    Searching books name, students info, etc. is very easy to
                    use by just typing the details. The search functions can be
                    filtered to the need of each user.
                  </Text>
                </Grid>
              </Card>
            </Grid>
            <Grid md={6} sm={6} xs={12} className="flex px-6 py-4">
              <Card
                variant="bordered"
                className="border-0 shadow-lg flex md:flex-row p-6 gap-8"
              >
                <div className="flex justify-center">
                  <Grid
                    style={{ minWidth: "100px", maxWidth: "100px" }}
                    className="flex place-items-center"
                  >
                    <Image
                      src={manualImage}
                      alt="manual"
                      width={260}
                      height={260}
                      role="img"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(260, 260)
                      )}`}
                    ></Image>
                  </Grid>
                </div>
                <Grid className="md:text-start sm:text-center text-center md:py-0 sm:py-2 flex flex-col">
                  <Text b css={{ lineHeight: "$normal", mb: "10px" }}>
                    Reduce Manual Work
                  </Text>
                  <Text
                    css={{
                      lineHeight: "$normal",
                      textAlign: "justify",
                      letterSpacing: "0.1px",
                    }}
                    className="font-Inter"
                  >
                    Maintaining daily reports of books issued, renewed and
                    returned, misplaced and lost manually is a tiring process.
                    This system eliminates the need for manual entries,
                    minimizes errors, increases accuracy and efficiency of
                    operations.
                  </Text>
                </Grid>
              </Card>
            </Grid>
          </Grid.Container>
        </div>
      </div>
    </>
  );
}
