import React from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";
import { Text } from "@nextui-org/react";
import BooksTable from "./components/BooksTable";
import NextLink from "next/link";

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  const token_value = jwt.decode(token);

  if (token_value == undefined) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 307,
      },
    };
  } else {
    // const res = await fetch(`http://localhost:3000/api/${token_value.id}`);
    const res = await fetch(
      `https://amrita-lms.vercel.app/api/${token_value.id}`
    );
    const data = await res.json();
    return {
      props: { data },
    };
  }
}

const DashboardHome = ({ data }) => {
  const numberArr = [745896, 78964, 751412, 89669];
  const totalBooks = Intl.NumberFormat("en-IN").format(numberArr[0]);
  const issuedBooks = Intl.NumberFormat("en-IN").format(numberArr[1]);
  const returnedBooks = Intl.NumberFormat("en-IN").format(numberArr[2]);
  const avaiBook = Intl.NumberFormat("en-IN").format(numberArr[3]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const now = new Date();
  const timeToday = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;

  return (
    <>
      <div className="2xl:container flex mx-auto">
        <div className="md:flex sm:flex flex-auto hidden justify-center md:w-96 sm:w-80">
          <ul className="p-4 justify-center  bg-white">
            <li className="flex justify-start w-full align-middle mb-4">
              <NextLink
                className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
                href="/dashboard"
              >
                <span>
                  {/* <Category set="curved" size={22} primaryColor="#ab0143" /> */}
                  <svg
                    id="Iconly_Curved_Category"
                    data-name="Iconly/Curved/Category"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g id="Category" transform="translate(3 3)">
                      <path
                        id="Stroke_1"
                        data-name="Stroke 1"
                        d="M7.347,3.674A3.673,3.673,0,1,1,3.673,0,3.674,3.674,0,0,1,7.347,3.674Z"
                        transform="translate(10.654 0)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_3"
                        data-name="Stroke 3"
                        d="M7.347,3.674A3.673,3.673,0,1,1,3.673,0,3.674,3.674,0,0,1,7.347,3.674Z"
                        transform="translate(0 0)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_5"
                        data-name="Stroke 5"
                        d="M7.347,3.674A3.673,3.673,0,1,1,3.673,0,3.674,3.674,0,0,1,7.347,3.674Z"
                        transform="translate(10.654 10.588)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_7"
                        data-name="Stroke 7"
                        d="M7.347,3.674A3.673,3.673,0,1,1,3.673,0,3.673,3.673,0,0,1,7.347,3.674Z"
                        transform="translate(0 10.588)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                    </g>
                  </svg>
                </span>
                <span className="font-semibold font-GilroyLight">
                  Dashboard
                </span>
              </NextLink>
            </li>
            <li className="flex justify-start w-full align-middle">
              <NextLink
                className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
                href="/dashboard"
              >
                <span>
                  {/* <PaperPlus set="curved" primaryColor="#ab0143" /> */}
                  <svg
                    id="Iconly_Curved_Paper_Plus"
                    data-name="Iconly/Curved/Paper Plus"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      id="Paper_Plus"
                      data-name="Paper Plus"
                      transform="translate(3.65 2.75)"
                    >
                      <path
                        id="Stroke_1"
                        data-name="Stroke 1"
                        d="M16.51,5.55,10.84.15A18.2,18.2,0,0,0,8.39,0C2.1,0,0,2.32,0,9.25S2.1,18.5,8.39,18.5s8.4-2.31,8.4-9.25A21.045,21.045,0,0,0,16.51,5.55Z"
                        transform="translate(0)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_3"
                        data-name="Stroke 3"
                        d="M0,0V2.661A3.363,3.363,0,0,0,3.364,6.024H6.315"
                        transform="translate(10.284 0.083)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_5"
                        data-name="Stroke 5"
                        d="M4.9.5H0"
                        transform="translate(5.762 9.731)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_7"
                        data-name="Stroke 7"
                        d="M.5,4.9V0"
                        transform="translate(7.713 7.781)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                    </g>
                  </svg>
                </span>
                <span className="font-semibold font-GilroyLight">
                  Add a Book
                </span>
              </NextLink>
            </li>
            <li className="flex justify-start w-full align-middle">
              <NextLink
                className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
                href="/dashboard"
              >
                <span>
                  {/* <PaperUpload set="curved" primaryColor="#ab0143" /> */}
                  <svg
                    id="Iconly_Curved_Paper_Upload"
                    data-name="Iconly/Curved/Paper Upload"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      id="Paper_Upload"
                      data-name="Paper Upload"
                      transform="translate(3.65 2.75)"
                    >
                      <path
                        id="Stroke_1"
                        data-name="Stroke 1"
                        d="M16.51,5.55,10.84.15A18.2,18.2,0,0,0,8.39,0C2.1,0,0,2.32,0,9.25S2.1,18.5,8.39,18.5s8.4-2.31,8.4-9.25A21.045,21.045,0,0,0,16.51,5.55Z"
                        transform="translate(0)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_3"
                        data-name="Stroke 3"
                        d="M0,0V2.661A3.363,3.363,0,0,0,3.364,6.024H6.315"
                        transform="translate(10.284 0.083)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_5"
                        data-name="Stroke 5"
                        d="M.5,0V6.041"
                        transform="translate(7.51 7.226)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_7"
                        data-name="Stroke 7"
                        d="M4.69,2.355,2.345,0,0,2.355"
                        transform="translate(5.665 7.227)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                    </g>
                  </svg>
                </span>
                <span className="font-semibold font-GilroyLight">
                  Issue a Book
                </span>
              </NextLink>
            </li>
            <li className="flex justify-start w-full align-middle">
              <NextLink
                className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
                href="/dashboard"
              >
                <span>
                  {/* <PaperDownload set="curved" primaryColor="#ab0143" /> */}
                  <svg
                    id="Iconly_Curved_Paper_Download"
                    data-name="Iconly/Curved/Paper Download"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      id="Paper_Download"
                      data-name="Paper Download"
                      transform="translate(3.65 2.75)"
                    >
                      <path
                        id="Stroke_1"
                        data-name="Stroke 1"
                        d="M16.51,5.55,10.84.15A18.2,18.2,0,0,0,8.39,0C2.1,0,0,2.32,0,9.25S2.1,18.5,8.39,18.5s8.4-2.31,8.4-9.25A21.045,21.045,0,0,0,16.51,5.55Z"
                        transform="translate(0)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_3"
                        data-name="Stroke 3"
                        d="M0,0V2.661A3.363,3.363,0,0,0,3.364,6.024H6.315"
                        transform="translate(10.284 0.083)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_5"
                        data-name="Stroke 5"
                        d="M.5,6.041V0"
                        transform="translate(7.51 7.226)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_7"
                        data-name="Stroke 7"
                        d="M0,0,2.345,2.355,4.69,0"
                        transform="translate(5.665 10.912)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                    </g>
                  </svg>
                </span>
                <span className="font-semibold font-GilroyLight">
                  Return a Book
                </span>
              </NextLink>
            </li>
            <li className="flex justify-start w-full align-middle mb-0">
              <NextLink
                className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
                href="/dashboard"
              >
                <span>
                  {/* <Setting set="curved" primaryColor="#ab0143" /> */}
                  <svg
                    id="Iconly_Curved_Setting"
                    data-name="Iconly/Curved/Setting"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g id="Setting" transform="translate(3.5 2.5)">
                      <path
                        id="Stroke_1"
                        data-name="Stroke 1"
                        d="M2.5,0A2.5,2.5,0,1,1,0,2.5,2.5,2.5,0,0,1,2.5,0Z"
                        transform="translate(6 7)"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Stroke_3"
                        data-name="Stroke 3"
                        d="M16.668,4.75h0a2.464,2.464,0,0,0-3.379-.912,1.543,1.543,0,0,1-2.314-1.346A2.484,2.484,0,0,0,8.5,0h0A2.484,2.484,0,0,0,6.025,2.492,1.543,1.543,0,0,1,3.712,3.839a2.465,2.465,0,0,0-3.38.912,2.5,2.5,0,0,0,.906,3.4,1.56,1.56,0,0,1,0,2.692,2.5,2.5,0,0,0-.906,3.4,2.465,2.465,0,0,0,3.379.913h0a1.542,1.542,0,0,1,2.313,1.345h0A2.484,2.484,0,0,0,8.5,19h0a2.484,2.484,0,0,0,2.474-2.492h0a1.543,1.543,0,0,1,2.314-1.345,2.465,2.465,0,0,0,3.379-.913,2.5,2.5,0,0,0-.905-3.4h0a1.56,1.56,0,0,1,0-2.692A2.5,2.5,0,0,0,16.668,4.75Z"
                        fill="none"
                        stroke="#ab0143"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                    </g>
                  </svg>
                </span>
                <span className="font-semibold font-GilroyLight">Settings</span>
              </NextLink>
            </li>
          </ul>
        </div>

        <div className="w-full  py-3 px-3">
          <div className="grid grid-flow-col justify-between place-items-center mb-7 py-4 px-3 rounded-xl shadow-lg bg-white">
            <Text b className="font-PoppinsRegular">
              Dashboard
            </Text>
            <Text className="font-PoppinsRegular">Today, {timeToday}</Text>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 w-auto">
            <div
              className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
              style={{ backgroundColor: "#bae6fd" }}
            >
              <Text
                size={18}
                className="font-PoppinsLight text-sky-900"
                css={{ letterSpacing: "0.01px" }}
              >
                Total Books
              </Text>
              <Text
                size={26}
                className="font-PoppinsMedium text-sky-900"
                css={{ letterSpacing: "0.2px" }}
              >
                {totalBooks}
              </Text>
            </div>

            <div
              className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
              style={{ backgroundColor: "#fef3c7" }}
            >
              <Text
                size={18}
                className="font-PoppinsLight text-amber-700"
                css={{ letterSpacing: "0.01px" }}
              >
                Issued Books
              </Text>
              <Text
                size={26}
                className="font-PoppinsMedium text-amber-700"
                css={{ letterSpacing: "0.2px" }}
              >
                {issuedBooks}
              </Text>
            </div>

            <div
              className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
              style={{ backgroundColor: "#fecdd3" }}
            >
              <Text
                size={18}
                className="font-PoppinsLight text-red-900"
                css={{ letterSpacing: "0.01px" }}
              >
                Returned Books
              </Text>
              <Text
                size={26}
                className="font-PoppinsMedium text-red-900"
                css={{ letterSpacing: "0.2px" }}
              >
                {returnedBooks}
              </Text>
            </div>

            <div
              className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
              style={{ backgroundColor: "#a7f3d0" }}
            >
              <Text
                size={18}
                className="font-PoppinsLight text-emerald-900"
                css={{ letterSpacing: "0.01px" }}
              >
                Available Books
              </Text>
              <Text
                size={26}
                className="font-PoppinsMedium text-emerald-900"
                css={{ letterSpacing: "0.2px" }}
              >
                {avaiBook}
              </Text>
            </div>
          </div>

          <div className="mt-7">
            <BooksTable />
          </div>
        </div>
        {/* <div className="md:flex flex-auto w-60 sm:flex hidden border border-rose-400">3</div> */}
      </div>
    </>
  );
};

export default DashboardHome;
