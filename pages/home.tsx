import { useState, useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";

import { getVolunteers } from "../Components/Api/volunteers";
import Table from "../Components/table/table";
import Script from "next/script";
import { FiTrash2 } from "react-icons/fi";
import { BiDownArrow } from "react-icons/bi";
import SideNav from "../Components/SideNav";

const UserCard = ({ name, email, strikes, discordTag }: any) => {
  return (
    <>
      <div className="flex w-full justify-between px-11 py-3">
        <h1>{name}</h1>
        <h1>{email}</h1>
        <h1>{discordTag}</h1>
        <div className="flex w-9 justify-between">
          <BiDownArrow />
          <FiTrash2 />
        </div>
      </div>
      <hr />
    </>
  );
};

const Home: NextPage = () => {
  useEffect(() => {
    var params = window.location.href.split("?");
    if (params.length > 1 && params[1] !== "") {
      const token = params[1].split("=")[1];
      const refresh = params[2].split("=")[1];
      localStorage.setItem("token", token);
      localStorage.setItem("refresh", refresh);
    }
  }, []);

  return (
    <>
      <div className="w-full flex">
        <div className="w-[20%] h-screen sticky top-0 2xl:w-[15%]">
          <SideNav />
        </div>
        <div className="w-full px-5 py-3">
          <h1 className="font-semibold text-5xl mb-4">Home</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
