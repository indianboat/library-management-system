import { Text } from "@nextui-org/react";
import React from "react";

const DashBox = (props) => {

  return (
    <>
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
          {props.totalBooks}
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
          {props.issuedBooks}
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
          {props.returnedBooks}
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
          {props.availableBooks}
        </Text>
      </div>
    </>
  );
};

export default DashBox;
