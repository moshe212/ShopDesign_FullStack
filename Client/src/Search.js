import React from "react";
import "./Search.css";

const Search = (props) => {
  return (
    <div className="Search">
      <button className="searchButton" onClick={(e) => props.Search(e)}>
        חפש
      </button>
      <input className="input" type="text"></input>
    </div>
  );
};

export default Search;
