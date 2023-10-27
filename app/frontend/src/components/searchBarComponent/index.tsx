import React from "react";
import ISearchTermProps from "../../interfaces/ISearchTermProps";

export default function SearchBarComponent({
  setSearchTerm,
  inputType,
  placeholder,
  searchTerm,
}: ISearchTermProps) {
  return (
    <form action="">
      <input
        type={inputType}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
