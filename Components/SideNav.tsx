import React from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Drawer } from "@chakra-ui/react";

import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { ImFilesEmpty } from "react-icons/im";

const MenuItem = ({ children, Name }) => {
  return (
    <div className="flex justify-between items-center w-full hover:shadow-xl py-5 rounded-xl px-5 mt-3 cursor-pointer">
      {children}
      <h1 className="text-xl">{Name}</h1>
    </div>
  );
};

const SideNav = () => {
  return (
    <div className="flex flex-col align-center w-full h-full bg-slate-200">
      <div className="h-[120px] bg-blue-600">
        <h1>School Simplified Logo</h1>
      </div>

      <div className="flex flex-col mt-9">
        <MenuItem Name="Home" children={<AiOutlineHome size={23} />} />
        <MenuItem Name="Volunteers" children={<BsPeople size={23} />} />
        <MenuItem Name="Documents" children={<ImFilesEmpty size={23} />} />
      </div>
    </div>
  );
};

export default SideNav;
