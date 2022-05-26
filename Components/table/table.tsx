import React, { useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";
import COLUMNS from "./columns";
import { AiOutlinePlus } from "react-icons/ai";
import { GlobalFilter } from "./GlobalFilter";

const Table = ({ volData }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => volData, []);
  console.log(volData);
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
          <AiOutlinePlus className="ml-11 hover:cursor-pointer" size={25} />
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
