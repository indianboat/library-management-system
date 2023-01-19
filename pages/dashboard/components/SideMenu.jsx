import React from "react";
import NextLink from "next/link";
import { Text, User } from "@nextui-org/react";
import {
  FiHelpCircle,
  FiGrid,
  FiFilePlus,
  FiFileMinus,
  FiCornerRightDown,
  FiSettings,
  FiUserPlus
} from "react-icons/fi";
import { useRouter } from "next/router";

const SideMenu = (props) => {
  const router = useRouter();

  return (
    <>
      <div className="md:flex sm:flex flex-auto flex-col hidden justify-start min-w-[260px] bg-[#415b72] -z-0">
        <div className="text-center justify-center flex flex-col my-3">
          <div className="flex justify-center my-3">
            <User
              className="p-0 grid"
              bordered
              size="xl"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </div>
          <div>
            <Text className="text-center font-PoppinsExtraLight text-sm font-semibold tracking-wide text-gray-50">
              {`${props.userFirstName} ${props.userLastName}`}
            </Text>
            <Text
              size={12}
              className="text-center font-Inter tracking-normal font-thin text-[#aabac8]"
            >
              iampankaj@gmail.com
            </Text>
          </div>
        </div>
        <ul className="p-4 justify-center">
          <li className="flex justify-start w-full align-middle mb-4">
            <NextLink
              className={`flex rounded-2xl md:text-base py-3 mx-6 px-4 hover:bg-[#5c7890] hover:text-white justify-start gap-x-3 w-full transition-colors ${router.pathname == '/dashboard' ? "bg-[#5c7890] text-white" : "text-[#aabac8]"}`}
              href="/dashboard"
            >
              <FiGrid strokeWidth={1.5} size={24} />
              Dashboard
            </NextLink>
          </li>
          <li className="flex justify-start w-full align-middle">
            <NextLink
              className={`flex rounded-2xl md:text-base py-3 mx-6 px-4 hover:bg-[#5c7890] hover:text-white justify-start gap-x-3 w-full transition-colors ${router.pathname == '/dashboard/adduser' ? "bg-[#5c7890] text-white" : "text-[#aabac8]"}`}
              href="/dashboard/adduser"
            >
              <FiUserPlus strokeWidth={1.5} size={24} />
              Add User
            </NextLink>
          </li>
          <li className="flex justify-start w-full align-middle">
            <NextLink
              className={`flex rounded-2xl md:text-base py-3 mx-6 px-4 hover:bg-[#5c7890] hover:text-white justify-start gap-x-3 w-full transition-colors  ${router.pathname == '/dashboard/issuebook' ? "bg-[#5c7890] text-white" : "text-[#aabac8]"}`}
              href="/dashboard"
            >
              <FiFileMinus strokeWidth={1.5} size={24} />
              Issue Book
            </NextLink>
          </li>
          <li className="flex justify-start w-full align-middle">
            <NextLink
              className={`flex rounded-2xl md:text-base py-3 mx-6 px-4 hover:bg-[#5c7890] hover:text-white justify-start gap-x-3 w-full transition-colors  ${router.pathname == '/dashboard/returnbook' ? "bg-[#5c7890] text-white" : "text-[#aabac8]"}`}
              href="/dashboard"
            >
              <FiCornerRightDown strokeWidth={1.5} size={24} />
              Return Book
            </NextLink>
          </li>
          <li className="flex justify-start w-full align-middle">
            <NextLink
              className={`flex rounded-2xl md:text-base py-3 mx-6 px-4 hover:bg-[#5c7890] hover:text-white justify-start gap-x-3 w-full transition-colors  ${router.pathname == '/dashboard/settings' ? "bg-[#5c7890] text-white" : "text-[#aabac8]"}`}
              href="/dashboard"
            >
              <FiSettings strokeWidth={1.5} size={24} />
              Settings
            </NextLink>
          </li>
          <li className="flex justify-start w-full align-middle mb-0">
            <NextLink
              className={`flex rounded-2xl md:text-base py-3 mx-6 px-4 hover:bg-[#5c7890] hover:text-white justify-start gap-x-3 w-full transition-colors  ${router.pathname == '/dashboard/help' ? "bg-[#5c7890] text-white" : "text-[#aabac8]"}`}
              href="/dashboard/#"
            >
              <FiHelpCircle strokeWidth={1.5} size={24} />
              Help
            </NextLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
