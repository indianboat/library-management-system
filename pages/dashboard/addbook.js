import React, { useState } from "react";
import HeaderBox from "./components/HeaderBox";
import SideMenu from "./components/SideMenu";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { Button, Text, Loading } from "@nextui-org/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const res = await fetch(process.env.NODE_ENV == "production" ? `${process.env.production}/api/users/${token_value.id}` : `${process.env.local}/api/users/${token_value.id}`);
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

  const bookGenreList = [
    "Education & Teaching",
    "Fantasy",
    "Sci-Fi",
    "Historical Fiction",
    "Dystopian",
    "Adventure",
    "Romance",
    "Mystery",
    "Horror",
    "Thriller",
    "Biography",
    "Cooking",
    "Art & Photography",
    "Personal Development",
    "Motivational",
    "Health & Fitness",
    "History",
    "Guide or How-to",
    "Families & Relationships",
    "Humor & Entertainment",
    "Business & Money",
    "Law & Criminology",
    "Science & Technology",
    "Travel",
    "Religion & Spirituality",
    "Children's Books",
    "Other",
  ];

  const now = new Date();
  let d = now.getDate();
  let m = now.getMonth() + 1;
  let y = now.getFullYear();

  if (d < 10) {
    d = "0" + d;
  }

  if (m < 10) {
    m = "0" + m;
  }

  let today = `${y}-${m}-${d}`;

  const [bookData, setBookData] = useState({
    bookId: "",
    bookGenre: "Education & Teaching",
    bookTitle: "",
    authorName: "",
    bookQuantity: "",
    publisherName: "",
    publishDate: today,
    totalPages: "",
    bookPrice: "",
  });

  const getBookData = (event) => {
    setBookData({ ...bookData, [event.target.name]: event.target.value });
  };

  const saveBookData = async () => {

    const {
      bookId,
      bookGenre,
      bookTitle,
      authorName,
      publisherName,
      publishDate,
      totalPages,
      bookPrice,
      bookQuantity,
    } = bookData;

    try {
      const res = await fetch("/api/librarydata/newbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          bookGenre,
          bookTitle,
          authorName,
          publisherName,
          publishDate,
          totalPages,
          bookPrice,
          bookQuantity,
          libId
        }),
      });

      const data = await res.json();

      if (data.message == "success") {
        toast.success("Book Added Successfully !");
      } else if (data.message == "Technical Error") {
        toast.error("Technical Error");
      } else if (data.message == "Required fields !") {
        toast.error("Required fields !");
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      toast.error("Server Error :", error);
    }
  };

  // new library id creation code

  const [newLibId, setNewLibId] = useState("");
  // const [loading, setLoding] = useState(false);
  // const [disabledBtn, setDisabledBtn] = useState(true);

  const getNewLibId = async (e) => {
    setNewLibId(e.target.value.toUpperCase());
  };

  

  const updateLibId = async () => {

    try {
      const res = await fetch(`/api/librarydata/${user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({newLibId})
      });

      const data = await res.json();
      // console.log(data);

      if (data.message == "Data Saved Successfully") {
        toast.success("Data Saved Successfully");
        // setLoding(false);
        // setDisabledBtn(false);
      } else {
        toast.error("Technical Error");
        // setLoding(false);
        // setDisabledBtn(true);
      }
    } catch (error) {
      toast.error(error);
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
      <div className="2xl:container flex mx-auto">
        <SideMenu userFirstName={fName} userLastName={lName} libId={libId}/>
        <div className="w-full py-3 px-3 bg-[#ebf0fa]">
          <HeaderBox pageName="Add Book" />

          <div className="w-full">
            <div
              className="px-4 py-4 rounded-xl shadow-xl shadow-slate-200"
              style={{ backgroundColor: "white" }}
            >
              {libId == undefined ? (
                <>
                  <div className="border border-blue-500">
                    <Text
                      size={16}
                      className="md:text-left sm:text-center text-center font-Inter"
                    >
                      Please create a new Store for your books.
                    </Text>
                    <form method="post" className="border mt-6 flex">
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <label htmlFor="newlibId" className="text-sm">
                            Create Library Id
                          </label>
                         <input
                            type="text"
                            name="newLibId"
                            id="newlibId"
                            minLength={6}
                            maxLength={25}
                            value={newLibId}
                            placeholder="Eg MYLIBRARY758495"
                            onChange={getNewLibId}
                            className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                          />
                        </div>
                        <div className="">
                          <p id="avai"></p>
                        </div>
                        <div className="flex flex-row gap-x-3 w-auto">
                          <Button
                            size="sm"
                            onClick={updateLibId}
                            className="bg-gray-900"
                          >
                            Create
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <form method="post">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 md:gap-y-6 sm:gap-y-6 p-3">
                      <div className="flex flex-col">
                        <label htmlFor="libId" className="text-sm">
                          My Library Id
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
                          value={bookData.bookId}
                          onChange={getBookData}
                          id="bid"
                          placeholder="Ex. 124596"
                          className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="genre" className="text-sm">
                          Genre
                        </label>
                        <select
                          type="text"
                          name="bookGenre"
                          id="genre"
                          value={bookData.bookGenre}
                          onChange={getBookData}
                          placeholder="Ex. Horror"
                          className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {bookGenreList.map((val, index) => {
                            return (
                              <option value={val} key={index}>
                                {val}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="bname" className="text-sm">
                          Book Title
                        </label>
                        <input
                          type="text"
                          name="bookTitle"
                          id="bname"
                          value={bookData.bookTitle}
                          onChange={getBookData}
                          placeholder="Ex. Half Girlfriend"
                          className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="aname" className="text-sm">
                          Author Name
                        </label>
                        <input
                          type="text"
                          name="authorName"
                          id="aname"
                          value={bookData.authorName}
                          onChange={getBookData}
                          placeholder="Ex. Chetan Bhagat"
                          className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pname" className="text-sm">
                          Publisher Name
                        </label>
                        <input
                          type="text"
                          name="publisherName"
                          id="aname"
                          value={bookData.publisherName}
                          onChange={getBookData}
                          placeholder="Ex. Rupa & Co."
                          className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pdate" className="text-sm">
                          Publication date
                        </label>
                        <input
                          type="date"
                          name="publishDate"
                          id="pdate"
                          max={today}
                          value={bookData.publishDate}
                          onChange={getBookData}
                          className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="quantity" className="text-sm">
                          Quantity
                        </label>
                        <input
                          type="tel"
                          name="bookQuantity"
                          maxLength={4}
                          id="quantity"
                          value={bookData.bookQuantity}
                          onChange={getBookData}
                          placeholder="Ex. 75"
                          className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pageno" className="text-sm">
                          Total Pages
                        </label>
                        <input
                          type="tel"
                          name="totalPages"
                          maxLength={4}
                          id="pageno"
                          value={bookData.totalPages}
                          onChange={getBookData}
                          placeholder="Ex. 650"
                          className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="price" className="text-sm">
                          Rent Price
                        </label>
                        <input
                          type="tel"
                          name="bookPrice"
                          id="price"
                          maxLength={4}
                          value={bookData.bookPrice}
                          onChange={getBookData}
                          placeholder="Ex. Rs 50"
                          className="rounded-xl px-2 py-2 border-2 border-rose-200 appearance-none"
                        />
                      </div>
                    </div>
                    <div className="flex lg:justify-end md:justify-center sm:grid-cols-1 grid-cols-1 p-3 gap-x-4">
                      <Button
                        className="bg-rose-700 lg:w-32 md:w-32 sm:w-full w-full"
                        onClick={saveBookData}
                      >
                        Add book
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBook;
