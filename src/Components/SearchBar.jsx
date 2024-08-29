
import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  const handleChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="searchBar">
      <div id="searchBox">
        <input
          id="searchText"
          type="text"
          placeholder="Search Note Here..."
          value={searchTerm}
          onChange={handleChange}
        />
        <img src={require("./images/search Icon.png")} alt="search icon" />
      </div>
    </div>
  );
}

export default SearchBar;
