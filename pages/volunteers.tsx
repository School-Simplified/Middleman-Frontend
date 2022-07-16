import { useState, useEffect } from "react";
import type { NextPage } from "next";

import {
  getGoogleVolunteers,
  getVolunteers,
} from "../Components/Api/volunteers";
import Table from "../Components/table/table";
import SideNav from "../Components/SideNav";

const Volunteers: NextPage = () => {
  const [volunteers, setVolunteers] = useState(null);
  const [googleVolunteers, setGoogleVolunteers] = useState<any[]>([]);

  const getAllHRVolunteers = async () => {
    const result = await getVolunteers();
    setVolunteers(result);
  };

  const getAllGoogleVolunteers = async () => {
    const result = await getGoogleVolunteers();
  };

  useEffect(() => {
    getAllHRVolunteers();
    getAllGoogleVolunteers();
  }, []);

  return (
    <>
      <div className="w-full flex">
        <div className="w-[20%] h-screen sticky top-0 2xl:w-[15%]">
          <SideNav />
        </div>
        <div className="w-full px-5 py-3">
          {(volunteers && (
            <div>
              <Table volData={volunteers} userUpdated={getAllHRVolunteers} />
            </div>
          )) || <h1>Loading...</h1>}
        </div>
      </div>
    </>
  );
};

export default Volunteers;
