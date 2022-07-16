import React from "react";

export const GlobalFilter = ({ filter, setFilter }: any) => {
  return (
    <span className="font-semibold">
      Search: {""}
      <input
        className="bg-slate-400 border-2"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
