import { useState, useEffect } from "react";
import type { NextPage } from "next";

import { getVolunteers } from "../Components/Api/volunteers";
import Table from "../Components/table/table";
import Script from "next/script";
import { FiTrash2 } from "react-icons/fi";
import { BiDownArrow } from "react-icons/bi";
import SideNav from "../Components/SideNav";
const UserCard = ({ name, email, strikes, discordTag }) => {
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
  const [volunteers, setVolunteers] = useState(null);

  const fetchVolunteers = async () => {
    const result = await getVolunteers();
    setVolunteers(result);
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <>
      <script src="https://apis.google.com/js/api.js"></script>
      <div className="w-full flex">
        <div className="w-[20%] h-screen sticky top-0 2xl:w-[15%]">
          <SideNav />
        </div>
        <div className="w-full px-5 py-3">
          {(volunteers && (
            <div>
              <Table volData={volunteers} userUpdated={fetchVolunteers} />
            </div>
          )) || <h1>Loading...</h1>}
        </div>
      </div>
    </>
  );
};

export default Home;
