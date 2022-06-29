import React, { useMemo, useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import COLUMNS from "./columns";
import { AiOutlinePlus } from "react-icons/ai";
import { GlobalFilter } from "./GlobalFilter";
import { DeleteIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";
import {
  getVolunteers,
  deleteVolunteer,
  createVolunteer,
  updateVolunteer,
  getVolunteerByID,
} from "../Api/volunteers";
import UpdateVolunteerForm from "./updateVolunteerForm";
import { identitytoolkit } from "googleapis/build/src/apis/identitytoolkit";
import VolunteerStatusForm from "./volunteerStatusForm";
import CreateVolunteerForm from "./createVolunteerForm";

const Table = (props: any) => {
  const volData = props.volData;
  const columns = useMemo(() => COLUMNS, []);
  const [visible, setVisiblity] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [statusFormVisible, setStatusFormVisible] = useState(false);
  const [updateUserID, setUpdateUserID] = useState(-1);

  // data props
  const data = volData;
  const createUser = async (req_data: any) => {
    const response = await createVolunteer(req_data);
    await props.userUpdated();
    setVisiblity(false);
  };

  /*
  const deleteUser = async (row: any) => {
    const user_id = row.original.ID; // indexes start at 0 but id's start at 1. transition to uuid's instead of autoincrement is also worth considering.
    const resp = await deleteVolunteer(user_id);
    await props.userUpdated();
    alert("user deleted!");
  };*/

  const getUser = async (id: number) => {
    const resp = await getVolunteerByID(id);
    return resp;
  }

  const updateUser = async (req_data: any) => {
    const resp = await updateVolunteer(updateUserID, req_data);
    await props.userUpdated();
    alert("user updated!");
    setUpdateFormVisible(false)
    setStatusFormVisible(false)
  }

  const getUpdateUserRow = async (row: any) => {
    setUpdateUserID(row.original.ID);
    setUpdateFormVisible(true)
  }

  const getStatusUserRow = async (row: any) => {
    setUpdateUserID(row.original.ID);
    setStatusFormVisible(true)
  }

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
          {/*create user modal*/}
          {visible &&
          <CreateVolunteerForm
            setVisible={setVisiblity}
            createUser={createUser}
          />
          }
        </div>
        {/*update user modal*/}
        {updateFormVisible && 
        <UpdateVolunteerForm 
          setVisible={setUpdateFormVisible} 
          updateUser={updateUser} 
          updateUserID={updateUserID}
          getUser={getUser}
        />}
        {/*update user status modal*/}
        {statusFormVisible && 
        <VolunteerStatusForm 
          setVisible={setStatusFormVisible} 
          updateUser={updateUser} 
          updateUserID={updateUserID}
          getUser={getUser}
        />}
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
                        <EditIcon
                          className="float-right"
                          onClick={() => getUpdateUserRow(row)}
                        />
                      </td>
                    );
                  }
                  else if (cell.column.Header == "Status") {
                    var color;
                    if (cell.value == "Active") {color = "text-green-500"}
                    else if (cell.value == "On break") {color = "text-yellow-400"}
                    else if (cell.value == "Resigned") {color = "text-red-500"}

                    return (
                      <td {...cell.getCellProps()}>
                        <span className={color}>
                          {cell.render("Cell")}{" "}
                        </span>
                        <EditIcon
                          className="float-right"
                          onClick={() => getStatusUserRow(row)}
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
