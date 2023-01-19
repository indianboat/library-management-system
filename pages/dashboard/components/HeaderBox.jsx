import { Text } from "@nextui-org/react";
import React from "react";
import { FiCalendar } from 'react-icons/fi';

const HeaderBox = (props) => {

  const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

  const now = new Date();
  const timeToday = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;

  return (
    <>
      <div className="flex mb-7 py-4 px-3 place-items-center justify-between rounded-xl bg-white shadow-lg shadow-slate-100">
        <Text
          b
          className="font-PoppinsRegular flex align-middle justify-center place-items-center md:text-2xl sm:text-lg text-lg"
        >
          {props.pageName}
        </Text>
        
        <Text className="font-PoppinsRegular flex place-items-center"><FiCalendar className="mr-2" /> Today, {timeToday}</Text>
      </div>
    </>
  );
};

export default HeaderBox;
