import React from "react";
import NextLink from 'next/link';
import { CategoryIcon } from "../../../components/icons/CategoryIcon";
import { PaperPlusIcon } from "../../../components/icons/PaperPlusIcon";
import { PaperUploadIcon } from "../../../components/icons/PaperUploadIcon";
import { PaperDownloadIcon } from "../../../components/icons/PaperDownloadIcon";
import { SettingIcon } from "../../../components/icons/SettingIcon";

const SideMenu = () => {
  return (
    <>
      <ul className="p-4 justify-center bg-white">
        <li className="flex justify-start w-full align-middle mb-4">
          <NextLink
            className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
            href="/dashboard"
          >
            <span>
              <CategoryIcon fill="#ab0143" />
            </span>
            <span className="font-semibold font-GilroyLight">Dashboard</span>
          </NextLink>
        </li>
        <li className="flex justify-start w-full align-middle">
          <NextLink
            className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
            href="/dashboard/addbook"
          >
            <span>
              <PaperPlusIcon fill={"#ab0143"} />
            </span>
            <span className="font-semibold font-GilroyLight">Add a Book</span>
          </NextLink>
        </li>
        <li className="flex justify-start w-full align-middle">
          <NextLink
            className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
            href="/dashboard"
          >
            <span>
              <PaperUploadIcon fill={"#ab0143"} />
            </span>
            <span className="font-semibold font-GilroyLight">Issue a Book</span>
          </NextLink>
        </li>
        <li className="flex justify-start w-full align-middle">
          <NextLink
            className="flex rounded-xl bg-white hover:bg-rose-50 hover:text-rose-900 transition-colors shadow-lg shadow-slate-100 py-3 pr-16 pl-6 justify-start gap-x-6 w-full"
            href="/dashboard"
          >
            <span>
              <PaperDownloadIcon fill={"#ab0143"} />
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
              <SettingIcon fill="#ab0143" />
            </span>
            <span className="font-semibold font-GilroyLight">Settings</span>
          </NextLink>
        </li>
      </ul>
    </>
  );
};

export default SideMenu;
