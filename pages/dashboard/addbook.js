import React from "react";
import HeaderBox from "./components/HeaderBox";
import SideMenu from "./components/SideMenu";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { Text } from "@nextui-org/react";

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
    const res = await fetch(`https://amrita-lms.vercel.app/api/${token_value.id}`);
    const data = await res.json();

    return {
      props: { token, data },
    };
  }
}

const AddBook = ({ data, token }) => {
  const user_id = jwt.decode(token).id;
  const fName = jwt.decode(token).user_first_name;
  const lName = jwt.decode(token).user_last_name;
  const libId = data.libraryInfo.libraryId;



  return (
    <>
      <div className="2xl:container flex mx-auto">
        <SideMenu userFirstName={fName} userLastName={lName} />
        <div className="w-full py-3 px-3 bg-[#ebf0fa]">
          <HeaderBox pageName="Add Book" />

          <div className="w-full">
            <div
              className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
              style={{ backgroundColor: "white" }}
            >
              <form method="post">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 md:gap-y-6 sm:gap-y-6 p-3">
                  <div className="flex flex-col">
                    <label htmlFor="libId" className="text-sm">
                      Library Id
                    </label>
                    <input
                      type="text"
                      name="libraryId"
                      id="libId"
                      value={libId}
                      readOnly
                      className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="bid" className="text-sm">
                      Book Id
                    </label>
                    <input
                      type="number"
                      name="bookId"
                      id="bid"
                      placeholder="Ex. 124596"
                      className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBook;
