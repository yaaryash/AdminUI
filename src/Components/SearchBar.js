import React, { useCallback, useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ updateSearch }) {
  // State to store the search text
  const [searchText, setSearchText] = useState("");

  // Handle search input and invoke the updateSearch function
  const handleSearchInput = useCallback(
    (value) => {
      setSearchText(value);
      updateSearch(value);
    },
    [updateSearch]
  );

  return (
    <div className="body">
      <div className="search">
        <input
          className="search-bar"
          key="search-bar"
          placeholder={"Search here..."}
          onChange={(e) => {
            handleSearchInput(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
