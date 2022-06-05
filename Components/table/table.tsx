import React, { useMemo, useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import COLUMNS from "./columns";
import { AiOutlinePlus } from "react-icons/ai";
import { GlobalFilter } from "./GlobalFilter";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  getVolunteers,
  deleteVolunteer,
  createVolunteer,
} from "../Api/volunteers";
const Table = (props) => {
  const volData = props.volData;
  const columns = useMemo(() => COLUMNS, []);
  const [visible, setVisiblity] = useState(false);

  // new user data
  const [emailAddress, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [discordTag, setTag] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [department_division, setDepartmentDivision] = useState("");
  // data props
  const data = volData;
  const createUser = async (e: Event) => {
    e.preventDefault();
    const req_data = {
      fullName,
      discordTag,
      emailAddress,
    };
    const response = await createVolunteer(req_data);
    await props.userUpdated();
    setVisiblity(false);
  };

  const deleteUser = async (row) => {
    const user_id = row.original.ID; // indexes start at 0 but id's start at 1. transition to uuid's instead of autoincrement is also worth considering.
    const resp = await deleteVolunteer(user_id);
    await props.userUpdated();
    alert("user deleted!");
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );
  const { globalFilter } = state;
  return (
    <div style={{ width: "10 rem" }}>
      <div className="w-full flex justify-between items-center">
        <h1 className="font-semibold text-5xl mb-4">Volunteers</h1>
        <div className="flex justify-between">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <AiOutlinePlus
            className="ml-11 hover:cursor-pointer"
            size={25}
            onClick={() => setVisiblity(true)}
          />

          {/* create user modal/form */}
          {visible && (
            <div className="w-screen h-screen fixed left-0 top-0 bg-purple-400 flex-col">
              <div
                className="absolute right-4 top-4 p-2 rounded-xl text-white border-2 border-gray-200 hover:bg-gray-200 hover:border-purple-400 hover:text-purple-400"
                onClick={() => setVisiblity(false)}
              >
                x
              </div>
              <form
                className=" flex flex-col items-center justify-center h-full"
                onSubmit={createUser}
              >
                <div className="w-1/2 h-1/2 border-white border-2 p-4 rounded-md my-2 flex flex-col justify-center">
                  <span className="text-3xl block text-center text-yellow-200">
                    Add Employee
                  </span>
                  <div className="grid grid-flow-row grid-rows-5 justify-center items-center w-full gap-y-6">
                    <div className="flex flex-row items-center w-full justify-center">
                      <label className="text-white text-2xl">Email</label>
                      <input
                        value={emailAddress}
                        className="p-1 rounded-md w-full ml-4 "
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 w-full">
                      <div className="w-full col-span-1 text-lg flex flex-row items-center">
                        <label className="text-white text-xl">Discord</label>
                        <input
                          value={discordTag}
                          className="p-1 rounded-md text-md w-full mx-2"
                          onChange={(e) => setTag(e.target.value)}
                        />
                      </div>
                      <div className="w-full col-span-1 text-lg flex flex-row items-center">
                        <label className="text-white text-xl">Name</label>
                        <input
                          value={fullName}
                          className="p-1 rounded-md text-md w-full mx-2"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-center w-full justify-center">
                      <label className="text-white text-2xl inline-block whitespace-nowrap">
                        Organization Email
                      </label>
                      <input
                        value={orgEmail}
                        className="p-1 rounded-md text-md w-full ml-4"
                        onChange={(e) => setOrgEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-row items-center w-full justify-center">
                      <label className="text-white text-2xl inline-block whitespace-nowrap">
                        Department(s)
                      </label>
                      <input
                        value={department_division}
                        className="p-1 rounded-md text-md w-full ml-4"
                        onChange={(e) => setDepartmentDivision(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="border-2 border-white p-2 rounded-xl text-white hover:bg-white hover:text-purple-400 w-full transition-all"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header == "Name") {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render("Cell")}{" "}
                        <DeleteIcon
                          className="float-right"
                          onClick={() => deleteUser(row)}
                        />
                      </td>
                    );
                  }
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
