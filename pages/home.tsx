import { useState, useEffect } from "react";
import type { NextPage } from "next";

import getVolunteers from "../Components/Api/volunteers";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
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
    const data = result.volunteers;
    setVolunteers(data);
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <div className="w-full flex">
      <div className="w-[20%] h-screen sticky top-0 2xl:w-[15%]">
        <SideNav />
      </div>
      <div className="w-full px-5 py-3">
        <h1 className="font-semibold text-5xl">Volunteers</h1>
        <div className="flex mt-4 w-full justify-between px-11 py-3 bg-slate-300 rounded-t-lg font-semibold">
          <h1>Name</h1>
          <h1>Org Email</h1>
          <h1>DiscordTag</h1>
          <h1>Actions</h1>
        </div>
        <UserCard name="Ethan Zentz" email=".sdakfyes@gmail.com" />
        {(volunteers && (
          <div>
            {volunteers.map((volunteer) => (
              <UserCard
                name={volunteer.fullName}
                email={volunteer.orgEmail}
                strikes={volunteer.strikes}
                discordTag={volunteer.discordTag}
              />
            ))}
          </div>
        )) || <h1>Loading...</h1>}
      </div>
    </div>
  );

  /*   return (
    (volunteers && (
      <div>
        <h1 className="text-3xl">Volunteers</h1>
        {volunteers.map((volunteer) => (
          <div key={volunteer.id}>
            <h2>{volunteer.fullName}</h2>
            <p>
              {volunteer.strikes} strikes
              {volunteer.orgEmail && <span> | {volunteer.orgEmail}</span>}
            </p>
          </div>
        ))}
      </div>
    )) || <h1>Loading...</h1>
  ); */
};

export default Home;
