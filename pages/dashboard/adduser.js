import React from "react";
import SideMenu from "./components/SideMenu";
import { Text, Button } from "@nextui-org/react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import HeaderBox from "./components/HeaderBox";


export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  if (token == undefined) {
    return {
      redirect: {
        destination: "/login",
        statusCode: 307,
      },
    };
  }

  return {
    props: { token },
  };
}

const AddUser = ({ token }) => {
  const fName = jwt.decode(token).user_first_name;
  const lName = jwt.decode(token).user_last_name;

  return (
    <>
      <div className="2xl:container flex mx-auto">
        <SideMenu userFirstName={fName} userLastName={lName} />

        <div className="w-full py-3 px-3 bg-[#ebf0fa]">
          <HeaderBox pageName="Add User" />

          <div className="w-full">
            <div
              className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
              style={{ backgroundColor: "white" }}
            >
              <form method="post">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 md:gap-y-6 sm:gap-y-6 p-3">
                  <div className="flex flex-col border-blue-200">
                    <label htmlFor="bookid">Book Id</label>
                    <input
                      type="number"
                      id="bookid"
                      value=""
                      name="bookId"
                      spellCheck={false}
                      placeholder="Book Id"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200 placeholder:text-rose-300"
                      required
                    />
                  </div>
                  <div className="flex flex-col border-blue-200">
                    <label htmlFor="bookname">Book Title</label>
                    <input
                      type="text"
                      id="bookname"
                      value=""
                      name="bookName"
                      spellCheck={false}
                      placeholder="Book Title"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col border-blue-200">
                    <label htmlFor="authorname">Author Name</label>
                    <input
                      type="text"
                      id="authorname"
                      value=""
                      name="authorName"
                      spellCheck={false}
                      placeholder="Author name"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col border-blue-200">
                    <label htmlFor="publisher">Publisher</label>
                    <input
                      type="number"
                      id="publisher"
                      value=""
                      name="publisher"
                      spellCheck={false}
                      placeholder="Publisher"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col border-blue-200">
                    <label htmlFor="publishdate">Publish Date</label>
                    <input
                      type="date"
                      id="publishdate"
                      name="publishDate"
                      placeholder="Publish date"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col border-blue-200">
                    <label htmlFor="pages">Total Page</label>
                    <input
                      type="number"
                      id="pages"
                      value={""}
                      name="pages"
                      spellCheck={false}
                      placeholder="Pages"
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                  <div className="flex flex-col border-blue-200">
                    <label htmlFor="summ">Summary</label>
                    <textarea
                      type="text"
                      id="summ"
                      value={""}
                      name="summary"
                      spellCheck={false}
                      placeholder="Write about book..."
                      className="rounded-xl px-4 py-2 border-2 border-rose-200"
                    />
                  </div>
                </div>

                <div className="flex p-3">
                  <Button className="bg-rose-900 md:w-40 sm:w-full w-full">
                    Add User
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
